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
      imageUrl: 'assets/screens/join.png',
      liveTestLink: 'https://caro-willers.com/join',
      githubLink: 'https://github.com/CaroWillers/Join.git',
      imageOnLeft: false,

    },
    {
      title: 'Pollo Loco',
      description: 'A simple Jump and Run game based on an object oriented apporach. Help Pepe to collect coins and avoid upcoming obstacles.',
      imageUrl: 'assets/screens/polloloco.png',
      liveTestLink: 'https://caro-willers.com/polloloco',
      githubLink: 'https://github.com/CaroWillers/PolloLoco.git',
      imageOnLeft: true,
      technologies: ['JavaScript', 'HTML', 'CSS']  
    },
    {
      title: 'Pokedex',
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      imageUrl: 'assets/screens/pokedex.png',
      liveTestLink: 'https://caro-willers.com/pokedex',
      githubLink: 'https://github.com/CaroWillers/pokedex.git',
      imageOnLeft: false,
      technologies: ['JavaScript', 'HTML', 'CSS', 'API']  
    },
    {
      title: 'DA Bubble',
      description: 'This App is a Slack Colone App. It revolutionizes team comunication and collaboration with its intuitive interface, real-time messaging and robust channel organizsation.',
      imageUrl: 'assets/screens/dabubble.png',
      liveTestLink: 'https://caro-willers.com/dabubble',
      githubLink: 'https://github.com/CaroWillers/dabubble.git',
      imageOnLeft: true,
      technologies: ['Angular', 'TypeScript', 'Firebase' ]  
    }
  ];
}