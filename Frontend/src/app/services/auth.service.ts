import { HttpClient } from '@angular/common/http';
import { Injectable , inject} from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   currentUserId:string = '';
   http = inject(HttpClient);
   isLoggedIn$ = new BehaviorSubject<boolean>(false);

   registerService(registerOb : any){
      return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerOb);
   }

   loginService(loginOb : any){
      return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginOb);
   }

   sendEmailService(email:String){
      return this.http.post<any>(`${apiUrls.authServiceApi}send-email`,{email: email});
   }

   resetPasswordService(resetOb:any){
      return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`,resetOb);
   }

   isLoggedIn(): boolean {
      if (typeof window !== 'undefined' && window.localStorage) {
          return !!localStorage.getItem('user_id');
      }
      return false; // Default to not logged in if localStorage is not available
   }

   checkUsernameService(userName: string):Observable<{usernameTaken:boolean}>{
         return this.http.post<{usernameTaken:boolean}>(`${apiUrls.authServiceApi}check-username`,{ userName});
   }

   setUserId(id:string){
      this.currentUserId = id;
   }
   
   getUserId(){
      return this.currentUserId;
   }
}
