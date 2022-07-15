import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  @Input() user!: string;

  proyectos: Proyecto[] = [];
  form: any = {};
  public editProyecto!: Proyecto;
  public deleteProyecto!: Proyecto;
  roles!: string[];
  isAdmin: boolean = false;

  constructor(private proyectoService: ProyectoService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.roles = this.tokenService.getAuthorities();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  cargarProyectos(): void {
    this.proyectoService.lista().subscribe({
      next: data => {
        this.proyectos = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  public borrarProyecto(id: number):void {
    this.proyectoService.borrar(id).subscribe(
    (response: void) => {
      console.log(response);
      this.cargarProyectos();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
}

public crearProyecto(addForm: NgForm):void {
  document.getElementById('agregar-proyecto-modal')?.click();
  this.proyectoService.crear(addForm.value).subscribe(
    (response: Proyecto) => {
      console.log(response);
      this.cargarProyectos();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  )
}


public actualizarProyecto(proyecto: Proyecto):void {
  this.proyectoService.editar(proyecto).subscribe(
  (response: Proyecto) => {
    console.log(response);
    this.cargarProyectos();
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
)

}


public abrirModal(proyecto: Proyecto, mode: string): void{
  const container = document.getElementById('container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#agregarProyectoModal');
  }
  if (mode === 'edit') {
    this.editProyecto = proyecto;
    button.setAttribute('data-target', '#editarProyectoModal');
  }
  if (mode === 'delete') {
    this.deleteProyecto = proyecto;
    button.setAttribute('data-target', '#borrarProyectoModal');
  }
  container?.appendChild(button);
  button.click();
}
}

