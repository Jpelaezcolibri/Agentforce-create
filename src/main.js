/* ═══════════════════════════════════════════════════════════════
   MAIN — Entry point for Agentforce Wizard
   ═══════════════════════════════════════════════════════════════ */

import { WizardEngine } from './wizard/WizardEngine.js';
import { Step1Prereqs } from './steps/Step1Prereqs.js';
import { Step2Definition } from './steps/Step2Definition.js';
import { Step3Capabilities } from './steps/Step3Capabilities.js';
import { Step4Data } from './steps/Step4Data.js';
import { Step5Conversation } from './steps/Step5Conversation.js';
import { Step6Security } from './steps/Step6Security.js';
import { Step7Summary } from './steps/Step7Summary.js';

// Initialize wizard
const wizard = new WizardEngine();

// Register all steps
wizard.registerSteps([
    Step1Prereqs,
    Step2Definition,
    Step3Capabilities,
    Step4Data,
    Step5Conversation,
    Step6Security,
    Step7Summary
]);

// Render initial state
wizard.render();

// Mount Help Agent
// Mount Help Agent
import './components/HelpAgent.js';

const helpAgent = document.createElement('help-agent');
document.body.appendChild(helpAgent);

// Context awareness: dispatch event on render
const originalRender = wizard.render.bind(wizard);
wizard.render = () => {
    originalRender();
    window.dispatchEvent(new CustomEvent('wizard-step-change', {
        detail: { step: wizard.currentStep }
    }));
};

// Navigation buttons
document.getElementById('btn-next').addEventListener('click', () => wizard.next());
document.getElementById('btn-prev').addEventListener('click', () => wizard.prev());
document.getElementById('btn-reset').addEventListener('click', () => wizard.reset());

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Alt + Right = next, Alt + Left = prev
    if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        wizard.next();
    } else if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        wizard.prev();
    }
});
