import { AppModule } from './app/app.module';
import { enableProdMode, Injector } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowser } from '@angular/platform-browser';

export let injector: Injector;

if (environment.production) {
  enableProdMode();
}

platformBrowser()
  .bootstrapModule(AppModule)
  .then((ref) => {
    injector = ref.injector;
    // @ts-ignore
    window['injector'] = injector;
  })
  .catch((err) => console.log(err));
