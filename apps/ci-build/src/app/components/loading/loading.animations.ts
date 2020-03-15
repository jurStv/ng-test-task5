import { animate, style, transition, trigger } from '@angular/animations';

export const loadingAppearanceAnimation = trigger('loadingAppearanceAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-100px)',
    }),
    animate('300ms ease-out', style({
      opacity: 1,
      transform: 'translateY(0px)',
    }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({
      opacity: 0,
      transform: 'translateY(100px)',
    })),
  ])
]);
