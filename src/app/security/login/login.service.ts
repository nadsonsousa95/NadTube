import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root',
   
   })
   
   export class LoginService{
    private apiUrl = 'http://localhost:3000/users';
    constructor(private httpClient: HttpClient){}
    
    
    public login(email:string, password:string):Observable<any>{
        return this.httpClient.get<any[]>(this.apiUrl).pipe(
            map((users) => {
                const user = users.find(
                    (u) => u.email === email && u.password === password
                );
                if (user){
                    // Salvar os dados do usuário no localStorage (ou outro armazenamento)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                } else {
                    throw new Error('Credenciais inválidas');
                }
            }),
            catchError((error) =>{
                console.error('Erro ao autenticar:', error);
                throw 'Falha ao efetuar login.'
            })
        )
    }

    logout(): void {
        localStorage.removeItem('currentUser');
      }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('currentUser');
      }
    private removerTokenLocalStorage():void{
        localStorage.removeItem(environment.token);
    } 
   }
