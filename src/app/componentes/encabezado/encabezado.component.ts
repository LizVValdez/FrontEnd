import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/modelos/banner';
import { LoginUsuario } from 'src/app/modelos/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { BannerService } from 'src/app/servicios/banner.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})

export class EncabezadoComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errorMessage!: string;

  public editBanner!: Banner;

  Banner: Banner[] = [];


  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private BannerService: BannerService) { }

  ngOnInit(): void {
    this.cargarBanner();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
    
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
        window.location.reload();
      },
      error: (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMessage = err.error.error;
        console.log(err.error.error);
        

      }
    })
  }

  cargarBanner(): void {
    this.BannerService.cargar().subscribe({
      next: data => {
        this.Banner = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  public editarBanner(banner: Banner):void {
    this.BannerService.editar(banner).subscribe(
    (response: Banner) => {
      console.log(response);
      this.cargarBanner();
      
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  
  }
  
  
  public abrirModal(banner: Banner): void{
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
      this.editBanner = banner;
      button.setAttribute('data-target', '#editarBannerModal');
    container?.appendChild(button);
    button.click();
  }
}