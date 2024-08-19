import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
}) 
export class ContactComponent { 

  http = inject(HttpClient);

  contactData = {
      name: [''],
      email: [''],
      message: [''],
      privacy: [false]
  };

  showModal = false;

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
  
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            console.info('Form submitted successfully:', response);
            ngForm.resetForm();
            this.showModal = true;  
          },
          error: (error) => {
            console.error('Error occurred while submitting the form:', error);
          },
          complete: () => console.info('Form submission process completed'),
        });
    } else {
      console.warn('Form submission failed: form is either not submitted or invalid');
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
}