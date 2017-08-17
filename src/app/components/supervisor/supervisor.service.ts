import { Http, Headers, RequestOptionsArgs } from "@angular/http";
import { NgSpinningPreloader } from 'ng2-spinning-preloader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import * as supervisord from 'supervisord';

import { GroupByPipe } from 'ngx-pipes/src/app/pipes/array/group-by';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';


@Injectable()
export class SupervisorService extends AppService {

    constructor(protected http: Http,
        protected ngSpinningPreloader: NgSpinningPreloader,
        protected router: Router,
        private _groupByPipe: GroupByPipe) {

        super(http, ngSpinningPreloader, router);
    }


    private connect(host): Promise<any> {
        let prom = new Promise<any>((resolve, reject) => {
            resolve(supervisord.connect(`http://${host.user}:${host.password}@${host.host}:${host.port}`));
        });

        return prom;
    }

    public getAllProcessByHost(host): Promise<any> {
        let that = this;
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                clientSupervisord.getAllProcessInfo(function (err, result) {
                    let grouped = that._groupByPipe.transform(result, 'group');
                    let arrRetorno = [];
                    Object.keys(grouped).forEach(chave => {
                        let arr = result.filter(obj => obj.group === chave);
                        let pidsAtivos = arr.filter(obj => obj.statename === "RUNNING").length;
                        let pidsInativos = arr.filter(obj => obj.statename !== "RUNNING").length;
                        arrRetorno.push({'pidAtivos': pidsAtivos,
                                        'pidInativos': pidsInativos,
                                        'arrRetorno': arr});
                    });

                    resolve({
                        "pidAtivos": result.filter(obj => obj.statename === "RUNNING").length,
                        "pidInativos": result.filter(obj => obj.statename !== "RUNNING").length,
                        "nameHost": host.nameHost,
                        "host": host,
                        "result": arrRetorno
                    });
                });
            });

        });

        return prom;
    }

    stopAll(host) {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.stopAllProcesses(function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });

        return prom;
    }

    playAll(host) {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.startAllProcesses(function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
        return prom;

    }

    stopProcessGroup(host, group): Promise<any> {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.stopProcessGroup(group, function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });

        return prom;
    }

    startProcessGroup(host, group) {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.startProcessGroup(group, function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });

        return prom;

    }

    stopProcess(host, process): Promise<any> {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.stopProcess(process, function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });

        return prom;
    }

    startProcess(host, process): Promise<any> {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.startProcess(process, function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });

        return prom;
    }

    tailProcessLog(host, process): Promise<any> {
        this.ngSpinningPreloader.start();
        let prom = new Promise<any>((resolve, reject) => {
            this.connect(host).then(clientSupervisord => {
                let that = this;
                clientSupervisord.tailProcessLog(process, function (err, result) {
                    that.ngSpinningPreloader.stop();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });

        return prom;
    }
}