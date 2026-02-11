(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();const A="modulepreload",_=function(s){return"/Agentforce-create/"+s},E={},$=function(a,e,t){let n=Promise.resolve();if(e&&e.length>0){let r=function(l){return Promise.all(l.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=r(e.map(l=>{if(l=_(l),l in E)return;E[l]=!0;const p=l.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":A,p||(m.as="script"),m.crossOrigin="",m.href=l,c&&m.setAttribute("nonce",c),document.head.appendChild(m),p)return new Promise((f,y)=>{m.addEventListener("load",f),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return n.then(r=>{for(const o of r||[])o.status==="rejected"&&i(o.reason);return a().catch(i)})},x="agentforce_wizard_v2";function k(s){try{const a=JSON.stringify(s);localStorage.setItem(x,a)}catch(a){console.warn("No se pudo guardar el estado:",a)}}function q(){try{const s=localStorage.getItem(x);return s?JSON.parse(s):null}catch(s){return console.warn("No se pudo cargar el estado:",s),null}}function C(){try{localStorage.removeItem(x)}catch(s){console.warn("No se pudo limpiar el estado:",s)}}function L(s){const a=[],e=s.prereqs||{};return e.orgType||a.push({field:"orgType",msg:"Selecciona el tipo de organización."}),e.einsteinStatus||a.push({field:"einsteinStatus",msg:"Indica el estado de Einstein."}),e.agentforceStatus||a.push({field:"agentforceStatus",msg:"Indica el estado de Agentforce."}),e.userRole||a.push({field:"userRole",msg:"Selecciona tu rol."}),(!e.channelsPlanned||e.channelsPlanned.length===0)&&a.push({field:"channelsPlanned",msg:"Selecciona al menos un canal."}),a}function w(s){const a=[],e=s.agentDefinition||{};return(!e.agentName||e.agentName.trim().length<2)&&a.push({field:"agentName",msg:"El nombre del agente debe tener al menos 2 caracteres."}),e.agentName&&e.agentName.length>60&&a.push({field:"agentName",msg:"El nombre no debe exceder 60 caracteres."}),e.agentType||a.push({field:"agentType",msg:"Selecciona el tipo de agente."}),e.primaryArea||a.push({field:"primaryArea",msg:"Selecciona el área principal."}),(!e.language||e.language.trim().length<2)&&a.push({field:"language",msg:"Indica el idioma del agente."}),e.tone||a.push({field:"tone",msg:"Selecciona el tono del agente."}),(!e.oneLineGoal||e.oneLineGoal.trim().length<10)&&a.push({field:"oneLineGoal",msg:"El objetivo debe tener al menos 10 caracteres."}),e.oneLineGoal&&e.oneLineGoal.length>200&&a.push({field:"oneLineGoal",msg:"El objetivo no debe exceder 200 caracteres."}),a}function P(s){const a=[],e=s.capabilities||{};return(!e.allowedActions||e.allowedActions.length===0)&&a.push({field:"allowedActions",msg:"Selecciona al menos una acción permitida."}),e.autonomyLevel||a.push({field:"autonomyLevel",msg:"Selecciona el nivel de autonomía."}),(!e.handoffRules||e.handoffRules.trim().length<10)&&a.push({field:"handoffRules",msg:"Las reglas de escalamiento deben tener al menos 10 caracteres."}),e.autonomyLevel&&e.autonomyLevel!=="Assisted"&&(!e.approvalRequiredFor||e.approvalRequiredFor.length===0)&&a.push({field:"approvalRequiredFor",msg:'Si el nivel no es "Asistido", indica qué acciones requieren aprobación.'}),a}function R(s){const a=[],e=s.dataSources||{};return(!e.sfObjectsUsed||e.sfObjectsUsed.length===0)&&a.push({field:"sfObjectsUsed",msg:"Selecciona al menos un objeto de Salesforce."}),e.readWriteScope||a.push({field:"readWriteScope",msg:"Indica el alcance de lectura/escritura."}),(!e.criticalFields||e.criticalFields.length===0)&&a.push({field:"criticalFields",msg:"Indica al menos un campo crítico."}),(!e.knowledgeSources||e.knowledgeSources.length===0)&&a.push({field:"knowledgeSources",msg:"Selecciona al menos una fuente de conocimiento."}),e.piiHandling||a.push({field:"piiHandling",msg:"Indica el manejo de PII."}),e.readWriteScope==="ReadWrite"&&(!e.writeConstraints||e.writeConstraints.trim().length===0)&&a.push({field:"writeConstraints",msg:"Si hay escritura, describe las restricciones."}),e.piiHandling&&e.piiHandling!=="NoPII"&&(!e.piiDoNotExpose||e.piiDoNotExpose.length===0)&&a.push({field:"piiDoNotExpose",msg:"Indica qué datos PII nunca debe exponer."}),a}function I(s){const a=[],e=s.conversationUX||{};return(!e.welcomeMessage||e.welcomeMessage.trim().length<2)&&a.push({field:"welcomeMessage",msg:"El mensaje de bienvenida es corto."}),(!e.topFaqExamples||e.topFaqExamples.filter(t=>t.trim().length>=3).length<1)&&a.push({field:"topFaqExamples",msg:"Agrega al menos 1 pregunta frecuente (mín. 3 caracteres)."}),e.fallbackBehavior||a.push({field:"fallbackBehavior",msg:"Selecciona el comportamiento."}),a}function j(s){const a=[],e=s.security||{};return(!e.neverReveal||e.neverReveal.length===0)&&a.push({field:"neverReveal",msg:"Indica al menos un tipo de información que nunca debe revelar."}),e.loggingLevel||a.push({field:"loggingLevel",msg:"Selecciona el nivel de logging."}),a}const T=[L,w,P,R,I,j,()=>[]];class N{constructor(){this.currentStep=0,this.totalSteps=7,this.steps=[],this.state=this.getDefaultState();const a=q();a&&(this.state={...this.state,...a.state},this.currentStep=a.currentStep||0)}getDefaultState(){return{prereqs:{orgType:"",einsteinStatus:"",agentforceStatus:"",userRole:"",channelsPlanned:[]},agentDefinition:{agentName:"",agentType:"",primaryArea:"",language:"Español",tone:"",oneLineGoal:""},capabilities:{allowedActions:[],restrictedActions:[],autonomyLevel:"",approvalRequiredFor:[],handoffRules:""},dataSources:{sfObjectsUsed:[],readWriteScope:"",criticalFields:[],knowledgeSources:[],writeConstraints:"",piiHandling:"",piiDoNotExpose:[]},conversationUX:{welcomeMessage:"",topFaqExamples:["","",""],fallbackBehavior:""},security:{neverReveal:[],loggingLevel:""}}}registerSteps(a){this.steps=a}render(){this.renderProgressBar(),this.renderStep(),this.updateNavigation(),this.save()}renderProgressBar(){const a=document.getElementById("progress-steps"),e=document.getElementById("progress-fill"),t=["Prerrequisitos","Definición","Capacidades","Datos","Conversación","Seguridad","Resumen"];a.innerHTML=t.map((n,i)=>{let r="progress-step";return i<this.currentStep&&(r+=" completed"),i===this.currentStep&&(r+=" active"),`
        <div class="${r}" data-step="${i}">
          <div class="progress-step__dot">${i<this.currentStep?"✓":i+1}</div>
          <span class="progress-step__label">${n}</span>
        </div>
      `}).join(""),e.style.width=`${(this.currentStep+1)/this.totalSteps*100}%`,a.querySelectorAll(".progress-step.completed, .progress-step.active").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.dataset.step);i<=this.currentStep&&(this.currentStep=i,this.render())})})}renderStep(){const a=document.getElementById("wizard-container");if(this.steps[this.currentStep]){a.innerHTML="";const e=this.steps[this.currentStep].render(this.state);a.innerHTML=e,this.steps[this.currentStep].afterRender&&this.steps[this.currentStep].afterRender(this.state,this)}}updateNavigation(){const a=document.getElementById("btn-prev"),e=document.getElementById("btn-next"),t=document.getElementById("step-indicator");a.style.visibility=this.currentStep===0?"hidden":"visible",this.currentStep===this.totalSteps-1?(e.innerHTML=`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Finalizar
      `,e.classList.remove("btn-primary"),e.classList.add("btn-success")):(e.innerHTML=`
        Siguiente
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      `,e.classList.add("btn-primary"),e.classList.remove("btn-success")),t.textContent=`Paso ${this.currentStep+1} de ${this.totalSteps}`}next(){try{this.steps[this.currentStep]&&this.steps[this.currentStep].collect&&this.steps[this.currentStep].collect(this.state);const a=T[this.currentStep](this.state);if(a.length>0){this.showErrors(a);return}this.clearErrors(),this.currentStep<this.totalSteps-1&&(this.currentStep++,this.render(),window.scrollTo({top:0,behavior:"smooth"}))}catch(a){console.error(a),this.toast(`Error inesperado: ${a.message}`,"error")}}prev(){this.steps[this.currentStep]&&this.steps[this.currentStep].collect&&this.steps[this.currentStep].collect(this.state),this.currentStep>0&&(this.currentStep--,this.render(),window.scrollTo({top:0,behavior:"smooth"}))}showErrors(a){a.forEach(e=>{const t=document.querySelector(`[data-field="${e.field}"]`);if(t){t.classList.add("error");const n=t.parentElement.querySelector(".input-error-msg");n&&(n.textContent=e.msg,n.classList.add("visible"))}}),this.toast(a[0].msg,"error")}clearErrors(){document.querySelectorAll(".error").forEach(a=>a.classList.remove("error")),document.querySelectorAll(".input-error-msg.visible").forEach(a=>a.classList.remove("visible"))}toast(a,e="info"){const t=document.getElementById("toast-container"),n=document.createElement("div");n.className=`toast ${e}`,n.textContent=a,t.appendChild(n),setTimeout(()=>n.remove(),4e3)}save(){k({state:this.state,currentStep:this.currentStep})}reset(){confirm("¿Estás seguro de que quieres reiniciar todo? Se perderá todo el progreso.")&&(C(),this.state=this.getDefaultState(),this.currentStep=0,this.render(),this.toast("Wizard reiniciado correctamente.","info"))}}const D={render(s){const a=s.prereqs;return`
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
              ${["Production","Sandbox","Developer"].map(e=>`
                <label class="radio-card ${a.orgType===e?"selected":""}">
                  <input type="radio" name="orgType" value="${e}" ${a.orgType===e?"checked":""}>
                  <span class="check-icon"></span>
                  <span class="check-label">${e==="Production"?"Producción":e}</span>
                </label>
              `).join("")}
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
              ${["Yes","No","Unknown"].map(e=>{const t=e==="Yes"?"Sí":e==="No"?"No":"No sé";return`
                  <label class="radio-card ${a.einsteinStatus===e?"selected":""}">
                    <input type="radio" name="einsteinStatus" value="${e}" ${a.einsteinStatus===e?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t}</span>
                  </label>
                `}).join("")}
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
              ${["Yes","No","Unknown"].map(e=>{const t=e==="Yes"?"Sí":e==="No"?"No":"No sé";return`
                  <label class="radio-card ${a.agentforceStatus===e?"selected":""}">
                    <input type="radio" name="agentforceStatus" value="${e}" ${a.agentforceStatus===e?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t}</span>
                  </label>
                `}).join("")}
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
              ${[{v:"Admin",l:"Administrador"},{v:"Configurator",l:"Configurador"},{v:"BusinessUser",l:"Usuario de negocio"},{v:"Unknown",l:"No sé"}].map(({v:e,l:t})=>`
                <label class="radio-card ${a.userRole===e?"selected":""}">
                  <input type="radio" name="userRole" value="${e}" ${a.userRole===e?"checked":""}>
                  <span class="check-icon"></span>
                  <span class="check-label">${t}</span>
                </label>
              `).join("")}
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
              ${["Web","WhatsApp","Email","Slack","Teams","Phone","Other"].map(e=>{const t={Web:"Web",WhatsApp:"WhatsApp",Email:"Email",Slack:"Slack",Teams:"Teams",Phone:"Teléfono",Other:"Otro"},n=(a.channelsPlanned||[]).includes(e);return`
                  <label class="checkbox-card ${n?"selected":""}">
                    <input type="checkbox" name="channelsPlanned" value="${e}" ${n?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t[e]}</span>
                  </label>
                `}).join("")}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>

        <!-- Dynamic checklist -->
        <div id="dynamic-checklist"></div>
      </div>
    `},afterRender(s,a){document.querySelectorAll(".radio-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.querySelector("input").name;document.querySelectorAll(`input[name="${t}"]`).forEach(n=>{n.closest(".radio-card").classList.remove("selected")}),e.classList.add("selected"),e.querySelector("input").checked=!0,this.collect(s),this.updateConditionalUI(s)})}),document.querySelectorAll(".checkbox-card").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const n=e.querySelector("input");n.checked=!n.checked,e.classList.toggle("selected",n.checked),this.collect(s)})}),this.updateConditionalUI(s)},updateConditionalUI(s){const a=s.prereqs,e=document.getElementById("einstein-info");e&&(a.einsteinStatus==="No"?e.innerHTML='<div class="info-box error"><span class="info-box__icon">🚫</span><div><strong>Einstein no está activo.</strong><br>Es un prerequisito obligatorio. Ve a Setup → Einstein → Einstein Platform → Habilitar. Necesitarás la licencia Einstein.</div></div>':a.einsteinStatus==="Unknown"?e.innerHTML='<div class="info-box warning"><span class="info-box__icon">⚠️</span><div><strong>Verifica el estado de Einstein.</strong><br>Ve a Setup → busca "Einstein" → verifica que Einstein Platform esté habilitado.</div></div>':e.innerHTML="");const t=document.getElementById("agentforce-info");t&&(a.agentforceStatus==="No"?t.innerHTML='<div class="info-box error"><span class="info-box__icon">🚫</span><div><strong>Agentforce no está activado.</strong><br>Contacta a tu Account Executive de Salesforce para obtener la licencia. Luego activa en Setup → Agentforce.</div></div>':a.agentforceStatus==="Unknown"?t.innerHTML='<div class="info-box warning"><span class="info-box__icon">⚠️</span><div><strong>Verifica Agentforce.</strong><br>Ve a Setup → busca "Agentforce" → verifica que esté activado.</div></div>':t.innerHTML="");const n=document.getElementById("role-info");n&&(a.userRole&&a.userRole!=="Admin"?n.innerHTML='<div class="info-box warning"><span class="info-box__icon">⚠️</span><div><strong>Permisos limitados.</strong><br>Para configurar Agentforce necesitas acceso de Administrador. Coordina con un Admin para las configuraciones en Setup, o solicita que te asignen los Permission Sets necesarios.</div></div>':n.innerHTML="")},collect(s){const a=document.querySelector('input[name="orgType"]:checked'),e=document.querySelector('input[name="einsteinStatus"]:checked'),t=document.querySelector('input[name="agentforceStatus"]:checked'),n=document.querySelector('input[name="userRole"]:checked'),i=[...document.querySelectorAll('input[name="channelsPlanned"]:checked')].map(r=>r.value);s.prereqs.orgType=a?a.value:"",s.prereqs.einsteinStatus=e?e.value:"",s.prereqs.agentforceStatus=t?t.value:"",s.prereqs.userRole=n?n.value:"",s.prereqs.channelsPlanned=i}},B={render(s){const a=s.agentDefinition;return`
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
          <input type="text" class="input" data-field="agentName" placeholder="Ej: Asistente de Ventas LatAm" value="${a.agentName||""}" maxlength="60">
          <div class="char-counter"><span id="agentName-count">${(a.agentName||"").length}</span>/60</div>
          <div class="input-error-msg"></div>
        </div>

        <!-- Tipo de agente -->
        <div class="form-group">
          <label class="form-label">
            Tipo de agente <span class="required">*</span>
            <span class="tooltip-trigger" data-tooltip="Basado en los tipos principales de Agentforce: SDR (prospección), Service (soporte), Sales Coach, Commerce, o personalizado.">?</span>
          </label>
          <div class="radio-group" data-field="agentType">
            ${[{v:"SDR",l:"🎯 SDR — Ventas y prospección",desc:"Outreach, calificación de leads, agendamiento"},{v:"Direction",l:"📊 Dirección — Reporting ejecutivo",desc:"Resúmenes, KPIs, análisis de pipeline"},{v:"Support",l:"🎧 Soporte — Servicio al cliente",desc:"Resolución de casos, Knowledge Base, escalamiento"},{v:"Ops",l:"⚙️ Operaciones — Procesos internos",desc:"Automatización interna, procesos, eficiencia"},{v:"Onboarding",l:"🚀 Onboarding — Incorporación",desc:"Guía a nuevos empleados o clientes"},{v:"Custom",l:"🔧 Custom — Personalizado",desc:"Caso de uso específico no cubierto"}].map(({v:e,l:t,desc:n})=>`
              <label class="radio-card ${a.agentType===e?"selected":""}" style="flex-basis:45%; flex-direction:column; align-items:flex-start; gap:4px; padding: var(--sp-4);">
                <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                  <input type="radio" name="agentType" value="${e}" ${a.agentType===e?"checked":""}>
                  <span class="check-icon"></span>
                  <span class="check-label">${t}</span>
                </div>
                <span style="font-size:0.75rem; color:var(--text-muted); padding-left:32px;">${n}</span>
              </label>
            `).join("")}
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
            ${["Ventas","Prospección y Ventas","Soporte","Dirección","Operaciones","Otro"].map(e=>`<option value="${e}" ${a.primaryArea===e?"selected":""}>${e}</option>`).join("")}
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
            <input type="text" class="input" data-field="language" placeholder="Ej: Español" value="${a.language||"Español"}" maxlength="10">
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
              ${[{v:"Formal",l:"Formal — Profesional y corporativo"},{v:"Cercano",l:"Cercano — Empático y conversacional"},{v:"Técnico",l:"Técnico — Preciso y especializado"},{v:"Neutro",l:"Neutro — Objetivo y balanceado"}].map(({v:e,l:t})=>`<option value="${e}" ${a.tone===e?"selected":""}>${t}</option>`).join("")}
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
          <textarea class="textarea" data-field="oneLineGoal" placeholder="Ej: Calificar y nutrir leads de forma autónoma, respondiendo preguntas y agendando reuniones con el equipo de ventas." maxlength="200">${a.oneLineGoal||""}</textarea>
          <div class="char-counter"><span id="oneLineGoal-count">${(a.oneLineGoal||"").length}</span>/200</div>
          <div class="input-error-msg"></div>
        </div>
      </div>
    `},afterRender(s){document.querySelectorAll(".radio-card").forEach(t=>{t.addEventListener("click",()=>{const n=t.querySelector("input").name;document.querySelectorAll(`input[name="${n}"]`).forEach(i=>{i.closest(".radio-card").classList.remove("selected")}),t.classList.add("selected"),t.querySelector("input").checked=!0})});const a=document.querySelector('[data-field="agentName"]');a&&a.addEventListener("input",()=>{document.getElementById("agentName-count").textContent=a.value.length});const e=document.querySelector('[data-field="oneLineGoal"]');e&&e.addEventListener("input",()=>{document.getElementById("oneLineGoal-count").textContent=e.value.length})},collect(s){var e,t,n,i,r;s.agentDefinition.agentName=(((e=document.querySelector('[data-field="agentName"]'))==null?void 0:e.value)||"").trim();const a=document.querySelector('input[name="agentType"]:checked');s.agentDefinition.agentType=a?a.value:"",s.agentDefinition.primaryArea=((t=document.querySelector('[data-field="primaryArea"]'))==null?void 0:t.value)||"",s.agentDefinition.language=(((n=document.querySelector('[data-field="language"]'))==null?void 0:n.value)||"").trim(),s.agentDefinition.tone=((i=document.querySelector('[data-field="tone"]'))==null?void 0:i.value)||"",s.agentDefinition.oneLineGoal=(((r=document.querySelector('[data-field="oneLineGoal"]'))==null?void 0:r.value)||"").trim()}},O={render(s){const a=s.capabilities;return`
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
              ${[{v:"Consultar",l:"🔍 Consultar información",d:"Buscar en CRM y Knowledge Base"},{v:"CrearRegistros",l:"➕ Crear registros",d:"Crear Leads, Cases, Tasks, etc."},{v:"ActualizarRegistros",l:"✏️ Actualizar registros",d:"Modificar campos existentes"},{v:"Recomendar",l:"💡 Recomendar",d:"Sugerir acciones o productos"},{v:"Agendar",l:"📅 Agendar",d:"Programar reuniones y tareas"},{v:"Escalar",l:"🔄 Escalar a humano",d:"Transferir a un agente humano"}].map(({v:e,l:t,d:n})=>{const i=(a.allowedActions||[]).includes(e);return`
                  <label class="checkbox-card ${i?"selected":""}" style="flex-basis:45%; flex-direction:column; align-items:flex-start; gap:2px; padding:var(--sp-3) var(--sp-4);">
                    <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                      <input type="checkbox" name="allowedActions" value="${e}" ${i?"checked":""}>
                      <span class="check-icon"></span>
                      <span class="check-label">${t}</span>
                    </div>
                    <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${n}</span>
                  </label>
                `}).join("")}
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
              ${(a.restrictedActions||[]).map(e=>`<span class="tag">${e}<span class="tag__remove" data-val="${e}">×</span></span>`).join("")}
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
              ${[{v:"Assisted",l:"👤 Asistido",d:"Siempre solicita confirmación del usuario antes de actuar"},{v:"SemiAutonomous",l:"🤝 Semi-autónomo",d:"Consultas independientes, pero aprobación para escritura"},{v:"AutonomousWithApproval",l:"🚀 Autónomo con aprobación",d:"Opera solo, aprobación solo para acciones críticas"}].map(({v:e,l:t,d:n})=>`
                <label class="radio-card ${a.autonomyLevel===e?"selected":""}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="autonomyLevel" value="${e}" ${a.autonomyLevel===e?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${n}</span>
                </label>
              `).join("")}
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
              ${(a.approvalRequiredFor||[]).map(e=>`<span class="tag">${e}<span class="tag__remove" data-val="${e}">×</span></span>`).join("")}
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
            <textarea class="textarea" data-field="handoffRules" placeholder="Ej: Escalar cuando el cliente solicite hablar con un humano, cuando no se resuelva en 2 intentos, cuando se requiera autorización especial de un supervisor, o cuando el tema sea médico/legal." maxlength="400">${a.handoffRules||""}</textarea>
            <div class="char-counter"><span id="handoff-count">${(a.handoffRules||"").length}</span>/400</div>
            <div class="input-error-msg"></div>
          </div>
        </div>
      </div>
    `},afterRender(s){document.querySelectorAll(".checkbox-card").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const i=t.querySelector("input");i.checked=!i.checked,t.classList.toggle("selected",i.checked)})}),document.querySelectorAll(".radio-card").forEach(t=>{t.addEventListener("click",()=>{const n=t.querySelector("input").name;if(document.querySelectorAll(`input[name="${n}"]`).forEach(i=>{i.closest(".radio-card").classList.remove("selected")}),t.classList.add("selected"),t.querySelector("input").checked=!0,n==="autonomyLevel"){const i=t.querySelector("input").value,r=document.getElementById("approval-section");r&&(r.style.display=i!=="Assisted"?"block":"none")}})});const a=s.capabilities.autonomyLevel;if(a&&a!=="Assisted"){const t=document.getElementById("approval-section");t&&(t.style.display="block")}this.setupTagsInput("restrictedActions-input","restrictedActions-tags",s.capabilities.restrictedActions),this.setupTagsInput("approvalActions-input","approvalActions-tags",s.capabilities.approvalRequiredFor);const e=document.querySelector('[data-field="handoffRules"]');e&&e.addEventListener("input",()=>{document.getElementById("handoff-count").textContent=e.value.length})},setupTagsInput(s,a,e){const t=document.getElementById(s),n=document.getElementById(a);!t||!n||(t.addEventListener("keydown",i=>{if(i.key==="Enter"&&t.value.trim()){i.preventDefault();const r=t.value.trim();if(!e.includes(r)){e.push(r);const o=document.createElement("span");o.className="tag",o.innerHTML=`${r}<span class="tag__remove" data-val="${r}">×</span>`,n.insertBefore(o,t),o.querySelector(".tag__remove").addEventListener("click",()=>{const c=e.indexOf(r);c>-1&&e.splice(c,1),o.remove()})}t.value=""}}),n.querySelectorAll(".tag__remove").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.val,o=e.indexOf(r);o>-1&&e.splice(o,1),i.closest(".tag").remove()})}))},collect(s){var e;s.capabilities.allowedActions=[...document.querySelectorAll('input[name="allowedActions"]:checked')].map(t=>t.value);const a=document.querySelector('input[name="autonomyLevel"]:checked');s.capabilities.autonomyLevel=a?a.value:"",s.capabilities.handoffRules=(((e=document.querySelector('[data-field="handoffRules"]'))==null?void 0:e.value)||"").trim()}},M={render(s){const a=s.dataSources;return`
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
              ${["Lead","Contact","Account","Case","Opportunity","CustomObject"].map(e=>{const t={Lead:"👤 Lead",Contact:"📇 Contact",Account:"🏢 Account",Case:"📋 Case",Opportunity:"💰 Opportunity",CustomObject:"🔧 Custom Object"},n=(a.sfObjectsUsed||[]).includes(e);return`
                  <label class="checkbox-card ${n?"selected":""}">
                    <input type="checkbox" name="sfObjectsUsed" value="${e}" ${n?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t[e]}</span>
                  </label>
                `}).join("")}
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
              ${[{v:"ReadOnly",l:"🔍 Solo lectura",d:"Consulta datos sin modificarlos"},{v:"ReadWrite",l:"✏️ Lectura y escritura",d:"Puede crear y actualizar registros"}].map(({v:e,l:t,d:n})=>`
                <label class="radio-card ${a.readWriteScope===e?"selected":""}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="readWriteScope" value="${e}" ${a.readWriteScope===e?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${n}</span>
                </label>
              `).join("")}
            </div>
            <div class="input-error-msg"></div>
          </div>

          <!-- Restricciones escritura (condicional) -->
          <div class="form-group" id="write-constraints-section" style="display:${a.readWriteScope==="ReadWrite"?"block":"none"};">
            <label class="form-label">
              Restricciones de escritura <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Define qué restricciones aplican a las operaciones de escritura. Ej: 'Solo puede crear Cases, no puede borrar registros, montos <$500'.">?</span>
            </label>
            <textarea class="textarea" data-field="writeConstraints" placeholder="Ej: Solo puede crear Cases y Tasks, no puede eliminar registros, actualizaciones limitadas a campos específicos...">${a.writeConstraints||""}</textarea>
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
              ${(a.criticalFields||[]).map(e=>`<span class="tag">${e}<span class="tag__remove" data-val="${e}">×</span></span>`).join("")}
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
              ${[{v:"SalesforceKnowledge",l:"📖 Salesforce Knowledge"},{v:"Files",l:"📁 Archivos / Data Library"},{v:"URLs",l:"🌐 URLs externas"},{v:"None",l:"❌ Ninguna"}].map(({v:e,l:t})=>{const n=(a.knowledgeSources||[]).includes(e);return`
                  <label class="checkbox-card ${n?"selected":""}">
                    <input type="checkbox" name="knowledgeSources" value="${e}" ${n?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t}</span>
                  </label>
                `}).join("")}
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
              ${[{v:"NoPII",l:"No contiene PII",d:"Los datos no incluyen información personal identificable"},{v:"ContainsPIIWithRedaction",l:"Contiene PII con redacción",d:"Einstein Trust Layer aplica Data Masking automático (Ej: XXXX-1234)"},{v:"ContainsPIIRestricted",l:"Contiene PII restringida",d:"Datos altamente sensibles con acceso controlado estrictamente"}].map(({v:e,l:t,d:n})=>`
                <label class="radio-card ${a.piiHandling===e?"selected":""}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="piiHandling" value="${e}" ${a.piiHandling===e?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${t}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${n}</span>
                </label>
              `).join("")}
            </div>
            <div class="input-error-msg"></div>
          </div>

          <!-- PII list (condicional) -->
          <div class="form-group" id="pii-list-section" style="display:${a.piiHandling&&a.piiHandling!=="NoPII"?"block":"none"};">
            <label class="form-label">
              Datos PII que nunca debe exponer <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Lista los tipos de datos que el agente NUNCA debe mostrar al usuario. Ej: 'Número de tarjeta', 'SSN', 'Contraseñas'.">?</span>
            </label>
            <div class="tags-input" id="piiDoNotExpose-tags" data-field="piiDoNotExpose">
              ${(a.piiDoNotExpose||[]).map(e=>`<span class="tag">${e}<span class="tag__remove" data-val="${e}">×</span></span>`).join("")}
              <input type="text" class="tags-input__field" placeholder="Ej: Número de tarjeta..." id="piiDoNotExpose-input">
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>
      </div>
    `},afterRender(s){const a=s.dataSources;document.querySelectorAll(".checkbox-card").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const n=e.querySelector("input");n.checked=!n.checked,e.classList.toggle("selected",n.checked)})}),document.querySelectorAll(".radio-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.querySelector("input").name;if(document.querySelectorAll(`input[name="${t}"]`).forEach(n=>{n.closest(".radio-card").classList.remove("selected")}),e.classList.add("selected"),e.querySelector("input").checked=!0,t==="readWriteScope"){const n=e.querySelector("input").value;document.getElementById("write-constraints-section").style.display=n==="ReadWrite"?"block":"none"}if(t==="piiHandling"){const n=e.querySelector("input").value;document.getElementById("pii-list-section").style.display=n!=="NoPII"?"block":"none"}})}),this.setupTagsInput("criticalFields-input","criticalFields-tags",a.criticalFields),this.setupTagsInput("piiDoNotExpose-input","piiDoNotExpose-tags",a.piiDoNotExpose)},setupTagsInput(s,a,e){const t=document.getElementById(s),n=document.getElementById(a);!t||!n||(t.addEventListener("keydown",i=>{if(i.key==="Enter"&&t.value.trim()){i.preventDefault();const r=t.value.trim();if(!e.includes(r)){e.push(r);const o=document.createElement("span");o.className="tag",o.innerHTML=`${r}<span class="tag__remove" data-val="${r}">×</span>`,n.insertBefore(o,t),o.querySelector(".tag__remove").addEventListener("click",()=>{const c=e.indexOf(r);c>-1&&e.splice(c,1),o.remove()})}t.value=""}}),n.querySelectorAll(".tag__remove").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.val,o=e.indexOf(r);o>-1&&e.splice(o,1),i.closest(".tag").remove()})}))},collect(s){var t;s.dataSources.sfObjectsUsed=[...document.querySelectorAll('input[name="sfObjectsUsed"]:checked')].map(n=>n.value);const a=document.querySelector('input[name="readWriteScope"]:checked');s.dataSources.readWriteScope=a?a.value:"",s.dataSources.writeConstraints=(((t=document.querySelector('[data-field="writeConstraints"]'))==null?void 0:t.value)||"").trim(),s.dataSources.knowledgeSources=[...document.querySelectorAll('input[name="knowledgeSources"]:checked')].map(n=>n.value);const e=document.querySelector('input[name="piiHandling"]:checked');s.dataSources.piiHandling=e?e.value:""}},z={SDR:"SDR de ventas y prospección",Direction:"Dirección / reporting ejecutivo",Support:"Soporte y servicio al cliente",Ops:"Operaciones internas",Onboarding:"Onboarding de empleados/clientes",Custom:"Agente personalizado"},U={Formal:"profesional y formal",Cercano:"cercano, empático y conversacional",Técnico:"técnico y preciso",Neutro:"neutro y objetivo"},F={Consultar:"Consultar información en el CRM",CrearRegistros:"Crear nuevos registros",ActualizarRegistros:"Actualizar registros existentes",Recomendar:"Proveer recomendaciones",Agendar:"Agendar reuniones o tareas",Escalar:"Escalar casos a agentes humanos"};function h(s){const a=s.agentDefinition||{},e=s.capabilities||{},t=s.dataSources||{},n=s.conversationUX||{},i=s.security||{},r=z[a.agentType]||a.agentType,o=U[a.tone]||a.tone,c=(e.allowedActions||[]).map(u=>F[u]||u).join(", "),l=(e.restrictedActions||[]).length>0?(e.restrictedActions||[]).join(`
- `):"Ninguna especificada";return`# SYSTEM PROMPT — ${a.agentName.toUpperCase()} ENTERPRISE EDITION

## 🔹 Identidad
Eres "${a.agentName}", un agente digital de tipo ${r} especializado en ${a.primaryArea||"general"}.

**Idioma principal:** ${a.language||"Español"}
**Tono:** ${o} (Profesional, cercano, empático y conversacional).
**Estilo:** Consultivo, no agresivo, orientado a entender antes de vender.

> ⚠️ **IMPORTANTE:** No eres un "cerrador" de ventas. Eres un calificador estratégico que genera pipeline de calidad.

## 🔹 Objetivo Principal
${a.oneLineGoal||"Calificar prospectos y agendar reuniones."}

**Tus responsabilidades:**
1. Guiar la conversación de manera natural.
2. Identificar la necesidad real del usuario.
3. Aplicar el marco de calificación (BANT) si es una conversación comercial.
4. Crear leads únicamente cuando cumplan criterios.
5. Escalar a humano cuando corresponda.

---

## 🔹 Marco de Calificación (Obligatorio – BANT)
Debes aplicar el modelo BANT en toda conversación de intención comercial.

**1. Budget (Presupuesto):** ¿Existe presupuesto asignado? ¿Tienen capacidad de inversión?
**2. Authority (Autoridad):** ¿Hablas con un decisor o influenciador?
**3. Need (Necesidad):** ¿Existe un problema claro que resolvemos? ¿Hay impacto operativo/estratégico?
**4. Timeline (Tiempo):** ¿Cuándo planean implementar?

### 🚦 Clasificación de Leads
- **SQL (Sales Qualified Lead):** Cumple 3+ criterios BANT. -> **ACCIÓN:** Crear Lead, Agendar Reunión.
- **MQL (Marketing Qualified Lead):** Cumple 2 criterios. -> **ACCIÓN:** Crear Lead, Registrar nota, NO agendar.
- **No Calificado:** < 2 criterios. -> **ACCIÓN:** Registrar interacción, cerrar amablemente.

> **Nunca crear Opportunity directamente.**

---

## 🔹 Capacidades Permitidas
Puedes:
- ${c}
- Registrar tareas o actividades.
- Consultar CRM.

## ⛔ Acciones Restringidas
El agente **NO** está autorizado a:
- ${l}
- Ofrecer descuentos o negociar precios.
- Generar contratos o propuestas formales.
- Modificar oportunidades de otros Account Executives.
- **Si el prospecto solicita esto:** Escalar inmediatamente a humano.

## 🔹 Nivel de Autonomía: ${e.autonomyLevel||"Asistido"}
${e.approvalRequiredFor&&e.approvalRequiredFor.length>0?`**Requiere aprobación humana para:**
- ${e.approvalRequiredFor.join(`
- `)}`:""}

## 🔹 Reglas de Escalamiento
${e.handoffRules||"Escalar si hay fricción o solicitud explícita."}

---

## 🔹 Datos Disponibles
- **Objetos Salesforce:** ${(t.sfObjectsUsed||[]).join(", ")}
- **Alcance:** ${t.readWriteScope}
- **Restricciones de Escritura:** ${t.writeConstraints||"N/A"}
- **Campos Críticos:** ${(t.criticalFields||[]).join(", ")}

## 🔹 Comportamiento Conversacional
**Mensaje de Bienvenida:** "${n.welcomeMessage||""}"

**Antes de responder:**
1. ¿Qué pregunta realmente el usuario?
2. ¿Es intención informativa o comercial?
3. ¿Debo calificar (BANT)?
4. ¿Necesito más información?

**Reglas:**
- No inventes información. Si no sabes, verifica.
- Usa listas para explicaciones complejas.
- Mantén un tono profesional pero natural.
- **No seas insistente.**

**Preguntas Frecuentes que dominas:**
${(n.topFaqExamples||[]).map((u,m)=>`${m+1}. ${u}`).join(`
`)}

---

## 🛡️ Seguridad y Guardrails
**NUNCA REVELAR:**
- ${(i.neverReveal||[]).join(`
- `)}
- ${(t.piiDoNotExpose||[]).join(`
- `)}

**Documentación Obligatoria:**
Debes registrar el Resultado de calificación, Nivel BANT y Próximo paso.

## 🔹 Principios Finales
- Eres un filtro inteligente.
- Prioriza calidad sobre volumen.
- No persigas, guía.
- No cierres, califica.
- No negocies, escala.

✅ Listo para producción Agentforce.`}function S(s){const a=s.agentDefinition||{},e=s.capabilities||{},t=s.conversationUX||{},n=t.topFaqExamples||[],i=a.agentName||"Agente",r=[],o=H(a.agentType,i,n,e,t,a);for(let c=0;c<Math.min(10,o.length);c++)r.push(o[c]);return r}function H(s,a,e,t,n,i){const o=[{title:"Saludo y bienvenida",messages:[{role:"agent",text:n.welcomeMessage||`¡Hola! Soy ${a}, ¿en qué puedo ayudarte?`},{role:"user",text:"Hola, necesito ayuda."},{role:"agent",text:`¡Hola! Con gusto te ayudo. Soy ${a}. ¿Podrías indicarme en qué necesitas asistencia?`}]},...e[0]?[{title:`Pregunta frecuente: "${e[0].substring(0,40)}..."`,messages:[{role:"user",text:e[0]},{role:"agent",text:"Excelente pregunta. Permíteme consultar la información relevante para darte una respuesta precisa..."}]}]:[],...e[1]?[{title:`Pregunta frecuente: "${e[1].substring(0,40)}..."`,messages:[{role:"user",text:e[1]},{role:"agent",text:"Claro, te explico. Basándome en los datos disponibles..."}]}]:[],...e[2]?[{title:`Pregunta frecuente: "${e[2].substring(0,40)}..."`,messages:[{role:"user",text:e[2]},{role:"agent",text:"Entendido, déjame revisar eso para ti..."}]}]:[]],c={SDR:[{title:"Prospecto solicita información de producto",messages:[{role:"user",text:"Quiero saber más sobre sus soluciones para mi empresa."},{role:"agent",text:"¡Con gusto! Para darte información personalizada, ¿podrías indicarme el nombre de tu empresa y a qué industria pertenecen?"},{role:"user",text:"Somos TechCorp, estamos en tecnología con 200 empleados."},{role:"agent",text:"Perfecto. Para empresas de tecnología como TechCorp, nuestras soluciones más relevantes son... ¿Te gustaría agendar una reunión con un especialista para profundizar?"}]},{title:"Agendamiento de reunión",messages:[{role:"user",text:"Me interesa agendar una reunión con un representante."},{role:"agent",text:"¡Excelente! ¿Qué días y horarios te funcionan mejor esta semana? Tenemos disponibilidad en las mañanas y tardes."},{role:"user",text:"El jueves en la tarde estaría bien."},{role:"agent",text:"Perfecto. He agendado una reunión para el jueves a las 3:00 PM. Recibirás una invitación con el enlace de la videollamada. ¿Hay algún tema específico que quieras abordar?"}]},{title:"Calificación de lead",messages:[{role:"user",text:"Estamos buscando automatizar nuestro proceso de ventas."},{role:"agent",text:"¡Interesante! Para entender mejor sus necesidades: ¿Cuál es el tamaño de su equipo de ventas? ¿Actualmente usan algún CRM?"},{role:"user",text:"Somos 15 vendedores y usamos hojas de cálculo."},{role:"agent",text:"Entendido. Con un equipo de 15 y sin CRM actual, podrían beneficiarse significativamente. ¿Tienen un presupuesto estimado y un timeline para la implementación?"}]}],Support:[{title:"Resolución de caso técnico",messages:[{role:"user",text:"No puedo acceder a mi cuenta, me dice error de autenticación."},{role:"agent",text:"Lamento el inconveniente. Para ayudarte, necesito verificar tu identidad. ¿Podrías proporcionarme tu correo electrónico registrado?"},{role:"user",text:"Mi correo es juan@empresa.com"},{role:"agent",text:"He localizado tu cuenta. Veo que hubo un intento de inicio de sesión fallido hace 30 minutos. Te he enviado un enlace de restablecimiento de contraseña a tu correo. ¿Hay algo más en lo que pueda ayudarte?"}]},{title:"Solicitud de escalamiento",messages:[{role:"user",text:"Llevo una semana con este problema y nadie me resuelve. Quiero hablar con un supervisor."},{role:"agent",text:"Entiendo tu frustración y lamento mucho la experiencia. Voy a escalar tu caso inmediatamente a un supervisor con todo el contexto de tu situación. ¿Me permites un momento para realizar la transferencia?"},{role:"user",text:"Sí, por favor."},{role:"agent",text:"He escalado tu caso #12345 al supervisor María García. Ella revisará tu historial completo y te contactará en los próximos 30 minutos. ¿Hay algo más que deba saber antes de la transferencia?"}]},{title:"Seguimiento de pedido",messages:[{role:"user",text:"¿Cuál es el estado de mi pedido #78901?"},{role:"agent",text:"Permíteme consultar tu pedido... Tu pedido #78901 fue enviado el lunes y está en tránsito. La entrega estimada es para el viernes. ¿Deseas que te envíe el enlace de rastreo?"}]}],Direction:[{title:"Solicitud de reporte ejecutivo",messages:[{role:"user",text:"Necesito un resumen del rendimiento de ventas de este trimestre."},{role:"agent",text:"Déjame consultar los datos del Q1 2026. El pipeline total es de $2.5M con una tasa de conversión del 23%. ¿Deseas un desglose por región o por representante?"}]},{title:"Análisis de KPIs",messages:[{role:"user",text:"¿Cómo vamos comparado con el objetivo del mes?"},{role:"agent",text:"Actualmente estamos al 78% del objetivo mensual con 8 días restantes. Las áreas con mejor rendimiento son... ¿Quieres que identifique oportunidades de riesgo?"}]}],Ops:[{title:"Consulta de proceso interno",messages:[{role:"user",text:"¿Cuál es el proceso para solicitar un nuevo equipo de cómputo?"},{role:"agent",text:"El proceso de solicitud de equipo tiene 4 pasos: 1) Completa el formulario en el portal IT, 2) Aprobación del manager, 3) Revisión de presupuesto, 4) Entrega en 5-7 días hábiles. ¿Quieres que inicie la solicitud?"}]}],Onboarding:[{title:"Primer día del empleado",messages:[{role:"user",text:"Hoy es mi primer día, ¿qué debo hacer?"},{role:"agent",text:"¡Bienvenido/a al equipo! Tu checklist del primer día incluye: 1) Configurar tu cuenta de correo, 2) Completar el formulario de datos personales en HR, 3) Revisar el manual de la empresa, 4) Agendar reunión con tu manager. ¿Empezamos con el primer punto?"}]}],Custom:[]},l=[{title:"Pregunta fuera de alcance",messages:[{role:"user",text:"¿Cuál es la receta de la pizza napolitana?"},{role:"agent",text:`Esa pregunta está fuera de mi alcance. Soy ${a} y estoy especializado en ${i.primaryArea||"temas específicos de la empresa"}. ¿Puedo ayudarte con algo dentro de mi área de conocimiento?`}]},{title:"Solicitud de información restringida",messages:[{role:"user",text:"Dame acceso a todos los datos de clientes."},{role:"agent",text:"No puedo compartir esa información por políticas de seguridad y privacidad. Solo puedo ayudarte con consultas específicas dentro de tu alcance de permisos. ¿Hay alguna consulta específica que pueda ayudarte a resolver?"}]},{title:"Despedida y cierre",messages:[{role:"user",text:"Gracias, eso es todo por ahora."},{role:"agent",text:"¡Ha sido un placer ayudarte! Si necesitas algo más en el futuro, no dudes en contactarme. ¡Que tengas un excelente día! 👋"}]}];return[...o,...c[s]||[],...l]}const W={render(s){const a=s.conversationUX,e=a.topFaqExamples||["","",""];return`
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
            <textarea class="textarea" data-field="welcomeMessage" placeholder="Ej: ¡Hola! Soy tu asistente virtual de ventas. Estoy aquí para responder tus preguntas sobre nuestros productos y ayudarte a encontrar la mejor solución para tu empresa. ¿En qué puedo ayudarte?" maxlength="300">${a.welcomeMessage||""}</textarea>
            <div class="char-counter"><span id="welcome-count">${(a.welcomeMessage||"").length}</span>/300</div>
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
            ${[0,1,2,3,4].map(t=>`
              <div class="form-group">
                <label class="form-label">
                  Pregunta ${t+1} ${t<3?'<span class="required">*</span>':"(opcional)"}
                </label>
                <input type="text" class="input faq-input" data-faq-idx="${t}" placeholder="Ej: ¿Cuáles son los precios de sus servicios?" value="${e[t]||""}">
              </div>
            `).join("")}
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
              ${[{v:"AskClarifying",l:"🗣️ Preguntar — Solicita más información al usuario",d:"El agente hace preguntas clarificadoras para entender mejor la solicitud"},{v:"Escalate",l:"🔄 Escalar — Transfiere a un agente humano",d:"Si no puede resolver, escala inmediatamente al equipo humano"},{v:"ProvideOptions",l:"📋 Ofrecer opciones — Presenta alternativas",d:"Muestra opciones predefinidas para que el usuario elija"}].map(({v:t,l:n,d:i})=>`
                <label class="radio-card ${a.fallbackBehavior===t?"selected":""}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="fallbackBehavior" value="${t}" ${a.fallbackBehavior===t?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${n}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${i}</span>
                </label>
              `).join("")}
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
    `},afterRender(s,a){document.querySelectorAll(".radio-card").forEach(i=>{i.addEventListener("click",()=>{const r=i.querySelector("input").name;document.querySelectorAll(`input[name="${r}"]`).forEach(o=>{o.closest(".radio-card").classList.remove("selected")}),i.classList.add("selected"),i.querySelector("input").checked=!0})});const e=document.querySelector('[data-field="welcomeMessage"]');e&&e.addEventListener("input",()=>{document.getElementById("welcome-count").textContent=e.value.length});const t=document.getElementById("btn-add-faq");t&&t.addEventListener("click",()=>{const r=document.querySelectorAll(".faq-input").length,o=document.createElement("div");o.className="form-group",o.innerHTML=`
          <label class="form-label">Pregunta ${r+1} (opcional)</label>
          <input type="text" class="input faq-input" data-faq-idx="${r}" placeholder="Ej: ¿Cómo puedo rastrear mi pedido?">
        `,t.parentElement.insertBefore(o,t)});const n=document.getElementById("btn-preview-prompt");n&&n.addEventListener("click",()=>{this.collect(s);const i=h(s),r=document.getElementById("prompt-preview-container");r.innerHTML=`
          <div class="prompt-preview">${i}</div>
        `})},collect(s){var n;s.conversationUX.welcomeMessage=(((n=document.querySelector('[data-field="welcomeMessage"]'))==null?void 0:n.value)||"").trim();const a=document.querySelectorAll(".faq-input"),e=[];a.forEach(i=>{i.value.trim()&&e.push(i.value.trim())}),s.conversationUX.topFaqExamples=e;const t=document.querySelector('input[name="fallbackBehavior"]:checked');s.conversationUX.fallbackBehavior=t?t.value:"",s.conversationUX.generatedSystemPrompt=h(s),s.conversationUX.testConversations=S(s)}},V={render(s){const a=s.security,e=s.capabilities;return`
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
              ${(a.neverReveal||[]).map(t=>`<span class="tag">${t}<span class="tag__remove" data-val="${t}">×</span></span>`).join("")}
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
        ${e.approvalRequiredFor&&e.approvalRequiredFor.length>0?`
          <div class="form-section">
            <h3 class="form-section__title"><span class="icon">✋</span> Acciones con Aprobación (del Paso 3)</h3>
            <div class="info-box info">
              <span class="info-box__icon">📋</span>
              <div>
                Las siguientes acciones requieren aprobación humana antes de ejecutarse:
                <ul style="margin-top:6px; padding-left:18px;">
                  ${e.approvalRequiredFor.map(t=>`<li>${t}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        `:""}

        <!-- Nivel de logging -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📊</span> Logging y Auditoría</h3>
          <div class="form-group">
            <label class="form-label">
              Nivel de logging <span class="required">*</span>
              <span class="tooltip-trigger" data-tooltip="Mínimo: solo errores. Estándar: conversaciones y acciones principales. Detallado: todo incluyendo razonamiento del agente.">?</span>
            </label>
            <div class="radio-group" data-field="loggingLevel" style="flex-direction:column;">
              ${[{v:"Minimal",l:"📉 Mínimo",d:"Solo errores y escalamientos. Menor consumo de almacenamiento."},{v:"Standard",l:"📊 Estándar (recomendado)",d:"Conversaciones, acciones ejecutadas y métricas principales."},{v:"Verbose",l:"📈 Detallado",d:"Todo: razonamiento del agente, prompts, respuestas, métricas granulares."}].map(({v:t,l:n,d:i})=>`
                <label class="radio-card ${a.loggingLevel===t?"selected":""}" style="flex-direction:column; align-items:flex-start; gap:2px;">
                  <div style="display:flex; align-items:center; gap:var(--sp-3); width:100%">
                    <input type="radio" name="loggingLevel" value="${t}" ${a.loggingLevel===t?"checked":""}>
                    <span class="check-icon"></span>
                    <span class="check-label">${n}</span>
                  </div>
                  <span style="font-size:0.7rem; color:var(--text-muted); padding-left:32px;">${i}</span>
                </label>
              `).join("")}
            </div>
            <div class="input-error-msg"></div>
          </div>
        </div>
      </div>
    `},afterRender(s){document.querySelectorAll(".radio-card").forEach(a=>{a.addEventListener("click",()=>{const e=a.querySelector("input").name;document.querySelectorAll(`input[name="${e}"]`).forEach(t=>{t.closest(".radio-card").classList.remove("selected")}),a.classList.add("selected"),a.querySelector("input").checked=!0})}),this.setupTagsInput("neverReveal-input","neverReveal-tags",s.security.neverReveal)},setupTagsInput(s,a,e){const t=document.getElementById(s),n=document.getElementById(a);!t||!n||(t.addEventListener("keydown",i=>{if(i.key==="Enter"&&t.value.trim()){i.preventDefault();const r=t.value.trim();if(!e.includes(r)){e.push(r);const o=document.createElement("span");o.className="tag",o.innerHTML=`${r}<span class="tag__remove" data-val="${r}">×</span>`,n.insertBefore(o,t),o.querySelector(".tag__remove").addEventListener("click",()=>{const c=e.indexOf(r);c>-1&&e.splice(c,1),o.remove()})}t.value=""}}),n.querySelectorAll(".tag__remove").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.val,o=e.indexOf(r);o>-1&&e.splice(o,1),i.closest(".tag").remove()})}))},collect(s){const a=document.querySelector('input[name="loggingLevel"]:checked');s.security.loggingLevel=a?a.value:""}};function G(s){const a=[],e=s.prereqs||{},t=s.agentDefinition||{},n=s.capabilities||{},i=s.dataSources||{},r=s.security||{};if(a.push({category:"Pre-Deployment",text:"Einstein habilitado en la org",status:e.einsteinStatus==="Yes"?"done":e.einsteinStatus==="No"?"blocked":"pending",detail:e.einsteinStatus==="Yes"?"Einstein está activo.":"Ve a Setup → Einstein → Habilitar Einstein. Requiere licencia Einstein."}),a.push({category:"Pre-Deployment",text:"Agentforce activado",status:e.agentforceStatus==="Yes"?"done":e.agentforceStatus==="No"?"blocked":"pending",detail:e.agentforceStatus==="Yes"?"Agentforce está activo.":"Ve a Setup → Agentforce → Activar. Contacta a tu Account Executive de Salesforce si no tienes la licencia."}),a.push({category:"Pre-Deployment",text:"Usuario agente con licencia Einstein Agent User",status:"pending",detail:'Crea un usuario dedicado con el perfil "Einstein Agent User" y asigna el permission set correspondiente.'}),a.push({category:"Pre-Deployment",text:"Permission set asignado al agente",status:"pending",detail:t.agentType==="SDR"?'Asigna el "Agentforce SDR Agent permission set" al usuario del agente.':"Asigna el permission set correspondiente al tipo de agente."}),a.push({category:"Pre-Deployment",text:"Data Cloud configurado (recomendado)",status:"pending",detail:"Data Cloud es recomendado para RAG y analytics. Configura en Setup → Data Cloud."}),i.knowledgeSources&&i.knowledgeSources.includes("SalesforceKnowledge")&&a.push({category:"Pre-Deployment",text:"Knowledge Base actualizada con artículos relevantes",status:"pending",detail:"Asegúrate de tener artículos de Knowledge estructurados y actualizados para el agente."}),e.channelsPlanned&&e.channelsPlanned.length>0){const o={Web:"Experience Cloud site creado y configurado",WhatsApp:"Canal de WhatsApp Business configurado en Messaging",Email:"Email-to-Case configurado",Slack:"Integración con Slack habilitada (Agentforce 2.0)",Teams:"Integración con Microsoft Teams configurada",Phone:"Agentforce Voice configurado con parámetros de voz"};for(const c of e.channelsPlanned)o[c]&&a.push({category:"Pre-Deployment",text:o[c],status:"pending",detail:`Configuración requerida para el canal: ${c}.`});a.push({category:"Pre-Deployment",text:"Messaging channels configurados",status:"pending",detail:`Canales planificados: ${e.channelsPlanned.join(", ")}. Verifica la configuración de cada canal en Setup → Messaging.`})}return e.userRole&&e.userRole!=="Admin"&&a.push({category:"Pre-Deployment",text:"⚠️ Solicitar acceso Admin o permisos necesarios",status:"blocked",detail:`Tu rol actual es "${e.userRole}". Para configurar Agentforce necesitas permisos de administrador o que un Admin configure los componentes.`}),a.push({category:"Configuración",text:"Topics definidos (máximo 5 recomendados)",status:"pending",detail:"Define topics mutuamente exclusivos con instrucciones específicas. Evita overlap de responsabilidades."}),a.push({category:"Configuración",text:"Instructions detalladas por topic",status:"pending",detail:"Cada topic debe tener 6-8 instrucciones paso a paso, específicas y accionables."}),a.push({category:"Configuración",text:"Actions asignadas y testeadas",status:"pending",detail:"Asigna Flows, Apex, Prompt Templates o APIs a cada topic. Cada action debe hacer UNA cosa bien."}),a.push({category:"Configuración",text:"Example utterances agregados a cada topic",status:"pending",detail:"Agrega frases de ejemplo que ayuden al agente a identificar cuándo usar cada topic."}),n.allowedActions&&((n.allowedActions.includes("CrearRegistros")||n.allowedActions.includes("ActualizarRegistros"))&&a.push({category:"Configuración",text:"Flows de creación/actualización de registros creados",status:"pending",detail:"Crea Flows declarativos para las acciones de escritura. Principio: Single Responsibility, Error Handling, Idempotencia."}),n.allowedActions.includes("Agendar")&&a.push({category:"Configuración",text:"Integración de calendario (Outlook/Google Calendar)",status:"pending",detail:"Configura Einstein Activity Capture y la integración con el calendario para el agendamiento."}),n.allowedActions.includes("Escalar")&&a.push({category:"Configuración",text:"Reglas de escalamiento configuradas",status:"pending",detail:`Reglas definidas: ${n.handoffRules||"Verificar paso 3 del wizard."}`})),a.push({category:"Configuración",text:"Guardrails configurados",status:"pending",detail:"Configura Einstein Trust Layer, Data Masking para campos sensibles, y límites operacionales en los topics."}),i.knowledgeSources&&i.knowledgeSources.includes("Files")&&a.push({category:"Configuración",text:"Data Library cargada con documentación",status:"pending",detail:"Sube archivos relevantes a la Data Library del agente."}),a.push({category:"Testing",text:"Unit tests por cada topic",status:"pending",detail:"Usa el Agent Builder test panel para probar cada topic individualmente."}),a.push({category:"Testing",text:"Integration tests multi-topic",status:"pending",detail:"Prueba escenarios que involucren múltiples topics y handoffs entre ellos."}),a.push({category:"Testing",text:"Edge case testing",status:"pending",detail:"Prueba inputs ambiguos, preguntas fuera de alcance y solicitudes adversariales."}),a.push({category:"Testing",text:"Adversarial prompt testing",status:"pending",detail:'Intenta "jailbreak" prompts para verificar que los guardrails funcionan correctamente.'}),a.push({category:"Testing",text:"Load testing (50+ conversaciones simultáneas)",status:"pending",detail:"Usa batch testing API para verificar rendimiento bajo carga."}),a.push({category:"Testing",text:"User acceptance testing (UAT)",status:"pending",detail:"Ejecuta las conversaciones de prueba generadas con usuarios reales."}),a.push({category:"Post-Deployment",text:"Agent Analytics dashboard configurado",status:"pending",detail:"Configura métricas: tasa resolución (>70%), accuracy (>90%), response time (<10s), escalation rate (<20%)."}),a.push({category:"Post-Deployment",text:`Event logging activado (nivel: ${r.loggingLevel||"Estándar"})`,status:"pending",detail:"Activa el nivel de logging seleccionado para auditoría y monitoreo."}),a.push({category:"Post-Deployment",text:"Alertas para métricas críticas",status:"pending",detail:"Configura alertas automáticas cuando las métricas caigan por debajo de los umbrales definidos."}),a.push({category:"Post-Deployment",text:"Feedback mechanism para usuarios",status:"pending",detail:'Implementa botón "Report Issue" y encuestas CSAT post-conversación.'}),a.push({category:"Post-Deployment",text:"Plan de optimización continua",status:"pending",detail:"Ciclo semanal: Lunes análisis, Martes thumbs down, Miércoles ajustes, Jueves testing sandbox, Viernes deploy."}),a.push({category:"Post-Deployment",text:"Documentación de governance",status:"pending",detail:"Documenta qué datos accede, por qué, y las políticas organizacionales del agente."}),a}function X(s){const a=s.filter(e=>e.status==="blocked");return{status:a.length>0?"blocked":"ready",blockers:a}}function K(s){const a=s.agentDefinition||{},e=s.prereqs||{},t=s.dataSources||{};s.capabilities;const n=[`Accede a Setup en tu org de Salesforce (${e.orgType||"tipo no definido"}).`,"Verifica que Einstein esté habilitado: Setup → Einstein → Einstein Platform.","Activa Agentforce: Setup → Agentforce → Activar Agentes de IA.",'Crea un usuario dedicado para el agente con el perfil "Einstein Agent User" y asigna la licencia correspondiente.',`Asigna los Permission Sets necesarios${a.agentType==="SDR"?' (incluye "Agentforce SDR Agent permission set")':""}.`,`Ve a Agent Builder (Setup → Agent Builder) y crea un nuevo agente llamado "${a.agentName||"Mi Agente"}".`,"Configura los Topics del agente. Recuerda: máximo 5 topics mutuamente exclusivos. Usa las instrucciones generadas en el prompt del sistema.","Crea y asigna las Actions necesarias (Flows, Apex, Prompt Templates) a cada topic.",`Configura los objetos de Salesforce que usará el agente: ${(t.sfObjectsUsed||[]).join(", ")}.`,"Establece Field-Level Security: oculta campos sensibles y configura Sharing Rules apropiadas."];return t.knowledgeSources&&t.knowledgeSources.includes("SalesforceKnowledge")&&n.push("Configura Salesforce Knowledge: verifica que los artículos estén estructurados y actualizados."),t.knowledgeSources&&t.knowledgeSources.includes("Files")&&n.push("Carga los documentos relevantes en la Data Library del agente."),n.push("Configura el Einstein Trust Layer: Setup → Einstein Trust Layer → Marca campos sensibles para Data Masking automático.","Agrega Example Utterances a cada topic para mejorar la detección de intención.","Realiza testing unitario en el Agent Builder test panel.","Ejecuta pruebas de integración y edge cases en sandbox.",`Configura los canales de despliegue: ${(e.channelsPlanned||[]).join(", ")}.`,"Activa el agente en producción y monitorea las primeras 2 horas.","Configura Agent Analytics dashboard con métricas clave.","Establece el plan de optimización continua semanal."),n}function Q(s){const a=[],e=s.prereqs||{},t=s.capabilities||{},n=s.dataSources||{},i=s.security||{};return e.orgType==="Production"&&a.push({type:"warning",text:"Implementación directa en Producción: se recomienda probar primero en Sandbox antes de desplegar a producción."}),e.einsteinStatus!=="Yes"&&a.push({type:"error",text:"Einstein no confirmado como activo. Es un prerequisito obligatorio para Agentforce."}),e.agentforceStatus!=="Yes"&&a.push({type:"error",text:"Agentforce no confirmado como activo. Contacta a tu Account Executive de Salesforce."}),e.userRole!=="Admin"&&a.push({type:"warning",text:`Tu rol (${e.userRole}) puede no tener los permisos necesarios. Coordina con un Administrador.`}),(t.autonomyLevel==="AutonomousWithApproval"||t.autonomyLevel==="SemiAutonomous")&&a.push({type:"info",text:"Nivel de autonomía elevado: asegúrate de tener Human-in-the-Loop para decisiones críticas."}),n.readWriteScope==="ReadWrite"&&a.push({type:"warning",text:"El agente tiene permisos de escritura. Implementa validaciones estrictas y pruebas de idempotencia."}),n.piiHandling!=="NoPII"&&a.push({type:"error",text:"El agente maneja PII. Verifica cumplimiento regulatorio y configura Data Masking en Einstein Trust Layer."}),i.loggingLevel==="Minimal"&&a.push({type:"warning",text:'Nivel de logging mínimo: se recomienda al menos "Estándar" para auditoría adecuada.'}),a.push({type:"info",text:"Comienza con un pilot limitado: 1 use case bien definido antes de expandir."}),a.push({type:"info",text:"Establece KPIs desde el día 1: tasa de resolución, accuracy, response time, CSAT."}),a.push({type:"info",text:"Rotación de credenciales: actualiza API keys trimestralmente."}),a}const Y={SDR:"SDR — Ventas y prospección",Direction:"Dirección / Reporting ejecutivo",Support:"Soporte — Servicio al cliente",Ops:"Operaciones internas",Onboarding:"Onboarding",Custom:"Personalizado"},J={Assisted:"Asistido",SemiAutonomous:"Semi-autónomo",AutonomousWithApproval:"Autónomo con aprobación"},Z={NoPII:"Sin PII",ContainsPIIWithRedaction:"PII con redacción",ContainsPIIRestricted:"PII restringida"},ee={Consultar:"Consultar",CrearRegistros:"Crear registros",ActualizarRegistros:"Actualizar registros",Recomendar:"Recomendar",Agendar:"Agendar",Escalar:"Escalar a humano"},ae={render(s){const a=h(s),e=S(s),t=G(s),n=X(t),i=K(s),r=Q(s);s.conversationUX.generatedSystemPrompt=a,s.conversationUX.testConversations=e,s.outputs={readiness:n.status,dynamicChecklist:t.map(d=>`[${d.status}] ${d.text}`),salesforceImplementationSteps:i};const o=s.agentDefinition,c=s.prereqs,l=s.capabilities,p=s.dataSources,u=s.security,m=s.conversationUX,f={};t.forEach(d=>{f[d.category]||(f[d.category]=[]),f[d.category].push(d)});const y={prereqs:s.prereqs,agentDefinition:s.agentDefinition,capabilities:s.capabilities,dataSources:s.dataSources,conversationUX:{welcomeMessage:m.welcomeMessage,topFaqExamples:m.topFaqExamples,fallbackBehavior:m.fallbackBehavior,generatedSystemPrompt:a},security:s.security,outputs:s.outputs};return`
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
        <div class="status-banner ${n.status}">
          <span class="status-banner__icon">${n.status==="ready"?"✅":"🚫"}</span>
          <div>
            <strong>${n.status==="ready"?"¡Agente listo para implementar!":"Hay prerequisitos bloqueantes"}</strong>
            <div style="font-size:var(--fs-sm); font-weight:var(--fw-regular); margin-top:4px;">
              ${n.status==="ready"?"Todos los prerequisitos críticos están cubiertos. Puedes proceder con la implementación.":`${n.blockers.length} elemento(s) bloqueante(s) deben resolverse antes de implementar.`}
            </div>
          </div>
        </div>

        <!-- Agent Summary Cards -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📋</span> Resumen del Agente</h3>
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-card__label">Nombre</div>
              <div class="summary-card__value">${o.agentName||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Tipo</div>
              <div class="summary-card__value">${Y[o.agentType]||o.agentType||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Área</div>
              <div class="summary-card__value">${o.primaryArea||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Idioma / Tono</div>
              <div class="summary-card__value">${o.language||"—"} / ${o.tone||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Organización</div>
              <div class="summary-card__value">${c.orgType||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Autonomía</div>
              <div class="summary-card__value">${J[l.autonomyLevel]||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Acciones</div>
              <div class="summary-card__value">
                ${(l.allowedActions||[]).map(d=>`<span class="badge badge--cyan">${ee[d]||d}</span>`).join("")}
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Objetos SF</div>
              <div class="summary-card__value">
                ${(p.sfObjectsUsed||[]).map(d=>`<span class="badge badge--purple">${d}</span>`).join("")}
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Alcance datos</div>
              <div class="summary-card__value">${p.readWriteScope==="ReadWrite"?"Lectura y escritura":"Solo lectura"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">PII</div>
              <div class="summary-card__value">${Z[p.piiHandling]||"—"}</div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Canales</div>
              <div class="summary-card__value">
                ${(c.channelsPlanned||[]).map(d=>`<span class="badge badge--green">${d}</span>`).join("")}
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-card__label">Logging</div>
              <div class="summary-card__value">${u.loggingLevel||"—"}</div>
            </div>
          </div>
          <div class="summary-card" style="margin-bottom:var(--sp-6); background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:var(--sp-5);">
            <div class="summary-card__label">Objetivo</div>
            <div class="summary-card__value" style="font-style:italic; color:var(--text-secondary);">"${o.oneLineGoal||"—"}"</div>
          </div>
        </div>

        <!-- Checklist -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">✅</span> Checklist de Implementación</h3>
          ${Object.entries(f).map(([d,b])=>`
            <h4 style="font-size:var(--fs-sm); color:var(--accent-purple); text-transform:uppercase; letter-spacing:0.08em; margin: var(--sp-4) 0 var(--sp-2); font-weight:var(--fw-semibold);">${d}</h4>
            <ul class="checklist">
              ${b.map(v=>`
                <li class="checklist-item ${v.status}" title="${v.detail}">
                  <span class="status-icon">${v.status==="done"?"✅":v.status==="blocked"?"🚫":"⏳"}</span>
                  <div>
                    <div>${v.text}</div>
                    <div style="font-size:var(--fs-xs); color:var(--text-muted); margin-top:2px;">${v.detail}</div>
                  </div>
                </li>
              `).join("")}
            </ul>
          `).join("")}
        </div>

        <!-- System Prompt -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🤖</span> Prompt del Sistema Generado</h3>
          <div class="prompt-preview">${a}</div>
        </div>

        <!-- Test Conversations -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">💬</span> Conversaciones de Prueba (${e.length})</h3>
          ${e.slice(0,10).map((d,b)=>`
            <div class="conversation-preview">
              <div class="conversation-preview__title">Prueba ${b+1}: ${d.title}</div>
              ${d.messages.map(v=>`
                <div class="conversation-msg ${v.role}">
                  <div class="conversation-msg__role">${v.role==="user"?"👤 Usuario":"🤖 Agente"}</div>
                  <div>${v.text}</div>
                </div>
              `).join("")}
            </div>
          `).join("")}
        </div>

        <!-- Implementation Steps -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">🚀</span> Pasos de Implementación en Salesforce</h3>
          <ol class="impl-steps">
            ${i.map(d=>`
              <li class="impl-step">
                <div class="impl-step__number"></div>
                <div>${d}</div>
              </li>
            `).join("")}
          </ol>
        </div>

        <!-- Risks -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">⚡</span> Riesgos, Recomendaciones y Pruebas</h3>
          ${r.map(d=>`
            <div class="info-box ${d.type}">
              <span class="info-box__icon">${d.type==="error"?"🚫":d.type==="warning"?"⚠️":"💡"}</span>
              <div>${d.text}</div>
            </div>
          `).join("")}
        </div>

        <!-- Export JSON -->
        <div class="form-section">
          <h3 class="form-section__title"><span class="icon">📥</span> Exportar Configuración</h3>
          <div class="json-preview">
            <pre>${JSON.stringify(y,null,2)}</pre>
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
    `},afterRender(s,a){var t,n;const e=document.getElementById("btn-next");if(e&&(e.disabled=!0,e.style.opacity="0.5",e.style.cursor="not-allowed",e.title="Debes revisar todo el resumen antes de finalizar.",e.textContent="Baja para finalizar",document.querySelector(".step-card"))){const r=e.cloneNode(!0);e.parentNode.replaceChild(r,e);const o=r,c=()=>{const l=window.scrollY+window.innerHeight,p=document.documentElement.scrollHeight;l>=p-300&&(o.disabled=!1,o.style.opacity="1",o.style.cursor="pointer",o.title="Guardar y Finalizar",o.textContent="Guardar y Finalizar",window.removeEventListener("scroll",c))};window.addEventListener("scroll",c),c(),o.addEventListener("click",async()=>{try{o.textContent="Guardando...",o.disabled=!0;const l=h(s),p={title:s.agentDefinition.agentName||"Agente Sin Nombre",prompt:l,config:JSON.stringify(s)};console.log("Enviando payload:",p);const u=await fetch("http://localhost:8000/api/prompts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});if(u.ok){const m=await u.json();console.log("Respuesta servidor:",m),a.toast(`Prompt guardado (ID: ${m.id}) correctamente.`,"success"),setTimeout(()=>{alert("¡Proceso finalizado con éxito! El prompt ha sido guardado en la base de datos.")},1e3)}else{const m=await u.text();throw new Error(`Error servidor (${u.status}): ${m}`)}}catch(l){console.error("Error al guardar:",l),l.message.includes("Failed to fetch")?a.toast("Error de conexión: El servidor (server.py) no está respondiento. Verifica que la consola de comandos esté abierta ejecutando python server.py","error"):a.toast("Error: "+l.message,"error"),o.textContent="Reintentar Guardar",o.disabled=!1}})}(t=document.getElementById("btn-export-json"))==null||t.addEventListener("click",()=>{const i=h(s),r=S(s),o={prereqs:s.prereqs,agentDefinition:s.agentDefinition,capabilities:s.capabilities,dataSources:s.dataSources,conversationUX:{welcomeMessage:s.conversationUX.welcomeMessage,topFaqExamples:s.conversationUX.topFaqExamples,fallbackBehavior:s.conversationUX.fallbackBehavior,generatedSystemPrompt:i,testConversations:r.map(u=>JSON.stringify(u))},security:s.security,outputs:s.outputs},c=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),l=URL.createObjectURL(c),p=document.createElement("a");p.href=l,p.download=`agentforce_${(s.agentDefinition.agentName||"agente").replace(/\s+/g,"_").toLowerCase()}_config.json`,p.click(),URL.revokeObjectURL(l),a.toast("JSON exportado correctamente.","success")}),(n=document.getElementById("btn-copy-prompt"))==null||n.addEventListener("click",()=>{const i=h(s);navigator.clipboard.writeText(i).then(()=>{a.toast("Prompt copiado al portapapeles.","success")}).catch(()=>{a.toast("No se pudo copiar. Selecciona el texto manualmente.","error")})})},collect(s){}},g=new N;g.registerSteps([D,B,O,M,W,V,ae]);g.render();$(()=>import("./HelpAgent-BnZ08sV0.js"),[]).then(()=>{const s=document.createElement("help-agent");document.body.appendChild(s);const a=g.render.bind(g);g.render=()=>{a(),window.dispatchEvent(new CustomEvent("wizard-step-change",{detail:{step:g.currentStep}}))}});document.getElementById("btn-next").addEventListener("click",()=>g.next());document.getElementById("btn-prev").addEventListener("click",()=>g.prev());document.getElementById("btn-reset").addEventListener("click",()=>g.reset());document.addEventListener("keydown",s=>{s.altKey&&s.key==="ArrowRight"?(s.preventDefault(),g.next()):s.altKey&&s.key==="ArrowLeft"&&(s.preventDefault(),g.prev())});
