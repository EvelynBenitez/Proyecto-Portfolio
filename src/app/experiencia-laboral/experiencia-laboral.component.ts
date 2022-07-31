import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from '../data/experiencia';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ExperienciaService } from '../servicios/experiencia.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  experiencias: Experiencia[] = [];

  experienciaForm: FormGroup;

  constructor(private experienciaService: ExperienciaService, private autenticacionService: AutenticacionService, 
    private formBuilder: FormBuilder) {
  this.experienciaForm = this.formBuilder.group(
    {
      id:[''],
      puesto:['', [Validators.required]],
      empresa:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      periodo:['',[Validators.required]],
      imagen:[''],
    }
    )
  }

  usuarioLogueado(): Boolean {
    return this.autenticacionService.usuarioLogueado();
  }

    /*crearExperiencia(): void{
   var puesto=(document.getElementById("puestoInput") as HTMLInputElement).value;
   var empresa=(document.getElementById("empresaInput") as HTMLInputElement).value;
   var descripcion=(document.getElementById("descripcionInput") as HTMLInputElement).value;
   var periodo=(document.getElementById("periodoInput") as HTMLInputElement).value;
   console.log("puesto: "+puesto+" empresa "+empresa + " descripcion "+descripcion + " periodo " + periodo);
      this.experienciaService.crearExperiencia(puesto, empresa, descripcion, periodo);      
    }
    */

ngOnInit(): void {
  this.recargarDatos();
}

borrarExperiencia(id: number): void {
  if (confirm("¿Esta seguro que desea eliminar la experiencia?")){
  this.experienciaService.borrarExperiencia(id).subscribe(
      () => {
        console.log("Borré: " + id +". Ahora recargo datos.");
        this.recargarDatos();
        console.log("Recargué datos.")
      }
    );
  }
}

onSubmit(){
  let experiencia: Experiencia = this.experienciaForm.value;
  if (this.experienciaForm.get('id')?.value == ''){
  this.experienciaService.crearExperiencia(experiencia).subscribe(
    (nuevaExperiencia:Experiencia)=>{
      this.experiencias.push(nuevaExperiencia);
    }
  );
}
else{
  this.experienciaService.modificarExperiencia(experiencia).subscribe(
    ()=>{
this.recargarDatos();
    }
  )
}
  console.log(this.experienciaForm.value);
}

private clearForm(){
  this.experienciaForm.setValue({
    id:'',
    puesto:'',
    empresa:'',
    descripcion:'',
    periodo:'',
    imagen:'',
  })
}

private loadForm(experiencia:Experiencia){
this.experienciaForm.setValue({
  id:experiencia.id,
  puesto: experiencia.puesto,
  empresa: experiencia.empresa,
  descripcion: experiencia.descripcion,
  periodo: experiencia.periodo,
  imagen: experiencia.imagen,
});
console.log(this.experienciaForm);
}

private recargarDatos(): void {
  this.experienciaService.obtenerExperiencia().subscribe(
    (data) => {
      this.experiencias = data;
    }
  )
}

onNewExperiencia(){
  this.clearForm();
}

onEditExperiencia(index:number){
  console.log(index);
let experiencia:Experiencia = this.experiencias[index];
this.loadForm(experiencia);
}
}
