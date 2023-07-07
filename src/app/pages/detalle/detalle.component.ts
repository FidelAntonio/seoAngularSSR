import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  // ulrimg="http://webdiputados/{titujloentrada}.png";
  urlimagen = 'https://rickandmortyapi.com/api/character/avatar/'

data:any;
  constructor(
    private router: Router,
    private httpService: HttpClient,
    private url: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: any,
  ) {
    let id: any = ''
    let name: any = ''
    if (isPlatformBrowser(this.platformId)) {
      let url = window.location.search;
      const params = new URLSearchParams(url);
      id = params.get('id')
      name = params.get('name')
    }
    this.url.queryParams.subscribe(async (e: any) => {
      this.id = e.id;
      this.name = e.name;
    });
    console.log(this.id);
    this.setSeo(name, 'https://rickandmortyapi.com/api/character/avatar/' + id + '.jpeg')
    this.httpService.get('https://rickandmortyapi.com/api/character/' + this.id).subscribe((result: any) => {
      this.data = result;
      console.log('h', this.data);
      this.title.setTitle(this.data.name + ' | SEO dinamico detalle')
      this.meta.updateTag({ property: 'description', content: `${this.data.image}` });
      this.meta.updateTag({ property: 'og:title', content: this.data.name + ' | SeoDinamico' });
      this.meta.updateTag({ property: 'og:image', content: this.data.image });
      this.meta.updateTag({ content: this.data.name} , 'name="description"' );
      this.meta.updateTag({name:'og:url',property:'og:url',content:'https://web.diputados.gob.mx/assets/images/logo.png'});
      this.meta.updateTag( { name:'description', content:'Article Description'},"name='description'");
      this.meta.updateTag( { property:'og:title', content:'Social Medi Description of the component'},"property='og:title'");
      this.meta.addTag({ property: 'og:title', content: 'Duplicate Social Media descripton'});
      this.meta.addTag({property:"og:url", content:"http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"});
      this.meta.addTag({property:"og:image",content:"http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"})

    })
  }

  result: any = []
  id: string = '';
  name: string = '';
  ngOnInit(): void {
    // this.url.queryParams.subscribe(async (e: any) => {
    //   this.id = e.id;
    //   this.name = e.name;


      //   this.meta.addTag({name: 'robots', content:'noindex'})
      // const linkElement = this.doc.head.querySelector(`link[rel='canonical']`)
      //   || this.doc.head.appendChild(this.doc.createElement('link'));

      // if (linkElement) {
      //   linkElement.setAttribute('rel', 'canonical');
      //   linkElement.setAttribute('href', this.doc.URL.split('?')[0]);
      // }
    // });

    // setTimeout(() => {
    //   this.setSeo(this.name, 'https://rickandmortyapi.com/api/character/avatar/' + this.id + '.jpeg')
    // }, 4000);
    this.getInfoPersonaje();
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     map(() => this.url),
    //     map((route) => {
    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     }),
    //     filter((route) => route.outlet === 'primary'),
    //     mergeMap((route) => route.data),
    //     tap(({id,name}: any) => {
    //        this.updateTitle(name);
    //        this.updateDescription(id);
    //      })
    //   ).subscribe();
  }
  updateTitle(title: string) {
    if (title) {
      this.title.setTitle(title);
    }
  }

  updateDescription(description: string) {
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"')
  }

  setSeo(title: any = 'Sin titulo', image: any) {
    let ima2 = 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'


  }

  async getInfoPersonaje() {

  }

}
