import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],
})

export class ImpressumComponent implements OnInit {
  ngOnInit(): void { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
