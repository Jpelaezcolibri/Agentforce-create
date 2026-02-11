/* ═══════════════════════════════════════════════════════════════
   CHECKLIST ENGINE — Dynamic prerequisite & recommendation engine
   Based on Guia_Profesional_Agentforce.docx checklist
   ═══════════════════════════════════════════════════════════════ */

export function generateChecklist(state) {
    const items = [];
    const prereqs = state.prereqs || {};
    const def = state.agentDefinition || {};
    const cap = state.capabilities || {};
    const ds = state.dataSources || {};
    const sec = state.security || {};

    // ── Pre-Deployment (from guide) ──
    items.push({
        category: 'Pre-Deployment',
        text: 'Einstein habilitado en la org',
        status: prereqs.einsteinStatus === 'Yes' ? 'done' : prereqs.einsteinStatus === 'No' ? 'blocked' : 'pending',
        detail: prereqs.einsteinStatus === 'Yes'
            ? 'Einstein está activo.'
            : 'Ve a Setup → Einstein → Habilitar Einstein. Requiere licencia Einstein.'
    });

    items.push({
        category: 'Pre-Deployment',
        text: 'Agentforce activado',
        status: prereqs.agentforceStatus === 'Yes' ? 'done' : prereqs.agentforceStatus === 'No' ? 'blocked' : 'pending',
        detail: prereqs.agentforceStatus === 'Yes'
            ? 'Agentforce está activo.'
            : 'Ve a Setup → Agentforce → Activar. Contacta a tu Account Executive de Salesforce si no tienes la licencia.'
    });

    items.push({
        category: 'Pre-Deployment',
        text: 'Usuario agente con licencia Einstein Agent User',
        status: 'pending',
        detail: 'Crea un usuario dedicado con el perfil "Einstein Agent User" y asigna el permission set correspondiente.'
    });

    items.push({
        category: 'Pre-Deployment',
        text: 'Permission set asignado al agente',
        status: 'pending',
        detail: def.agentType === 'SDR'
            ? 'Asigna el "Agentforce SDR Agent permission set" al usuario del agente.'
            : 'Asigna el permission set correspondiente al tipo de agente.'
    });

    // Data Cloud
    items.push({
        category: 'Pre-Deployment',
        text: 'Data Cloud configurado (recomendado)',
        status: 'pending',
        detail: 'Data Cloud es recomendado para RAG y analytics. Configura en Setup → Data Cloud.'
    });

    // Knowledge Base si aplica
    if (ds.knowledgeSources && ds.knowledgeSources.includes('SalesforceKnowledge')) {
        items.push({
            category: 'Pre-Deployment',
            text: 'Knowledge Base actualizada con artículos relevantes',
            status: 'pending',
            detail: 'Asegúrate de tener artículos de Knowledge estructurados y actualizados para el agente.'
        });
    }

    // Canales
    if (prereqs.channelsPlanned && prereqs.channelsPlanned.length > 0) {
        const channelItems = {
            Web: 'Experience Cloud site creado y configurado',
            WhatsApp: 'Canal de WhatsApp Business configurado en Messaging',
            Email: 'Email-to-Case configurado',
            Slack: 'Integración con Slack habilitada (Agentforce 2.0)',
            Teams: 'Integración con Microsoft Teams configurada',
            Phone: 'Agentforce Voice configurado con parámetros de voz',
        };

        for (const ch of prereqs.channelsPlanned) {
            if (channelItems[ch]) {
                items.push({
                    category: 'Pre-Deployment',
                    text: channelItems[ch],
                    status: 'pending',
                    detail: `Configuración requerida para el canal: ${ch}.`
                });
            }
        }

        items.push({
            category: 'Pre-Deployment',
            text: 'Messaging channels configurados',
            status: 'pending',
            detail: `Canales planificados: ${prereqs.channelsPlanned.join(', ')}. Verifica la configuración de cada canal en Setup → Messaging.`
        });
    }

    // Permisos si no es Admin
    if (prereqs.userRole && prereqs.userRole !== 'Admin') {
        items.push({
            category: 'Pre-Deployment',
            text: '⚠️ Solicitar acceso Admin o permisos necesarios',
            status: 'blocked',
            detail: `Tu rol actual es "${prereqs.userRole}". Para configurar Agentforce necesitas permisos de administrador o que un Admin configure los componentes.`
        });
    }

    // ── Configuración del Agente ──
    items.push({
        category: 'Configuración',
        text: 'Topics definidos (máximo 5 recomendados)',
        status: 'pending',
        detail: 'Define topics mutuamente exclusivos con instrucciones específicas. Evita overlap de responsabilidades.'
    });

    items.push({
        category: 'Configuración',
        text: 'Instructions detalladas por topic',
        status: 'pending',
        detail: 'Cada topic debe tener 6-8 instrucciones paso a paso, específicas y accionables.'
    });

    items.push({
        category: 'Configuración',
        text: 'Actions asignadas y testeadas',
        status: 'pending',
        detail: 'Asigna Flows, Apex, Prompt Templates o APIs a cada topic. Cada action debe hacer UNA cosa bien.'
    });

    items.push({
        category: 'Configuración',
        text: 'Example utterances agregados a cada topic',
        status: 'pending',
        detail: 'Agrega frases de ejemplo que ayuden al agente a identificar cuándo usar cada topic.'
    });

    // Flows/Actions por tipo
    if (cap.allowedActions) {
        if (cap.allowedActions.includes('CrearRegistros') || cap.allowedActions.includes('ActualizarRegistros')) {
            items.push({
                category: 'Configuración',
                text: 'Flows de creación/actualización de registros creados',
                status: 'pending',
                detail: 'Crea Flows declarativos para las acciones de escritura. Principio: Single Responsibility, Error Handling, Idempotencia.'
            });
        }
        if (cap.allowedActions.includes('Agendar')) {
            items.push({
                category: 'Configuración',
                text: 'Integración de calendario (Outlook/Google Calendar)',
                status: 'pending',
                detail: 'Configura Einstein Activity Capture y la integración con el calendario para el agendamiento.'
            });
        }
        if (cap.allowedActions.includes('Escalar')) {
            items.push({
                category: 'Configuración',
                text: 'Reglas de escalamiento configuradas',
                status: 'pending',
                detail: `Reglas definidas: ${cap.handoffRules || 'Verificar paso 3 del wizard.'}`
            });
        }
    }

    items.push({
        category: 'Configuración',
        text: 'Guardrails configurados',
        status: 'pending',
        detail: 'Configura Einstein Trust Layer, Data Masking para campos sensibles, y límites operacionales en los topics.'
    });

    // Data Library
    if (ds.knowledgeSources && ds.knowledgeSources.includes('Files')) {
        items.push({
            category: 'Configuración',
            text: 'Data Library cargada con documentación',
            status: 'pending',
            detail: 'Sube archivos relevantes a la Data Library del agente.'
        });
    }

    // ── Testing ──
    items.push({
        category: 'Testing',
        text: 'Unit tests por cada topic',
        status: 'pending',
        detail: 'Usa el Agent Builder test panel para probar cada topic individualmente.'
    });

    items.push({
        category: 'Testing',
        text: 'Integration tests multi-topic',
        status: 'pending',
        detail: 'Prueba escenarios que involucren múltiples topics y handoffs entre ellos.'
    });

    items.push({
        category: 'Testing',
        text: 'Edge case testing',
        status: 'pending',
        detail: 'Prueba inputs ambiguos, preguntas fuera de alcance y solicitudes adversariales.'
    });

    items.push({
        category: 'Testing',
        text: 'Adversarial prompt testing',
        status: 'pending',
        detail: 'Intenta "jailbreak" prompts para verificar que los guardrails funcionan correctamente.'
    });

    items.push({
        category: 'Testing',
        text: 'Load testing (50+ conversaciones simultáneas)',
        status: 'pending',
        detail: 'Usa batch testing API para verificar rendimiento bajo carga.'
    });

    items.push({
        category: 'Testing',
        text: 'User acceptance testing (UAT)',
        status: 'pending',
        detail: 'Ejecuta las conversaciones de prueba generadas con usuarios reales.'
    });

    // ── Post-Deployment ──
    items.push({
        category: 'Post-Deployment',
        text: 'Agent Analytics dashboard configurado',
        status: 'pending',
        detail: 'Configura métricas: tasa resolución (>70%), accuracy (>90%), response time (<10s), escalation rate (<20%).'
    });

    items.push({
        category: 'Post-Deployment',
        text: `Event logging activado (nivel: ${sec.loggingLevel || 'Estándar'})`,
        status: 'pending',
        detail: 'Activa el nivel de logging seleccionado para auditoría y monitoreo.'
    });

    items.push({
        category: 'Post-Deployment',
        text: 'Alertas para métricas críticas',
        status: 'pending',
        detail: 'Configura alertas automáticas cuando las métricas caigan por debajo de los umbrales definidos.'
    });

    items.push({
        category: 'Post-Deployment',
        text: 'Feedback mechanism para usuarios',
        status: 'pending',
        detail: 'Implementa botón "Report Issue" y encuestas CSAT post-conversación.'
    });

    items.push({
        category: 'Post-Deployment',
        text: 'Plan de optimización continua',
        status: 'pending',
        detail: 'Ciclo semanal: Lunes análisis, Martes thumbs down, Miércoles ajustes, Jueves testing sandbox, Viernes deploy.'
    });

    items.push({
        category: 'Post-Deployment',
        text: 'Documentación de governance',
        status: 'pending',
        detail: 'Documenta qué datos accede, por qué, y las políticas organizacionales del agente.'
    });

    return items;
}


