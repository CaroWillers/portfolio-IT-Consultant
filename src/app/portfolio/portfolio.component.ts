import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';  // Stelle sicher, dass der Import korrekt ist

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
  imports: [CommonModule, ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'Join',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],   
      description: 'Task manager inspired by the Kanban System, Crete and organize tasks using drag and drop functions, assign users and categories.',
      imageUrl: 'assets/join.png',
      liveTestLink: 'https://example.com/project1',
      githubLink: 'https://github.com/example/project1',
      imageOnLeft: false,

    },
    {
      title: 'Pollo Loco',
      description: 'A simple Jump and Run game based on an object oriented apporach. Help Pepe to collect coins and avoid upcoming obstacles.',
      imageUrl: 'assets/join.png',
      liveTestLink: 'https://example.com/project2',
      githubLink: 'https://github.com/example/project2',
      imageOnLeft: true,
      technologies: ['JavaScript', 'HTML', 'CSS']  
    },
    {
      title: 'Pokedex',
      description: 'Based on teh PokéAPI a simple library that provides and catalogues pokemon information.',
      imageUrl: 'assets/join.png',
      liveTestLink: 'https://example.com/project3',
      githubLink: 'https://github.com/example/project3',
      imageOnLeft: false,
      technologies: ['JavaScript', 'HTML', 'CSS', 'API']  
    }
  ];
}