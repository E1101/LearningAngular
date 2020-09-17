// When we run our app with ng serve this is what happens:
// - ng serve looks at .angular-cli.json which specifies main.ts
//   as our entry point (and index.html as our index file)
// - main.ts bootstraps AppModule
// - AppModule specifies that AppComponent is the top level component
// - ... and then AppComponent renders the rest of our app!

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
