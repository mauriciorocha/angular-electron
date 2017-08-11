/**
 * Import decorators and services from angular
 */
import { Component, EventEmitter } from "@angular/core"
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';

import * as supervisord from 'supervisord';

import { config } from '../../config/config';

@Component({
    selector: 'tabs-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss'],
})
export class SupervisorComponent {
  clientSupervisord: any;
  infoServers: any = [];
  params = [
    {
      onOpen: (el) => {
        
      },
      onClose: (el) => {
        
      }
    }
  ];

  constructor(private reversePipe: ReversePipe) {
    // this.pidAtivos = this.books.filter(book => book.store_id === this.store.id);
    for (let host of config.supervisor.hosts) {
      //this.serverHosts.push(host.nameHost);
      this.clientSupervisord = supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`);
      let that = this;
      
      this.clientSupervisord.getAllProcessInfo(function(err, result) {
          //Here we may get cookie received from server if we know its name
        that.infoServers.push(
          {
            "pidAtivos": result.filter(obj => obj.statename === "RUNNING").length,
            "pidInativos": result.filter(obj => obj.statename !== "RUNNING").length,
            "nameHost": host.nameHost, 
            "result": result
          }
        );
      });

      console.log(this.infoServers);
    }
  }
}
