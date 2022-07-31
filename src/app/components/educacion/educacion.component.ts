import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { Educacion } from '../../data/educacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {

  educaciones: Educacion[] = [];

  educacionForm: FormGroup;

  constructor(private educacionservice: EducacionService, private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {
    this.educacionForm = this.formBuilder.group(
      {
        id: [''],
        titulo: ['', [Validators.required]],
        institucion: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        periodo: ['', [Validators.required]],
        imagen: [''],
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
    this.educacionservice.obtenerEducacion().subscribe(
      (data) => {
        this.educaciones = data;
      }
    )
  }

  borrarEducacion(id: number): void {
    if (confirm("¿Esta seguro que desea eliminar la educación?")) {
      this.educacionservice.borrarEducacion(id).subscribe(
        () => {
          this.recargarDatos();
        }
      );
    }
  }

  onSubmit() {
    let educacion: Educacion = this.educacionForm.value;
    if (this.educacionForm.get('id')?.value == '') {
      this.educacionservice.crearEducacion(educacion).subscribe(
        (nuevaEducacion: Educacion) => {
          this.educaciones.push(nuevaEducacion);
        }
      );
    }
    else {
      this.educacionservice.modificarEducacion(educacion).subscribe(
        () => {
          this.recargarDatos();
        }
      )
    }
  }

  private clearForm() {
    this.educacionForm.setValue({
      id: '',
      titulo: '',
      institucion: '',
      descripcion: '',
      periodo: '',
      imagen:'',
    })
  }

  private loadForm(educacion: Educacion) {
    this.educacionForm.setValue({
      id: educacion.id,
      titulo: educacion.titulo,
      institucion: educacion.institucion,
      descripcion: educacion.descripcion,
      periodo: educacion.periodo,
      imagen: educacion.imagen,
    });
  }
  
  onNewEducacion() {
    this.clearForm();
  }

  onEditEducacion(index:number){
    let educacion:Educacion = this.educaciones[index];
    this.loadForm(educacion);
    }
}
