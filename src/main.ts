import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';


bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers, provideAnimationsAsync(), MessageService],
}).catch((err) => console.error(err));
