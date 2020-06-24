import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

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
  
}
