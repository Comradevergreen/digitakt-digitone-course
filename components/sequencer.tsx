import React from 'react';
import styles from './sequencer.module.css';

interface SequencerStep {
  step: number;
  type: 'red' | 'yellow' | 'green' | 'purple';
}

interface SequencerProps {
  activeSteps: SequencerStep[];
  variant: 'digitakt' | 'digitone';
}

const Sequencer: React.FC<SequencerProps> = ({ activeSteps, variant }) => {
  const steps = Array.from({ length: 16 }, (_, i) => i + 1);
  const buttonClass = variant === 'digitakt' ? styles.digitaktButton : styles.digitoneButton;

  return (
    <div className={`sequencer-root ${styles.sequencerGrid}`}>
      {steps.map((step) => {
        const activeStep = activeSteps.find((s) => s.step === step);
        const stepClass = `${styles.sequencerButton} ${buttonClass} ${[1, 5, 9, 13].includes(step) ? styles.borderStep : ''}`;
        const textColorClass = activeStep ? styles[`trig${activeStep.type.charAt(0).toUpperCase() + activeStep.type.slice(1)}`] : styles.trigInactive;
        const borderStyle = activeStep && [1, 5, 9, 13].includes(step) ? { borderColor: `var(--color-${activeStep.type})` } : {};

        return (
          <div key={step} className={stepClass} style={borderStyle}>
            <span className={textColorClass} style={{ textDecoration: 'underline' }}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Sequencer;
