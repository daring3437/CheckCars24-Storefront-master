import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '@checkcars/shared';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm;
  response: 'success' | 'error' | null = null;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.initContactForm();
  }
  initContactForm() {
    this.contactForm = this.fb.group({
      Type: ['contact', Validators.required],
      Name: [null, Validators.required],
      Phone: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      TermsAccepted: [false, [Validators.required, CustomValidators.accepted]],
      Subject: [null, Validators.required],
      Text: [null, Validators.required],
    });
  }

  submitContactForm() {
    this.contactService.sendRequest(this.contactForm.value).subscribe(
      () => {
        this.contactForm.reset();
        this.showFeedback('success');
      },
      () => {
        this.showFeedback('error');
      }
    );
  }
  showFeedback(status: 'success' | 'error'): void {
    this.response = status;
    setTimeout(() => {
      this.response = null;
    }, 3000);
  }
}

//Todo move to external file
import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  public static accepted(control: AbstractControl) {
    return !control.value ? { accepted: true } : null;
  }
}
