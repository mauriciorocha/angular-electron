/**
 * Import decorators and services from angular
 */
import { Component, EventEmitter } from "@angular/core"
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import {GroupByPipe} from 'ngx-pipes/src/app/pipes/array/group-by';


import * as supervisord from 'supervisord';

import { config } from '../../config/config';

@Component({
    selector: 'tabs-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss'],
    providers: [GroupByPipe]
})
export class SupervisorComponent {
  clientSupervisord: any;
  infoServers: any = [];
  arr: any = [];
  params = [
    {
      onOpen: (el) => {
        
      },
      onClose: (el) => {
        
      }
    }
  ];

  constructor(private _groupByPipe: GroupByPipe
              ) {
    // this.pidAtivos = this.books.filter(book => book.store_id === this.store.id);
    for (let host of config.supervisor.hosts) {
      //this.serverHosts.push(host.nameHost);
      this.clientSupervisord = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
      let that = this;
      
      this.clientSupervisord.getAllProcessInfo(function(err, result) {
        let grouped = that._groupByPipe.transform(result, 'group');
        console.log(grouped);
        let arrRetorno = [];
        let arr = [];
        Object.keys(grouped).forEach( chave => {

            
            arr.push(result.filter(obj => obj.group === chave));
            // let arr = [];
            // arrRetorno[chave] = grouped[chave];
            //arrRetorno.push(arr);
        });
        console.log(arr);
          //Here we may get cookie received from server if we know its name
        that.infoServers.push(
          {
            "pidAtivos": result.filter(obj => obj.statename === "RUNNING").length,
            "pidInativos": result.filter(obj => obj.statename !== "RUNNING").length,
            "nameHost": host.nameHost, 
            "result": arrRetorno
          }
        );
        
      });
console.log(this.infoServers);
      
    }
  }
}
