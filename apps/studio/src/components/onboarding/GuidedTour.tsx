import React, { useMemo, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { useOnboardingStore } from '../../store/onboarding-store';
import type { TourStep, SkillLevel } from '../../types/onboarding';

const getTourSteps = (skillLevel: SkillLevel): TourStep[] => {
  const baseSteps: TourStep[] = [
    {
      target: '.node-panel',
      title: '🧰 Your Toolkit',
      content:
        'Drag these building blocks to create shapes. Start with simple ones like boxes and circles!',
      placement: 'right',
      spotlightPadding: 20,
    },
    {
      target: '.main-content .node-editor',
      title: '🔗 Visual Programming Canvas',
      content:
        'Connect blocks together like LEGO pieces. No coding required - just drag and connect!',
      placement: 'top',
      spotlightPadding: 15,
    },
    {
      target: '.viewport-3d',
      title: '👁️ 3D Preview',
      content:
        'Watch your creations come to life! Rotate, zoom, and inspect your 3D models in real-time.',
      placement: 'left',
      spotlightPadding: 10,
    },
    {
      target: '.sidebar-right',
      title: '⚙️ Fine-tune Everything',
      content: 'Adjust parameters, colors, and properties. Every detail is at your fingertips!',
      placement: 'left',
      spotlightPadding: 15,
    },
  ];

  if (skillLevel === 'neophyte') {
    return [
      {
        target: 'body',
        title: '👋 Welcome to Sim4D Studio!',
        content:
          "Let me show you around this powerful 3D modeling studio. Don't worry - it's easier than it looks!",
        placement: 'bottom',
        disableBeacon: true,
      },
      ...baseSteps,
      {
        target: '.logo',
        title: "🎯 You're Ready to Create!",
        content:
          "Now let's try building your first 3D shape together. I'll guide you through each step!",
        placement: 'bottom',
        spotlightPadding: 10,
      },
    ];
  }

  if (skillLevel === 'beginner') {
    return [
      {
        target: 'body',
        title: '🚀 Quick Sim4D Tour',
        content:
          "Since you have some 3D experience, let me quickly show you Sim4D's unique features.",
        placement: 'bottom',
        disableBeacon: true,
      },
      ...baseSteps,
    ];
  }

  return baseSteps;
};

// Joyride styles use CSS color values (third-party API requirement).
// Colors aligned with Tailwind palette: indigo-500, gray-800, gray-600, gray-500, gray-400.
const COLORS = {
  indigo500: 'rgb(99, 102, 241)',   // tailwind indigo-500
  gray800: 'rgb(31, 41, 55)',       // tailwind gray-800
  gray600: 'rgb(75, 85, 99)',       // tailwind gray-600
  gray500: 'rgb(107, 114, 128)',    // tailwind gray-500
  gray400: 'rgb(156, 163, 175)',    // tailwind gray-400
} as const;

const joyrideStyles = {
  options: {
    primaryColor: COLORS.indigo500,
    backgroundColor: '#ffffff',
    overlayColor: 'rgba(0, 0, 0, 0.4)',
    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    width: 400,
    zIndex: 1000,
  },
  tooltip: {
    borderRadius: '12px',
    fontSize: '16px',
  },
  tooltipContainer: {
    textAlign: 'left' as const,
  },
  tooltipTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '8px',
    color: COLORS.gray800,
  },
  tooltipContent: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: COLORS.gray600,
    marginBottom: '16px',
  },
  buttonNext: {
    backgroundColor: COLORS.indigo500,
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    padding: '10px 20px',
  },
  buttonBack: {
    color: COLORS.gray500,
    marginRight: '12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  buttonSkip: {
    color: COLORS.gray400,
    fontSize: '14px',
  },
  beacon: {
    inner: COLORS.indigo500,
    outer: COLORS.indigo500,
  },
};

export const GuidedTour: React.FC = () => {
  const { state, completeStep, exitOnboarding, trackEvent } = useOnboardingStore();

  const tourSteps = useMemo(() => getTourSteps(state.userSkillLevel), [state.userSkillLevel]);

  const handleTourCallback = useCallback(
    (data: CallBackProps) => {
      const { status, type, index, action } = data;

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        trackEvent({
          type: status === STATUS.SKIPPED ? 'tour_skipped' : 'step_completed',
          metadata: {
            tour_completed: status === STATUS.FINISHED,
            steps_completed: index + 1,
            total_steps: tourSteps.length,
          },
        });

        // Move to playground selection
        completeStep('interface_tour');
        // Don't exit onboarding, just end tour mode
      }

      if (type === EVENTS.STEP_AFTER) {
        const stepId = `tour_step_${index}`;
        completeStep(stepId);
      }

      // Track user interactions
      if (action === ACTIONS.CLOSE || action === ACTIONS.SKIP) {
        trackEvent({
          type: 'tour_skipped',
          metadata: {
            step_index: index,
            action: action,
          },
        });
      }
    },
    [tourSteps.length, completeStep, trackEvent]
  );

  if (!state.tourMode) {
    return null;
  }

  return (
    <Joyride
      steps={tourSteps}
      run={state.tourMode}
      continuous
      showProgress
      showSkipButton
      callback={handleTourCallback}
      styles={joyrideStyles as any}
      locale={{
        back: '← Previous',
        close: 'Close',
        last: 'Get Started! 🚀',
        next: 'Next →',
        skip: 'Skip Tour',
        open: 'Open the dialog',
      }}
      floaterProps={{
        disableAnimation: false,
      }}
      disableOverlayClose
      hideCloseButton={false}
      spotlightClicks={false}
      disableScrollParentFix={true}
    />
  );
};
