import { trigger, transition, query, animateChild, stagger, style, animate } from '@angular/animations';

export const animateBuildSteps = trigger('animateBuildSteps', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('100ms ease-in', style({
      opacity: 1,
    })),
    query('@stepAnimation', stagger(150, animateChild()), { optional: true }),
    query('@stepStatusIconAnimation', stagger(150, animateChild()), { optional: true }),
  ])
]);

export const initialStepAnimation = trigger('initialStepAnimation', [
  transition(':enter', [
    style({
      transform: 'translateY(-20px)',
      opacity: 0,
    }),
    animate('300ms 100ms linear', style({
      transform: 'translateY(0)',
      opacity: 1,
    }))
  ])
]);
