import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollService } from '../services/scroll.service';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Meta, Title } from '@angular/platform-browser';

interface Project {
  title: string;
  technologies: string[];
  description: string;
  liveTestLink: string;
  githubLink: string;
  imageUrl: string;
  imageOnLeft: boolean;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    TranslateModule,
    AnimateOnScrollModule,
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements AfterViewInit {
  projects: Project[] = [
    {
      title: 'projects.join',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      description: 'projects.join_description',
      imageUrl: 'assets/screens/join.png',
      liveTestLink: 'https://caro-willers.com/join',
      githubLink: 'https://github.com/CaroWillers/jointaskmanager.git',
      imageOnLeft: false,
    },
    {
      title: 'projects.pollo_loco',
      description: 'projects.pollo_loco_description',
      imageUrl: 'assets/screens/polloloco.png',
      liveTestLink: 'https://caro-willers.com/polloloco',
      githubLink: 'https://github.com/CaroWillers/PolloLoco.git',
      imageOnLeft: true,
      technologies: ['JavaScript', 'HTML', 'CSS'],
    },
    {
      title: 'projects.pokedex',
      description: 'projects.pokedex_description',
      imageUrl: 'assets/screens/pokedex.png',
      liveTestLink: 'https://caro-willers.com/pokedex',
      githubLink: 'https://github.com/CaroWillers/pokedex.git',
      imageOnLeft: false,
      technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
    },
    {
      title: 'projects.da_bubble',
      description: 'projects.da_bubble_description',
      imageUrl: 'assets/screens/dabubble.png',
      liveTestLink: 'https://caro-willers.com/dabubble',
      githubLink: 'https://github.com/CaroWillers/dabubble.git',
      imageOnLeft: true,
      technologies: ['Angular', 'TypeScript', 'Firebase'],
    },
  ];

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

  private setMetaTags(): void {
    const title =
      this.currentLang === 'de'
        ? 'Portfolio – Caro Willers'
        : 'Portfolio – Caro Willers';

    const description =
      this.currentLang === 'de'
        ? 'Eine Auswahl meiner Web-Projekte – von Angular bis Firebase. Interaktive Demos und GitHub-Links inklusive.'
        : 'A selection of my web projects – from Angular to Firebase. Including live demos and GitHub links.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Portfolio, Web Projekte, Angular, Firebase, GitHub, TypeScript, Frontend Entwicklung, Caro Willers',
    });
  }
}
