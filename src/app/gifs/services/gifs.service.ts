import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "YljwMXIg4qoEivAysVONWE496wbrxLTU";

  private apiUrl: string = 'https://api.giphy.com/v1/gifs'
  
  private _historial:string[] = []

  public resultados: Gif[] = [];

  constructor(private httpClient: HttpClient){
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial(){
    return [...this._historial];
  }

  async buscarGifts(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    
    console.log(params.toString());          

    this.httpClient.get<SearchGifsResponse>(`${this.apiUrl}/search`, {params})
      .subscribe( (resp: SearchGifsResponse) => { 
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        console.log(resp.data);
      })

  }
}



/*
Esto (el metodo debe ser async)
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=YljwMXIg4qoEivAysVONWE496wbrxLTU&q=dbz&limit=10');
    const data = await resp.json();
es igual a esto
    fetch('https://api.giphy.com/v1/gifs/search?api_key=YljwMXIg4qoEivAysVONWE496wbrxLTU&q=dbz&limit=10')
      .then(resp => {
        resp.json().then(data => {
          console.log(data);
        })
      })
*/