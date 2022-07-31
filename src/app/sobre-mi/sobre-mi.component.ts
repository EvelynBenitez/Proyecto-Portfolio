import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Persona } from '../data/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  
  personas: Persona[] = [];
  personaForm: FormGroup;

  constructor(private personaservice: PersonaService, private autenticacionService: AutenticacionService, private formBuilder: FormBuilder) {
    this.personaForm = this.formBuilder.group(
      {
        id: [''],
        sobreMi: [''],
      }
    )
  }

  usuarioLogueado(): Boolean {
    return this.autenticacionService.usuarioLogueado();
  }

  cerrarSesion(): void {
    this.autenticacionService.cerrarSesion();
  }

  ngOnInit(): void {
    this.recargarDatos();
  }

  recargarDatos(): void {
    this.personaservice.obtenerPersona().subscribe(
      (data) => {
        this.personas = data;
      }
    )
  }

  onSubmit() {
    let persona: Persona = this.personas[0];
    persona.sobreMi= this.personaForm.get('sobreMi')?.value;
    console.log(persona);
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
      sobreMi: '',
    })
  }

  private loadForm(persona: Persona) {
    this.personaForm.setValue({
      id: persona.id,
      sobreMi: persona.sobreMi,
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
