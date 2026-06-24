import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  messageService = inject(MessageService);

  contact = new FormGroup({
    subject: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });

  onSubmit(event: Event) {
    event?.preventDefault();
    if (this.contact.valid) {
      const formData = this.contact.value;
      fetch('http://127.0.0.1:8000/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Message sent successfully'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to send message'});
        });
    }
  }
}
