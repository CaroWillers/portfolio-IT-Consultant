import {
  Component,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core'; // Add HostListener
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
    this.heroTextContainer = this.elementRef.nativeElement.querySelector(
      '.hero-text-container'
    );

    if (this.heroTextContainer) {
      this.checkVisibilityAndAnimate(); // Initial check when the page loads
    }
  }

  // Scroll event listener to check visibility on every scroll
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkVisibilityAndAnimate(); // Check visibility on scrolling
  }

  // Function to check visibility
  private checkVisibilityAndAnimate(): void {
    if (!this.heroTextContainer) return; // Safety check if the element exists
    const rect = this.heroTextContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      // Add the class if the element is visible
      this.heroTextContainer.classList.add('animate');
    } else {
      // Remove the class if the element is not visible
      this.heroTextContainer.classList.remove('animate');
    }
  }

  scrollToContact() {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }  
}
