import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../data/persona';
import { loginDto } from '../data/loginDto';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  constructor(private http: HttpClient) { }

  public obtenerPersona(): Observable<Persona[]> {
    return this.http.get<any>("https://portfolio-evelynbenitez.herokuapp.com/persona/ver");
  }

  public crearPersona(persona: Persona): Observable<any> {
    return this.http.post<any>("https://portfolio-evelynbenitez.herokuapp.com/persona/new", persona);
  }

  public borrarPersona(id: number): Observable<any> {
    return this.http.delete("https://portfolio-evelynbenitez.herokuapp.com/persona/delete/" + id)
  }

  public modificarPersona(persona: Persona): Observable<any>{
    return this.http.put<any>("https://portfolio-evelynbenitez.herokuapp.com/persona/modificar/", persona);
  }
}
