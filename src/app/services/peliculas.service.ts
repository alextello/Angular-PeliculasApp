import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = '0c9de24c482bd9f6bbc811438957835b';
  private url = 'https://api.themoviedb.org/3';
  desde = new Date();
  hasta = new Date();
  desdeMonth: string;
  hastaMonth: string;
  peliculas: any[] = [];

constructor(private http: HttpClient) {
  this.hasta.setDate(this.hasta.getDate() + 7);
  this.desde.setDate(new Date().getDate() - 45);

  if (this.desde.getMonth().toString().length === 1) {
        this.desdeMonth = '0' + (this.desde.getMonth() + 1).toString();
        this.hastaMonth = '0' + (this.hasta.getMonth() + 1).toString();
      } else {
        this.desdeMonth = (this.desde.getMonth() + 1).toString();
        this.hastaMonth = (this.hasta.getMonth() + 1).toString();
      }
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

getPopularesNinos() {
  const desdeStr = `${this.desde.getFullYear()}-${this.desdeMonth}-${this.desde.getDate() < 9 ? '0' + this.desde.getDate() : this.desde.getDate()}`;
  const hastaStr = `${this.hasta.getFullYear()}-${this.hastaMonth}-${this.hasta.getDate() < 9 ? '0' + this.hasta.getDate() : this.hasta.getDate()}`;
    
  const url = `${this.url}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&sort_by=popularity.desc.&certification.lte=G&api_key=${this.apiKey}&language=es`;
  return this.http.get( url )
                    .pipe(
                      map( (res: any) => {
                        return res.results.filter((obj) => obj);
                      })
                      );
  }

buscarPelicula(texto: string) {
    const url = `${this.url}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;
    return this.http.get( url )
                    .pipe(
                      map( (res: any) => {
                        const peliculasResp = res.results.filter((obj) => obj);
                        this.peliculas = peliculasResp;
                        return peliculasResp;
                      })
                      );
  }

getEnCines() {
    const desdeStr = `${this.desde.getFullYear()}-${this.desdeMonth}-${this.desde.getDate() < 9 ? '0' + this.desde.getDate() : this.desde.getDate()}`;
    const hastaStr = `${this.hasta.getFullYear()}-${this.hastaMonth}-${this.hasta.getDate() < 9 ? '0' + this.hasta.getDate() : this.hasta.getDate()}`;
    const url = `${this.url}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apiKey}&language=es`;
    return this.http.get( url )
                    .pipe(
                      map( (res: any) => {
                        return res.results.filter((obj) => obj);
                      })
                      );
  }

  getPelicula(id: string) {
    const url = `${this.url}/movie/${id}?api_key=${this.apiKey}&language=es`;
    return this.http.get( url );
  }
}
