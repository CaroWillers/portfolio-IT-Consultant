import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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

  // Diese Methode überprüft, ob das Projekt "DA Bubble" ist
  isDaBubbleProject(): boolean {
    return this.title === 'DA Bubble';
  }

  // Diese Methode zeigt das Popup an
  showPopup(event: MouseEvent): void {
    const popup = (event.target as HTMLElement).nextElementSibling;
    if (popup) {
      (popup as HTMLElement).style.display = 'block';
    }
  }

  // Diese Methode versteckt das Popup
  hidePopup(event: MouseEvent): void {
    const popup = (event.target as HTMLElement).nextElementSibling;
    if (popup) {
      (popup as HTMLElement).style.display = 'none';
    }
  }
}
