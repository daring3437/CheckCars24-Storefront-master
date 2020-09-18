import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'checkcars-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Output() sendOfferRequest: EventEmitter<any> = new EventEmitter(null);
  notSubmitted = true;
  hasError = false;
  callingTimes = [
    '8:00-10:00',
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '16:00-18:00',
    '18:00-20:00',
  ];
  contactForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initContactForm();
  }
  initContactForm() {
    this.contactForm = this.fb.group({
      Type: ['Credit', Validators.required],
      Name: [null, Validators.required],
      Phone: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      City: [null, Validators.required],
      CallTime: [null, Validators.required],
      TermsAccepted: [false, [Validators.required, CustomValidators.accepted]],
    });
  }
  submitContatctForm() {
    if (this.contactForm.invalid) return;
    console.log(this.contactForm.value);
    this.sendOfferRequest.emit(this.contactForm.value);
  }
}

//Todo move to external file
import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  public static accepted(control: AbstractControl) {
    return !control.value ? { accepted: true } : null;
  }
}
