import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  // ulrimg="http://webdiputados/{titujloentrada}.png";
  urlimagen = 'https://rickandmortyapi.com/api/character/avatar/'


  constructor(
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
    this.setSeo(name, 'https://rickandmortyapi.com/api/character/avatar/' + id + '.jpeg')
  }

  result: any = []
  id: string = '';
  name: string = '';
  ngOnInit(): void {
    this.url.queryParams.subscribe(async (e: any) => {
      this.id = e.id;
      this.name = e.name;


      //   this.meta.addTag({name: 'robots', content:'noindex'})
      const linkElement = this.doc.head.querySelector(`link[rel='canonical']`)
        || this.doc.head.appendChild(this.doc.createElement('link'));

      if (linkElement) {
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', this.doc.URL.split('?')[0]);
      }
    });

    setTimeout(() => {
      this.setSeo(this.name, 'https://rickandmortyapi.com/api/character/avatar/' + this.id + '.jpeg')
    }, 4000);
    this.getInfoPersonaje();
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"')
  }

  setSeo(title: any = 'Sin titulo', image: any) {
    let ima2 = 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'


  }

  async getInfoPersonaje() {
    await this.httpService.get('https://rickandmortyapi.com/api/character/' + this.id).subscribe((result: any) => {
      this.result = result;
      console.log('h', result);
      this.title.setTitle(this.result.name + ' | SEO dinamico')
      this.meta.updateTag({ property: 'description', content: `${this.result.image}` });
      this.meta.updateTag({ property: 'og:title', content: this.result.name + ' | SeoDinamico' });
      this.meta.updateTag({ property: 'og:image', content: this.result.image });


    })
  }

}
