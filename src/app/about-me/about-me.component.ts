import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
        animate(
          '2000ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class AboutMeComponent implements AfterViewInit {
  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private scrollService: ScrollService
  ) {}

  /*get safe html*/
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngAfterViewInit() {
    this.scrollService.initScrollAnimation();
  }
}
