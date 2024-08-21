import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() title: string = '';
  @Input() technologies: string[] = [];  
  @Input() description: string = '';
  @Input() liveTestLink: string = '';
  @Input() githubLink: string = '';
  @Input() imageUrl: string = '';
  @Input() imageOnLeft: boolean = true;
}
