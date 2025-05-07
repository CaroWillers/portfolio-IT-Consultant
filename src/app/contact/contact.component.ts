import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, AnimateOnScrollModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  isPrivacyChecked: boolean = false;
  showModal: boolean = false;
  privacyPolicyText: SafeHtml = '';

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  };

  post = {
    endPoint: 'https://caro-willers.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'text' as const,
    },
  };

  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private http: HttpClient,
    private router: Router,
    private scrollService: ScrollService,
    private meta: Meta,
    private title: Title
  ) {
    this.setMetaTags();

    this.translate.get('contact.privacy_policy').subscribe((res: string) => {
      this.privacyPolicyText = this.sanitizer.bypassSecurityTrustHtml(
        res.replace('{{ link }}', '/privacy-policy')
      );
    });

    this.translate.onLangChange.subscribe(() => {
      this.setMetaTags();
    });
  }

  ngAfterViewInit() {
    this.scrollService.initScrollAnimation();
  }

  private setMetaTags(): void {
    const currentLang = this.translate.currentLang || 'en';

    const title =
      currentLang === 'de' ? 'Kontakt – Caro Willers' : 'Contact – Caro Willers';

    const description =
      currentLang === 'de'
        ? 'Nehmen Sie Kontakt mit mir auf – ich freue mich auf Ihre Nachricht und melde mich schnellstmöglich zurück.'
        : 'Get in touch with me – I look forward to your message and will respond as soon as possible.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Kontaktformular, Kontakt, Anfrage, Caro Willers, Nachricht senden, Webentwicklung, IT Consultant',
    });
  }

  showPrivacyPolicy(): void {
    this.router.navigateByUrl('/privacy-policy');
  }

  toggleButtonState(): void {
    this.isPrivacyChecked = this.contactData.privacy;
  }

  onSubmit(ngForm: NgForm): void {
    this.validateAllFields(ngForm);

    if (ngForm.valid && this.isPrivacyChecked) {
      this.http
        .post(
          this.post.endPoint,
          this.post.body(this.contactData),
          this.post.options
        )
        .subscribe({
          next: () => {
            ngForm.resetForm();
            this.showModal = true;
            this.isPrivacyChecked = false;
          },
        });
    }
  }

  validateAllFields(form: NgForm): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field];
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  resetError(fieldName: string, form: NgForm): void {
    const control = form.controls[fieldName];
    if (control) {
      control.markAsUntouched();
    }
  }

  showPrivacyError(form: NgForm): boolean {
    return (
      !this.isPrivacyChecked &&
      form.controls['name']?.valid &&
      form.controls['email']?.valid &&
      form.controls['message']?.valid
    );
  }

  closeModal(): void {
    this.showModal = false;
  }
}
