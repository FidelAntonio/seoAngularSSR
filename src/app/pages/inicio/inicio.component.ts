import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  constructor(
    private httpService: HttpClient,
    private metaService: Meta,
    private title: Title
  ){
    this.metaService.removeTag( 'name="robots"' )
    this.title.setTitle('Listado | SEO dinamico')   
    this.metaService.updateTag({ property: 'og:title', content: 'Listado Personajes | SeoDinamico' }); 
    this.metaService.updateTag({ property: 'description', content: 'Listado Personajes desde la API | SeoDinamico' });
    // this.metaService.updateTag({ property: 'og:url', content: 'Listado Personajes | SeoDinamico' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://media.revistagq.com/photos/640060bc0350668344429c1b/master/pass/42133433-01B0-4FF7-B6F1-3CF554564B76.jpeg' });

  }

  result: any =[]

  ngOnInit(): void {
    // let max = 42
    // let min = 0
    // let num = Math.floor(Math.random()*(max - min)+min);
    // console.log(num)
    this.getInfoPersonajes()
  }

   

  getInfoPersonajes(){
   this.httpService.get('https://rickandmortyapi.com/api/character/?page=1').subscribe((result: any)=>{
     this.result = result.results;  
   })
  }
}
