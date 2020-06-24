import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../serivce/poke-api.service';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss']
})
export class PokemonPageComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private _pokeApi:PokeApiService) { }
  pokemon_name:string;
  pokemon_details:object;
  pokemon_sprites:object[];
  pokemon_types:object[];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemon_name = params.get('pokemonName');
      this._pokeApi.getPokemonsbyName(this.pokemon_name).subscribe((_pokemon_details:object)=>{
        this.pokemon_details = _pokemon_details;
        console.log(this.pokemon_details);
        

        this.pokemon_types = this.pokemon_details['types'].map(e=>e.type);
        
        this.pokemon_sprites = []
        for (const key in this.pokemon_details['sprites']) {
          if (this.pokemon_details['sprites'].hasOwnProperty(key)) {
            const element = this.pokemon_details['sprites'][key];
            if(element){
              this.pokemon_sprites.push({
                'name': key,
                'url': element
              })

            }
          }
        }
      });
    });
    
  }

}
