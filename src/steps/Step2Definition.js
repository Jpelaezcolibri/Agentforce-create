/* ═══════════════════════════════════════════════════════════════
   PASO 2 — Definición del Nuevo Agente
   ═══════════════════════════════════════════════════════════════ */

export const Step2Definition = {
  render(state) {
    const d = state.agentDefinition;
    return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Paso 2 de 7
          </div>
          <h1 class="step-card__title">Definición del Agente</h1>
          <p class="step-card__description">Define la identidad, propósito y personalidad de tu agente de Agentforce.</p>
        </div>

        <!-- Nombre -->
        <div class="form-group">
          <label class="form-label">
            Nombre del agente <span class="required">*</span>
            <span class="tooltip-trigger" data-tooltip="Un nombre descriptivo para tu agente. Ej: 'Asistente de Ventas LATAM', 'Soporte TechBot'. Máx. 60 caracteres.">?</span>
          </label>
          <input type="text" class="input" data-field="agentName" placeholder="Ej: Asistente de Ventas LatAm" value="${d.agentName || ''}" maxlength="60">
          <div class="char-counter"><span id="agentName-count">${(d.agentName || '').length}</span>/60</div>
          <div class="input-error-msg"></div>
        </div>

        <!-- Tipo de agente -->
        <div class="form-group">
          <label class="form-label">
            Tipo de agente <span class="required">*</span>
            <span class="tooltip-trigger" data-tooltip="Basado en los tipos principales de Agentforce: SDR (prospección), Service (soporte), Sales Coach, Commerce, o personalizado.">?</span>
          </label>
          <div class="radio-group" data-field="agentType">
            ${[
        { v: 'SDR', l: '🎯 SDR — Ventas y prospección', desc: 'Outreach, calificación de leads, agendamiento' },
        { v: 'Direction', l: '📊 Dirección — Reporting ejecutivo', desc: 'Resúmenes, KPIs, análisis de pipeline' },
        { v: 'Support', l: '🎧 Soporte — Servicio al cliente', desc: 'Resolución de casos, Knowledge Base, escalamiento' },
        { v: 'Ops', l: '⚙️ Operaciones — Procesos internos', desc: 'Automatización interna, procesos, eficiencia' },
        { v: 'Onboarding', l: '🚀 Onboarding — Incorporación', desc: 'Guía a nuevos empleados o clientes' },
        { v: 'Custom', l: '🔧 Custom — Personalizado', desc: 'Caso de uso específico no cubierto' }
      ].map(({ v, l, desc }) => `
              <label class="radio-card ${d.agentType === v ? 'selected' : ''}" style="flex-basis:45%; flex-direction:column; align-items:flex-start; gap:4px; padding: var(--sp-4);">
                <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                  <input type="radio" name="agentType" value="${v}" ${d.agentType === v ? 'checked' : ''}>
                  <span class="check-icon"></span>
                  <span class="check-label">${l}</span>
                </div>
                <span style="font-size:0.75rem; color:var(--text-muted); padding-left:32px;">${desc}</span>
              </label>
            `).join('')}
          </div>
          <div class="input-error-msg"></div>
        </div>

        <!-- Área principal -->
        <div class="form-group">
          <label class="form-label">
            Área principal <span class="required">*</span>
            <span class="tooltip-trigger" data-tooltip="El departamento o área funcional donde opera el agente.">?</span>
          </label>
          <select class="select" data-field="primaryArea">
            <option value="">Selecciona un área...</option>
            ${['Ventas', 'Prospección y Ventas', 'Soporte', 'Dirección', 'Operaciones', 'Otro'].map(v =>
        `<option value="${v}" ${d.primaryArea === v ? 'selected' : ''}>${v}</option>`
      ).join('')}
          </select>
          <div class="input-error-msg"></div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4);">
          <!-- Idioma -->
          <div class="form-group">
            <label class="form-label">
              Idioma <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="El idioma principal en que el agente se comunicará. Agentforce soporta detección automática de idioma.">?</span>
            </label>
            <input type="text" class="input" data-field="language" placeholder="Ej: Español" value="${d.language || 'Español'}" maxlength="10">
            <div class="input-error-msg"></div>
          </div>

          <!-- Tono -->
          <div class="form-group">
            <label class="form-label">
              Tono <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="El estilo de comunicación del agente. Define cómo se dirige al usuario.">?</span>
            </label>
            <select class="select" data-field="tone">
              <option value="">Selecciona tono...</option>
              ${[
        { v: 'Formal', l: 'Formal — Profesional y corporativo' },
        { v: 'Cercano', l: 'Cercano — Empático y conversacional' },
        { v: 'Técnico', l: 'Técnico — Preciso y especializado' },
        { v: 'Neutro', l: 'Neutro — Objetivo y balanceado' }
      ].map(({ v, l }) =>
        `<option value="${v}" ${d.tone === v ? 'selected' : ''}>${l}</option>`
      ).join('')}
            </select>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Objetivo -->
        <div class="form-group">
          <label class="form-label">
            Objetivo principal del agente <span class="required">*</span>
            <span class="tooltip-trigger" data-tooltip="Una frase clara y concisa que describe el propósito principal del agente. Ej: 'Resolver casos de soporte de forma autónoma y eficiente'.">?</span>
          </label>
          <textarea class="textarea" data-field="oneLineGoal" placeholder="Ej: Calificar y nutrir leads de forma autónoma, respondiendo preguntas y agendando reuniones con el equipo de ventas." maxlength="200">${d.oneLineGoal || ''}</textarea>
          <div class="char-counter"><span id="oneLineGoal-count">${(d.oneLineGoal || '').length}</span>/200</div>
          <div class="input-error-msg"></div>
        </div>
      </div>
    `;
  },

  afterRender(state) {
    // Radio card toggle
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

    // Char counters
    const nameInput = document.querySelector('[data-field="agentName"]');
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        document.getElementById('agentName-count').textContent = nameInput.value.length;
      });
    }

    const goalInput = document.querySelector('[data-field="oneLineGoal"]');
    if (goalInput) {
      goalInput.addEventListener('input', () => {
        document.getElementById('oneLineGoal-count').textContent = goalInput.value.length;
      });
    }
  },

  collect(state) {
    state.agentDefinition.agentName = (document.querySelector('[data-field="agentName"]')?.value || '').trim();
    const agentType = document.querySelector('input[name="agentType"]:checked');
    state.agentDefinition.agentType = agentType ? agentType.value : '';
    state.agentDefinition.primaryArea = document.querySelector('[data-field="primaryArea"]')?.value || '';
    state.agentDefinition.language = (document.querySelector('[data-field="language"]')?.value || '').trim();
    state.agentDefinition.tone = document.querySelector('[data-field="tone"]')?.value || '';
    state.agentDefinition.oneLineGoal = (document.querySelector('[data-field="oneLineGoal"]')?.value || '').trim();
  }
};
