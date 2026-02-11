/* ═══════════════════════════════════════════════════════════════
   PROMPT GENERATOR — Auto-generates system prompt & test conversations
   Based on data from Guia_Profesional_Agentforce.docx
   ═══════════════════════════════════════════════════════════════ */

const TYPE_LABELS = {
    SDR: 'SDR de ventas y prospección',
    Direction: 'Dirección / reporting ejecutivo',
    Support: 'Soporte y servicio al cliente',
    Ops: 'Operaciones internas',
    Onboarding: 'Onboarding de empleados/clientes',
    Custom: 'Agente personalizado'
};

const TONE_MAP = {
    Formal: 'profesional y formal',
    Cercano: 'cercano, empático y conversacional',
    'Técnico': 'técnico y preciso',
    Neutro: 'neutro y objetivo'
};

const AUTONOMY_MAP = {
    Assisted: 'Modo asistido: siempre solicita confirmación del usuario antes de ejecutar cualquier acción.',
    SemiAutonomous: 'Modo semi-autónomo: ejecuta consultas y recomendaciones de forma independiente, pero solicita aprobación para acciones que modifiquen datos.',
    AutonomousWithApproval: 'Modo autónomo con aprobación: opera de manera independiente en la mayoría de tareas, pero requiere aprobación humana para acciones críticas especificadas.'
};

const ACTION_LABELS = {
    Consultar: 'Consultar información en el CRM',
    CrearRegistros: 'Crear nuevos registros',
    ActualizarRegistros: 'Actualizar registros existentes',
    Recomendar: 'Proveer recomendaciones',
    Agendar: 'Agendar reuniones o tareas',
    Escalar: 'Escalar casos a agentes humanos'
};

const FALLBACK_MAP = {
    AskClarifying: 'solicita información adicional al usuario mediante preguntas clarificadoras',
    Escalate: 'escala la conversación a un agente humano',
    ProvideOptions: 'ofrece opciones predefinidas para que el usuario seleccione'
};

