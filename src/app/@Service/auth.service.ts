import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { log } from 'console';

const baseUrl = environment.baseUrl;
const common_key = '/api/v1';

const route = {
  registration:{
    create:()=> `${baseUrl}${common_key}/ragister-user`,
    update:(id:any)=> `${baseUrl}${common_key}/ragister-user/${id}`,
    getSingelUser:(id:any)=> `${baseUrl}${common_key}/ragister-user/${id}`,
    updateProfilePicture:(id:any)=> `${baseUrl}${common_key}/upload-profile-image/${id}`,
  },
  login:{
    userLogin:()=> `${baseUrl}${common_key}/auth/login-user`,
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  registerUser(data:any){
    const formData:FormData = new FormData();
    for(let key in data){
      formData.append(key,data[key]);
    };
    return this.httpClient.post(route.registration.create(),formData);
  };

  updateUser(id:any, data:any){
    return this.httpClient.patch(route.registration.update(id),data);
  };

  getSingelUser(id:any){
    return this.httpClient.get(route.registration.getSingelUser(id));
  };

  updateProfilePicture(id:any,data:any){
    const img:File = data.file;
    const formData:FormData = new FormData();
    formData.append(data.key,img,img.name);
    return this.httpClient.put(route.registration.updateProfilePicture(id),formData);
  };

  loginUser(data:any){
    return this.httpClient.post(route.login.userLogin(),data).pipe(
      tap((res:any)=>{
        console.log(res);
        this.makeUserSession(res.data)
      })
    );
  };

  makeUserSession(data:any){
    let userData = JSON.stringify(data);
    localStorage.setItem("loggedInUser",userData);
  };

}
