import { KNOWLEDGE_BASE } from '../data/knowledgeBase.js';

export class HelpAgent extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.currentStep = 0;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();

        // Listen for wizard step changes
        window.addEventListener('wizard-step-change', (e) => {
            this.currentStep = e.detail.step;
            this.pushContextualTip();
        });

        // Greeting
        setTimeout(() => this.addMessage('agent', '👋 Hola, soy tu Copiloto experto en Agentforce. ¿En qué puedo ayudarte hoy?'), 1000);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const windowEl = this.shadowRoot.querySelector('.help-window');
        const toggleBtn = this.shadowRoot.querySelector('.help-toggle');

        if (this.isOpen) {
            windowEl.classList.add('open');
            toggleBtn.classList.add('active');
            // Suggest tips if opening for first time or new step
            this.renderSuggestions();
        } else {
            windowEl.classList.remove('open');
            toggleBtn.classList.remove('active');
        }
    }

    addMessage(role, text) {
        const chatBody = this.shadowRoot.querySelector('.chat-body');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    pushContextualTip() {
        const stepData = KNOWLEDGE_BASE.steps[this.currentStep];
        if (stepData && stepData.tips.length > 0) {
            const randomTip = stepData.tips[Math.floor(Math.random() * stepData.tips.length)];
            // Only push if open, or show notification dot?
            // For now, let's just push to chat history so it's there when they open
            this.addMessage('agent', `💡 **Tip para ${stepData.title}:** ${randomTip}`);

            // Show notification indicator if closed
            if (!this.isOpen) {
                this.shadowRoot.querySelector('.notification-dot').style.display = 'block';
            }
        }
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const input = this.shadowRoot.querySelector('input');
            const text = input.value.trim();
            if (text) {
                this.addMessage('user', text);
                input.value = '';
                this.processQuery(text);
            }
        }
    }

    processQuery(query) {
        // Simulate thinking
        const thinkingId = 'thinking-' + Date.now();
        this.addMessage('agent', '<span id="' + thinkingId + '">Pensando...</span>');

        setTimeout(() => {
            const thinkingEl = this.shadowRoot.getElementById(thinkingId);
            if (thinkingEl) thinkingEl.parentElement.remove();

            const answer = KNOWLEDGE_BASE.findAnswer(query, this.currentStep);
            this.addMessage('agent', answer);
        }, 800);
    }

    renderSuggestions() {
        const suggestionsDiv = this.shadowRoot.querySelector('.suggestions');
        const stepData = KNOWLEDGE_BASE.steps[this.currentStep] || {};
        const suggestions = stepData.faqs || [];

        suggestionsDiv.innerHTML = suggestions.map(faq =>
            `<button class="chip" onclick="this.getRootNode().host.askFAQ('${faq.q}')">${faq.q}</button>`
        ).join('');
    }

    askFAQ(question) {
        this.addMessage('user', question);
        this.processQuery(question);
    }

    render() {
        this.shadowRoot.innerHTML = `
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
        `;
    }

    addEventListeners() {
        this.shadowRoot.getElementById('toggleApi').addEventListener('click', () => this.toggle());
        this.shadowRoot.querySelector('input').addEventListener('keypress', (e) => this.handleInput(e));

        // Expose function for inline clicks
        this.askFAQ = this.askFAQ.bind(this);
    }
}

customElements.define('help-agent', HelpAgent);
