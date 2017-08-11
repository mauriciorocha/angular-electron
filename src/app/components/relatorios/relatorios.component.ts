/**
 * Import decorators and services from angular
 */
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'tabs-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent {
    constructor(private _router: Router, private _ngZone: NgZone) {

    }
}
