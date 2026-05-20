import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-contact',
  imports: [MatFormField, MatLabel, MatInput],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
