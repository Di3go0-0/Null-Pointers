import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import localeEsCO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEsCO);

bootstrapApplication(AppComponent, {
  ...appConfig,
  
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    //httpClientProviders,
    provideHttpClient(),
    ...appConfig.providers,
  ]
})
  .catch((err) => console.error(err));
