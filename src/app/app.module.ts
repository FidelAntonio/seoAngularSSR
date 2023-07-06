import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { Observable, tap } from 'rxjs';
import { response } from 'express';


function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get("https://rickandmortyapi.com/api/character/1")
    .pipe(
        tap(user => {
          console.log(user);
         })
      // console.log(response)
    );
 }






@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    RouterModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [HttpClient],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
