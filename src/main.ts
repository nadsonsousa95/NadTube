import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Importação do componente standalone
import { provideRouter } from '@angular/router'; // Roteamento
import { LoginComponent } from './app/security/login/login.component';
import { LayoutComponent } from './app/pages/layout/layout.component';
import { HomeComponent } from './app/pages/home/home.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {path: 'login', component: LoginComponent},
      {
          path: '', component: LayoutComponent,
          children:[
              {path: '', component: HomeComponent }
          ]
          
      },
      {path:'**', redirectTo:'login'}  
  
    ]),
  ],
}).catch((err) => console.error(err));
