/* ═══════════════════════════════════════════════════════════════
   WIZARD ENGINE — Core navigation, validation, and rendering
   ═══════════════════════════════════════════════════════════════ */

import { saveState, loadState, clearState } from '../utils/storage.js';
import { validators } from '../utils/validators.js';

export class WizardEngine {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 7;
        this.steps = [];
        this.state = this.getDefaultState();

        // Load saved state
        const saved = loadState();
        if (saved) {
            this.state = { ...this.state, ...saved.state };
            this.currentStep = saved.currentStep || 0;
        }
    }

    getDefaultState() {
        return {
            prereqs: {
                orgType: '',
                einsteinStatus: '',
                agentforceStatus: '',
                userRole: '',
                channelsPlanned: []
            },
            agentDefinition: {
                agentName: '',
                agentType: '',
                primaryArea: '',
                language: 'Español',
                tone: '',
                oneLineGoal: ''
            },
            capabilities: {
                allowedActions: [],
                restrictedActions: [],
                autonomyLevel: '',
                approvalRequiredFor: [],
                handoffRules: ''
            },
            dataSources: {
                sfObjectsUsed: [],
                readWriteScope: '',
                criticalFields: [],
                knowledgeSources: [],
                writeConstraints: '',
                piiHandling: '',
                piiDoNotExpose: []
            },
            conversationUX: {
                welcomeMessage: '',
                topFaqExamples: ['', '', ''],
                fallbackBehavior: ''
            },
            security: {
                neverReveal: [],
                loggingLevel: ''
            }
        };
    }

    registerSteps(steps) {
        this.steps = steps;
    }

    render() {
        this.renderProgressBar();
        this.renderStep();
        this.updateNavigation();
        this.save();
    }

    renderProgressBar() {
        const stepsContainer = document.getElementById('progress-steps');
        const fill = document.getElementById('progress-fill');

        const labels = [
            'Prerrequisitos', 'Definición', 'Capacidades',
            'Datos', 'Conversación', 'Seguridad', 'Resumen'
        ];

        stepsContainer.innerHTML = labels.map((label, idx) => {
            let cls = 'progress-step';
            if (idx < this.currentStep) cls += ' completed';
            if (idx === this.currentStep) cls += ' active';

            return `
        <div class="${cls}" data-step="${idx}">
          <div class="progress-step__dot">${idx < this.currentStep ? '✓' : idx + 1}</div>
          <span class="progress-step__label">${label}</span>
        </div>
      `;
        }).join('');

        fill.style.width = `${((this.currentStep + 1) / this.totalSteps) * 100}%`;

        // Click on completed steps to navigate back
        stepsContainer.querySelectorAll('.progress-step.completed, .progress-step.active').forEach(el => {
            el.addEventListener('click', () => {
                const stepIdx = parseInt(el.dataset.step);
                if (stepIdx <= this.currentStep) {
                    this.currentStep = stepIdx;
                    this.render();
                }
            });
        });
    }

    renderStep() {
        const container = document.getElementById('wizard-container');
        if (this.steps[this.currentStep]) {
            container.innerHTML = '';
            const stepContent = this.steps[this.currentStep].render(this.state);
            container.innerHTML = stepContent;
            // Let step module bind events
            if (this.steps[this.currentStep].afterRender) {
                this.steps[this.currentStep].afterRender(this.state, this);
            }
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('btn-prev');
        const nextBtn = document.getElementById('btn-next');
        const indicator = document.getElementById('step-indicator');

        prevBtn.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';

        if (this.currentStep === this.totalSteps - 1) {
            nextBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Finalizar
      `;
            nextBtn.classList.remove('btn-primary');
            nextBtn.classList.add('btn-success');
        } else {
            nextBtn.innerHTML = `
        Siguiente
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      `;
            nextBtn.classList.add('btn-primary');
            nextBtn.classList.remove('btn-success');
        }

        indicator.textContent = `Paso ${this.currentStep + 1} de ${this.totalSteps}`;
    }

    next() {
        try {
            // Collect data from current step
            if (this.steps[this.currentStep] && this.steps[this.currentStep].collect) {
                this.steps[this.currentStep].collect(this.state);
            }

            // Validate
            const errors = validators[this.currentStep](this.state);
            if (errors.length > 0) {
                this.showErrors(errors);
                return;
            }

            // Clear errors
            this.clearErrors();

            if (this.currentStep < this.totalSteps - 1) {
                this.currentStep++;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (e) {
            console.error(e);
            this.toast(`Error inesperado: ${e.message}`, 'error');
        }
    }

    prev() {
        // Collect without validating
        if (this.steps[this.currentStep] && this.steps[this.currentStep].collect) {
            this.steps[this.currentStep].collect(this.state);
        }

        if (this.currentStep > 0) {
            this.currentStep--;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    showErrors(errors) {
        // Mark fields with errors
        errors.forEach(err => {
            const el = document.querySelector(`[data-field="${err.field}"]`);
            if (el) {
                el.classList.add('error');
                const msg = el.parentElement.querySelector('.input-error-msg');
                if (msg) {
                    msg.textContent = err.msg;
                    msg.classList.add('visible');
                }
            }
        });

        // Show toast
        this.toast(errors[0].msg, 'error');
    }

    clearErrors() {
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.input-error-msg.visible').forEach(el => el.classList.remove('visible'));
    }

    toast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    save() {
        saveState({
            state: this.state,
            currentStep: this.currentStep
        });
    }

    reset() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo? Se perderá todo el progreso.')) {
            clearState();
            this.state = this.getDefaultState();
            this.currentStep = 0;
            this.render();
            this.toast('Wizard reiniciado correctamente.', 'info');
        }
    }
}
