import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolvService implements Resolve<any>{

  constructor() { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      let alo=route.queryParams['id']
      console.log(alo);
      //  let searchTerm: any = route.queryParams.get('id') || null;
    //  let id = route.params['id'];
    //  console.log('desde el resolve',searchTerm);
     return alo
    }
}
