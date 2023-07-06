import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  }, 
  {
    path: 'detalle',
    component: DetalleComponent
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
