import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../data/habilidad';
import { loginDto } from '../data/loginDto';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  constructor(private http: HttpClient) { }

  public obtenerHabilidades(): Observable<Habilidad[]> {
    return this.http.get<any>("https://portfolio-evelynbenitez.herokuapp.com/habilidades/ver");
  }

  public crearHabilidad(habilidad: Habilidad): Observable<any> {
    return this.http.post<any>("https://portfolio-evelynbenitez.herokuapp.com/habilidades/new", habilidad);
  }

  public borrarHabilidad(id: number): Observable<any> {
    return this.http.delete("https://portfolio-evelynbenitez.herokuapp.com/habilidades/delete/" + id)
  }

  public modificarHabilidad(habilidad: Habilidad): Observable<any>{
    return this.http.put<any>("https://portfolio-evelynbenitez.herokuapp.com/habilidades/modificar/", habilidad);
  }
}
