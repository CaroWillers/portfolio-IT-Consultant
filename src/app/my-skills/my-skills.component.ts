import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ScrollService } from '../services/scroll.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate(
          '1000ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MySkillsComponent implements AfterViewInit {
  currentLang: string;

  constructor(
    private scrollService: ScrollService,
    private meta: Meta,
    private title: Title,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';
    this.setMetaTags();

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.setMetaTags();
    });
  }

  ngAfterViewInit() {
    this.scrollService.initScrollAnimation();
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private setMetaTags(): void {
    const title =
      this.currentLang === 'de'
        ? 'Kompetenzen – Caro Willers'
        : 'Skills – Caro Willers';

    const description =
      this.currentLang === 'de'
        ? 'Fachliche IT-Kompetenz trifft auf praktische Projekterfahrung. Erfahren Sie, wie ich digitale Projekte mit Struktur begleite.'
        : 'Combining tech skills and project know-how – how I support digital workflows efficiently.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'IT Consultant, Skills, Projektmanagement, Angular, SCRUM, Webentwicklung, Tech Beratung',
    });
  }
}
