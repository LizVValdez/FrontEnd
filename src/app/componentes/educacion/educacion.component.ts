import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {

  @Input() user!: string;

  educacion : Educacion[] = [];
  form: any = {};
  public editEducacion!: Educacion;
  public deleteEducacion!: Educacion;
  roles!: string[];
  isAdmin: boolean = false;

  constructor(private educacionService: EducacionService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.cargarEducacion();
    this.roles = this.tokenService.getAuthorities();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  cargarEducacion(): void {
    this.educacionService.lista().subscribe({
      next: data => {
        this.educacion = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  public borrarEducacion(id: number):void {
    this.educacionService.borrar(id).subscribe(
    (response: void) => {
      console.log(response);
      this.cargarEducacion();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
}

public crearEducacion(addForm: NgForm):void {
  document.getElementById('agregar-educacion-modal')?.click();
  this.educacionService.crear(addForm.value).subscribe(
    (response: Educacion) => {
      console.log(response);
      this.cargarEducacion();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  )
}

public actualizarEducacion(educacion: Educacion):void {
  this.educacionService.editar(educacion).subscribe(
  (response: Educacion) => {
    console.log(response);
    this.cargarEducacion();
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
)

}


public abrirModal(educacion: Educacion, mode: string): void{
  const container = document.getElementById('container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#agregarEducacionModal');
  }
  if (mode === 'edit') {
    this.editEducacion = educacion;
    button.setAttribute('data-target', '#editarEducacionModal');
  }
  if (mode === 'delete') {
    this.deleteEducacion = educacion;
    button.setAttribute('data-target', '#borrarEducacionModal');
  }
  container?.appendChild(button);
  button.click();
}
}