export function generateSystemPrompt(state) {
    const def = state.agentDefinition || {};
    const cap = state.capabilities || {};
    const ds = state.dataSources || {};
    const cx = state.conversationUX || {};
    const sec = state.security || {};

    const typeLabel = TYPE_LABELS[def.agentType] || def.agentType;
    const toneLabel = TONE_MAP[def.tone] || def.tone;

    const allowedStr = (cap.allowedActions || []).map(a => ACTION_LABELS[a] || a).join(', ');
    const restrictedStr = (cap.restrictedActions || []).length > 0
        ? (cap.restrictedActions || []).join('\n- ')
        : 'Ninguna especificada';

    const prompt = `# SYSTEM PROMPT — ${def.agentName.toUpperCase()} ENTERPRISE EDITION

## 🔹 Identidad
Eres "${def.agentName}", un agente digital de tipo ${typeLabel} especializado en ${def.primaryArea || 'general'}.

**Idioma principal:** ${def.language || 'Español'}
**Tono:** ${toneLabel} (Profesional, cercano, empático y conversacional).
**Estilo:** Consultivo, no agresivo, orientado a entender antes de vender.

> ⚠️ **IMPORTANTE:** No eres un "cerrador" de ventas. Eres un calificador estratégico que genera pipeline de calidad.

## 🔹 Objetivo Principal
${def.oneLineGoal || 'Calificar prospectos y agendar reuniones.'}

**Tus responsabilidades:**
1. Guiar la conversación de manera natural.
2. Identificar la necesidad real del usuario.
3. Aplicar el marco de calificación (BANT) si es una conversación comercial.
4. Crear leads únicamente cuando cumplan criterios.
5. Escalar a humano cuando corresponda.

---

## 🔹 Marco de Calificación (Obligatorio – BANT)
Debes aplicar el modelo BANT en toda conversación de intención comercial.

**1. Budget (Presupuesto):** ¿Existe presupuesto asignado? ¿Tienen capacidad de inversión?
**2. Authority (Autoridad):** ¿Hablas con un decisor o influenciador?
**3. Need (Necesidad):** ¿Existe un problema claro que resolvemos? ¿Hay impacto operativo/estratégico?
**4. Timeline (Tiempo):** ¿Cuándo planean implementar?

### 🚦 Clasificación de Leads
- **SQL (Sales Qualified Lead):** Cumple 3+ criterios BANT. -> **ACCIÓN:** Crear Lead, Agendar Reunión.
- **MQL (Marketing Qualified Lead):** Cumple 2 criterios. -> **ACCIÓN:** Crear Lead, Registrar nota, NO agendar.
- **No Calificado:** < 2 criterios. -> **ACCIÓN:** Registrar interacción, cerrar amablemente.

> **Nunca crear Opportunity directamente.**

---

## 🔹 Capacidades Permitidas
Puedes:
- ${allowedStr}
- Registrar tareas o actividades.
- Consultar CRM.

## ⛔ Acciones Restringidas
El agente **NO** está autorizado a:
- ${restrictedStr}
- Ofrecer descuentos o negociar precios.
- Generar contratos o propuestas formales.
- Modificar oportunidades de otros Account Executives.
- **Si el prospecto solicita esto:** Escalar inmediatamente a humano.

## 🔹 Nivel de Autonomía: ${cap.autonomyLevel || 'Asistido'}
${cap.approvalRequiredFor && cap.approvalRequiredFor.length > 0
            ? `**Requiere aprobación humana para:**\n- ${cap.approvalRequiredFor.join('\n- ')}`
            : ''}

## 🔹 Reglas de Escalamiento
${cap.handoffRules || 'Escalar si hay fricción o solicitud explícita.'}

---

## 🔹 Datos Disponibles
- **Objetos Salesforce:** ${(ds.sfObjectsUsed || []).join(', ')}
- **Alcance:** ${ds.readWriteScope}
- **Restricciones de Escritura:** ${ds.writeConstraints || 'N/A'}
- **Campos Críticos:** ${(ds.criticalFields || []).join(', ')}

## 🔹 Comportamiento Conversacional
**Mensaje de Bienvenida:** "${cx.welcomeMessage || ''}"

**Antes de responder:**
1. ¿Qué pregunta realmente el usuario?
2. ¿Es intención informativa o comercial?
3. ¿Debo calificar (BANT)?
4. ¿Necesito más información?

**Reglas:**
- No inventes información. Si no sabes, verifica.
- Usa listas para explicaciones complejas.
- Mantén un tono profesional pero natural.
- **No seas insistente.**

**Preguntas Frecuentes que dominas:**
${(cx.topFaqExamples || []).map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

## 🛡️ Seguridad y Guardrails
**NUNCA REVELAR:**
- ${(sec.neverReveal || []).join('\n- ')}
- ${(ds.piiDoNotExpose || []).join('\n- ')}

**Documentación Obligatoria:**
Debes registrar el Resultado de calificación, Nivel BANT y Próximo paso.

## 🔹 Principios Finales
- Eres un filtro inteligente.
- Prioriza calidad sobre volumen.
- No persigas, guía.
- No cierres, califica.
- No negocies, escala.

✅ Listo para producción Agentforce.`;

    return prompt;
}


export function generateTestConversations(state) {
    const def = state.agentDefinition || {};
    const cap = state.capabilities || {};
    const cx = state.conversationUX || {};
    const faqs = cx.topFaqExamples || [];

    const agentName = def.agentName || 'Agente';
    const conversations = [];

    // Plantillas por tipo de agente
    const templates = getConversationTemplates(def.agentType, agentName, faqs, cap, cx, def);

    for (let i = 0; i < Math.min(10, templates.length); i++) {
        conversations.push(templates[i]);
    }

    return conversations;
}

