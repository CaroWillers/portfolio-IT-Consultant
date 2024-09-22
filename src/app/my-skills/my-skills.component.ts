import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),  // Start position
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))  // End position
      ])
    ])
  ]
})

export class MySkillsComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit() {
    this.scrollService.initScrollAnimation();  
  }
}