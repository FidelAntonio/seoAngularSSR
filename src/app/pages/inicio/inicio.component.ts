import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  constructor(
    private httpService: HttpClient,
    private metaService: Meta,
    private title: Title,
    private google: GoogletranslateService
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
  translateBtn: any;
  ngOnInit(): void {
    // let max = 42
    // let min = 0
    // let num = Math.floor(Math.random()*(max - min)+min);
    // console.log(num)
    this.getInfoPersonajes();

  }

  getInfoPersonajes() {
    this.httpService
      .get('https://rickandmortyapi.com/api/character/?page=1')
      .subscribe((result: any) => {
        this.result = result.results;
        console.log(this.result.lenght);
      });
  }
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
  //       this.translateBtn.disabled = false;
  //       console.log(res.data.translations[0].translatedText);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  ngAfterViewChecked() {
    this.translateBtn = document.getElementById('translatebtn');
    console.log(this.translateBtn);
  }
  send() {
    const googleObj: GoogleObj = {
    q: [this.result.title, this.result.description, this.result.detail],
    target: 'es'
    };
    this.translateBtn.disabled = true;
    this.google.translate(googleObj).subscribe(
    (res: any) => {
    this.translateBtn.disabled = false;
    this.result = {
    title: res.data.translations[0].translatedText,
    description: res.data.translations[1].translatedText,
    detail: res.data.translations[2].translatedText
    };
    console.log(this.result);
    },
    err => {
    console.log(err);
    }
    );
    }
}
