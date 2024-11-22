import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./security/login/login.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: '', component: LayoutComponent,
        children:[
            {path: '', component: HomeComponent }
        ]
        
    },
    {path:'**', redirectTo:'login'}  

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }