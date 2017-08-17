import { Component, EventEmitter, NgZone } from "@angular/core"
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { GroupByPipe } from 'ngx-pipes/src/app/pipes/array/group-by';
import * as moment from 'moment/moment';
import * as supervisord from 'supervisord';
import { config } from '../../config/config';
import { SupervisorService } from './supervisor.service';


@Component({
  selector: 'tabs-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss'],
  providers: [GroupByPipe]
})
export class SupervisorComponent {
  public infoServers: any;
  params = [
    {
      onOpen: (el) => {

      },
      onClose: (el) => {

      }
    }
  ];
  public sidenavActions = new EventEmitter<any>();
  public sidenavParams:Array<any> = [];

  constructor(private _groupByPipe: GroupByPipe,
    private _ngzone: NgZone,
    private _supervisorService: SupervisorService) {
    this.getProcess();
  }

  private getProcess() {
    this.infoServers = [];
    for (let host of config.supervisor.hosts) {
      this._supervisorService.getAllProcessByHost(host).then(res => {
        console.log(res);
        this.infoServers.push(res);
      });
    }
  }


  transformTimestampToDate(timestamp) {
    return moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
  }

  verifyWorkersRunningByGroup(group){
    console.log(group);
  }


  stopAll(host) {
    console.log(host);
    this._supervisorService.stopAll(host).then(res => {
      this.getProcess();
    }, err => {
      console.log(err);
    });
  }

  playAll(host) {
    console.log(host);
    this._supervisorService.playAll(host).then(res => {
      this.getProcess();
    }, err => {
      console.log(err);
    });

  }

  stopGroup(host, group) {
    this._supervisorService.stopProcessGroup(host, group).then(res => {
      this._supervisorService.getAllProcessByHost(host).then(res => {
        for (let h = 0; h < this.infoServers.length; h++) {
          if (this.infoServers[h]['nameHost'] === host.nameHost) {
            this.infoServers[h] = res;
          }
        }

      });
    }, err => {
      console.log(err);
    });

  }

  playGroup(host, group) {
    this._supervisorService.startProcessGroup(host, group).then(res => {
      this._supervisorService.getAllProcessByHost(host).then(res => {
        for (let h = 0; h < this.infoServers.length; h++) {
          if (this.infoServers[h]['nameHost'] === host.nameHost) {
            this.infoServers[h] = res;
          }
        }

      });
    }, err => {
      console.log(err);
    });

  }

  playWork(host, group, work){
    this._supervisorService.startProcess(host, `${group}:${work}`).then(res => {
      this._supervisorService.getAllProcessByHost(host).then(res => {
        for (let h = 0; h < this.infoServers.length; h++) {
          if (this.infoServers[h]['nameHost'] === host.nameHost) {
            this.infoServers[h] = res;
          }
        }

      });
    });
  }

  stopWork(host, group, work){
    this._supervisorService.stopProcess(host, `${group}:${work}`).then(res => {
      this._supervisorService.getAllProcessByHost(host).then(res => {
        for (let h = 0; h < this.infoServers.length; h++) {
          if (this.infoServers[h]['nameHost'] === host.nameHost) {
            this.infoServers[h] = res;
          }
        }

      });
    });

  }



public showSidenav(): void {
    this.sidenavParams = ['show'];
    //this.sidenavParams.push({'edge': 'right'});
    console.log(this.sidenavParams);
    this.sidenavActions.emit({ action: "sideNav" });
}
}
