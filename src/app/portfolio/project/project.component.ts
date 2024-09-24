import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @Input() title: string = '';
  @Input() technologies: string[] = [];
  @Input() description: string = '';
  @Input() liveTestLink: string = '';
  @Input() githubLink: string = '';
  @Input() imageUrl: string = '';
  @Input() imageOnLeft: boolean = true;

  /*Methode to check if the project is DaBubble*/
  isDaBubbleProject(): boolean {
    return this.title === 'DA Bubble';
  }

  /*show popup*/
  showPopup(event: MouseEvent): void {
    const popup = (event.target as HTMLElement).nextElementSibling;
    if (popup) {
      (popup as HTMLElement).style.display = 'block';
    }
  }

  /*hide popup*/
  hidePopup(event: MouseEvent): void {
    const popup = (event.target as HTMLElement).nextElementSibling;
    if (popup) {
      (popup as HTMLElement).style.display = 'none';
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /*Methode for Mouseover (adds zoomin-class)*/
  zoomIn() {
    const projectElement = this.el.nativeElement.querySelector('.project');
    this.renderer.addClass(projectElement, 'zoomin');
  }

  /* Methode for Mouseleave (removes zoomin-class*/
  zoomOut() {
    const projectElement = this.el.nativeElement.querySelector('.project');
    this.renderer.removeClass(projectElement, 'zoomin');
  }
}
