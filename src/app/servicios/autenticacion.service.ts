import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, observable, tap } from 'rxjs';
import { map } from 'rxjs';
import { loginDto } from '../data/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http:HttpClient) { }

  public login(credential:loginDto): Observable <boolean>{
    return this.http.post<boolean>("https://portfolio-evelynbenitez.herokuapp.com/login",credential).pipe(
      tap((response : boolean)=>{
        if(response) {
        sessionStorage.setItem("email", credential.email);
        }
      })
    )
    }

  public cerrarSesion(){
    sessionStorage.removeItem("email");
    console.log("Cerrar Sesión: email = " + sessionStorage.getItem("email"));
  }
  public usuarioLogueado(): boolean {
    return sessionStorage.getItem("email") !==null;
  }
}
