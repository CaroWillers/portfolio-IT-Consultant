import { Component, ElementRef, AfterViewInit, HostListener } from '@angular/core'; // HostListener hinzufügen
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll'; 


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit {

  private heroTextContainer: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.heroTextContainer = this.elementRef.nativeElement.querySelector('.hero-text-container');
    
    if (this.heroTextContainer) {
      this.checkVisibilityAndAnimate(); // Initiale Überprüfung bei Laden der Seite
    }
  }

  // Scroll-Event Listener, um bei jedem Scrollen die Sichtbarkeit zu prüfen
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkVisibilityAndAnimate(); // Überprüfung der Sichtbarkeit beim Scrollen
  }

  // Funktion zur Überprüfung der Sichtbarkeit
  private checkVisibilityAndAnimate(): void {
    if (!this.heroTextContainer) return; // Sicherheitsüberprüfung, ob das Element existiert
    const rect = this.heroTextContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      // Füge die Klasse hinzu, wenn das Element sichtbar ist
      this.heroTextContainer.classList.add('animate');
    } else {
      // Entferne die Klasse, wenn das Element nicht sichtbar ist
      this.heroTextContainer.classList.remove('animate');
    }
  }
}