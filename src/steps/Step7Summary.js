/* ═══════════════════════════════════════════════════════════════
   PASO 7 — Resumen y Exportación
   ═══════════════════════════════════════════════════════════════ */

import { generateChecklist, getReadinessStatus, generateImplementationSteps, generateRisksAndRecommendations } from '../utils/checklistEngine.js';
import { generateSystemPrompt, generateTestConversations } from '../utils/promptGenerator.js';

const TYPE_LABELS = {
  SDR: 'SDR — Ventas y prospección',
  Direction: 'Dirección / Reporting ejecutivo',
  Support: 'Soporte — Servicio al cliente',
  Ops: 'Operaciones internas',
  Onboarding: 'Onboarding',
  Custom: 'Personalizado'
};

const AUTONOMY_LABELS = {
  Assisted: 'Asistido',
  SemiAutonomous: 'Semi-autónomo',
  AutonomousWithApproval: 'Autónomo con aprobación'
};

const PII_LABELS = {
  NoPII: 'Sin PII',
  ContainsPIIWithRedaction: 'PII con redacción',
  ContainsPIIRestricted: 'PII restringida'
};

const ACTION_LABELS = {
  Consultar: 'Consultar',
  CrearRegistros: 'Crear registros',
  ActualizarRegistros: 'Actualizar registros',
  Recomendar: 'Recomendar',
  Agendar: 'Agendar',
  Escalar: 'Escalar a humano'
};

