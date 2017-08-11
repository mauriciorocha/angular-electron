import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/*
 * Angular Modules
 */
import {enableProdMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


// Setup redux with ngrx
import {StoreModule} from '@ngrx/store';
import {authStore, authInitialState} from './store/auth.store';

/**
 * Import our child components
 */
import { TabsComponent } from './components/tabs/tabs.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AppComponent} from './components/app.component';

/**
 * Import material UI Components
 */

import {routes} from './app.routes';

/**
 * Import the authentication service to be injected into our component
 */
import {Authentication} from './services/authentication';
import 'materialize-css';
import {MaterializeModule} from "angular2-materialize";

// declare var $: JQueryStatic;

/*
 * provide('AppStore', { useValue: appStore }),
 */
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterializeModule,
        RouterModule.forRoot(routes, {useHash: true}),
        StoreModule.provideStore({authStore}, {authStore: authInitialState}),
    ],
    providers: [Authentication],
    declarations: [TabsComponent, SupervisorComponent, JobsComponent, RelatoriosComponent, AppComponent, HomeComponent, LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
