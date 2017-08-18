import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import { JobsService } from './jobs.service';
import { config } from '../../config/config';
import * as moment from 'moment/moment';

declare var Materialize:any;

@Component({
    selector: 'tabs-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
    public arrJobs: Array<any> = [];
    public arrServidores: Array<any> = [];
    public servidor = config.ambientes.local;

    constructor(private _router: Router,
        private _jobsService: JobsService) {
        
        this.getAllJobs(config.ambientes.local)

        this._jobsService.listenMessage().subscribe(res => {
            console.log(res);
        });

        this._jobsService.listenJobs().subscribe(res => {
            this.arrJobs = JSON.parse(res).data['arrJobs'];
            console.log(this.arrJobs);
        });

    }

    getAllJobs(host?){
        
        let url = host || this.servidor;
        this._jobsService.getAllJobs(url).subscribe(res => {
            this.arrJobs = res['arrJobs'];
            this.arrServidores = config.arrAmbientes;
        }, error => {
            Materialize.toast(error, 4000);
        });
    }

    transformTimestampToDate(timestamp) {
        return moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
    }

    formatDate(date){
        return moment(date, 'DD/MM/YYYY HH:mm');
    }


}
