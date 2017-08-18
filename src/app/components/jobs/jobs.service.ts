import { Http, Headers, RequestOptionsArgs } from "@angular/http";
import { NgSpinningPreloader } from 'ng2-spinning-preloader';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

import { Injectable } from '@angular/core';
import { AppService } from '../app.service';


@Injectable()
export class JobsService extends AppService {
    public socket;
    constructor(protected http: Http,
        protected ngSpinningPreloader: NgSpinningPreloader,
        protected router: Router) {

        super(http, ngSpinningPreloader, router);
    }


    public getAllJobs(host): Observable<Array<any>> {
        return this.get(`${host}v1/job/consultarJobs`)
        .map(res => {
            return res['data']
        }).catch(error => {
            return error;
        });
    }

    public connectSocket(){
        this.socket = io('http://172.17.0.2:8080');
        this.socket.on('connect', function(){
            console.log('connect')
        });
    }

    public listenMessage(): Observable<any> {
         if(!this.socket){
             this.connectSocket();
         }

        return Observable.create(observer => {
                this.socket.on('message', function(message){
                    //console.log('resposta do server: ' + message);
                    observer.next(message);
                });
        }).map(res => res).share();
    }

    public listenJobs(): Observable<any> {
         if(!this.socket){
             this.connectSocket();
         }

        return Observable.create(observer => {
                this.socket.on('jobs', function(message){
                    //console.log('resposta do server: ' + message);
                    observer.next(message);
                });
        }).map(res => res).share();
    }

}