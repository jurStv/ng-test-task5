import { trigger, transition, style, animate } from '@angular/animations';

export const stepAnimation = trigger('stepAnimation', [
  transition(':enter', [
    style({
      transform: 'translateX(-20px)',
      opacity: 0,
    }),
    animate('300ms 100ms linear', style({
      transform: 'translateX(0)',
      opacity: 1,
    }))
  ])
]);

export const stepStatusIconAnimation = trigger('stepStatusIconAnimation', [
  transition(':enter', [
    style({
      transform: 'scale(0.7)',
      opacity: 0,
    }),
    animate('300ms 100ms linear', style({
      transform: 'scale(1)',
      opacity: 1,
    }))
  ])
]);
