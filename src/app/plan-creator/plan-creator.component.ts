import { Component, signal } from '@angular/core';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-plan-creator',
  standalone: true,
  imports: [AdvancedFormComponent, ButtonComponent],
  templateUrl: './plan-creator.component.html',
  styleUrl: './plan-creator.component.scss',
})
export class PlanCreatorComponent {
  showAdvancedForm = signal(false);

  toggleAdvancedForm() {
    this.showAdvancedForm.update((value) => !value);
  }
}