export function getReadinessStatus(checklist) {
    const blockers = checklist.filter(i => i.status === 'blocked');
    return {
        status: blockers.length > 0 ? 'blocked' : 'ready',
        blockers
    };
}


export function generateImplementationSteps(state) {
    const def = state.agentDefinition || {};
    const prereqs = state.prereqs || {};
    const ds = state.dataSources || {};
    const cap = state.capabilities || {};

    const steps = [
        `Accede a Setup en tu org de Salesforce (${prereqs.orgType || 'tipo no definido'}).`,
        `Verifica que Einstein esté habilitado: Setup → Einstein → Einstein Platform.`,
        `Activa Agentforce: Setup → Agentforce → Activar Agentes de IA.`,
        `Crea un usuario dedicado para el agente con el perfil "Einstein Agent User" y asigna la licencia correspondiente.`,
        `Asigna los Permission Sets necesarios${def.agentType === 'SDR' ? ' (incluye "Agentforce SDR Agent permission set")' : ''}.`,
        `Ve a Agent Builder (Setup → Agent Builder) y crea un nuevo agente llamado "${def.agentName || 'Mi Agente'}".`,
        `Configura los Topics del agente. Recuerda: máximo 5 topics mutuamente exclusivos. Usa las instrucciones generadas en el prompt del sistema.`,
        `Crea y asigna las Actions necesarias (Flows, Apex, Prompt Templates) a cada topic.`,
        `Configura los objetos de Salesforce que usará el agente: ${(ds.sfObjectsUsed || []).join(', ')}.`,
        `Establece Field-Level Security: oculta campos sensibles y configura Sharing Rules apropiadas.`,
    ];

    if (ds.knowledgeSources && ds.knowledgeSources.includes('SalesforceKnowledge')) {
        steps.push(`Configura Salesforce Knowledge: verifica que los artículos estén estructurados y actualizados.`);
    }

    if (ds.knowledgeSources && ds.knowledgeSources.includes('Files')) {
        steps.push(`Carga los documentos relevantes en la Data Library del agente.`);
    }

    steps.push(
        `Configura el Einstein Trust Layer: Setup → Einstein Trust Layer → Marca campos sensibles para Data Masking automático.`,
        `Agrega Example Utterances a cada topic para mejorar la detección de intención.`,
        `Realiza testing unitario en el Agent Builder test panel.`,
        `Ejecuta pruebas de integración y edge cases en sandbox.`,
        `Configura los canales de despliegue: ${(prereqs.channelsPlanned || []).join(', ')}.`,
        `Activa el agente en producción y monitorea las primeras 2 horas.`,
        `Configura Agent Analytics dashboard con métricas clave.`,
        `Establece el plan de optimización continua semanal.`
    );

    return steps;
}


