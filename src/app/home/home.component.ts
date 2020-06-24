import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../serivce/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private _pokeApi:PokeApiService){}

  pokemon_data: Object;
  full_length:number;
  page_length:number = 30;
  page_index:number = localStorage.getItem('pokemon_page_index') ? parseInt(localStorage.getItem('pokemon_page_index')):0;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50]
  types_list:string[];
  ngOnInit(): void {
    var _offset = localStorage.getItem('pokemon_ofset') ?parseInt(localStorage.getItem('pokemon_ofset')):0;
    this.getPokemonGalery(_offset);

    this.getTypes()
  }

  getPokemonGalery(offset:number=0){
    localStorage.setItem('pokemon_ofset', offset.toString())

    this._pokeApi.getAllPokemons(this.page_length, offset).subscribe((data:object)=>{
      this.pokemon_data = data;
      this.full_length = data['count'];
      this.pokemon_data['results'].forEach(elm=>{
        this._pokeApi.getPokeSpritebyUrl(elm['url']).subscribe((poke_info:object)=>{
        elm['sprites'] = poke_info;
        })
      });
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

  navigatePokemons(url:string){
    this._pokeApi.getPokeApiUrl(url).subscribe((data:object)=>{
      this.pokemon_data = data;
      this.pokemon_data['results'].forEach(elm=>{
        this._pokeApi.getPokeApiUrl(elm['url']).subscribe((poke_info:object)=>{
         elm['sprite_url'] = poke_info['sprites']['front_default']
        })
      });
    })
  }

  paginatorEvent(_event){
    localStorage.setItem('pokemon_page_index', _event['pageIndex'])    
    var _offset = _event['pageIndex']*_event['pageSize']
    this.getPokemonGalery(_offset);
  }

  getTypes(){
    this._pokeApi.getTypes().subscribe((data:any)=>{
      this.types_list = data;
      console.log(data);
      
    })
  }
}
