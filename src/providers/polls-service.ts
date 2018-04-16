import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//servicios
import {ConfigData} from './config-data';

@Injectable()
export class PollsService {	


constructor(
    public http: Http, 
    public configData:ConfigData
    ) {
  }

  public  showAllPolls(siteId, user_id){

     let route=this.configData.rutabase+siteId+`/user/`+user_id+`/polls`;
     console.log(route);
         return this.http.get(route);
    }

  public showAllPollOption(poll_id){
      let route=this.configData.rutabase+`Polls/`+poll_id+`/Options`;
        return this.http.get(route);

  }

  public findAllPollsVoted(poll_id){
     let route=this.configData.rutabase+`Polls/`+poll_id+`/OptionVoted`;
           return this.http.get(route);
  } 

  public findAllPollsVotedByUser(user_id){
     let route=this.configData.rutabase+`OptionVoted/`+user_id;
           return this.http.get(route);

  } 

  public addPollVoted(body){
    let route=this.configData.rutabase+`OptionVoted`;
         return this.http.post(route, body);
  } 

}