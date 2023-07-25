import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ResolvService } from './services/resolv.service';


export const heroResolver: ResolveFn<any> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ResolvService).getHero(route.queryParamMap.get('id')!);
      // this.route.queryParams.subscribe(params => {this.idCurso =params.Oid;});
    };
const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'detalle',
    component: DetalleComponent,
    resolve: {id: heroResolver},
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
