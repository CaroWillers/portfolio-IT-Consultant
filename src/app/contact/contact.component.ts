import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {  
  isPrivacyChecked: boolean = false;
  showModal: boolean = false; 
  privacyPolicyText: SafeHtml = '';  

  private router = inject(Router);

  constructor(private sanitizer: DomSanitizer, private translate: TranslateService) { 
      this.translate.get('contact.privacy_policy').subscribe((res: string) => {
        this.privacyPolicyText = this.sanitizer.bypassSecurityTrustHtml(
          res.replace('{{ link }}', '/privacy-policy')
        );
      });
    }


    showPrivacyPolicy() {
      this.router.navigateByUrl('/privacy-policy');  
    }
  
  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
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

  toggleButtonState() {
    this.isPrivacyChecked = this.contactData.privacy;
  }

  onSubmit(ngForm: NgForm) {
    this.validateAllFields(ngForm);

    if (ngForm.valid && this.isPrivacyChecked) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            console.info('Form submitted successfully:', response);
            ngForm.resetForm();
            this.showModal = true;  
            this.isPrivacyChecked = false; // Reset the privacy checkbox state
          },
          error: (error) => {
            console.error('Error occurred while submitting the form:', error);
          },
          complete: () => console.info('Form submission process completed'),
        });
    } else {
      console.warn('Form submission failed: form is either not valid');
      this.validateAllFields(ngForm);
    }
  }
  validateAllFields(form: NgForm) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  } 

  closeModal() {
    this.showModal = false;  
  }

  resetError(fieldName: string, form: NgForm) {
    const control = form.controls[fieldName];
    if (control) {
      control.markAsUntouched();
    }
}

showPrivacyError(form: NgForm): boolean {
  return !this.isPrivacyChecked &&
         form.controls['name']?.valid &&
         form.controls['email']?.valid &&
         form.controls['message']?.valid;
}
}
