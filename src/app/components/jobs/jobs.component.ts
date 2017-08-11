/**
 * Import decorators and services from angular
 */
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'tabs-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
    constructor(private _router: Router, private _ngZone: NgZone) {

    }
}
