/* ═══════════════════════════════════════════════════════════════
   PASO 4 — Datos y Fuentes
   ═══════════════════════════════════════════════════════════════ */

export const Step4Data = {
    render(state) {
        const d = state.dataSources;
        return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            Paso 4 de 7
          </div>
          <h1 class="step-card__title">Datos y Fuentes</h1>
          <p class="step-card__description">Configura qué datos de Salesforce usará el agente, sus fuentes de conocimiento y las políticas de privacidad.</p>
        </div>

        <!-- Objetos SF -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📦</span> Objetos de Salesforce</h3>
          <div class="form-group">
            <label class="form-label">
              Objetos que usará el agente <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Los objetos estándar y custom de Salesforce a los que el agente tendrá acceso. Configura Field-Level Security para cada uno.">?</span>
            </label>
            <div class="checkbox-group" data-field="sfObjectsUsed">
              ${['Lead', 'Contact', 'Account', 'Case', 'Opportunity', 'CustomObject'].map(v => {
            const labels = { Lead: '👤 Lead', Contact: '📇 Contact', Account: '🏢 Account', Case: '📋 Case', Opportunity: '💰 Opportunity', CustomObject: '🔧 Custom Object' };
            const checked = (d.sfObjectsUsed || []).includes(v);
            return `
                  <label class="checkbox-card ${checked ? 'selected' : ''}">
                    <input type="checkbox" name="sfObjectsUsed" value="${v}" ${checked ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${labels[v]}</span>
                  </label>
                `;
        }).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Alcance lectura/escritura -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🔐</span> Permisos de Datos</h3>
          <div class="form-group">
            <label class="form-label">
              Alcance de acceso <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Solo lectura: el agente consulta pero no modifica. Lectura y escritura: puede crear y actualizar registros.">?</span>
            </label>
            <div class="radio-group" data-field="readWriteScope">
              ${[
                { v: 'ReadOnly', l: '🔍 Solo lectura', d: 'Consulta datos sin modificarlos' },
                { v: 'ReadWrite', l: '✏️ Lectura y escritura', d: 'Puede crear y actualizar registros' }
            ].map(({ v, l, d: desc }) => `
                <label class="radio-card ${d.readWriteScope === v ? 'selected' : ''}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="readWriteScope" value="${v}" ${d.readWriteScope === v ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${l}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${desc}</span>
                </label>
              `).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>

          <!-- Restricciones escritura (condicional) -->
          <div class="form-group" id="write-constraints-section" style="display:${d.readWriteScope === 'ReadWrite' ? 'block' : 'none'};">
            <label class="form-label">
              Restricciones de escritura <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Define qué restricciones aplican a las operaciones de escritura. Ej: 'Solo puede crear Cases, no puede borrar registros, montos <$500'.">?</span>
            </label>
            <textarea class="textarea" data-field="writeConstraints" placeholder="Ej: Solo puede crear Cases y Tasks, no puede eliminar registros, actualizaciones limitadas a campos específicos...">${d.writeConstraints || ''}</textarea>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Campos críticos -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📌</span> Campos Críticos</h3>
          <div class="form-group">
            <label class="form-label">
              Campos más importantes para el agente <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Los campos que el agente necesita consultar o modificar con mayor frecuencia. Ej: 'Email', 'Status', 'Amount'.">?</span>
            </label>
            <div class="tags-input" id="criticalFields-tags" data-field="criticalFields">
              ${(d.criticalFields || []).map(t => `<span class="tag">${t}<span class="tag__remove" data-val="${t}">×</span></span>`).join('')}
              <input type="text" class="tags-input__field" placeholder="Escribe un campo y presiona Enter..." id="criticalFields-input">
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Fuentes de conocimiento -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📚</span> Fuentes de Conocimiento</h3>
          <div class="form-group">
            <label class="form-label">
              ¿De dónde obtiene información el agente? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Salesforce Knowledge: artículos de la base de conocimiento. Files: documentos cargados. URLs: páginas web externas.">?</span>
            </label>
            <div class="checkbox-group" data-field="knowledgeSources">
              ${[
                { v: 'SalesforceKnowledge', l: '📖 Salesforce Knowledge' },
                { v: 'Files', l: '📁 Archivos / Data Library' },
                { v: 'URLs', l: '🌐 URLs externas' },
                { v: 'None', l: '❌ Ninguna' }
            ].map(({ v, l }) => {
                const checked = (d.knowledgeSources || []).includes(v);
                return `
                  <label class="checkbox-card ${checked ? 'selected' : ''}">
                    <input type="checkbox" name="knowledgeSources" value="${v}" ${checked ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${l}</span>
                  </label>
                `;
            }).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- PII -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🛡️</span> Manejo de Información Personal (PII)</h3>
          <div class="form-group">
            <label class="form-label">
              ¿El agente manejará datos personales? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="PII incluye: nombres, emails, teléfonos, tarjetas de crédito, SSN. Einstein Trust Layer aplica Data Masking automático a campos sensibles configurados.">?</span>
            </label>
            <div class="radio-group" data-field="piiHandling" style="flex-direction:column;">
              ${[
                { v: 'NoPII', l: 'No contiene PII', d: 'Los datos no incluyen información personal identificable' },
                { v: 'ContainsPIIWithRedaction', l: 'Contiene PII con redacción', d: 'Einstein Trust Layer aplica Data Masking automático (Ej: XXXX-1234)' },
                { v: 'ContainsPIIRestricted', l: 'Contiene PII restringida', d: 'Datos altamente sensibles con acceso controlado estrictamente' }
            ].map(({ v, l, d: desc }) => `
                <label class="radio-card ${d.piiHandling === v ? 'selected' : ''}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="piiHandling" value="${v}" ${d.piiHandling === v ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${l}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${desc}</span>
                </label>
              `).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>

          <!-- PII list (condicional) -->
          <div class="form-group" id="pii-list-section" style="display:${d.piiHandling && d.piiHandling !== 'NoPII' ? 'block' : 'none'};">
            <label class="form-label">
              Datos PII que nunca debe exponer <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Lista los tipos de datos que el agente NUNCA debe mostrar al usuario. Ej: 'Número de tarjeta', 'SSN', 'Contraseñas'.">?</span>
            </label>
            <div class="tags-input" id="piiDoNotExpose-tags" data-field="piiDoNotExpose">
              ${(d.piiDoNotExpose || []).map(t => `<span class="tag">${t}<span class="tag__remove" data-val="${t}">×</span></span>`).join('')}
              <input type="text" class="tags-input__field" placeholder="Ej: Número de tarjeta..." id="piiDoNotExpose-input">
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>
      </div>
    `;
    },

    afterRender(state) {
        const d = state.dataSources;

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

                if (name === 'readWriteScope') {
                    const val = card.querySelector('input').value;
                    document.getElementById('write-constraints-section').style.display = val === 'ReadWrite' ? 'block' : 'none';
                }

                if (name === 'piiHandling') {
                    const val = card.querySelector('input').value;
                    document.getElementById('pii-list-section').style.display = val !== 'NoPII' ? 'block' : 'none';
                }
            });
        });

        // Tags inputs
        this.setupTagsInput('criticalFields-input', 'criticalFields-tags', d.criticalFields);
        this.setupTagsInput('piiDoNotExpose-input', 'piiDoNotExpose-tags', d.piiDoNotExpose);
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
        state.dataSources.sfObjectsUsed = [...document.querySelectorAll('input[name="sfObjectsUsed"]:checked')].map(i => i.value);
        const rw = document.querySelector('input[name="readWriteScope"]:checked');
        state.dataSources.readWriteScope = rw ? rw.value : '';
        state.dataSources.writeConstraints = (document.querySelector('[data-field="writeConstraints"]')?.value || '').trim();
        state.dataSources.knowledgeSources = [...document.querySelectorAll('input[name="knowledgeSources"]:checked')].map(i => i.value);
        const pii = document.querySelector('input[name="piiHandling"]:checked');
        state.dataSources.piiHandling = pii ? pii.value : '';
        // criticalFields and piiDoNotExpose are mutated in-place via tags
    }
};
