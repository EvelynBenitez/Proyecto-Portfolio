import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habilidad } from '../../data/habilidad';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})

export class HabilidadesComponent implements OnInit {

  habilidades: Habilidad[] = [];

  habilidadForm: FormGroup;

  constructor(private habilidadesservice: HabilidadesService, private autenticacionService: AutenticacionService, 
    private formBuilder: FormBuilder) {
      this.habilidadForm= this.formBuilder.group(
      {
        id: [''],
        nombre: [''],
        porcentaje: [''],
      }        
      )
  }

  usuarioLogueado(): Boolean {
    return this.autenticacionService.usuarioLogueado();
  }

ngOnInit(): void {
    this.recargarDatos();
  }

  private recargarDatos(): void {
    this.habilidadesservice.obtenerHabilidades().subscribe(
      (data) => {
        this.habilidades = data;
      }
    )
  }

  borrarHabilidad(id: number):void{
    if (confirm("¿Esta seguro que desea eliminar la habilidad?")) {
      this.habilidadesservice.borrarHabilidad(id).subscribe(
        () => {
          this.recargarDatos();
        }
      );
    }
  }

  onSubmit() {
    let habilidad: Habilidad = this.habilidadForm.value;
    if (this.habilidadForm.get('id')?.value == '') {
      this.habilidadesservice.crearHabilidad(habilidad).subscribe(
        (nuevaHabilidad: Habilidad) => {
          this.habilidades.push(nuevaHabilidad);
        }
      );
    }
    else {
      this.habilidadesservice.modificarHabilidad(habilidad).subscribe(
        () => {
          this.recargarDatos();
        }
      )
    }
  }

  private clearForm(){
    this.habilidadForm.setValue({
      id:'',
      nombre:'',
      porcentaje:'',
    })
  }

  private loadForm(habilidad: Habilidad) {
    this.habilidadForm.setValue({
      id: habilidad.id,
      nombre: habilidad.nombre,
      porcentaje: habilidad.porcentaje,
    });
  }

  onNewHabilidad() {
    this.clearForm();
  }

  onEditHabilidad(index:number){
    let habilidad:Habilidad = this.habilidades[index];
    this.loadForm(habilidad);
    }
}
