import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolvService {

  constructor() { }


    getHero(id: string) {
      return id;
    }

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  //   ): Observable<any>|Promise<any>|any {
  //     let alo=route.queryParams['id']
  //     console.log(alo);
  //     //  let searchTerm: any = route.queryParams.get('id') || null;
  //   //  let id = route.params['id'];
  //   //  console.log('desde el resolve',searchTerm);
  //    return alo
  //   }
}
