/* ═══════════════════════════════════════════════════════════════
   PASO 3 — Alcance y Capacidades
   ═══════════════════════════════════════════════════════════════ */

export const Step3Capabilities = {
    render(state) {
        const d = state.capabilities;
        return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Paso 3 de 7
          </div>
          <h1 class="step-card__title">Alcance y Capacidades</h1>
          <p class="step-card__description">Define qué puede y qué no puede hacer tu agente, su nivel de autonomía y las reglas de escalamiento humano.</p>
        </div>

        <!-- Acciones permitidas -->
        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">✅</span> Acciones Permitidas
          </h3>
          <div class="form-group">
            <label class="form-label">
              ¿Qué puede hacer el agente? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Selecciona las acciones que el agente puede ejecutar. En Agentforce cada acción se implementa como Flow, Apex o Prompt Template.">?</span>
            </label>
            <div class="checkbox-group" data-field="allowedActions">
              ${[
                { v: 'Consultar', l: '🔍 Consultar información', d: 'Buscar en CRM y Knowledge Base' },
                { v: 'CrearRegistros', l: '➕ Crear registros', d: 'Crear Leads, Cases, Tasks, etc.' },
                { v: 'ActualizarRegistros', l: '✏️ Actualizar registros', d: 'Modificar campos existentes' },
                { v: 'Recomendar', l: '💡 Recomendar', d: 'Sugerir acciones o productos' },
                { v: 'Agendar', l: '📅 Agendar', d: 'Programar reuniones y tareas' },
                { v: 'Escalar', l: '🔄 Escalar a humano', d: 'Transferir a un agente humano' }
            ].map(({ v, l, d: desc }) => {
                const checked = (d.allowedActions || []).includes(v);
                return `
                  <label class="checkbox-card ${checked ? 'selected' : ''}" style="flex-basis:45%; flex-direction:column; align-items:flex-start; gap:2px; padding:var(--sp-3) var(--sp-4);">
                    <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                      <input type="checkbox" name="allowedActions" value="${v}" ${checked ? 'checked' : ''}>
                      <span class="check-icon"></span>
                      <span class="check-label">${l}</span>
                    </div>
                    <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${desc}</span>
                  </label>
                `;
            }).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Acciones restringidas -->
        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">🚫</span> Acciones Restringidas
          </h3>
          <div class="form-group">
            <label class="form-label">
              Acciones que el agente NO debe hacer
              <span class="tooltip-trigger" data-tooltip="Ejemplo: 'Prometer descuentos sin autorización', 'Compartir datos de otros clientes', 'Dar consejos legales'.">?</span>
            </label>
            <div class="tags-input" id="restrictedActions-tags">
              ${(d.restrictedActions || []).map(t => `<span class="tag">${t}<span class="tag__remove" data-val="${t}">×</span></span>`).join('')}
              <input type="text" class="tags-input__field" placeholder="Escribe y presiona Enter..." id="restrictedActions-input">
            </div>
          </div>
        </div>

        <!-- Nivel de autonomía -->
        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">🤖</span> Nivel de Autonomía
          </h3>
          <div class="form-group">
            <label class="form-label">
              ¿Qué tan autónomo será el agente? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Asistido: siempre pide confirmación. Semi-autónomo: consultas sí, escritura no. Autónomo con aprobación: opera solo excepto acciones críticas.">?</span>
            </label>
            <div class="radio-group" data-field="autonomyLevel" style="flex-direction:column;">
              ${[
                { v: 'Assisted', l: '👤 Asistido', d: 'Siempre solicita confirmación del usuario antes de actuar' },
                { v: 'SemiAutonomous', l: '🤝 Semi-autónomo', d: 'Consultas independientes, pero aprobación para escritura' },
                { v: 'AutonomousWithApproval', l: '🚀 Autónomo con aprobación', d: 'Opera solo, aprobación solo para acciones críticas' }
            ].map(({ v, l, d: desc }) => `
                <label class="radio-card ${d.autonomyLevel === v ? 'selected' : ''}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="autonomyLevel" value="${v}" ${d.autonomyLevel === v ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${l}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${desc}</span>
                </label>
              `).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>

          <!-- Acciones con aprobación (condicional) -->
          <div class="form-group" id="approval-section" style="display:none;">
            <label class="form-label">
              Acciones que requieren aprobación explícita <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Lista las acciones específicas que necesitan aprobación humana antes de ejecutarse. Ej: 'Reembolsos >$100', 'Cerrar oportunidades'.">?</span>
            </label>
            <div class="tags-input" id="approvalActions-tags" data-field="approvalRequiredFor">
              ${(d.approvalRequiredFor || []).map(t => `<span class="tag">${t}<span class="tag__remove" data-val="${t}">×</span></span>`).join('')}
              <input type="text" class="tags-input__field" placeholder="Escribe y presiona Enter..." id="approvalActions-input">
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Reglas de escalamiento -->
        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">🔄</span> Reglas de Escalamiento
          </h3>
          <div class="form-group">
            <label class="form-label">
              ¿Cuándo debe escalar a un humano? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Define criterios claros: 'Si el cliente solicita un humano', 'Si no resuelve en 2 intentos', 'Si requiere autorización especial'.">?</span>
            </label>
            <textarea class="textarea" data-field="handoffRules" placeholder="Ej: Escalar cuando el cliente solicite hablar con un humano, cuando no se resuelva en 2 intentos, cuando se requiera autorización especial de un supervisor, o cuando el tema sea médico/legal." maxlength="400">${d.handoffRules || ''}</textarea>
            <div class="char-counter"><span id="handoff-count">${(d.handoffRules || '').length}</span>/400</div>
            <div class="input-error-msg"></div>
          </div>
        </div>
      </div>
    `;
    },

    afterRender(state) {
        // Checkbox cards
        document.querySelectorAll('.checkbox-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const inp = card.querySelector('input');
                inp.checked = !inp.checked;
                card.classList.toggle('selected', inp.checked);
            });
        });

        // Radio cards
        document.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('input').name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
                    inp.closest('.radio-card').classList.remove('selected');
                });
                card.classList.add('selected');
                card.querySelector('input').checked = true;

                // Show/hide approval section
                if (name === 'autonomyLevel') {
                    const val = card.querySelector('input').value;
                    const section = document.getElementById('approval-section');
                    if (section) {
                        section.style.display = val !== 'Assisted' ? 'block' : 'none';
                    }
                }
            });
        });

        // Check initial autonomy
        const currentAutonomy = state.capabilities.autonomyLevel;
        if (currentAutonomy && currentAutonomy !== 'Assisted') {
            const section = document.getElementById('approval-section');
            if (section) section.style.display = 'block';
        }

        // Tags input for restricted actions
        this.setupTagsInput('restrictedActions-input', 'restrictedActions-tags', state.capabilities.restrictedActions);
        this.setupTagsInput('approvalActions-input', 'approvalActions-tags', state.capabilities.approvalRequiredFor);

        // Char counter
        const handoffInput = document.querySelector('[data-field="handoffRules"]');
        if (handoffInput) {
            handoffInput.addEventListener('input', () => {
                document.getElementById('handoff-count').textContent = handoffInput.value.length;
            });
        }
    },

    setupTagsInput(inputId, containerId, arr) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);
        if (!input || !container) return;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                e.preventDefault();
                const val = input.value.trim();
                if (!arr.includes(val)) {
                    arr.push(val);
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.innerHTML = `${val}<span class="tag__remove" data-val="${val}">×</span>`;
                    container.insertBefore(tag, input);
                    tag.querySelector('.tag__remove').addEventListener('click', () => {
                        const idx = arr.indexOf(val);
                        if (idx > -1) arr.splice(idx, 1);
                        tag.remove();
                    });
                }
                input.value = '';
            }
        });

        // Existing remove buttons
        container.querySelectorAll('.tag__remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.val;
                const idx = arr.indexOf(val);
                if (idx > -1) arr.splice(idx, 1);
                btn.closest('.tag').remove();
            });
        });
    },

    collect(state) {
        state.capabilities.allowedActions = [...document.querySelectorAll('input[name="allowedActions"]:checked')].map(i => i.value);
        // restrictedActions and approvalRequiredFor are already mutated in-place via tags
        const autonomy = document.querySelector('input[name="autonomyLevel"]:checked');
        state.capabilities.autonomyLevel = autonomy ? autonomy.value : '';
        state.capabilities.handoffRules = (document.querySelector('[data-field="handoffRules"]')?.value || '').trim();
    }
};
