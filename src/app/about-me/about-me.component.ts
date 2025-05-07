import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate('2000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AboutMeComponent implements AfterViewInit {
  currentLang: string;

  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private scrollService: ScrollService,
    private meta: Meta,
    private title: Title
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

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private setMetaTags(): void {
    const title =
      this.currentLang === 'de'
        ? 'Über mich – Caro Willers'
        : 'About Me – Caro Willers';

    const description =
      this.currentLang === 'de'
        ? 'Lernen Sie meine Arbeitsweise, Werte und Fähigkeiten kennen. Technische Expertise trifft auf Teamgeist und Kommunikation.'
        : 'Discover my working style, values and strengths. Technical skills meet communication and teamwork.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Über mich, About Me, IT-Consultant, Frontend, Projektmanagement, Kommunikation, SCRUM, Caro Willers',
    });
  }
}
