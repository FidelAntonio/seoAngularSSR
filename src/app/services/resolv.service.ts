import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolvService implements Resolve<any>  {

  data:any[] =[]
  constructor(private httpService: HttpClient,) { }


    // getHero(id: string) {
    //   this.httpService.get('https://rickandmortyapi.com/api/character/' + 1).subscribe((result: any) => {
    //   this.data = result;
    //   console.log('algo',this.data)
    //   return of(this.data);
    //   })
    // }

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

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log(route)
    const userId = route.queryParams['id'];
    console.log(userId);
    const url = `https://rickandmortyapi.com/api/character/${userId}`;
    return this.httpService.get(url);
  }
}
