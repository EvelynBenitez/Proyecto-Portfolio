import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { Persona } from '../../data/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  personas: Persona[] = [];
  personaForm: FormGroup;

  constructor(private personaservice: PersonaService, private autenticacionService: AutenticacionService, private formBuilder: FormBuilder) {
    this.personaForm = this.formBuilder.group(
      {
        id: [''],
        nombre: [''],
        profesion: [''],
        imagen: [''],
      }
    )
  }

  ngOnInit(): void {
    this.recargarDatos();
  }

  usuarioLogueado(): Boolean {
    return this.autenticacionService.usuarioLogueado();
  }

  cerrarSesion(): void {
    this.autenticacionService.cerrarSesion();
    //this.usuarioLogueado = false;
  }

  recargarDatos(): void {
    this.personaservice.obtenerPersona().subscribe(
      (data) => {
        this.personas = data;
      }
    )
  }

  onSubmit() {
    let persona: Persona = this.personaForm.value;
    persona.sobreMi = this.personas[0].sobreMi;
    if (this.personaForm.get('id')?.value == '') {
      this.personaservice.crearPersona(persona).subscribe(
        (nuevaPersona: Persona) => {
          this.personas[0] = nuevaPersona;
        }
      );
    }
    else {
      this.personaservice.modificarPersona(persona).subscribe(
        () => {
          this.recargarDatos();
        }
      )
    }
  }

  private clearForm() {
    this.personaForm.setValue({
      id: '',
      nombre: '',
      profesion: '',
      imagen: '',
    })
  }

  private loadForm(persona: Persona) {
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      profesion: persona.profesion,
      imagen: persona.imagen,
    });
  }

  onNewPersona() {
    this.clearForm();
  }

  onEditPersona(index:number){
    let persona:Persona = this.personas[index];
    this.loadForm(persona);
    }
}
