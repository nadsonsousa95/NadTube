import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Importação do componente standalone
import { provideRouter } from '@angular/router'; // Roteamento
import { LoginComponent } from './app/security/login/login.component';
import { LayoutComponent } from './app/pages/layout/layout.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    ),
    provideRouter([
      {path: 'login', component: LoginComponent},
      {
          path: '', component: LayoutComponent,
          children:[
              {path: '', component: HomeComponent },
              //{path: 'usuarios', component: HomeComponent }
          ]
          
      },
      {path:'**', redirectTo:'login'}  
  
    ]),
  ],
}).catch((err) => console.error(err));
