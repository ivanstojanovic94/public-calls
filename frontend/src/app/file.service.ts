import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

uri='http://localhost:4000';

  constructor(private http: HttpClient) { }

  uploadFile(file: File[]){
    const profileData = new FormData();
    file.forEach(f=>{
      profileData.append('file',f,f.name);
    })
    return this.http.post(`${this.uri}/files/upload`,profileData);

  }
}
