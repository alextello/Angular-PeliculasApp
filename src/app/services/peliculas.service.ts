import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = '0c9de24c482bd9f6bbc811438957835b';
  private url = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) {
  }

  getPopulares() {
    const url = `${this.url}/discover/movie?sort_by=popularity.desc.&api_key=${this.apiKey}&language=es`;
    return this.http.get( url )
                    .pipe(
                      map( (res: any) => {
                        return res.results.filter((obj) => obj);
                      })
                      );
  }

  buscarPelicual(texto: string) {
    const url = `${this.url}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;
    return this.http.get( url )
                    .pipe(
                      map( (res: any) => {
                        return res.results.filter((obj) => obj);
                      })
                      );
  }

  getEnCines() {
    const url = `${this.url}/movie/now_playing?api_key=${this.apiKey}&language=es`;
    return this.http.get( url )
                    .pipe(
                      map( (res: any) => {
                        return res.results.filter((obj) => obj);
                      })
                      );
  }
}
