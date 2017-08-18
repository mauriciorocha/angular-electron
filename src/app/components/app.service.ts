import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from "@angular/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { NgSpinningPreloader } from 'ng2-spinning-preloader';
import * as moment from 'moment/moment';


@Injectable()
export class AppService {
      public headers: Headers;

      constructor(protected http: Http,
            protected ngSpinningPreloader: NgSpinningPreloader,
            router: Router) {            

            this.headers = new Headers({ 'Content-Type': 'application/json' });
      }

      get(url: string, options?: RequestOptionsArgs, loading:Boolean = true): Observable<Response> {
            if(loading){
               this.ngSpinningPreloader.start();
            }

            return this.http
                  .get(url, { headers: this.headers })
                  .map(res => {
                        this.ngSpinningPreloader.stop();
                        return res.json();
                  }).catch(error => {
                        this.ngSpinningPreloader.stop();
                        let response = error.json();
                        if(response.status_code == 401){
                        }
                        
                        return Observable.throw(response || 'Ocorreu um problema ao realizar essa operação.'); 
                  });
      }

      post(url: string, body: any, options?: RequestOptionsArgs, loading:Boolean = true): Observable<any> {
            if(loading){
               this.ngSpinningPreloader.start();
            }

            return this.http
                  .post(url, body, { headers: this.headers })
                  .map(res => {
                        this.ngSpinningPreloader.stop();
                        return res.json();
                  }).catch(error => {
                        this.ngSpinningPreloader.stop();
                        let response = error.json();
                        if(response.status_code == 401){
                           
                        }
                        return Observable.throw(response);
                  });
      }

}
