// Antigravity Upload Pack — HelpAgent Content v2.0 (ES)
// Compatible con HelpAgent-jgCDSr8d.js: usa company, steps, knowledge.
// Incluye scenarioEngine para futuras mejoras (opcional).

export const helpContent = {
  "meta": {
    "version": "2.0",
    "language": "es",
    "intendedUse": "Antigravity upload - HelpAgent knowledge base",
    "lastUpdated": "2026-02-11",
    "matching": "keywords_contains_any",
    "notes": "Estructura compatible con HelpAgent-jgCDSr8d.js: company, steps, knowledge. Incluye seccion scenarioEngine para futuras mejoras."
  },
  "company": {
    "name": "Colibrí IT",
    "expertise": "Consultoría Salesforce, MuleSoft y Field Service Management.",
    "positioning": "Arquitectos de Service Cloud + Field Service + Agentforce. Implementación segura, medible y lista para producción.",
    "products": [
      "Agente SDR (Calificación 24/7)",
      "Agente de Servicio (Autoservicio + creación de casos)",
      "Agente Ops (Procesos internos + automatización controlada)",
      "Copilot de Admin (Diseño guiado de agentes Agentforce)"
    ],
    "successStories": [
      "Caso de éxito: Aguas Andinas (Chile) - Modernización con Salesforce Field Service."
    ]
  },
  "steps": {
    "0": {
      "title": "Preparación (Prerequisitos)",
      "tips": [
        "Trabaja primero en Sandbox y solo promueve a Producción cuando tengas UAT + set de pruebas aprobado.",
        "Confirma licencias y permisos: Einstein/Agentforce + acceso a Setup para el rol creador.",
        "Define el canal inicial (recomendado: Web) antes de diseñar prompts: cambia completamente la UX y los riesgos.",
        "Si hay PII (emails, teléfonos, IDs), define redacción/masking desde el inicio; no lo dejes para el final.",
        "Define quién aprueba cambios del agente (Security/Admin Owner) y cómo se audita (Agent Analytics).",
        "Alinea el 'qué NO hace' del agente: evita scope creep y reduce jailbreaks.",
        "Define desde ya el criterio de escalamiento (handoff) y el SLA humano: un agente sin SLA se vuelve un cuello de botella.",
        "Si vas a escribir/actualizar registros, exige confirmación y restricciones por objeto/campo."
      ],
      "faqs": [
        {
          "q": "¿Qué debo validar antes de crear un agente?",
          "a": "Licencias, permisos (Admin/Configurator), entorno (Sandbox/Prod), canales, fuentes de conocimiento, manejo de PII, y reglas de escalamiento."
        },
        {
          "q": "¿Por qué empezar en Sandbox?",
          "a": "Porque puedes fallar barato: pruebas, logging alto, y UAT sin riesgo sobre datos reales. Luego promueves con checklist."
        },
        {
          "q": "¿Qué pasa si no tengo Knowledge/Data Cloud?",
          "a": "Aumenta el riesgo de alucinación. Para soporte/dirección, mínimo una fuente controlada (Knowledge/Files) es altamente recomendable."
        },
        {
          "q": "¿Cómo decido el canal inicial?",
          "a": "Elige el canal con menor riesgo y mayor control. Web suele ser el mejor para v1. WhatsApp/Teams/Slack requieren mayor governance."
        },
        {
          "q": "¿Quién debería usar este wizard?",
          "a": "Admins/Configuradores con sponsor de seguridad. Usuarios de negocio pueden participar, pero el handoff a Admin es obligatorio para build."
        }
      ]
    },
    "1": {
      "title": "Identidad del Agente",
      "tips": [
        "Define un solo trabajo principal (One Line Goal). Si necesitas 2, crea 2 agentes o 2 rutas claras por topic.",
        "El nombre del agente debe incluir área + función (ej: 'Soporte Billing LATAM').",
        "Define tono y límites: formal/cercano/técnico. Luego aplica la misma consistencia en prompts y ejemplos.",
        "Para SDR: enfócate en calificación + agendamiento (no negociar precio).",
        "Para Soporte: delimita a nivel 1–2; lo complejo escala.",
        "Incluye siempre: 'Si no hay datos, no inventes' y 'pide aclaración máximo 2 veces y luego escala'."
      ],
      "faqs": [
        {
          "q": "¿Copilot vs Agente?",
          "a": "Copilot asiste a un humano. Un Agente actúa con autonomía (según guardrails) y puede ejecutar acciones."
        },
        {
          "q": "¿Cómo evito que el agente haga de todo?",
          "a": "Define 3–5 topics máximos, escribe 'NO hace' explícito, y usa reglas de handoff."
        },
        {
          "q": "¿Qué es One Line Goal?",
          "a": "Una frase medible que define el resultado del agente (ej: 'Resolver 40% de consultas de estado sin crear caso')."
        }
      ]
    },
    "2": {
      "title": "Alcance y Acciones",
      "tips": [
        "Acciones de escritura (crear/actualizar) requieren: confirmación, restricciones por campo, y logging alto.",
        "Autonomía recomendada v1: Assisted. Sube a SemiAutonomous cuando tengas pruebas y guardrails.",
        "Define approvalRequiredFor en cualquier nivel distinto de Assisted.",
        "Handoff no es opcional: crea triggers concretos (cliente pide humano, 2 fallos, PII, VIP, fraude, legal)."
      ],
      "faqs": [
        {
          "q": "¿Qué acciones son seguras para empezar?",
          "a": "Consultar (ReadOnly) + recomendar desde Knowledge + escalar. Escritura se agrega después con restricciones."
        },
        {
          "q": "¿Qué significa autonomy level?",
          "a": "Cuánto puede actuar el agente sin intervención humana. A mayor autonomía, mayor necesidad de pruebas y approvals."
        }
      ]
    },
    "3": {
      "title": "Datos y Conocimiento",
      "tips": [
        "Define objetos Salesforce usados y campos críticos. Si el agente no necesita un campo, no lo expongas.",
        "ReadWrite exige writeConstraints: qué objetos/campos, en qué estados, con qué validaciones.",
        "Knowledge/Files reducen alucinación. URLs solo si son dominios controlados y estables.",
        "PII: lista explícita de 'no revelar' + redacción."
      ],
      "faqs": [
        {
          "q": "¿Qué es grounding/RAG?",
          "a": "Que el agente se base en datos reales (CRM/Knowledge) antes de responder. Reduce alucinación."
        },
        {
          "q": "¿Cómo defino el mínimo privilegio?",
          "a": "Solo objetos/campos necesarios (FLS/Sharing). Evita permisos amplios por comodidad."
        }
      ]
    },
    "4": {
      "title": "Conversación y UX",
      "tips": [
        "El mensaje de bienvenida debe decir: quién es, qué puede hacer, ejemplos, y cómo escalar.",
        "Crea FAQs como 'intenciones' (utterances) con variantes, no solo una pregunta literal.",
        "Fallback recomendado: pedir aclaración 1–2 veces, luego ofrecer opciones o escalar.",
        "Diseña respuestas cortas + pasos siguientes (CTA)."
      ],
      "faqs": [
        {
          "q": "¿Cuántas FAQs debo poner?",
          "a": "Para soporte, 5–10 por topic (con variantes). Para SDR, 3–6 enfocadas a calificación y agendamiento."
        },
        {
          "q": "¿Qué es un buen fallback?",
          "a": "Uno que reduce frustración: pregunta aclaratoria breve, ofrece botones/opciones, y escala si persiste la ambigüedad."
        }
      ]
    },
    "5": {
      "title": "Guardrails y Seguridad",
      "tips": [
        "NuncaReveal debe incluir: credenciales/tokens, datos de otros clientes, PII restringida, políticas internas no públicas.",
        "Logging alto en Sandbox/UAT. En Prod define un nivel que permita auditoría sin exceder políticas internas.",
        "Si hay canal interno (Teams/Slack) refuerza RBAC: el agente debe respetar el usuario autenticado."
      ],
      "faqs": [
        {
          "q": "¿Cómo prevengo fuga de datos?",
          "a": "NeverReveal + mínimo privilegio + enmascaramiento PII + no responder si no hay permisos/dato."
        },
        {
          "q": "¿Qué disparadores obligan escalamiento?",
          "a": "PII, fraude/seguridad, legal, VIP, frustración del usuario, incertidumbre del agente, o acciones sensibles."
        }
      ]
    },
    "6": {
      "title": "Export y Checklist de despliegue",
      "tips": [
        "Exporta: System Prompt + Topics + lista de acciones + set de pruebas + checklist por ambiente/canal.",
        "Incluye un 'Risk Score' y lista de mitigaciones antes de pasar a Prod.",
        "Define ventana de estabilización (30 días) antes de comprometer KPIs."
      ],
      "faqs": [
        {
          "q": "¿Qué debo entregar para pasar a implementación?",
          "a": "Prompt final, topics definidos, acciones conectadas (Flow/Apex/API), guardrails, pruebas UAT, y plan de monitoreo."
        }
      ]
    }
  },
  "scenarioEngine": {
    "riskModel": {
      "inputs": [
        "autonomyLevel",
        "readWriteScope",
        "piiHandling",
        "knowledgeSources",
        "channelsPlanned"
      ],
      "output": "riskScore_0_100",
      "bands": [
        {
          "min": 0,
          "max": 25,
          "label": "Bajo",
          "guidance": "Apto para piloto controlado."
        },
        {
          "min": 26,
          "max": 60,
          "label": "Medio",
          "guidance": "Requiere UAT fuerte y handoff claro."
        },
        {
          "min": 61,
          "max": 100,
          "label": "Alto",
          "guidance": "Exige approvals, restricciones estrictas y monitoreo intensivo."
        }
      ],
      "defaultMitigations": [
        "Assisted para v1",
        "ReadOnly hasta tener set de pruebas",
        "Knowledge/Files antes de canales de alto riesgo",
        "Confirmación antes de acciones sensibles",
        "Handoff en 2 intentos fallidos"
      ]
    },
    "fieldScenarios": [
      {
        "field": "orgType",
        "cases": [
          {
            "value": "Production",
            "recommendation": "No diseñar directamente en Prod. Usar Sandbox + UAT primero.",
            "risks": [
              "Impacto en datos reales",
              "Auditoría y cumplimiento"
            ],
            "checklist": [
              "UAT aprobado",
              "Plan de rollback",
              "Logging/Analytics activo"
            ]
          },
          {
            "value": "Sandbox",
            "recommendation": "Opción recomendada para construcción y pruebas.",
            "risks": [
              "Diferencias con Prod si metadata no sincronizada"
            ],
            "checklist": [
              "Seed data",
              "Usuarios UAT",
              "Scripts de prueba"
            ]
          },
          {
            "value": "Developer",
            "recommendation": "Solo prototipo. No representa Prod en features/licencias.",
            "risks": [
              "Limitaciones de org"
            ],
            "checklist": [
              "Validar compatibilidad con Prod"
            ]
          }
        ]
      }
    ]
  },
  "knowledge": [
    {
      "keywords": [
        "wizard",
        "cómo usar",
        "pasos",
        "guía",
        "acompañamiento"
      ],
      "answer": "### Cómo te acompaño en este wizard\n1) **Valido prerequisitos** (licencias, rol, entorno, canal).\n2) **Defino identidad y objetivo medible** (one-line goal).\n3) **Acoto alcance** a 3–5 topics y reglas de escalamiento.\n4) **Diseño datos y seguridad** (objetos/campos, PII, never-reveal).\n5) **Diseño conversación** (welcome, FAQs, fallback).\n6) **Export**: prompt + topics + pruebas + checklist."
    },
    {
      "keywords": [
        "orgtype",
        "producción",
        "production"
      ],
      "answer": "### orgType = Production\n✅ **Recomendación:** no diseñar en Producción. Construye en Sandbox, ejecuta UAT y promueve.\n⚠️ **Riesgos:** impacto sobre datos reales, auditoría, cambios sin rollback.\n🧩 **Checklist mínimo:** UAT aprobado, plan de rollback, logging/Agent Analytics activo, permisos mínimos."
    },
    {
      "keywords": [
        "orgtype",
        "sandbox"
      ],
      "answer": "### orgType = Sandbox\n✅ **Recomendación:** mejor opción para v1.\n🧩 **Checklist:** seed data realista, usuarios UAT, scripts de prueba (happy path + edge cases), logging alto."
    },
    {
      "keywords": [
        "einsteinstatus",
        "einstein",
        "licencia einstein",
        "einstein agent user"
      ],
      "answer": "### Einstein / Einstein Agent User\n✅ **Necesario:** licencia activa y permisos para el rol que crea/ejecuta.\n🧩 **Si está en 'No/Unknown':** confirma en Setup y con tu AE. Sin esto, el proyecto se bloquea (hard stop)."
    },
    {
      "keywords": [
        "agentforceStatus",
        "agentforce activo",
        "habilitar agentforce"
      ],
      "answer": "### Agentforce Status\n✅ Si está **No/Unknown**, no avances con autonomía o escritura: primero habilita Agentforce y valida features disponibles.\n🧩 **Siguiente paso:** revisión de licenciamiento + configuración base en org."
    },
    {
      "keywords": [
        "userRole",
        "admin",
        "configurator",
        "business user",
        "quién lo usa"
      ],
      "answer": "### Rol del usuario\n- **Admin:** puede construir y gobernar.\n- **Configurator:** puede diseñar, pero requiere sponsor Admin para Setup/seguridad.\n- **Business user:** solo descubrimiento (definición de requerimientos) + handoff a Admin para build."
    },
    {
      "keywords": [
        "channelsPlanned",
        "canal",
        "web",
        "whatsapp",
        "slack",
        "teams",
        "email",
        "phone"
      ],
      "answer": "### Selección de canal (recomendación v1)\n✅ **Web** (menor riesgo, más control).\n⚠️ **WhatsApp/Teams/Slack**: mayor riesgo de fuga interna + compliance.\n⚠️ **Email/Phone**: complejidad operativa y de identidad.\n🧩 **Regla:** si el canal es de alto riesgo, sube guardrails y baja autonomía."
    },
    {
      "keywords": [
        "agenttype",
        "sdr"
      ],
      "answer": "### Agent Type = SDR\n✅ Enfoque: **calificar + agendar**.\n❌ No: negociar precio, prometer descuentos, cerrar venta.\n🧩 Topics sugeridos: Captura interés, Calificación (BANT), Agendamiento, Handoff a AE, FAQs básicas."
    },
    {
      "keywords": [
        "agenttype",
        "support",
        "service",
        "soporte"
      ],
      "answer": "### Agent Type = Support\n✅ Enfoque: **resolver nivel 1–2** + crear/actualizar casos con control.\n🧩 Requiere: Knowledge/Files, verificación para PII, handoff claro.\n⚠️ Riesgo si no hay fuentes: alucinación y respuestas inconsistentes."
    },
    {
      "keywords": [
        "one line goal",
        "objetivo",
        "goal",
        "kpi"
      ],
      "answer": "### One Line Goal (objetivo)\n✅ Debe ser **medible** y de un solo trabajo.\nEjemplos:\n- Soporte: \"Resolver 40% de consultas de estado sin crear caso\".\n- SDR: \"Calificar 30 leads/semana y agendar 10 demos\".\n⚠️ Si mezcla 2 trabajos, divide en 2 agentes o 2 topics con rutas claras."
    },
    {
      "keywords": [
        "allowedActions",
        "acciones",
        "crear registros",
        "actualizar registros",
        "consultar"
      ],
      "answer": "### Acciones permitidas\n✅ V1 segura: **Consultar + Recomendar + Escalar**.\n⚠️ **Crear/Actualizar**: exige confirmación + restricciones por objeto/campo + approvals.\n🧩 Regla práctica: si no puedes escribir las restricciones en 3 líneas, aún no está listo para write."
    },
    {
      "keywords": [
        "autonomyLevel",
        "assisted",
        "semi",
        "autonomous",
        "autonomía"
      ],
      "answer": "### Autonomy Level\n✅ **Assisted (recomendado v1):** el agente sugiere y el humano ejecuta.\n⚠️ **SemiAutonomous:** requiere approvals para acciones sensibles.\n⚠️ **AutonomousWithApproval:** exige set de pruebas + monitoreo intensivo.\n🧩 Si autonomy != Assisted y approvals está vacío → bloquear avance."
    },
    {
      "keywords": [
        "approvalRequiredFor",
        "aprobación",
        "approval"
      ],
      "answer": "### approvalRequiredFor\n✅ Lista concreta de acciones que requieren OK humano.\nSugerencias: crear/actualizar registros críticos, cambios de owner, cierres de caso, modificaciones de monto/fechas, cualquier acción irreversible.\n⚠️ Evita 'todo': no es accionable."
    },
    {
      "keywords": [
        "handoffRules",
        "escalamiento",
        "handoff",
        "pasar a humano"
      ],
      "answer": "### Handoff Rules (escalamiento)\nIncluye al menos:\n1) Usuario pide humano.\n2) 2 intentos sin resolver.\n3) PII / seguridad / fraude / legal.\n4) VIP / cuenta estratégica.\n5) Acción requiere aprobación.\n🧩 Siempre crea un resumen para el humano: contexto + intentos + datos capturados."
    },
    {
      "keywords": [
        "sfObjectsUsed",
        "objetos",
        "lead",
        "account",
        "case",
        "opportunity",
        "custom object"
      ],
      "answer": "### Objetos Salesforce\n✅ Define solo los necesarios.\n⚠️ Si hay **Custom Object**, documenta: nombre API, campos críticos, y permisos (FLS/sharing).\n🧩 Regla: si el agente no necesita ver un campo, no lo expongas."
    },
    {
      "keywords": [
        "readWriteScope",
        "readonly",
        "readwrite"
      ],
      "answer": "### ReadOnly vs ReadWrite\n✅ **ReadOnly**: recomendado inicial.\n⚠️ **ReadWrite**: requiere writeConstraints + confirmación + approvals.\n🧩 Si eliges ReadWrite, define límites: qué campos, en qué estados, con qué validaciones."
    },
    {
      "keywords": [
        "writeConstraints",
        "restricciones",
        "constraints"
      ],
      "answer": "### writeConstraints (obligatorio en ReadWrite)\nPlantilla:\n- Permitir **crear** solo: [Objeto] cuando [condición].\n- Permitir **actualizar** solo campos: [A,B,C].\n- Prohibido: delete, cambios de owner, cambios de monto sin aprobación.\n- Confirmación: \"¿Confirmas que actualice X a Y?\""
    },
    {
      "keywords": [
        "knowledgeSources",
        "knowledge",
        "files",
        "urls",
        "rag"
      ],
      "answer": "### Fuentes de conocimiento\n✅ Para soporte/dirección: **Knowledge o Files** mínimo.\n⚠️ **None** aumenta alucinación.\n⚠️ **URLs**: usa solo dominios aprobados.\n🧩 Regla: si no hay fuente, el agente debe decir \"no tengo esa información\" y escalar."
    },
    {
      "keywords": [
        "piiHandling",
        "pii",
        "privacidad",
        "datos sensibles",
        "redaction"
      ],
      "answer": "### PII Handling\n- **NoPII:** ok.\n- **WithRedaction:** exige lista 'piiDoNotExpose' + masking.\n- **Restricted:** handoff temprano + logs + mínimo privilegio.\n🧩 Nunca expongas credenciales/tokens ni datos de otros clientes."
    },
    {
      "keywords": [
        "welcomeMessage",
        "bienvenida",
        "saludo"
      ],
      "answer": "### Welcome Message (patrón recomendado)\n1) Quién soy.\n2) Qué puedo hacer (3 bullets).\n3) Qué NO hago (1 línea).\n4) Ejemplos rápidos.\n5) Cómo escalar a humano.\n🧩 Manténlo corto y accionable."
    },
    {
      "keywords": [
        "topFaqExamples",
        "faq",
        "utterances"
      ],
      "answer": "### FAQs / Utterances\n✅ Crea 5–10 por topic (soporte) con variantes.\n🧩 Convierte cada FAQ en intención: 3–6 formas de decir lo mismo.\n⚠️ Evita FAQs demasiado generales (\"ayuda\") sin opción de desambiguación."
    },
    {
      "keywords": [
        "fallbackBehavior",
        "fallback",
        "no entiendo"
      ],
      "answer": "### Fallback\n✅ Recomendado: **AskClarifying** (máximo 2 preguntas) → luego **ProvideOptions** o **Escalate**.\n🧩 Ofrece 3 opciones de menú por topic para reducir frustración."
    },
    {
      "keywords": [
        "neverReveal",
        "no revelar",
        "guardrails",
        "seguridad"
      ],
      "answer": "### neverReveal (defaults)\nIncluye:\n- Credenciales/tokens\n- Datos de otros clientes\n- PII restringida (IDs, tarjeta completa)\n- Políticas internas no públicas\n🧩 Si el usuario lo pide: responder que no puedes compartirlo y ofrecer alternativa segura."
    },
    {
      "keywords": [
        "loggingLevel",
        "analytics",
        "auditoría"
      ],
      "answer": "### Logging / Agent Analytics\n✅ Sandbox/UAT: logging alto.\n✅ Producción: logging suficiente para auditoría y mejora.\n🧩 Define revisión semanal en el primer mes (estabilización)."
    },
    {
      "keywords": [
        "export",
        "pack",
        "entregables",
        "build-ready"
      ],
      "answer": "### Export Build-Ready (lo que debe salir)\n- System Prompt final\n- 3–5 Topics con intents/utterances\n- Acciones (Flow/Apex/API) + inputs/outputs\n- Guardrails (neverReveal, PII, approvals)\n- Golden Test Set (happy + edge + jailbreak)\n- Checklist de despliegue por canal"
    },
    {
      "keywords": [
        "risk score",
        "riesgo",
        "score"
      ],
      "answer": "### Risk Score (guía rápida)\n- **Bajo (0–25):** Assisted + ReadOnly + Knowledge.\n- **Medio (26–60):** Semi-autonomous o canales internos → requiere UAT fuerte + handoff.\n- **Alto (61–100):** ReadWrite + PII + WhatsApp/Teams → approvals, restricciones estrictas y monitoreo intensivo."
    }
  ]
};

export const r = helpContent;
export default helpContent;
