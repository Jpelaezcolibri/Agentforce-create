/* ═══════════════════════════════════════════════════════════════
   PASO 5 — Experiencia Conversacional
   ═══════════════════════════════════════════════════════════════ */

import { generateSystemPrompt, generateTestConversations } from '../utils/promptGenerator.js';

export const Step5Conversation = {
  render(state) {
    const d = state.conversationUX;
    const faqs = d.topFaqExamples || ['', '', ''];

    return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Paso 5 de 7
          </div>
          <h1 class="step-card__title">Experiencia Conversacional</h1>
          <p class="step-card__description">Diseña cómo se comunicará tu agente con los usuarios. Define el mensaje de bienvenida, preguntas frecuentes y el comportamiento ante situaciones imprevistas.</p>
        </div>

        <!-- Mensaje de bienvenida -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">👋</span> Mensaje de Bienvenida</h3>
          <div class="form-group">
            <label class="form-label">
              Primer mensaje que verá el usuario <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Este es el primer mensaje que el agente envía al usuario cuando inicia una conversación. Debe reflejar la personalidad y el tono del agente.">?</span>
            </label>
            <textarea class="textarea" data-field="welcomeMessage" placeholder="Ej: ¡Hola! Soy tu asistente virtual de ventas. Estoy aquí para responder tus preguntas sobre nuestros productos y ayudarte a encontrar la mejor solución para tu empresa. ¿En qué puedo ayudarte?" maxlength="300">${d.welcomeMessage || ''}</textarea>
            <div class="char-counter"><span id="welcome-count">${(d.welcomeMessage || '').length}</span>/300</div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- FAQs -->
        <div class="form-section" data-field="topFaqExamples">
          <h3 class="form-section__title"><span class="icon">❓</span> Preguntas Frecuentes</h3>
          <div class="info-box info">
            <span class="info-box__icon">💡</span>
            <div>Agrega al menos 3 ejemplos de preguntas que los usuarios harán con frecuencia. Estas ayudan a entrenar los topics y example utterances del agente.</div>
          </div>

          <div class="faq-list">
            ${[0, 1, 2, 3, 4].map(i => `
              <div class="form-group">
                <label class="form-label">
                  Pregunta ${i + 1} ${i < 3 ? '<span class="required">*</span>' : '(opcional)'}
                </label>
                <input type="text" class="input faq-input" data-faq-idx="${i}" placeholder="Ej: ¿Cuáles son los precios de sus servicios?" value="${faqs[i] || ''}">
              </div>
            `).join('')}
          </div>

          <div class="input-error-msg"></div>

          <button type="button" class="btn btn-outline" id="btn-add-faq" style="margin-top: var(--sp-2);">
            + Agregar otra pregunta
          </button>
        </div>

        <!-- Fallback -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🔄</span> Comportamiento ante Información Faltante</h3>
          <div class="form-group">
            <label class="form-label">
              ¿Qué hace el agente cuando no tiene información suficiente? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Define cómo reacciona el agente cuando no puede responder una pregunta o le falta información.">?</span>
            </label>
            <div class="radio-group" data-field="fallbackBehavior" style="flex-direction:column;">
              ${[
        { v: 'AskClarifying', l: '🗣️ Preguntar — Solicita más información al usuario', d: 'El agente hace preguntas clarificadoras para entender mejor la solicitud' },
        { v: 'Escalate', l: '🔄 Escalar — Transfiere a un agente humano', d: 'Si no puede resolver, escala inmediatamente al equipo humano' },
        { v: 'ProvideOptions', l: '📋 Ofrecer opciones — Presenta alternativas', d: 'Muestra opciones predefinidas para que el usuario elija' }
      ].map(({ v, l, d: desc }) => `
                <label class="radio-card ${d.fallbackBehavior === v ? 'selected' : ''}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="fallbackBehavior" value="${v}" ${d.fallbackBehavior === v ? 'checked' : ''}>
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

        <!-- Preview section -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🔮</span> Vista Previa</h3>
          <div class="info-box info">
            <span class="info-box__icon">ℹ️</span>
            <div>El prompt del sistema y las conversaciones de prueba se generarán automáticamente al avanzar al siguiente paso, basándose en toda la información ingresada.</div>
          </div>
          <button type="button" class="btn btn-outline" id="btn-preview-prompt" style="margin-top: var(--sp-2);">
            👁️ Vista previa del prompt
          </button>
          <div id="prompt-preview-container" style="margin-top: var(--sp-4);"></div>
        </div>
      </div>
    `;
  },

  afterRender(state, wizard) {
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

    // Welcome char counter
    const welcomeInput = document.querySelector('[data-field="welcomeMessage"]');
    if (welcomeInput) {
      welcomeInput.addEventListener('input', () => {
        document.getElementById('welcome-count').textContent = welcomeInput.value.length;
      });
    }

    // Add FAQ button
    const addBtn = document.getElementById('btn-add-faq');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const faqInputs = document.querySelectorAll('.faq-input');
        const nextIdx = faqInputs.length;
        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
          <label class="form-label">Pregunta ${nextIdx + 1} (opcional)</label>
          <input type="text" class="input faq-input" data-faq-idx="${nextIdx}" placeholder="Ej: ¿Cómo puedo rastrear mi pedido?">
        `;
        addBtn.parentElement.insertBefore(group, addBtn);
      });
    }

    // Preview prompt
    const previewBtn = document.getElementById('btn-preview-prompt');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        this.collect(state);
        const prompt = generateSystemPrompt(state);
        const container = document.getElementById('prompt-preview-container');
        container.innerHTML = `
          <div class="prompt-preview">${prompt}</div>
        `;
      });
    }
  },

  collect(state) {
    state.conversationUX.welcomeMessage = (document.querySelector('[data-field="welcomeMessage"]')?.value || '').trim();

    const faqInputs = document.querySelectorAll('.faq-input');
    const faqs = [];
    faqInputs.forEach(inp => {
      if (inp.value.trim()) faqs.push(inp.value.trim());
    });
    state.conversationUX.topFaqExamples = faqs;

    const fallback = document.querySelector('input[name="fallbackBehavior"]:checked');
    state.conversationUX.fallbackBehavior = fallback ? fallback.value : '';

    // Generate prompt and test conversations
    state.conversationUX.generatedSystemPrompt = generateSystemPrompt(state);
    state.conversationUX.testConversations = generateTestConversations(state);
  }
};
