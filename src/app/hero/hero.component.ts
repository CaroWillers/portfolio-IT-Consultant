import {
  Component,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core'; // Add HostListener
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit {
  private heroTextContainer: HTMLElement | null = null;
  currentLang: string;


  constructor(private elementRef: ElementRef, private translate: TranslateService,  private meta: Meta, private title: Title   ) {

    this.currentLang = this.translate.currentLang || 'en'; // Fallback to 'en' if currentLang is not set
    
    this.setMetaTags();

  this.translate.onLangChange.subscribe((event) => {
  this.currentLang = event.lang; // Update currentLang when the language changes
  this.setMetaTags(); // Update meta tags when the language changes
});
}

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

  private setMetaTags(): void {
    const title =
      this.currentLang === 'de'
        ? 'Caro Willers – IT-Consultant & Project Manager'
        : 'Caro Willers – IT Consultant & Project Manager';

    const description =
      this.currentLang === 'de'
        ? 'Ich unterstütze Unternehmen mit technischer Expertise und Projektleitungskompetenz.'
        : 'Supporting companies with tech expertise and project leadership.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'IT Consultant, Frontend Entwicklung, Angular, Projektmanagement, SCRUM, Webentwicklung Münster',
    });
  }
}
