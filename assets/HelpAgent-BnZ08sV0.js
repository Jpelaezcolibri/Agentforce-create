const c={meta:{version:"2.0",language:"es",intendedUse:"Antigravity upload - HelpAgent knowledge base",lastUpdated:"2026-02-11",matching:"keywords_contains_any",notes:"Estructura compatible con HelpAgent-jgCDSr8d.js: company, steps, knowledge. Incluye seccion scenarioEngine para futuras mejoras."},company:{name:"Colibrí IT",expertise:"Consultoría Salesforce, MuleSoft y Field Service Management.",positioning:"Arquitectos de Service Cloud + Field Service + Agentforce. Implementación segura, medible y lista para producción.",products:["Agente SDR (Calificación 24/7)","Agente de Servicio (Autoservicio + creación de casos)","Agente Ops (Procesos internos + automatización controlada)","Copilot de Admin (Diseño guiado de agentes Agentforce)"],successStories:["Caso de éxito: Aguas Andinas (Chile) - Modernización con Salesforce Field Service."]},steps:{0:{title:"Preparación (Prerequisitos)",tips:["Trabaja primero en Sandbox y solo promueve a Producción cuando tengas UAT + set de pruebas aprobado.","Confirma licencias y permisos: Einstein/Agentforce + acceso a Setup para el rol creador.","Define el canal inicial (recomendado: Web) antes de diseñar prompts: cambia completamente la UX y los riesgos.","Si hay PII (emails, teléfonos, IDs), define redacción/masking desde el inicio; no lo dejes para el final.","Define quién aprueba cambios del agente (Security/Admin Owner) y cómo se audita (Agent Analytics).","Alinea el 'qué NO hace' del agente: evita scope creep y reduce jailbreaks.","Define desde ya el criterio de escalamiento (handoff) y el SLA humano: un agente sin SLA se vuelve un cuello de botella.","Si vas a escribir/actualizar registros, exige confirmación y restricciones por objeto/campo."],faqs:[{q:"¿Qué debo validar antes de crear un agente?",a:"Licencias, permisos (Admin/Configurator), entorno (Sandbox/Prod), canales, fuentes de conocimiento, manejo de PII, y reglas de escalamiento."},{q:"¿Por qué empezar en Sandbox?",a:"Porque puedes fallar barato: pruebas, logging alto, y UAT sin riesgo sobre datos reales. Luego promueves con checklist."},{q:"¿Qué pasa si no tengo Knowledge/Data Cloud?",a:"Aumenta el riesgo de alucinación. Para soporte/dirección, mínimo una fuente controlada (Knowledge/Files) es altamente recomendable."},{q:"¿Cómo decido el canal inicial?",a:"Elige el canal con menor riesgo y mayor control. Web suele ser el mejor para v1. WhatsApp/Teams/Slack requieren mayor governance."},{q:"¿Quién debería usar este wizard?",a:"Admins/Configuradores con sponsor de seguridad. Usuarios de negocio pueden participar, pero el handoff a Admin es obligatorio para build."}]},1:{title:"Identidad del Agente",tips:["Define un solo trabajo principal (One Line Goal). Si necesitas 2, crea 2 agentes o 2 rutas claras por topic.","El nombre del agente debe incluir área + función (ej: 'Soporte Billing LATAM').","Define tono y límites: formal/cercano/técnico. Luego aplica la misma consistencia en prompts y ejemplos.","Para SDR: enfócate en calificación + agendamiento (no negociar precio).","Para Soporte: delimita a nivel 1–2; lo complejo escala.","Incluye siempre: 'Si no hay datos, no inventes' y 'pide aclaración máximo 2 veces y luego escala'."],faqs:[{q:"¿Copilot vs Agente?",a:"Copilot asiste a un humano. Un Agente actúa con autonomía (según guardrails) y puede ejecutar acciones."},{q:"¿Cómo evito que el agente haga de todo?",a:"Define 3–5 topics máximos, escribe 'NO hace' explícito, y usa reglas de handoff."},{q:"¿Qué es One Line Goal?",a:"Una frase medible que define el resultado del agente (ej: 'Resolver 40% de consultas de estado sin crear caso')."}]},2:{title:"Alcance y Acciones",tips:["Acciones de escritura (crear/actualizar) requieren: confirmación, restricciones por campo, y logging alto.","Autonomía recomendada v1: Assisted. Sube a SemiAutonomous cuando tengas pruebas y guardrails.","Define approvalRequiredFor en cualquier nivel distinto de Assisted.","Handoff no es opcional: crea triggers concretos (cliente pide humano, 2 fallos, PII, VIP, fraude, legal)."],faqs:[{q:"¿Qué acciones son seguras para empezar?",a:"Consultar (ReadOnly) + recomendar desde Knowledge + escalar. Escritura se agrega después con restricciones."},{q:"¿Qué significa autonomy level?",a:"Cuánto puede actuar el agente sin intervención humana. A mayor autonomía, mayor necesidad de pruebas y approvals."}]},3:{title:"Datos y Conocimiento",tips:["Define objetos Salesforce usados y campos críticos. Si el agente no necesita un campo, no lo expongas.","ReadWrite exige writeConstraints: qué objetos/campos, en qué estados, con qué validaciones.","Knowledge/Files reducen alucinación. URLs solo si son dominios controlados y estables.","PII: lista explícita de 'no revelar' + redacción."],faqs:[{q:"¿Qué es grounding/RAG?",a:"Que el agente se base en datos reales (CRM/Knowledge) antes de responder. Reduce alucinación."},{q:"¿Cómo defino el mínimo privilegio?",a:"Solo objetos/campos necesarios (FLS/Sharing). Evita permisos amplios por comodidad."}]},4:{title:"Conversación y UX",tips:["El mensaje de bienvenida debe decir: quién es, qué puede hacer, ejemplos, y cómo escalar.","Crea FAQs como 'intenciones' (utterances) con variantes, no solo una pregunta literal.","Fallback recomendado: pedir aclaración 1–2 veces, luego ofrecer opciones o escalar.","Diseña respuestas cortas + pasos siguientes (CTA)."],faqs:[{q:"¿Cuántas FAQs debo poner?",a:"Para soporte, 5–10 por topic (con variantes). Para SDR, 3–6 enfocadas a calificación y agendamiento."},{q:"¿Qué es un buen fallback?",a:"Uno que reduce frustración: pregunta aclaratoria breve, ofrece botones/opciones, y escala si persiste la ambigüedad."}]},5:{title:"Guardrails y Seguridad",tips:["NuncaReveal debe incluir: credenciales/tokens, datos de otros clientes, PII restringida, políticas internas no públicas.","Logging alto en Sandbox/UAT. En Prod define un nivel que permita auditoría sin exceder políticas internas.","Si hay canal interno (Teams/Slack) refuerza RBAC: el agente debe respetar el usuario autenticado."],faqs:[{q:"¿Cómo prevengo fuga de datos?",a:"NeverReveal + mínimo privilegio + enmascaramiento PII + no responder si no hay permisos/dato."},{q:"¿Qué disparadores obligan escalamiento?",a:"PII, fraude/seguridad, legal, VIP, frustración del usuario, incertidumbre del agente, o acciones sensibles."}]},6:{title:"Export y Checklist de despliegue",tips:["Exporta: System Prompt + Topics + lista de acciones + set de pruebas + checklist por ambiente/canal.","Incluye un 'Risk Score' y lista de mitigaciones antes de pasar a Prod.","Define ventana de estabilización (30 días) antes de comprometer KPIs."],faqs:[{q:"¿Qué debo entregar para pasar a implementación?",a:"Prompt final, topics definidos, acciones conectadas (Flow/Apex/API), guardrails, pruebas UAT, y plan de monitoreo."}]}},knowledge:[{keywords:["wizard","como usar","pasos","guia","acompañamiento","ayuda"],answer:`### Cómo te acompaño en este wizard
1) **Valido prerequisitos** (licencias, rol, entorno, canal).
2) **Defino identidad y objetivo medible** (one-line goal).
3) **Acoto alcance** a 3–5 topics y reglas de escalamiento.
4) **Diseño datos y seguridad** (objetos/campos, PII, never-reveal).
5) **Diseño conversación** (welcome, FAQs, fallback).
6) **Export**: prompt + topics + pruebas + checklist.`},{keywords:["validar","validar antes","crear","comenzar","requisitos","prerequisitos","preparacion","empezar"],answer:`### ¿Qué validar antes de empezar?
Antes de crear tu agente, confirma:
1. **Licencias:** Einstein y Agentforce activos.
2. **Permisos:** Rol de Admin o Configurator.
3. **Entorno:** Recomendado Sandbox para V1.
4. **Canal:** Define dónde vivirá (Web, WhatsApp, etc.).
5. **Datos:** Tienes acceso a Knowledge o archivos base.`},{keywords:["orgtype","produccion","production","ambiente","entorno"],answer:`### orgType = Production
✅ **Recomendación:** no diseñar en Producción. Construye en Sandbox, ejecuta UAT y promueve.
⚠️ **Riesgos:** impacto sobre datos reales, auditoría, cambios sin rollback.
🧩 **Checklist mínimo:** UAT aprobado, plan de rollback, logging/Agent Analytics activo, permisos mínimos.`},{keywords:["orgtype","sandbox","pruebas","qa"],answer:`### orgType = Sandbox
✅ **Recomendación:** mejor opción para v1.
🧩 **Checklist:** seed data realista, usuarios UAT, scripts de prueba (happy path + edge cases), logging alto.`},{keywords:["einsteinstatus","einstein","licencia einstein","einstein agent user","permisos"],answer:`### Einstein / Einstein Agent User
✅ **Necesario:** licencia activa y permisos para el rol que crea/ejecuta.
🧩 **Si está en 'No/Unknown':** confirma en Setup y con tu AE. Sin esto, el proyecto se bloquea (hard stop).`},{keywords:["agentforceStatus","agentforce","habilitar","activar"],answer:`### Agentforce Status
✅ Si está **No/Unknown**, no avances con autonomía o escritura: primero habilita Agentforce y valida features disponibles.
🧩 **Siguiente paso:** revisión de licenciamiento + configuración base en org.`},{keywords:["userRole","admin","configurator","business user","quien lo usa","rol","usuario","perfil"],answer:`### Rol del usuario
- **Admin:** puede construir y gobernar.
- **Configurator:** puede diseñar, pero requiere sponsor Admin para Setup/seguridad.
- **Business user:** solo descubrimiento (definición de requerimientos) + handoff a Admin para build.`},{keywords:["channelsPlanned","canal","web","whatsapp","slack","teams","email","phone","donde desplegar"],answer:`### Selección de canal (recomendación v1)
✅ **Web** (menor riesgo, más control).
⚠️ **WhatsApp/Teams/Slack**: mayor riesgo de fuga interna + compliance.
⚠️ **Email/Phone**: complejidad operativa y de identidad.
🧩 **Regla:** si el canal es de alto riesgo, sube guardrails y baja autonomía.`},{keywords:["agenttype","sdr","ventas","venta","prospeccion"],answer:`### Agent Type = SDR
✅ Enfoque: **calificar + agendar**.
❌ No: negociar precio, prometer descuentos, cerrar venta.
🧩 Topics sugeridos: Captura interés, Calificación (BANT), Agendamiento, Handoff a AE, FAQs básicas.`},{keywords:["agenttype","support","service","soporte","atencion","servicio"],answer:`### Agent Type = Support
✅ Enfoque: **resolver nivel 1–2** + crear/actualizar casos con control.
🧩 Requiere: Knowledge/Files, verificación para PII, handoff claro.
⚠️ Riesgo si no hay fuentes: alucinación y respuestas inconsistentes.`},{keywords:["one line goal","objetivo","meta","goal","kpi","proposito"],answer:`### One Line Goal (objetivo)
✅ Debe ser **medible** y de un solo trabajo.
Ejemplos:
- Soporte: "Resolver 40% de consultas de estado sin crear caso".
- SDR: "Calificar 30 leads/semana y agendar 10 demos".
⚠️ Si mezcla 2 trabajos, divide en 2 agentes o 2 topics con rutas claras.`},{keywords:["allowedActions","acciones","crear registros","actualizar registros","consultar","hacer","ejecutar"],answer:`### Acciones permitidas
✅ V1 segura: **Consultar + Recomendar + Escalar**.
⚠️ **Crear/Actualizar**: exige confirmación + restricciones por objeto/campo + approvals.
🧩 Regla práctica: si no puedes escribir las restricciones en 3 líneas, aún no está listo para write.`},{keywords:["autonomyLevel","assisted","semi","autonomous","autonomia","nivel","control"],answer:`### Autonomy Level
✅ **Assisted (recomendado v1):** el agente sugiere y el humano ejecuta.
⚠️ **SemiAutonomous:** requiere approvals para acciones sensibles.
⚠️ **AutonomousWithApproval:** exige set de pruebas + monitoreo intensivo.
🧩 Si autonomy != Assisted y approvals está vacío → bloquear avance.`},{keywords:["approvalRequiredFor","aprobacion","approval","permiso","autorizacion"],answer:`### approvalRequiredFor
✅ Lista concreta de acciones que requieren OK humano.
Sugerencias: crear/actualizar registros críticos, cambios de owner, cierres de caso, modificaciones de monto/fechas, cualquier acción irreversible.
⚠️ Evita 'todo': no es accionable.`},{keywords:["handoffRules","escalamiento","escalar","cuando escalar","derivacion","handoff","pasar a humano","agente humano","transferir"],answer:`### Handoff Rules (escalamiento)
Incluye al menos:
1) Usuario pide humano.
2) 2 intentos sin resolver.
3) PII / seguridad / fraude / legal.
4) VIP / cuenta estratégica.
5) Acción requiere aprobación.
🧩 Siempre crea un resumen para el humano: contexto + intentos + datos capturados.`},{keywords:["sfObjectsUsed","objetos","lead","account","case","opportunity","custom object","tablas","datos"],answer:`### Objetos Salesforce
✅ Define solo los necesarios.
⚠️ Si hay **Custom Object**, documenta: nombre API, campos críticos, y permisos (FLS/sharing).
🧩 Regla: si el agente no necesita ver un campo, no lo expongas.`},{keywords:["readWriteScope","readonly","readwrite","escritura","lectura","permisos datos"],answer:`### ReadOnly vs ReadWrite
✅ **ReadOnly**: recomendado inicial.
⚠️ **ReadWrite**: requiere writeConstraints + confirmación + approvals.
🧩 Si eliges ReadWrite, define límites: qué campos, en qué estados, con qué validaciones.`},{keywords:["writeConstraints","restricciones","constraints","reglas de escritura","limites"],answer:`### writeConstraints (obligatorio en ReadWrite)
Plantilla:
- Permitir **crear** solo: [Objeto] cuando [condición].
- Permitir **actualizar** solo campos: [A,B,C].
- Prohibido: delete, cambios de owner, cambios de monto sin aprobación.
- Confirmación: "¿Confirmas que actualice X a Y?"`},{keywords:["knowledgeSources","knowledge","files","urls","rag","archivos","biblioteca","documentos","fuentes","informacion","data library"],answer:`### Fuentes de conocimiento
✅ Para soporte/dirección: **Knowledge o Files** mínimo.
⚠️ **None** aumenta alucinación.
⚠️ **URLs**: usa solo dominios aprobados.
🧩 Regla: si no hay fuente, el agente debe decir "no tengo esa información" y escalar.`},{keywords:["piiHandling","pii","privacidad","datos sensibles","redaction","proteccion","enmascaramiento"],answer:`### PII Handling
- **NoPII:** ok.
- **WithRedaction:** exige lista 'piiDoNotExpose' + masking.
- **Restricted:** handoff temprano + logs + mínimo privilegio.
🧩 Nunca expongas credenciales/tokens ni datos de otros clientes.`},{keywords:["welcomeMessage","bienvenida","saludo","mensaje inicial"],answer:`### Welcome Message (patrón recomendado)
1) Quién soy.
2) Qué puedo hacer (3 bullets).
3) Qué NO hago (1 línea).
4) Ejemplos rápidos.
5) Cómo escalar a humano.
🧩 Manténlo corto y accionable.`},{keywords:["topFaqExamples","faq","utterances","preguntas frecuentes","ejemplos"],answer:`### FAQs / Utterances
✅ Crea 5–10 por topic (soporte) con variantes.
🧩 Convierte cada FAQ en intención: 3–6 formas de decir lo mismo.
⚠️ Evita FAQs demasiado generales ("ayuda") sin opción de desambiguación.`},{keywords:["fallbackBehavior","fallback","no entiendo","error","confusion"],answer:`### Fallback
✅ Recomendado: **AskClarifying** (máximo 2 preguntas) → luego **ProvideOptions** o **Escalate**.
🧩 Ofrece 3 opciones de menú por topic para reducir frustración.`},{keywords:["neverReveal","no revelar","guardrails","seguridad","restringida","prohibido","limites"],answer:`### neverReveal / Prohibido (defaults)
Incluye:
- Credenciales/tokens
- Datos de otros clientes
- PII restringida (IDs, tarjeta completa)
- Políticas internas no públicas
🧩 Si el usuario lo pide: responder que no puedes compartirlo y ofrecer alternativa segura.`},{keywords:["loggingLevel","analytics","auditoria","logs","monitoreo"],answer:`### Logging / Agent Analytics
✅ Sandbox/UAT: logging alto.
✅ Producción: logging suficiente para auditoría y mejora.
🧩 Define revisión semanal en el primer mes (estabilización).`},{keywords:["export","pack","entregables","entregar","implementacion","pasar","build-ready","listo","despliegue","finalizar"],answer:`### Export Build-Ready (lo que debe salir)
- System Prompt final
- 3–5 Topics con intents/utterances
- Acciones (Flow/Apex/API) + inputs/outputs
- Guardrails (neverReveal, PII, approvals)
- Golden Test Set (happy + edge + jailbreak)
- Checklist de despliegue por canal`},{keywords:["risk score","riesgo","score","nivel de riesgo"],answer:`### Risk Score (guía rápida)
- **Bajo (0–25):** Assisted + ReadOnly + Knowledge.
- **Medio (26–60):** Semi-autonomous o canales internos → requiere UAT fuerte + handoff.
- **Alto (61–100):** ReadWrite + PII + WhatsApp/Teams → approvals, restricciones estrictas y monitoreo intensivo.`},{keywords:["caso","exito","aguas","cliente","historia"],answer:"Un gran caso de éxito es **Aguas Andinas** en Chile. Colibrí IT implementó Salesforce Field Service para modernizar su operación de campo, optimizando la gestión de cuadrillas y mejorando la atención al cliente."},{keywords:["colibri","colibrí","empresa","quienes somos","experiencia"],answer:"**Colibrí IT** es una consultora especializada en transformación digital y Field Service Management. Con sede en Colombia, son expertos en Salesforce y MuleSoft. Un caso de éxito destacado es la modernización de Aguas Andinas en Chile."}],findAnswer:function(l,e=0){const o=i=>i.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),a=o(l);let n=null,r=0;if([{k:["configuracion","organizacion","tipo","elegir"],a:"En **Tipo de Organización**, elige 'Producción' si es para uso real, o 'Sandbox' si estás probando. El **Rol** suele ser 'Administrador' para tener acceso completo."},{k:["einstein","activado"],a:"Debes marcar 'Sí' en Einstein y Agentforce. Sin esto, el agente no funcionará."},{k:["canal","donde desplegar","medio de despliegue"],a:"Selecciona dónde vivirá tu agente (Web, WhatsApp, Slack). Puedes marcar varios."},{k:["escalar","cuando escalar","derivacion"],a:`### Handoff Rules (escalamiento)
Incluye al menos:
1) Usuario pide humano.
2) 2 intentos sin resolver.
3) PII / seguridad / fraude / legal.
4) VIP / cuenta estratégica.
5) Acción requiere aprobación.`},{k:["bienvenida","saludo","mensaje inicial"],a:`### Welcome Message (patrón recomendado)
1) Quién soy (Identidad).
2) Qué puedo hacer (3 bullets).
3) Qué NO hago (1 línea).
4) Ejemplos rápidos.
5) Cómo escalar a humano.
🧩 Manténlo corto y accionable.`},{k:["acciones restringidas","que no debe hacer","no debe hacer","ejemplo de no","restricted"],a:`### Acciones Restringidas (Ejemplos)
- 'No dar consejos legales'
- 'No procesar reembolsos > $100'
- 'No hablar de política'
- 'No inventar datos (alucinar)'
- 'No compartir datos de otros clientes'`}].forEach(i=>{i.k.some(t=>a.includes(o(t)))&&(r=150,n={answer:i.a})}),r===150||(this.knowledge.forEach(i=>{let t=0;i.keywords.forEach(d=>{a.includes(o(d))&&(t+=10)}),t>r&&(r=t,n=i)}),r>0))return n.answer;const s=this.steps[e];return s?a.includes("ejemplo")||a.includes("ayuda")||a.includes("que poner")?`Para el paso **${s.title}**, aquí tienes un ejemplo:

${s.tips[0]}

(Prueba preguntando específicamente por conceptos de este paso).`:`No estoy seguro de la respuesta exacta, pero como estás en **${s.title}**, te sugiero revisar los Tips que aparecen arriba o preguntar por términos específicos de esta pantalla (ej: '${s.faqs&&s.faqs[0]?s.faqs[0].q.split(" ")[2]:"configuración"}').`:"Esa es una buena pregunta. Intenta preguntar sobre 'SDR', 'Escalar', 'Seguridad', 'Licencias' o 'Risk Score'."}};class p extends HTMLElement{constructor(){super(),this.isOpen=!1,this.currentStep=0,this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.addEventListeners(),window.addEventListener("wizard-step-change",e=>{this.currentStep=e.detail.step,this.pushContextualTip()}),setTimeout(()=>this.addMessage("agent","👋 Hola, soy tu Copiloto experto en Agentforce. ¿En qué puedo ayudarte hoy?"),1e3)}toggle(){this.isOpen=!this.isOpen;const e=this.shadowRoot.querySelector(".help-window"),o=this.shadowRoot.querySelector(".help-toggle");this.isOpen?(e.classList.add("open"),o.classList.add("active"),this.renderSuggestions()):(e.classList.remove("open"),o.classList.remove("active"))}addMessage(e,o){const a=this.shadowRoot.querySelector(".chat-body"),n=document.createElement("div");n.className=`message ${e}`,n.innerHTML=`<p>${o}</p>`,a.appendChild(n),a.scrollTop=a.scrollHeight}pushContextualTip(){const e=c.steps[this.currentStep];if(e&&e.tips.length>0){const o=e.tips[Math.floor(Math.random()*e.tips.length)];this.addMessage("agent",`💡 **Tip para ${e.title}:** ${o}`),this.isOpen||(this.shadowRoot.querySelector(".notification-dot").style.display="block")}}handleInput(e){if(e.key==="Enter"){const o=this.shadowRoot.querySelector("input"),a=o.value.trim();a&&(this.addMessage("user",a),o.value="",this.processQuery(a))}}processQuery(e){const o="thinking-"+Date.now();this.addMessage("agent",'<span id="'+o+'">Pensando...</span>'),setTimeout(()=>{const a=this.shadowRoot.getElementById(o);a&&a.parentElement.remove();const n=c.findAnswer(e,this.currentStep);this.addMessage("agent",n)},800)}renderSuggestions(){const e=this.shadowRoot.querySelector(".suggestions"),a=(c.steps[this.currentStep]||{}).faqs||[];e.innerHTML=a.map(n=>`<button class="chip" onclick="this.getRootNode().host.askFAQ('${n.q}')">${n.q}</button>`).join("")}askFAQ(e){this.addMessage("user",e),this.processQuery(e)}render(){this.shadowRoot.innerHTML=`
        <style>
            :host {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                font-family: var(--font-family, sans-serif);
            }
            .help-toggle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00d4ff, #7c3aed);
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }
            .help-toggle:hover { transform: scale(1.05); }
            .help-toggle img { width: 32px; height: 32px; filter: brightness(0) invert(1); }
            
            .notification-dot {
                position: absolute;
                top: 0;
                right: 0;
                width: 15px;
                height: 15px;
                background: #ef4444;
                border-radius: 50%;
                border: 2px solid #0f172a;
                display: none;
            }

            .help-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .help-window.open {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: all;
            }

            .header {
                padding: 15px;
                background: rgba(255,255,255,0.05);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
                font-weight: 600;
            }
            
            .chat-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .message {
                max-width: 85%;
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 0.9rem;
                line-height: 1.4;
                color: white;
            }
            
            .message.agent {
                background: rgba(255,255,255,0.1);
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            
            .message.user {
                background: linear-gradient(135deg, #00d4ff, #7c3aed);
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }

            .suggestions {
                padding: 10px 15px;
                display: flex;
                gap: 8px;
                overflow-x: auto;
                white-space: nowrap;
                scrollbar-width: none;
            }
            
            .chip {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: #94a3b8;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .chip:hover {
                background: rgba(255,255,255,0.2);
                color: white;
            }

            .input-area {
                padding: 15px;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            input {
                width: 100%;
                background: rgba(0,0,0,0.3);
                border: 1px solid rgba(255,255,255,0.1);
                padding: 10px 15px;
                border-radius: 20px;
                color: white;
                outline: none;
                box-sizing: border-box;
            }
            input:focus {
                border-color: #00d4ff;
            }

            /* Markdown styles in chat */
            .message p { margin: 0; }
            .message strong { color: #00d4ff; }
        </style>

        <button class="help-toggle" id="toggleApi">
            <span class="notification-dot"></span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>

        <div class="help-window">
            <div class="header">
                <span>🤖 Copiloto Agentforce</span>
            </div>
            <div class="chat-body"></div>
            <div class="suggestions"></div>
            <div class="input-area">
                <input type="text" placeholder="Pregúntame algo..." />
            </div>
        </div>
        `}addEventListeners(){this.shadowRoot.getElementById("toggleApi").addEventListener("click",()=>this.toggle()),this.shadowRoot.querySelector("input").addEventListener("keypress",e=>this.handleInput(e)),this.askFAQ=this.askFAQ.bind(this)}}customElements.define("help-agent",p);export{p as HelpAgent};
