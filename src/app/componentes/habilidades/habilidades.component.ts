import { Component, Input, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/modelos/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { TokenService } from 'src/app/servicios/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  @Input() user!: string;

  habilidades: Habilidad[] = [];
  form: any = {};
  public editHabilidad!: Habilidad;
  public deleteHabilidad!: Habilidad;
  roles!: string[];
  isAdmin: boolean = false;


  constructor(private habilidadService: HabilidadService,
    private tokenService: TokenService) { }


  ngOnInit(): void {
    this.cargarHabilidades();
    this.roles = this.tokenService.getAuthorities();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  cargarHabilidades(): void {
    this.habilidadService.lista().subscribe({
      next: data => {
        this.habilidades = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  public borrarHabilidad(id: number):void {
    this.habilidadService.borrar(id).subscribe(
    (response: void) => {
      console.log(response);
      this.cargarHabilidades();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
}

public crearHabilidad(addForm: NgForm):void {
  document.getElementById('agregar-habilidad-modal')?.click();
  this.habilidadService.crear(addForm.value).subscribe(
    (response: Habilidad) => {
      console.log(response);
      this.cargarHabilidades();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  )
}

public actualizarHabilidad(habilidad: Habilidad):void {
  this.habilidadService.editar(habilidad).subscribe(
  (response: Habilidad) => {
    console.log(response);
    this.cargarHabilidades();
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
)

}


public abrirModal(habilidad: Habilidad, mode: string): void{
  const container = document.getElementById('container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#agregarHabilidadModal');
  }
  if (mode === 'edit') {
    this.editHabilidad = habilidad;
    button.setAttribute('data-target', '#editarHabilidadModal');
  }
  if (mode === 'delete') {
    this.deleteHabilidad = habilidad;
    button.setAttribute('data-target', '#borrarHabilidadModal');
  }
  container?.appendChild(button);
  button.click();
}
}