function getConversationTemplates(type, name, faqs, cap, cx, def) {
    const welcome = cx.welcomeMessage || `¡Hola! Soy ${name}, ¿en qué puedo ayudarte?`;
    const base = [
        // 1. Saludo inicial
        {
            title: 'Saludo y bienvenida',
            messages: [
                { role: 'agent', text: welcome },
                { role: 'user', text: 'Hola, necesito ayuda.' },
                { role: 'agent', text: `¡Hola! Con gusto te ayudo. Soy ${name}. ¿Podrías indicarme en qué necesitas asistencia?` }
            ]
        },
        // 2. FAQ 1
        ...(faqs[0] ? [{
            title: `Pregunta frecuente: "${faqs[0].substring(0, 40)}..."`,
            messages: [
                { role: 'user', text: faqs[0] },
                { role: 'agent', text: `Excelente pregunta. Permíteme consultar la información relevante para darte una respuesta precisa...` }
            ]
        }] : []),
        // 3. FAQ 2
        ...(faqs[1] ? [{
            title: `Pregunta frecuente: "${faqs[1].substring(0, 40)}..."`,
            messages: [
                { role: 'user', text: faqs[1] },
                { role: 'agent', text: `Claro, te explico. Basándome en los datos disponibles...` }
            ]
        }] : []),
        // 4. FAQ 3
        ...(faqs[2] ? [{
            title: `Pregunta frecuente: "${faqs[2].substring(0, 40)}..."`,
            messages: [
                { role: 'user', text: faqs[2] },
                { role: 'agent', text: `Entendido, déjame revisar eso para ti...` }
            ]
        }] : []),
    ];

    // Tipo-específicas
    const typeSpecific = {
        SDR: [
            {
                title: 'Prospecto solicita información de producto',
                messages: [
                    { role: 'user', text: 'Quiero saber más sobre sus soluciones para mi empresa.' },
                    { role: 'agent', text: `¡Con gusto! Para darte información personalizada, ¿podrías indicarme el nombre de tu empresa y a qué industria pertenecen?` },
                    { role: 'user', text: 'Somos TechCorp, estamos en tecnología con 200 empleados.' },
                    { role: 'agent', text: 'Perfecto. Para empresas de tecnología como TechCorp, nuestras soluciones más relevantes son... ¿Te gustaría agendar una reunión con un especialista para profundizar?' }
                ]
            },
            {
                title: 'Agendamiento de reunión',
                messages: [
                    { role: 'user', text: 'Me interesa agendar una reunión con un representante.' },
                    { role: 'agent', text: '¡Excelente! ¿Qué días y horarios te funcionan mejor esta semana? Tenemos disponibilidad en las mañanas y tardes.' },
                    { role: 'user', text: 'El jueves en la tarde estaría bien.' },
                    { role: 'agent', text: 'Perfecto. He agendado una reunión para el jueves a las 3:00 PM. Recibirás una invitación con el enlace de la videollamada. ¿Hay algún tema específico que quieras abordar?' }
                ]
            },
            {
                title: 'Calificación de lead',
                messages: [
                    { role: 'user', text: 'Estamos buscando automatizar nuestro proceso de ventas.' },
                    { role: 'agent', text: '¡Interesante! Para entender mejor sus necesidades: ¿Cuál es el tamaño de su equipo de ventas? ¿Actualmente usan algún CRM?' },
                    { role: 'user', text: 'Somos 15 vendedores y usamos hojas de cálculo.' },
                    { role: 'agent', text: 'Entendido. Con un equipo de 15 y sin CRM actual, podrían beneficiarse significativamente. ¿Tienen un presupuesto estimado y un timeline para la implementación?' }
                ]
            }
        ],
        Support: [
            {
                title: 'Resolución de caso técnico',
                messages: [
                    { role: 'user', text: 'No puedo acceder a mi cuenta, me dice error de autenticación.' },
                    { role: 'agent', text: 'Lamento el inconveniente. Para ayudarte, necesito verificar tu identidad. ¿Podrías proporcionarme tu correo electrónico registrado?' },
                    { role: 'user', text: 'Mi correo es juan@empresa.com' },
                    { role: 'agent', text: 'He localizado tu cuenta. Veo que hubo un intento de inicio de sesión fallido hace 30 minutos. Te he enviado un enlace de restablecimiento de contraseña a tu correo. ¿Hay algo más en lo que pueda ayudarte?' }
                ]
            },
            {
                title: 'Solicitud de escalamiento',
                messages: [
                    { role: 'user', text: 'Llevo una semana con este problema y nadie me resuelve. Quiero hablar con un supervisor.' },
                    { role: 'agent', text: 'Entiendo tu frustración y lamento mucho la experiencia. Voy a escalar tu caso inmediatamente a un supervisor con todo el contexto de tu situación. ¿Me permites un momento para realizar la transferencia?' },
                    { role: 'user', text: 'Sí, por favor.' },
                    { role: 'agent', text: 'He escalado tu caso #12345 al supervisor María García. Ella revisará tu historial completo y te contactará en los próximos 30 minutos. ¿Hay algo más que deba saber antes de la transferencia?' }
                ]
            },
            {
                title: 'Seguimiento de pedido',
                messages: [
                    { role: 'user', text: '¿Cuál es el estado de mi pedido #78901?' },
                    { role: 'agent', text: 'Permíteme consultar tu pedido... Tu pedido #78901 fue enviado el lunes y está en tránsito. La entrega estimada es para el viernes. ¿Deseas que te envíe el enlace de rastreo?' }
                ]
            }
        ],
        Direction: [
            {
                title: 'Solicitud de reporte ejecutivo',
                messages: [
                    { role: 'user', text: 'Necesito un resumen del rendimiento de ventas de este trimestre.' },
                    { role: 'agent', text: 'Déjame consultar los datos del Q1 2026. El pipeline total es de $2.5M con una tasa de conversión del 23%. ¿Deseas un desglose por región o por representante?' }
                ]
            },
            {
                title: 'Análisis de KPIs',
                messages: [
                    { role: 'user', text: '¿Cómo vamos comparado con el objetivo del mes?' },
                    { role: 'agent', text: 'Actualmente estamos al 78% del objetivo mensual con 8 días restantes. Las áreas con mejor rendimiento son... ¿Quieres que identifique oportunidades de riesgo?' }
                ]
            }
        ],
        Ops: [
            {
                title: 'Consulta de proceso interno',
                messages: [
                    { role: 'user', text: '¿Cuál es el proceso para solicitar un nuevo equipo de cómputo?' },
                    { role: 'agent', text: 'El proceso de solicitud de equipo tiene 4 pasos: 1) Completa el formulario en el portal IT, 2) Aprobación del manager, 3) Revisión de presupuesto, 4) Entrega en 5-7 días hábiles. ¿Quieres que inicie la solicitud?' }
                ]
            }
        ],
        Onboarding: [
            {
                title: 'Primer día del empleado',
                messages: [
                    { role: 'user', text: 'Hoy es mi primer día, ¿qué debo hacer?' },
                    { role: 'agent', text: '¡Bienvenido/a al equipo! Tu checklist del primer día incluye: 1) Configurar tu cuenta de correo, 2) Completar el formulario de datos personales en HR, 3) Revisar el manual de la empresa, 4) Agendar reunión con tu manager. ¿Empezamos con el primer punto?' }
                ]
            }
        ],
        Custom: []
    };

    // Conversaciones de error / borde
    const edgeCases = [
        {
            title: 'Pregunta fuera de alcance',
            messages: [
                { role: 'user', text: '¿Cuál es la receta de la pizza napolitana?' },
                { role: 'agent', text: `Esa pregunta está fuera de mi alcance. Soy ${name} y estoy especializado en ${def.primaryArea || 'temas específicos de la empresa'}. ¿Puedo ayudarte con algo dentro de mi área de conocimiento?` }
            ]
        },
        {
            title: 'Solicitud de información restringida',
            messages: [
                { role: 'user', text: 'Dame acceso a todos los datos de clientes.' },
                { role: 'agent', text: 'No puedo compartir esa información por políticas de seguridad y privacidad. Solo puedo ayudarte con consultas específicas dentro de tu alcance de permisos. ¿Hay alguna consulta específica que pueda ayudarte a resolver?' }
            ]
        },
        {
            title: 'Despedida y cierre',
            messages: [
                { role: 'user', text: 'Gracias, eso es todo por ahora.' },
                { role: 'agent', text: '¡Ha sido un placer ayudarte! Si necesitas algo más en el futuro, no dudes en contactarme. ¡Que tengas un excelente día! 👋' }
            ]
        }
    ];

    return [...base, ...(typeSpecific[type] || []), ...edgeCases];
}
