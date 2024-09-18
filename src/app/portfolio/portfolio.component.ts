import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
  imports: [CommonModule, ProjectComponent, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'projects.join',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      description: 'projects.join_description',
      imageUrl: 'assets/screens/join.png',
      liveTestLink: 'https://caro-willers.com/join',
      githubLink: 'https://github.com/CaroWillers/Join.git',
      imageOnLeft: false,
    },
    {
      title: 'projects.pollo_loco',
      description: 'projects.pollo_loco_description',
      imageUrl: 'assets/screens/polloloco.png',
      liveTestLink: 'https://caro-willers.com/polloloco',
      githubLink: 'https://github.com/CaroWillers/PolloLoco.git',
      imageOnLeft: true,
      technologies: ['JavaScript', 'HTML', 'CSS']
    },
    {
      title: 'projects.pokedex',
      description: 'projects.pokedex_description',
      imageUrl: 'assets/screens/pokedex.png',
      liveTestLink: 'https://caro-willers.com/pokedex',
      githubLink: 'https://github.com/CaroWillers/pokedex.git',
      imageOnLeft: false,
      technologies: ['JavaScript', 'HTML', 'CSS', 'API']
    },
    {
      title: 'projects.da_bubble',
      description: 'projects.da_bubble_description',
      imageUrl: 'assets/screens/dabubble.png',
      liveTestLink: 'https://caro-willers.com/dabubble',
      githubLink: 'https://github.com/CaroWillers/dabubble.git',
      imageOnLeft: true,
      technologies: ['Angular', 'TypeScript', 'Firebase']
    }
  ];
}
