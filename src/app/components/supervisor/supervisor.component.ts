/**
 * Import decorators and services from angular
 */
import { Component, EventEmitter, NgZone } from "@angular/core"
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import {GroupByPipe} from 'ngx-pipes/src/app/pipes/array/group-by';

import * as moment from 'moment/moment';

import * as supervisord from 'supervisord';

import { config } from '../../config/config';

@Component({
    selector: 'tabs-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss'],
    providers: [GroupByPipe]
})
export class SupervisorComponent {
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

  constructor(private _groupByPipe: GroupByPipe,
              private _ngzone:NgZone) {
    // this.pidAtivos = this.books.filter(book => book.store_id === this.store.id);
    for (let host of config.supervisor.hosts) {
      //this.serverHosts.push(host.nameHost);
      
      this.getAllProcessByHost(host);
    }
  }

  getAllProcessByHost(host){
    let clientSupervisord = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
      let that = this;     
      
      let result = clientSupervisord.getAllProcessInfo(function(err, result) {
        let grouped = that._groupByPipe.transform(result, 'group');
        console.log(grouped);
        let arrRetorno = [];
        Object.keys(grouped).forEach( chave => {
            arrRetorno.push(result.filter(obj => obj.group === chave));
        });
        console.log(arrRetorno);
          //Here we may get cookie received from server if we know its name

          return {
              "pidAtivos": result.filter(obj => obj.statename === "RUNNING").length,
              "pidInativos": result.filter(obj => obj.statename !== "RUNNING").length,
              "nameHost": host.nameHost, 
              "host": host,
              "result": arrRetorno
            };
      });


console.log(result);
  }

  transformTimestampToDate(timestamp){
    return moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
  }

  stopAll(host){
    let clientSupervisor = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
    clientSupervisor.stopAllProcesses(function(err, result){
      console.log(err, result);
    });
    console.log(host);
    //this.clientSupervisord.stopAll
  }

  playAll(host){
    let clientSupervisor = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
    clientSupervisor.startAllProcesses(function(err, result){
      console.log(err, result);
      
    });
    console.log(host);

  }

  stopGroup(host, group){
    let that = this;
    let clientSupervisor = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
    clientSupervisor.stopProcessGroup(group, function(err, result){
      console.log(err, result);
      that.getAllProcessByHost(host);
    });
    console.log(group);
  }

  playGroup(host, group){
    let that = this;
    let clientSupervisor = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
    clientSupervisor.startProcessGroup(group, function(err, result){
      console.log(err, result);
      that.getAllProcessByHost(host);
    });
    console.log(group);

  }
}
