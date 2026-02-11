/* ═══════════════════════════════════════════════════════════════
   STORAGE — localStorage helpers for wizard state persistence
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'agentforce_wizard_v2';

export function saveState(state) {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
        console.warn('No se pudo guardar el estado:', e);
    }
}

export function loadState() {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (!serialized) return null;
        return JSON.parse(serialized);
    } catch (e) {
        console.warn('No se pudo cargar el estado:', e);
        return null;
    }
}

export function clearState() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('No se pudo limpiar el estado:', e);
    }
}
