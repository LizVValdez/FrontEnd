import { Component, Input, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { Persona } from 'src/app/modelos/persona';
import { TokenService } from 'src/app/servicios/token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  @Input() user!: string;
  
  Datos: Persona[] = [];
  form: any = {};
  public editPersona!: Persona;
  public deletePersona!: Persona;
  roles!: string[];
  isAdmin: boolean = false;

  constructor(private PersonaService: PersonaService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.roles = this.tokenService.getAuthorities();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  cargarDatos(): void {
    this.PersonaService.datos().subscribe({
      next: data => {
        this.Datos = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  public actualizarDatos(persona: Persona):void {
    this.PersonaService.editar(persona).subscribe(
    (response: Persona) => {
      console.log(response);
      this.cargarDatos();
      
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  
  }
  
  
  public abrirModal(persona: Persona): void{
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
      this.editPersona = persona;
      button.setAttribute('data-target', '#editarPersonaModal');
    container?.appendChild(button);
    button.click();
  }
  }