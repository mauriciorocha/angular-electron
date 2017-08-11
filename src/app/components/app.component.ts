import {AppState} from './../store/appState.store';
/**
 * Import decorators and services from angular
 */
import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'app-container', // <app></app>
    styleUrls: ['./app.theme.scss'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
    //component initialization
    isDarkTheme: boolean = false;
    public profileService: any;
    
    constructor() {
        this.profileService = {
            user: {}
        };
    }
    
    ngAfterViewInit() {
        const mat = require('materialize-css')
        
        

        console.log('ready');
        (<any>$('.button-collapse')).sideNav();
        (<any>$('.dropdown-button')).dropdown({
            hover: true,
            gutter: 0,
            belowOrigin: true
        });

    }
    
    checkAuthentication() {
    }
    
    close() {
        const electron = require('electron');
        const app = electron.remote.app;
        console.log(electron);
        app.quit();
    }
}
