import { Component, OnInit } from '@angular/core';
import { PokeApiService } from './serivce/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _pokeApi:PokeApiService){}
  title = 'AngularPokeApi';

  pokemon_data: Object;

  ngOnInit(): void {
    this.getPokemonGalery()
  }

  getPokemonGalery(offset:number=0){
    this._pokeApi.getAllPokemons(30, offset).subscribe((data:object)=>{
      this.pokemon_data = data;
      this.pokemon_data['results'].forEach(elm=>{
        this._pokeApi.getPokemonsbyName(elm['name']).subscribe((poke_info:object)=>{
          elm['sprite_url'] = (poke_info['sprites'] && poke_info['sprites']['front_default']) ? poke_info['sprites']['front_default'] : './assets/not-found.png';
        });
      })
    }, e=>{
      console.log(e)
    })

  }

  changePokemonsByUrl(url:string){    
    this.pokemon_data = null;
    this._pokeApi.getPokeApiUrl(url).subscribe((new_poke_data:object)=>{
      this.pokemon_data = new_poke_data;
    })
  }

  paginatorEvent(_event){
    var _offset = _event['pageIndex']*_event['pageSize']
    this.getPokemonGalery(_offset)
    console.log(_event)
  }
// ng deploy --base-href=/Angular-PokeApi/

}