export const Step7Summary = {
  render(state) {
    // Generate all outputs
    const prompt = generateSystemPrompt(state);
    const conversations = generateTestConversations(state);
    const checklist = generateChecklist(state);
    const readiness = getReadinessStatus(checklist);
    const implSteps = generateImplementationSteps(state);
    const risks = generateRisksAndRecommendations(state);

    // Store generated outputs in state
    state.conversationUX.generatedSystemPrompt = prompt;
    state.conversationUX.testConversations = conversations;
    state.outputs = {
      readiness: readiness.status,
      dynamicChecklist: checklist.map(i => `[${i.status}] ${i.text}`),
      salesforceImplementationSteps: implSteps
    };

    const def = state.agentDefinition;
    const prereqs = state.prereqs;
    const cap = state.capabilities;
    const ds = state.dataSources;
    const sec = state.security;
    const cx = state.conversationUX;

    // Group checklist by category
    const checklistByCategory = {};
    checklist.forEach(item => {
      if (!checklistByCategory[item.category]) checklistByCategory[item.category] = [];
      checklistByCategory[item.category].push(item);
    });

    // Build export JSON
    const exportObj = {
      prereqs: state.prereqs,
      agentDefinition: state.agentDefinition,
      capabilities: state.capabilities,
      dataSources: state.dataSources,
      conversationUX: {
        welcomeMessage: cx.welcomeMessage,
        topFaqExamples: cx.topFaqExamples,
        fallbackBehavior: cx.fallbackBehavior,
        generatedSystemPrompt: prompt
      },
      security: state.security,
      outputs: state.outputs
    };

    return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Paso 7 de 7
          </div>
          <h1 class="step-card__title">Resumen y Exportación</h1>
          <p class="step-card__description">Revisa la configuración completa de tu agente, el checklist de implementación y exporta el plan final.</p>
        </div>

        <!-- Status Banner -->
        <div class="status-banner ${readiness.status}">
          <span class="status-banner__icon">${readiness.status === 'ready' ? '✅' : '🚫'}</span>
          <div>
            <strong>${readiness.status === 'ready' ? '¡Agente listo para implementar!' : 'Hay prerequisitos bloqueantes'}</strong>
            <div style="font-size:var(--fs-sm); font-weight:var(--fw-regular); margin-top:4px;">
              ${readiness.status === 'ready'
        ? 'Todos los prerequisitos críticos están cubiertos. Puedes proceder con la implementación.'
        : `${readiness.blockers.length} elemento(s) bloqueante(s) deben resolverse antes de implementar.`
      }
            </div>
          </div>
        </div>

        <!-- Agent Summary Cards -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📋</span> Resumen del Agente</h3>
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-card__label">Nombre</div>
              <div class="summary-card__value">${def.agentName || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Tipo</div>
              <div class="summary-card__value">${TYPE_LABELS[def.agentType] || def.agentType || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Área</div>
              <div class="summary-card__value">${def.primaryArea || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Idioma / Tono</div>
              <div class="summary-card__value">${def.language || '—'} / ${def.tone || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Organización</div>
              <div class="summary-card__value">${prereqs.orgType || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Autonomía</div>
              <div class="summary-card__value">${AUTONOMY_LABELS[cap.autonomyLevel] || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Acciones</div>
              <div class="summary-card__value">
                ${(cap.allowedActions || []).map(a => `<span class="badge badge--cyan">${ACTION_LABELS[a] || a}</span>`).join('')}
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Objetos SF</div>
              <div class="summary-card__value">
                ${(ds.sfObjectsUsed || []).map(o => `<span class="badge badge--purple">${o}</span>`).join('')}
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Alcance datos</div>
              <div class="summary-card__value">${ds.readWriteScope === 'ReadWrite' ? 'Lectura y escritura' : 'Solo lectura'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">PII</div>
              <div class="summary-card__value">${PII_LABELS[ds.piiHandling] || '—'}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Canales</div>
              <div class="summary-card__value">
                ${(prereqs.channelsPlanned || []).map(c => `<span class="badge badge--green">${c}</span>`).join('')}
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Logging</div>
              <div class="summary-card__value">${sec.loggingLevel || '—'}</div>
            </div>
          </div>
          <div class="summary-card" style="margin-bottom:var(--sp-6); background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:var(--sp-5);">
            <div class="summary-card__label">Objetivo</div>
            <div class="summary-card__value" style="font-style:italic; color:var(--text-secondary);">"${def.oneLineGoal || '—'}"</div>
          </div>
        </div>

        <!-- Checklist -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">✅</span> Checklist de Implementación</h3>
          ${Object.entries(checklistByCategory).map(([cat, items]) => `
            <h4 style="font-size:var(--fs-sm); color:var(--accent-purple); text-transform:uppercase; letter-spacing:0.08em; margin: var(--sp-4) 0 var(--sp-2); font-weight:var(--fw-semibold);">${cat}</h4>
            <ul class="checklist">
              ${items.map(item => `
                <li class="checklist-item ${item.status}" title="${item.detail}">
                  <span class="status-icon">${item.status === 'done' ? '✅' : item.status === 'blocked' ? '🚫' : '⏳'}</span>
                  <div>
                    <div>${item.text}</div>
                    <div style="font-size:var(--fs-xs); color:var(--text-muted); margin-top:2px;">${item.detail}</div>
                  </div>
                </li>
              `).join('')}
            </ul>
          `).join('')}
        </div>

        <!-- System Prompt -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🤖</span> Prompt del Sistema Generado</h3>
          <div class="prompt-preview">${prompt}</div>
        </div>

        <!-- Test Conversations -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">💬</span> Conversaciones de Prueba (${conversations.length})</h3>
          ${conversations.slice(0, 10).map((conv, i) => `
            <div class="conversation-preview">
              <div class="conversation-preview__title">Prueba ${i + 1}: ${conv.title}</div>
              ${conv.messages.map(msg => `
                <div class="conversation-msg ${msg.role}">
                  <div class="conversation-msg__role">${msg.role === 'user' ? '👤 Usuario' : '🤖 Agente'}</div>
                  <div>${msg.text}</div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>

        <!-- Implementation Steps -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🚀</span> Pasos de Implementación en Salesforce</h3>
          <ol class="impl-steps">
            ${implSteps.map(step => `
              <li class="impl-step">
                <div class="impl-step__number"></div>
                <div>${step}</div>
              </li>
            `).join('')}
          </ol>
        </div>

        <!-- Risks -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">⚡</span> Riesgos, Recomendaciones y Pruebas</h3>
          ${risks.map(r => `
            <div class="info-box ${r.type}">
              <span class="info-box__icon">${r.type === 'error' ? '🚫' : r.type === 'warning' ? '⚠️' : '💡'}</span>
              <div>${r.text}</div>
            </div>
          `).join('')}
        </div>

        <!-- Export JSON -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📥</span> Exportar Configuración</h3>
          <div class="json-preview">
            <pre>${JSON.stringify(exportObj, null, 2)}</pre>
          </div>
          <div style="display:flex; gap:var(--sp-3); flex-wrap:wrap;">
            <button class="btn btn-primary btn-lg" id="btn-export-json">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar JSON
            </button>
            <button class="btn btn-outline btn-lg" id="btn-copy-prompt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copiar Prompt
            </button>
          </div>
        </div>
      </div>
    `;
  },

  afterRender(state, wizard) {
    // 1. Logic to handle "Finalizar" button state and action
    const btnFinalizar = document.getElementById('btn-next'); // "Finalizar" button from WizardEngine
    if (btnFinalizar) {
      // Disable initially
      btnFinalizar.disabled = true;
      btnFinalizar.style.opacity = '0.5';
      btnFinalizar.style.cursor = 'not-allowed';
      btnFinalizar.title = 'Debes revisar todo el resumen antes de finalizar.';
      btnFinalizar.textContent = 'Baja para finalizar';

      // Scroll detection
      const summaryContainer = document.querySelector('.step-card'); // Main content
      if (summaryContainer) {
        // Clone button to remove previous listeners (if any) and handle custom logic
        const newBtn = btnFinalizar.cloneNode(true);
        btnFinalizar.parentNode.replaceChild(newBtn, btnFinalizar);

        // Re-assign for clarity
        const btnSave = newBtn;

        // Add scroll listener
        const checkScroll = () => {
          // Check if bottom of summary is approximately visible
          // Using document scroll height is safer than container bounding rect if container is tall
          const scrollPosition = window.scrollY + window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;

          // If we are within 300px of bottom, enabling.
          if (scrollPosition >= docHeight - 300) {
            btnSave.disabled = false;
            btnSave.style.opacity = '1';
            btnSave.style.cursor = 'pointer';
            btnSave.title = 'Guardar y Finalizar';
            btnSave.textContent = 'Guardar y Finalizar';
            // Remove listener once enabled to avoid flickering
            window.removeEventListener('scroll', checkScroll);
          }
        };

        window.addEventListener('scroll', checkScroll);
        // Check initial state
        checkScroll();

        // Add Save listener
        btnSave.addEventListener('click', async () => {
          try {
            btnSave.textContent = 'Guardando...';
            btnSave.disabled = true;

            const prompt = generateSystemPrompt(state);
            const payload = {
              title: state.agentDefinition.agentName || 'Agente Sin Nombre',
              prompt: prompt,
              config: JSON.stringify(state)
            };

            console.log('Enviando payload:', payload);

            const response = await fetch('http://localhost:8000/api/prompts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (response.ok) {
              const result = await response.json();
              console.log('Respuesta servidor:', result);
              wizard.toast(`Prompt guardado (ID: ${result.id}) correctamente.`, 'success');
              setTimeout(() => {
                alert('¡Proceso finalizado con éxito! El prompt ha sido guardado en la base de datos.');
                // Optionally reset wizard or redirect
                // location.reload(); 
              }, 1000);
            } else {
              const errText = await response.text();
              throw new Error(`Error servidor (${response.status}): ${errText}`);
            }
          } catch (error) {
            console.error('Error al guardar:', error);
            // If typical network error (server down)
            if (error.message.includes('Failed to fetch')) {
              wizard.toast('Error de conexión: El servidor (server.py) no está respondiento. Verifica que la consola de comandos esté abierta ejecutando python server.py', 'error');
            } else {
              wizard.toast('Error: ' + error.message, 'error');
            }
            btnSave.textContent = 'Reintentar Guardar';
            btnSave.disabled = false;
          }
        });
      }
    }

    // Export JSON logic
    document.getElementById('btn-export-json')?.addEventListener('click', () => {
      const prompt = generateSystemPrompt(state);
      const conversations = generateTestConversations(state);
      const exportObj = {
        prereqs: state.prereqs,
        agentDefinition: state.agentDefinition,
        capabilities: state.capabilities,
        dataSources: state.dataSources,
        conversationUX: {
          welcomeMessage: state.conversationUX.welcomeMessage,
          topFaqExamples: state.conversationUX.topFaqExamples,
          fallbackBehavior: state.conversationUX.fallbackBehavior,
          generatedSystemPrompt: prompt,
          testConversations: conversations.map(c => JSON.stringify(c))
        },
        security: state.security,
        outputs: state.outputs
      };

      const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `agentforce_${(state.agentDefinition.agentName || 'agente').replace(/\s+/g, '_').toLowerCase()}_config.json`;
      a.click();
      URL.revokeObjectURL(url);
      wizard.toast('JSON exportado correctamente.', 'success');
    });

    // Copy prompt
    document.getElementById('btn-copy-prompt')?.addEventListener('click', () => {
      const prompt = generateSystemPrompt(state);
      navigator.clipboard.writeText(prompt).then(() => {
        wizard.toast('Prompt copiado al portapapeles.', 'success');
      }).catch(() => {
        wizard.toast('No se pudo copiar. Selecciona el texto manualmente.', 'error');
      });
    });
  },

  collect(state) {
    // Nothing to collect on summary
  }
};
