import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import {ConfigData} from './config-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class RewardsService {	


constructor(
    public http: Http,
    public configData: ConfigData 
    ) {
  }

public  showAllResultados(){
  	let resultados=[
  		{
  			'title':'correctas',
  			'count':'7',
  			'icon':'happy'
  		},
  		{
  			'title':'incorrectas',
  			'count':'3',
  			'icon':'sad'
  		},
  		{
  			'title':'pendientes',
  			'count':'5',
  			'icon': 'help-circle'
  		},
  		{
  			'title':'total',
  			'count':'15',
  			'icon': 'calculator'
  		},
   	];

   	return resultados;
  }

public showAllRewards(siteId){
  	let route=this.configData.rutabase+siteId+`/Rewards`;
       return this.http.get(route);

  }

}