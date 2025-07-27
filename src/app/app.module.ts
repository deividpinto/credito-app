import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './shared/interceptors/auth.interceptor';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: LOCALE_ID, useValue: 'pt'},
    provideHttpClient(withInterceptors([loggingInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
