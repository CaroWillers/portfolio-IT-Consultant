import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {

  constructor() {}

  // Diese Funktion initialisiert die Scroll-Animation für alle h1-Elemente
  public initScrollAnimation() {
    const headings = document.querySelectorAll('h1.h1') as NodeListOf<HTMLElement>;  

    window.addEventListener('scroll', () => {
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
        if (isVisible) {
          heading.classList.add('p-in');
        } else {
          heading.classList.remove('p-in');
        }
      });
    });
  }
}
