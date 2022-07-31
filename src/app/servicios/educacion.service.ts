import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/educacion';
import { loginDto } from '../data/loginDto';


@Injectable({
  providedIn: 'root'
})

export class EducacionService {

  constructor(private http: HttpClient) { }

  public obtenerEducacion(): Observable<Educacion[]> {
    return this.http.get<any>("https://portfolio-evelynbenitez.herokuapp.com/educacion/ver");
  }

  public crearEducacion(educacion: Educacion): Observable<any> {
    return this.http.post<any>("https://portfolio-evelynbenitez.herokuapp.com/educacion/new", educacion);
  }

  public borrarEducacion(id: Number): Observable<any> {
    return this.http.delete("https://portfolio-evelynbenitez.herokuapp.com/educacion/delete/" + id)
  }

  public modificarEducacion(educacion: Educacion): Observable<any>{
    return this.http.put<any>("https://portfolio-evelynbenitez.herokuapp.com/educacion/modificar/", educacion);
  }
}

