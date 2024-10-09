import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
    private scrollService: ScrollService
  ) {
    this.translate.get('contact.privacy_policy').subscribe((res: string) => {
      this.privacyPolicyText = this.sanitizer.bypassSecurityTrustHtml(
        res.replace('{{ link }}', '/privacy-policy')
      );
    });
  }
  ngAfterViewInit() {
    this.scrollService.initScrollAnimation();
  }

  // Show the privacy policy page
  showPrivacyPolicy(): void {
    this.router.navigateByUrl('/privacy-policy');
  }

  // Toggle the privacy checkbox state
  toggleButtonState(): void {
    this.isPrivacyChecked = this.contactData.privacy;
  }

 // Handle form submission
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
        next: (response) => { 
          ngForm.resetForm(); // Reset the form after successful submission
          this.showModal = true; // Show the modal after form submission
          this.isPrivacyChecked = false; // Reset the privacy checkbox state
        },
        error: (error) => {
          // Handle error, you could display an error message to the user
        },
        complete: () => {
          // Optional: You can handle any finalization logic here if needed
        },
      });
  } else {
    this.validateAllFields(ngForm);
    // Optional: Show feedback to the user that the form is not valid or privacy not checked
  }
}


  // Validate all form fields
  validateAllFields(form: NgForm): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field];
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  // Reset specific field error state
  resetError(fieldName: string, form: NgForm): void {
    const control = form.controls[fieldName];
    if (control) {
      control.markAsUntouched();
    }
  }

  // Show privacy error if privacy is not checked but form fields are valid
  showPrivacyError(form: NgForm): boolean {
    return (
      !this.isPrivacyChecked &&
      form.controls['name']?.valid &&
      form.controls['email']?.valid &&
      form.controls['message']?.valid
    );
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
  }
}
