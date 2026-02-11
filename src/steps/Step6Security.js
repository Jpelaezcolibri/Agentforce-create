/* ═══════════════════════════════════════════════════════════════
   PASO 6 — Seguridad y Guardrails
   ═══════════════════════════════════════════════════════════════ */

export const Step6Security = {
    render(state) {
        const d = state.security;
        const cap = state.capabilities;

        return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Paso 6 de 7
          </div>
          <h1 class="step-card__title">Seguridad y Guardrails</h1>
          <p class="step-card__description">Configura las barreras de seguridad, restricciones de información y nivel de auditoría del agente. Basado en el modelo de seguridad de Einstein Trust Layer.</p>
        </div>

        <div class="info-box info">
          <span class="info-box__icon">🛡️</span>
          <div>
            <strong>Einstein Trust Layer</strong> proporciona automáticamente: Data Masking (tarjetas → XXXX-1234), Zero Data Retention (datos no almacenados por LLM), Toxicity Detection y encriptación.
            <br><em>Tú defines las reglas adicionales del agente.</em>
          </div>
        </div>

        <!-- Info que nunca debe revelar -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🚫</span> Información Restringida</h3>
          <div class="form-group">
            <label class="form-label">
              Información que el agente NUNCA debe revelar <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Tipos de información que el agente debe ocultar. Ej: 'Precios internos', 'Márgenes', 'Datos de otros clientes', 'Estrategias internas'.">?</span>
            </label>
            <div class="tags-input" id="neverReveal-tags" data-field="neverReveal">
              ${(d.neverReveal || []).map(t => `<span class="tag">${t}<span class="tag__remove" data-val="${t}">×</span></span>`).join('')}
              <input type="text" class="tags-input__field" placeholder="Escribe y presiona Enter..." id="neverReveal-input">
            </div>
            <div class="input-error-msg"></div>
          </div>

          <div class="info-box warning" style="margin-top: var(--sp-3);">
            <span class="info-box__icon">⚠️</span>
            <div>
              <strong>Mejores prácticas de seguridad (Agentforce):</strong>
              <ul style="margin-top:6px; padding-left:18px; line-height:1.8;">
                <li>Auditoría regular: Revisa Analytics y Event Logs semanalmente</li>
                <li>Testing adversarial: Intenta "jailbreak" regularmente</li>
                <li>Scope creep prevention: Mantén 3-5 topics máximo</li>
                <li>Human-in-the-Loop para decisiones críticas</li>
                <li>Feedback loop: Botón "Report Issue" y revisión semanal</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Acciones con aprobación (referencia del paso 3) -->
        ${cap.approvalRequiredFor && cap.approvalRequiredFor.length > 0 ? `
          <div class="form-section">
            <h3 class="form-section__title"><span class="icon">✋</span> Acciones con Aprobación (del Paso 3)</h3>
            <div class="info-box info">
              <span class="info-box__icon">📋</span>
              <div>
                Las siguientes acciones requieren aprobación humana antes de ejecutarse:
                <ul style="margin-top:6px; padding-left:18px;">
                  ${cap.approvalRequiredFor.map(a => `<li>${a}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Nivel de logging -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📊</span> Logging y Auditoría</h3>
          <div class="form-group">
            <label class="form-label">
              Nivel de logging <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Mínimo: solo errores. Estándar: conversaciones y acciones principales. Detallado: todo incluyendo razonamiento del agente.">?</span>
            </label>
            <div class="radio-group" data-field="loggingLevel" style="flex-direction:column;">
              ${[
                { v: 'Minimal', l: '📉 Mínimo', d: 'Solo errores y escalamientos. Menor consumo de almacenamiento.' },
                { v: 'Standard', l: '📊 Estándar (recomendado)', d: 'Conversaciones, acciones ejecutadas y métricas principales.' },
                { v: 'Verbose', l: '📈 Detallado', d: 'Todo: razonamiento del agente, prompts, respuestas, métricas granulares.' }
            ].map(({ v, l, d: desc }) => `
                <label class="radio-card ${d.loggingLevel === v ? 'selected' : ''}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="loggingLevel" value="${v}" ${d.loggingLevel === v ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${l}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${desc}</span>
                </label>
              `).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>
      </div>
    `;
    },

    afterRender(state) {
        // Radio cards
        document.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('input').name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
                    inp.closest('.radio-card').classList.remove('selected');
                });
                card.classList.add('selected');
                card.querySelector('input').checked = true;
            });
        });

        // Tags input
        this.setupTagsInput('neverReveal-input', 'neverReveal-tags', state.security.neverReveal);
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
        const logging = document.querySelector('input[name="loggingLevel"]:checked');
        state.security.loggingLevel = logging ? logging.value : '';
        // neverReveal is mutated in-place via tags
    }
};
