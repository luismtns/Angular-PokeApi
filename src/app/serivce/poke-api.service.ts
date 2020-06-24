import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  api_url:string = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  getAllPokemons(limit?:number,offset?:number) {
    return this.http.get(`${this.api_url}pokemon/?limit=${limit}&offset=${offset}`);
  }

  getPokemonsbyName(pokemon_name:string) {
    return this.http.get(`${this.api_url}pokemon/${pokemon_name}/`);
  }
  
  getPokeApiUrl(url:string){
    return this.http.get(url);
  }

  getPokeSpritebyUrl(url:string){
    return this.http.get(url).pipe(
      map((poke_info: object[]) => poke_info['sprites'])
    );
  }
  
  getTypes(){
    return this.http.get(`${this.api_url}type/`).pipe(
      map((types: object[]) => types['results'].map((type:object) => type['name']))
    );
  }
  
}
