import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements  OnInit {
  // ulrimg="http://webdiputados/{titujloentrada}.png";
  urlimagen = 'https://rickandmortyapi.com/api/character/avatar/';
  previousUrl: any;

  constructor(
    private router: Router,
    private httpService: HttpClient,
    private url: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private dom: any
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // console.log('prev:', event);
        this.previousUrl = event.url;
        this.httpService
          .get('https://rickandmortyapi.com/api/character/' + event.id)
          .subscribe((result: any) => {
            this.result = result;
            // console.log('h', result);
            this.title.setTitle(this.result.name + ' | SEO dinamico');
            this.meta.updateTag({
              property: 'description',
              content: `${this.result.image}`,
            });
            this.meta.updateTag({
              property: 'og:title',
              content: this.result.name + ' | SeoDinamico',
            });
            this.meta.updateTag({
              property: 'og:image',
              content: this.result.image,
            });
          });
      });
    // let id: any = ''
    // let name: any = ''
    // if (isPlatformBrowser(this.platformId)) {
    //   let url = window.location.search;
    //   const params = new URLSearchParams(url);
    //   id = params.get('id')
    //   name = params.get('name')
    // }
    // this.setSeo(name, 'https://rickandmortyapi.com/api/character/avatar/' + id + '.jpeg')
  }

  result: any = [];
  id: string = '';
  name: string = '';
  ngOnInit(): void {
    this.updateMetaTags();

    // this.url.queryParams.subscribe(async (e: any) => {
    //   this.id = e.id;
    //   this.name = e.name;

    //   //   this.meta.addTag({name: 'robots', content:'noindex'})
    //   const linkElement = this.doc.head.querySelector(`link[rel='canonical']`)
    //     || this.doc.head.appendChild(this.doc.createElement('link'));

    //   if (linkElement) {
    //     linkElement.setAttribute('rel', 'canonical');
    //     linkElement.setAttribute('href', this.doc.URL.split('?')[0]);
    //   }
    // });

    // setTimeout(() => {
    //   this.setSeo(this.name, 'https://rickandmortyapi.com/api/character/avatar/' + this.id + '.jpeg')
    // }, 4000);
    // this.getInfoPersonaje();
    this.setCanonicalURL();
    // setTimeout(() => {
    //   this.updateMetaTags();
    // }, 1000);
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
    this.setCanonicalURL();
  }

  setSeo(title: any = 'Sin titulo', image: any) {
    let ima2 = 'https://rickandmortyapi.com/api/character/avatar/3.jpeg';
  }

  async getInfoPersonaje() {
    await this.httpService
      .get('https://rickandmortyapi.com/api/character/' + this.id)
      .subscribe((result: any) => {
        this.result = result;
        // console.log('h', result);
        // this.title.setTitle(this.result.name + ' | SEO dinamico')
        // this.meta.updateTag({ property: 'description', content: `${this.result.image}` });
        // this.meta.updateTag({ property: 'og:title', content: this.result.name + ' | SeoDinamico' });
        // this.meta.updateTag({ property: 'og:image', content: this.result.image });
      });
  }
  // createCanonicalURL() {
  //   let link: HTMLLinkElement = this.dom.createElement('link');
  //   link.setAttribute('rel', 'canonical');
  //   this.dom.head.appendChild(link);
  //   link.setAttribute('href', this.dom.URL);

  // }
  setCanonicalURL(url?: string) {
    const canURL = url == undefined ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
    link.setAttribute('href', this.dom.URL.split('?')[0])
  }
  updateMetaTags() {
    this.meta.updateTag(
      { property: 'og:image', content: this.result.image },
      "property='og:image'"
    );
    this.meta.updateTag(
      { property: 'og:title', content: this.result.name },
      "property='og:title'"
    );
    this.meta.updateTag(
      { property: 'og:description', content: this.result.species },
      "property='og:description'"
    );
  }
  // ngAfterViewInit() {
  //   this.updateMetaTags();
  // }
  // ngDoCheck() {
  //   this.updateMetaTags();

  // }
  ngAfterViewChecked() {
    this.updateMetaTags();

  }
}
