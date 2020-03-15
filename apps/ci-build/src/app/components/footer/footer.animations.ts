import { trigger, style, transition, animate } from '@angular/animations';

export const footerAnimation = trigger('footerAnimation', [
  transition(':enter', [
    style({
      transform: 'translateY(20px)',
      opacity: 0,
    }),
    animate('300ms 100ms linear', style({
      transform: 'translateY(0)',
      opacity: 1,
    }))
  ])
]);