export function generateRisksAndRecommendations(state) {
    const risks = [];
    const prereqs = state.prereqs || {};
    const cap = state.capabilities || {};
    const ds = state.dataSources || {};
    const sec = state.security || {};

    if (prereqs.orgType === 'Production') {
        risks.push({
            type: 'warning',
            text: 'Implementación directa en Producción: se recomienda probar primero en Sandbox antes de desplegar a producción.'
        });
    }

    if (prereqs.einsteinStatus !== 'Yes') {
        risks.push({
            type: 'error',
            text: 'Einstein no confirmado como activo. Es un prerequisito obligatorio para Agentforce.'
        });
    }

    if (prereqs.agentforceStatus !== 'Yes') {
        risks.push({
            type: 'error',
            text: 'Agentforce no confirmado como activo. Contacta a tu Account Executive de Salesforce.'
        });
    }

    if (prereqs.userRole !== 'Admin') {
        risks.push({
            type: 'warning',
            text: `Tu rol (${prereqs.userRole}) puede no tener los permisos necesarios. Coordina con un Administrador.`
        });
    }

    if (cap.autonomyLevel === 'AutonomousWithApproval' || cap.autonomyLevel === 'SemiAutonomous') {
        risks.push({
            type: 'info',
            text: 'Nivel de autonomía elevado: asegúrate de tener Human-in-the-Loop para decisiones críticas.'
        });
    }

    if (ds.readWriteScope === 'ReadWrite') {
        risks.push({
            type: 'warning',
            text: 'El agente tiene permisos de escritura. Implementa validaciones estrictas y pruebas de idempotencia.'
        });
    }

    if (ds.piiHandling !== 'NoPII') {
        risks.push({
            type: 'error',
            text: 'El agente maneja PII. Verifica cumplimiento regulatorio y configura Data Masking en Einstein Trust Layer.'
        });
    }

    if (sec.loggingLevel === 'Minimal') {
        risks.push({
            type: 'warning',
            text: 'Nivel de logging mínimo: se recomienda al menos "Estándar" para auditoría adecuada.'
        });
    }

    // Recomendaciones generales
    risks.push({
        type: 'info',
        text: 'Comienza con un pilot limitado: 1 use case bien definido antes de expandir.'
    });

    risks.push({
        type: 'info',
        text: 'Establece KPIs desde el día 1: tasa de resolución, accuracy, response time, CSAT.'
    });

    risks.push({
        type: 'info',
        text: 'Rotación de credenciales: actualiza API keys trimestralmente.'
    });

    return risks;
}
