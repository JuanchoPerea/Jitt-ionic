import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import {ConfigData} from './config-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class QuizsService {	


constructor(
    public http: Http, 
    public configData:ConfigData
    ) {
  }

public  showAllQuizs(siteId, user_id){
  let route=this.configData.rutabase+siteId+`/User/`+user_id+`/Quizs`;
   console.log(route);
    return this.http.get(route);	
}

public showAllQuizQuestion(quiz_id){
  let route=this.configData.rutabase+`Quizs/`+quiz_id+`/Questions`;
    return this.http.get(route);  
}

  public showAllQuizQuestionOptions(quiz_id, quiz_question_id){
  
    let route=this.configData.rutabase+`Quizs/`+quiz_id+`/Questions/`+quiz_question_id+`/Options`;
    return this.http.get(route);  

  }

  public showAllQuizQuestionOptionVoted(){
    
  }

  public addQuizVoted(body){
    let route=this.configData.rutabase+`Quizs/OptionVoted`;
         return this.http.post(route, body);
  } 

}