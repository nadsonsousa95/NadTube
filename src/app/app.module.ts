import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from '../app/app.routing.module';
import { LoginComponent } from "./security/login/login.component";
import { RouterModule } from '@angular/router'; // Importação necessária para o roteamento


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        AppComponent
    ],
    providers: [],
    bootstrap: []
})
export class AppModule {}