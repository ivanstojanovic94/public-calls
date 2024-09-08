import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';

import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';
import { DataConfig } from './models/dataConfig';
import { HttpClient } from '@angular/common/http';
import { PublicCall } from './models/publicCall';

@Injectable()
export class QuestionService {

  
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // TODO: get from a remote source of question metadata
  getQuestionsFromBackend(id) {

    
    //dovuci sa backend dela podatke
    const req = {
      id: id
    }
   return this.http.post(`${this.uri}/publicCalls/getPublicCallById`, req);


    
  }

  

  



  



}

