import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import {
  GoogleObj,
  GoogletranslateService,
} from 'src/app/services/googletranslate.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      leng: ['es'],
    }
    // {
    //   validators: [this.ConditionallyRequiredValidator],
    // }
  );
  arrayIdiomas = [
    { idioma: 'Ingles', codigo: 'en' },
    { idioma: 'Frances', codigo: 'fr' },
    { idioma: 'Japonés', codigo: 'ja' },
    { idioma: 'Italiano', codigo: 'it' },
  ];
  constructor(
    private httpService: HttpClient,
    private metaService: Meta,
    private title: Title,
    private google: GoogletranslateService,
    private fb: FormBuilder
  ) {
    this.metaService.removeTag('name="robots"');
    this.title.setTitle('Listado | SEO dinamico');
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Listado Personajes | SeoDinamico',
    });
    this.metaService.updateTag({
      property: 'description',
      content: 'Listado Personajes desde la API | SeoDinamico',
    });
    // this.metaService.updateTag({ property: 'og:url', content: 'Listado Personajes | SeoDinamico' });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://media.revistagq.com/photos/640060bc0350668344429c1b/master/pass/42133433-01B0-4FF7-B6F1-3CF554564B76.jpeg',
    });
  }
  lang = new FormControl('en');
  result: any = [];
  googleTraduc: any = [];
  arrayTraducido: any = [];
  translateBtn: any;
  ngOnInit(): void {
    this.getInfoPersonajes();
  }

  getInfoPersonajes() {
    this.httpService
      .get('https://rickandmortyapi.com/api/character/?page=1')
      .subscribe((result: any) => {
        this.result = result.results;
        // console.log(this.result, 'longitud');

      });
  }

  // async send() {
  //   const selectLenguaje = this.miFormulario.value.leng;
  //   this.arrayTraducido = [];

  //   const promises = this.result.map(async (element: any) => {
  //     const translations: any = await this.google.translate({
  //       q: [element.name, element.species, element.gender],
  //       target: selectLenguaje,
  //     }).toPromise();

  //     return {
  //       name: translations.data.translations[0].translatedText,
  //       species: translations.data.translations[1].translatedText,
  //       gender: translations.data.translations[2].translatedText,
  //     };
  //   });

  //   this.arrayTraducido = await Promise.all(promises);
  // }
  // send() {
  //   const tipoComentario = this.miFormulario.value.leng;
  //   this.arrayTraducido = [];
  //   this.result.forEach(async (element: any) => {
  //     let translations: any = [];
  //     translations = await this.google
  //       .translate({
  //         q: [element.name, element.species, element.gender],
  //         target: tipoComentario,
  //       })
  //       .toPromise();

  //     this.arrayTraducido.push({
  //       name: translations.data.translations[0].translatedText,
  //       species: translations.data.translations[1].translatedText,
  //       gender: translations.data.translations[2].translatedText,
  //     });
  //   });
  // }

  // send() {
  //   const tipoComentario =  this.miFormulario.value.leng ;
  //   this.arrayTraducido = [];
  //   this.googleTraduc = [];
  //   this.result.forEach((element:any) => {
  //     this.googleTraduc.push(
  //       {
  //         q: [element.name,element.species,element.gender],
  //         target: tipoComentario
  //       }
  //     )
  //   });
  //   this.googleTraduc.forEach((element:any) => {
  //     this.google.translate( element).subscribe(
  //       (res: any) => {
  //         this.arrayTraducido.push(
  //           {
  //             name:res.data.translations[0].translatedText,
  //             species:res.data.translations[1].translatedText,
  //             gender:res.data.translations[2].translatedText,
  //           }
  //         ) ;
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //   });
  //  }
  // send() {
  //   const googleObj: GoogleObj = {
  //   q: ['the current 20th Bundestag has a total of 736 members, making it the largest Bundestag to date and the largest freely elected national parliamentary chamber in the world.'],
  //   target:'es'
  //   };
  //   this.translateBtn.disabled = true;
  //   this.google.translate(googleObj).subscribe(
  //   (res: any) => {
  //   this.translateBtn.disabled = false;
  //   console.log(res.data.translations[0].translatedText)
  //   },
  //   err => {
  //   console.log(err);
  //   }
  //   );
  //   }
  //   ngAfterViewChecked() {
  //     this.translateBtn = document.getElementById('translatebtn');
  //     console.log(this.translateBtn);
  //   }
  // send() {
  //   const googleObj: GoogleObj = {
  //     q: [
  //       'he Bundestag (German pronunciation: [ˈbʊndəstaːk] (listen), "Federal Diet") is the German federal parliament. It is the only federal representative body ',
  //     'this is an example from js node'],
  //     target: 'es',
  //   };
  //   this.translateBtn.disabled = true;
  //   this.google.translate(googleObj).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //     // this.result = {
  //   title: res.data.translations[0].translatedText,
  //   description: res.data.translations[1].translatedText,
  //   detail: res.data.translations[2].translatedText
  // };
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
