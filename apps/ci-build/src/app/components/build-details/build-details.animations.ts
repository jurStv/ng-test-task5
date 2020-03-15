import { trigger, style, transition, animate } from '@angular/animations';

export const buildDetailsAnimation = trigger('buildDetailsAnimation', [
  transition(':enter', [
    style({
      transform: 'scaleY(0.9)',
      opacity: 0,
    }),
    animate('300ms 100ms linear', style({
      transform: 'scaleY(1)',
      opacity: 1,
    }))
  ]),
]);
