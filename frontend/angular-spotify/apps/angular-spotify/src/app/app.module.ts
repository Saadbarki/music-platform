import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

// NgRx best practices: Initialize the Root Store and Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Spotify Config: Using the confirmed export from your library
import { getAppConfigProvider } from '@angular-spotify/web/shared/app-config';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

/**
 * Best Practice: Define routes in a constant for readability.
 * Lazy load feature modules to keep the initial bundle small.
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@angular-spotify/web/home').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { 
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled' 
    }),

    // Initialize Global Store with empty object (Feature modules will provide their own state)
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),

    // Initialize Global Effects (Feature modules will provide their own effects)
    EffectsModule.forRoot([]),

    // Redux DevTools for debugging state in Chrome/Edge
    !environment.production ? StoreDevtoolsModule.instrument({ name: 'Angular Spotify' }) : [],

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    // ✅ The critical provider that fixes your "InjectionToken" error
    getAppConfigProvider(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
