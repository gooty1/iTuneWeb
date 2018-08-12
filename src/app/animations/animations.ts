import { trigger, style, transition, animate } from "@angular/animations";

export const slideUp = trigger('slideUp', [
    transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('200ms ease-out')
    ])
  ]);

export const fadeIn = trigger('fadeIn', [
    transition('void => *', [
        style({opacity: 1}),
        animate('200ms ease-out')
    ])
  ]);

export const slideIn = trigger('slideIn', [
    transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-out')
    ])
  ]);