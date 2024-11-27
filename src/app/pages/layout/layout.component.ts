import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../security/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  logout(): void {
    this.loginService.logout();
    alert("Tem certeza que deseja encerrar a sessão?")
    this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }
}
