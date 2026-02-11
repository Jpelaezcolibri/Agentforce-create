/* ═══════════════════════════════════════════════════════════════
   PASO 1 — Prerrequisitos y Activaciones (Salesforce Setup)
   ═══════════════════════════════════════════════════════════════ */

export const Step1Prereqs = {
    render(state) {
        const d = state.prereqs;
        return `
      <div class="step-card">
        <div class="step-card__header">
          <div class="step-card__step-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Paso 1 de 7
          </div>
          <h1 class="step-card__title">Prerrequisitos y Activaciones</h1>
          <p class="step-card__description">Antes de crear tu agente, verifiquemos que tu organización de Salesforce tiene los componentes necesarios activados.</p>
        </div>

        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">⚙️</span> Configuración de la Organización
          </h3>

          <!-- Tipo de Org -->
          <div class="form-group">
            <label class="form-label">
              Tipo de organización <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Production: org en vivo. Sandbox: copia para pruebas. Developer: org gratuita de desarrollo.">?</span>
            </label>
            <div class="radio-group" data-field="orgType">
              ${['Production', 'Sandbox', 'Developer'].map(v => `
                <label class="radio-card ${d.orgType === v ? 'selected' : ''}">
                  <input type="radio" name="orgType" value="${v}" ${d.orgType === v ? 'checked' : ''}>
                  <span class="check-icon"></span>
                  <span class="check-label">${v === 'Production' ? 'Producción' : v}</span>
                </label>
              `).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>

          <!-- Einstein Status -->
          <div class="form-group">
            <label class="form-label">
              ¿Einstein está habilitado? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Einstein es la plataforma de IA de Salesforce. Es OBLIGATORIO para Agentforce. Verifica en Setup → Einstein → Einstein Platform.">?</span>
            </label>
            <div class="radio-group" data-field="einsteinStatus">
              ${['Yes', 'No', 'Unknown'].map(v => {
            const label = v === 'Yes' ? 'Sí' : v === 'No' ? 'No' : 'No sé';
            return `
                  <label class="radio-card ${d.einsteinStatus === v ? 'selected' : ''}">
                    <input type="radio" name="einsteinStatus" value="${v}" ${d.einsteinStatus === v ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${label}</span>
                  </label>
                `;
        }).join('')}
            </div>
            <div class="input-error-msg"></div>
            <div id="einstein-info"></div>
          </div>

          <!-- Agentforce Status -->
          <div class="form-group">
            <label class="form-label">
              ¿Agentforce está activado? <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Agentforce es la herramienta para crear agentes autónomos de IA. Verifica en Setup → Agentforce.">?</span>
            </label>
            <div class="radio-group" data-field="agentforceStatus">
              ${['Yes', 'No', 'Unknown'].map(v => {
            const label = v === 'Yes' ? 'Sí' : v === 'No' ? 'No' : 'No sé';
            return `
                  <label class="radio-card ${d.agentforceStatus === v ? 'selected' : ''}">
                    <input type="radio" name="agentforceStatus" value="${v}" ${d.agentforceStatus === v ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${label}</span>
                  </label>
                `;
        }).join('')}
            </div>
            <div class="input-error-msg"></div>
            <div id="agentforce-info"></div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">👤</span> Tu Perfil
          </h3>

          <!-- Rol -->
          <div class="form-group">
            <label class="form-label">
              Tu rol en Salesforce <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Admin: acceso total a Setup. Configurador: puede crear/editar flujos. Usuario de negocio: usuario final.">?</span>
            </label>
            <div class="radio-group" data-field="userRole">
              ${[
                { v: 'Admin', l: 'Administrador' },
                { v: 'Configurator', l: 'Configurador' },
                { v: 'BusinessUser', l: 'Usuario de negocio' },
                { v: 'Unknown', l: 'No sé' }
            ].map(({ v, l }) => `
                <label class="radio-card ${d.userRole === v ? 'selected' : ''}">
                  <input type="radio" name="userRole" value="${v}" ${d.userRole === v ? 'checked' : ''}>
                  <span class="check-icon"></span>
                  <span class="check-label">${l}</span>
                </label>
              `).join('')}
            </div>
            <div class="input-error-msg"></div>
            <div id="role-info"></div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section__title">
            <span class="icon">📡</span> Canales de Despliegue
          </h3>

          <!-- Canales -->
          <div class="form-group">
            <label class="form-label">
              Canales donde funcionará el agente <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Selecciona todos los canales donde planeas desplegar tu agente. Cada canal requiere configuración específica en Setup.">?</span>
            </label>
            <div class="checkbox-group" data-field="channelsPlanned">
              ${['Web', 'WhatsApp', 'Email', 'Slack', 'Teams', 'Phone', 'Other'].map(v => {
                const labels = { Web: 'Web', WhatsApp: 'WhatsApp', Email: 'Email', Slack: 'Slack', Teams: 'Teams', Phone: 'Teléfono', Other: 'Otro' };
                const checked = (d.channelsPlanned || []).includes(v);
                return `
                  <label class="checkbox-card ${checked ? 'selected' : ''}">
                    <input type="checkbox" name="channelsPlanned" value="${v}" ${checked ? 'checked' : ''}>
                    <span class="check-icon"></span>
                    <span class="check-label">${labels[v]}</span>
                  </label>
                `;
            }).join('')}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Dynamic checklist -->
        <div id="dynamic-checklist"></div>
      </div>
    `;
    },

    afterRender(state, wizard) {
        // Radio card toggle
        document.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('input').name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
                    inp.closest('.radio-card').classList.remove('selected');
                });
                card.classList.add('selected');
                card.querySelector('input').checked = true;
                this.collect(state);
                this.updateConditionalUI(state);
            });
        });

        // Checkbox card toggle
        document.querySelectorAll('.checkbox-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const inp = card.querySelector('input');
                inp.checked = !inp.checked;
                card.classList.toggle('selected', inp.checked);
                this.collect(state);
            });
        });

        this.updateConditionalUI(state);
    },

    updateConditionalUI(state) {
        const d = state.prereqs;

        // Einstein info
        const einsteinInfo = document.getElementById('einstein-info');
        if (einsteinInfo) {
            if (d.einsteinStatus === 'No') {
                einsteinInfo.innerHTML = `<div class="info-box error"><span class="info-box__icon">🚫</span><div><strong>Einstein no está activo.</strong><br>Es un prerequisito obligatorio. Ve a Setup → Einstein → Einstein Platform → Habilitar. Necesitarás la licencia Einstein.</div></div>`;
            } else if (d.einsteinStatus === 'Unknown') {
                einsteinInfo.innerHTML = `<div class="info-box warning"><span class="info-box__icon">⚠️</span><div><strong>Verifica el estado de Einstein.</strong><br>Ve a Setup → busca "Einstein" → verifica que Einstein Platform esté habilitado.</div></div>`;
            } else {
                einsteinInfo.innerHTML = '';
            }
        }

        // Agentforce info
        const afInfo = document.getElementById('agentforce-info');
        if (afInfo) {
            if (d.agentforceStatus === 'No') {
                afInfo.innerHTML = `<div class="info-box error"><span class="info-box__icon">🚫</span><div><strong>Agentforce no está activado.</strong><br>Contacta a tu Account Executive de Salesforce para obtener la licencia. Luego activa en Setup → Agentforce.</div></div>`;
            } else if (d.agentforceStatus === 'Unknown') {
                afInfo.innerHTML = `<div class="info-box warning"><span class="info-box__icon">⚠️</span><div><strong>Verifica Agentforce.</strong><br>Ve a Setup → busca "Agentforce" → verifica que esté activado.</div></div>`;
            } else {
                afInfo.innerHTML = '';
            }
        }

        // Role info
        const roleInfo = document.getElementById('role-info');
        if (roleInfo) {
            if (d.userRole && d.userRole !== 'Admin') {
                roleInfo.innerHTML = `<div class="info-box warning"><span class="info-box__icon">⚠️</span><div><strong>Permisos limitados.</strong><br>Para configurar Agentforce necesitas acceso de Administrador. Coordina con un Admin para las configuraciones en Setup, o solicita que te asignen los Permission Sets necesarios.</div></div>`;
            } else {
                roleInfo.innerHTML = '';
            }
        }
    },

    collect(state) {
        const orgType = document.querySelector('input[name="orgType"]:checked');
        const einsteinStatus = document.querySelector('input[name="einsteinStatus"]:checked');
        const agentforceStatus = document.querySelector('input[name="agentforceStatus"]:checked');
        const userRole = document.querySelector('input[name="userRole"]:checked');
        const channels = [...document.querySelectorAll('input[name="channelsPlanned"]:checked')].map(i => i.value);

        state.prereqs.orgType = orgType ? orgType.value : '';
        state.prereqs.einsteinStatus = einsteinStatus ? einsteinStatus.value : '';
        state.prereqs.agentforceStatus = agentforceStatus ? agentforceStatus.value : '';
        state.prereqs.userRole = userRole ? userRole.value : '';
        state.prereqs.channelsPlanned = channels;
    }
};
