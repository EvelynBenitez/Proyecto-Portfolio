import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../data/experiencia';

@Injectable({
  providedIn: 'root'
})

export class ExperienciaService {

  constructor(private http:HttpClient) { }

  public obtenerExperiencia (): Observable<Experiencia []> {
    return this.http.get<any>("https://portfolio-evelynbenitez.herokuapp.com/experiencia/ver");
  }

  public crearExperiencia (experiencia:Experiencia): Observable<any> {
        return this.http.post<any>("https://portfolio-evelynbenitez.herokuapp.com/experiencia/new", experiencia);
  }

  public borrarExperiencia(id : number): Observable<any> {
    console.log("https://portfolio-evelynbenitez.herokuapp.com/experiencia/delete/" + id);
    return this.http.delete("https://portfolio-evelynbenitez.herokuapp.com/experiencia/delete/" + id);
  }

  public modificarExperiencia(experiencia:Experiencia): Observable<any>{
    return this.http.put<any>("https://portfolio-evelynbenitez.herokuapp.com/experiencia/modificar/", experiencia);
  }
}

   