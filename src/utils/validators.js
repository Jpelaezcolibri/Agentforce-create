/* ═══════════════════════════════════════════════════════════════
   VALIDATORS — Per-step validation functions
   ═══════════════════════════════════════════════════════════════ */

export function validateStep1(data) {
    const errors = [];
    const d = data.prereqs || {};

    if (!d.orgType) errors.push({ field: 'orgType', msg: 'Selecciona el tipo de organización.' });
    if (!d.einsteinStatus) errors.push({ field: 'einsteinStatus', msg: 'Indica el estado de Einstein.' });
    if (!d.agentforceStatus) errors.push({ field: 'agentforceStatus', msg: 'Indica el estado de Agentforce.' });
    if (!d.userRole) errors.push({ field: 'userRole', msg: 'Selecciona tu rol.' });
    if (!d.channelsPlanned || d.channelsPlanned.length === 0) errors.push({ field: 'channelsPlanned', msg: 'Selecciona al menos un canal.' });

    return errors;
}

export function validateStep2(data) {
    const errors = [];
    const d = data.agentDefinition || {};

    if (!d.agentName || d.agentName.trim().length < 2) errors.push({ field: 'agentName', msg: 'El nombre del agente debe tener al menos 2 caracteres.' });
    if (d.agentName && d.agentName.length > 60) errors.push({ field: 'agentName', msg: 'El nombre no debe exceder 60 caracteres.' });
    if (!d.agentType) errors.push({ field: 'agentType', msg: 'Selecciona el tipo de agente.' });
    if (!d.primaryArea) errors.push({ field: 'primaryArea', msg: 'Selecciona el área principal.' });
    if (!d.language || d.language.trim().length < 2) errors.push({ field: 'language', msg: 'Indica el idioma del agente.' });
    if (!d.tone) errors.push({ field: 'tone', msg: 'Selecciona el tono del agente.' });
    if (!d.oneLineGoal || d.oneLineGoal.trim().length < 10) errors.push({ field: 'oneLineGoal', msg: 'El objetivo debe tener al menos 10 caracteres.' });
    if (d.oneLineGoal && d.oneLineGoal.length > 200) errors.push({ field: 'oneLineGoal', msg: 'El objetivo no debe exceder 200 caracteres.' });

    return errors;
}

export function validateStep3(data) {
    const errors = [];
    const d = data.capabilities || {};

    if (!d.allowedActions || d.allowedActions.length === 0) errors.push({ field: 'allowedActions', msg: 'Selecciona al menos una acción permitida.' });
    if (!d.autonomyLevel) errors.push({ field: 'autonomyLevel', msg: 'Selecciona el nivel de autonomía.' });
    if (!d.handoffRules || d.handoffRules.trim().length < 10) errors.push({ field: 'handoffRules', msg: 'Las reglas de escalamiento deben tener al menos 10 caracteres.' });

    // Si no es Asistido, requiere acciones con aprobación
    if (d.autonomyLevel && d.autonomyLevel !== 'Assisted') {
        if (!d.approvalRequiredFor || d.approvalRequiredFor.length === 0) {
            errors.push({ field: 'approvalRequiredFor', msg: 'Si el nivel no es "Asistido", indica qué acciones requieren aprobación.' });
        }
    }

    return errors;
}

export function validateStep4(data) {
    const errors = [];
    const d = data.dataSources || {};

    if (!d.sfObjectsUsed || d.sfObjectsUsed.length === 0) errors.push({ field: 'sfObjectsUsed', msg: 'Selecciona al menos un objeto de Salesforce.' });
    if (!d.readWriteScope) errors.push({ field: 'readWriteScope', msg: 'Indica el alcance de lectura/escritura.' });
    if (!d.criticalFields || d.criticalFields.length === 0) errors.push({ field: 'criticalFields', msg: 'Indica al menos un campo crítico.' });
    if (!d.knowledgeSources || d.knowledgeSources.length === 0) errors.push({ field: 'knowledgeSources', msg: 'Selecciona al menos una fuente de conocimiento.' });
    if (!d.piiHandling) errors.push({ field: 'piiHandling', msg: 'Indica el manejo de PII.' });

    // Si hay escritura, solicitar restricciones
    if (d.readWriteScope === 'ReadWrite' && (!d.writeConstraints || d.writeConstraints.trim().length === 0)) {
        errors.push({ field: 'writeConstraints', msg: 'Si hay escritura, describe las restricciones.' });
    }

    // Si hay PII, solicitar lista
    if (d.piiHandling && d.piiHandling !== 'NoPII') {
        if (!d.piiDoNotExpose || d.piiDoNotExpose.length === 0) {
            errors.push({ field: 'piiDoNotExpose', msg: 'Indica qué datos PII nunca debe exponer.' });
        }
    }

    return errors;
}

export function validateStep5(data) {
    const errors = [];
    const d = data.conversationUX || {};

    if (!d.welcomeMessage || d.welcomeMessage.trim().length < 2) errors.push({ field: 'welcomeMessage', msg: 'El mensaje de bienvenida es corto.' });
    if (!d.topFaqExamples || d.topFaqExamples.filter(f => f.trim().length >= 3).length < 1) errors.push({ field: 'topFaqExamples', msg: 'Agrega al menos 1 pregunta frecuente (mín. 3 caracteres).' });
    if (!d.fallbackBehavior) errors.push({ field: 'fallbackBehavior', msg: 'Selecciona el comportamiento.' });

    return errors;
}

export function validateStep6(data) {
    const errors = [];
    const d = data.security || {};

    if (!d.neverReveal || d.neverReveal.length === 0) errors.push({ field: 'neverReveal', msg: 'Indica al menos un tipo de información que nunca debe revelar.' });
    if (!d.loggingLevel) errors.push({ field: 'loggingLevel', msg: 'Selecciona el nivel de logging.' });

    return errors;
}

export const validators = [
    validateStep1,
    validateStep2,
    validateStep3,
    validateStep4,
    validateStep5,
    validateStep6,
    () => [] // Step 7 is summary, no validation
];
