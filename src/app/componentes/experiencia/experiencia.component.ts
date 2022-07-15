import { Component, Input, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { Experiencia } from 'src/app/modelos/experiencia';
import { TokenService } from 'src/app/servicios/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  @Input() user!: string;

  experiencias: Experiencia[] = [];
  form: any = {};
  public editExperiencia!: Experiencia;
  public deleteExperiencia!: Experiencia;
  roles!: string[];
  isAdmin: boolean = false;

  constructor(private experienciaService: ExperienciaService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.cargarExperiencias();
    this.roles = this.tokenService.getAuthorities();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  cargarExperiencias(): void {
    this.experienciaService.lista().subscribe({
      next: data => {
        this.experiencias = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  public borrarExperiencia(id: number):void {
    this.experienciaService.borrar(id).subscribe(
    (response: void) => {
      console.log(response);
      this.cargarExperiencias();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
}



public crearExperiencia(addForm: NgForm):void {
  document.getElementById('agregar-experiencia-modal')?.click();
  this.experienciaService.crear(addForm.value).subscribe(
    (response: Experiencia) => {
      console.log(response);
      this.cargarExperiencias();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  )
}


public actualizarExperiencia(experiencia: Experiencia):void {
  this.experienciaService.editar(experiencia).subscribe(
  (response: Experiencia) => {
    console.log(response);
    this.cargarExperiencias();
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
)

}


public abrirModal(experiencia: Experiencia, mode: string): void{
  const container = document.getElementById('container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#agregarExperienciaModal');
  }
  if (mode === 'edit') {
    this.editExperiencia = experiencia;
    button.setAttribute('data-target', '#editarExperienciaModal');
  }
  if (mode === 'delete') {
    this.deleteExperiencia = experiencia;
    button.setAttribute('data-target', '#borrarExperienciaModal');
  }
  container?.appendChild(button);
  button.click();
}
}

