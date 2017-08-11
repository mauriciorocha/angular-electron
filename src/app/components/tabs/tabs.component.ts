import {MaterializeDirective} from "angular2-materialize";
import {Component,OnDestroy} from "@angular/core"
import {Subscription} from "rxjs/Subscription";
import {Location} from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';

import { SupervisorComponent } from '../supervisor/supervisor.component';
import { JobsComponent } from '../jobs/jobs.component';
import { RelatoriosComponent } from '../relatorios/relatorios.component';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnDestroy {
  private tabs = [
    {name:"Supervisor",href:"tabs/supervisor",route:"supervisor"},
    {name:"Jobs",href:"/tabs/jobs",route:"jobs"},
    {name:"Relatórios",href:"/tabs/relatorios",route:"relatorios"}
  ];
  private routerSubscription:Subscription;
  private tabSelectionParams = null;

  constructor(private router:Router, private location:Location) {
    
  }

  routeTo(route) {
    this.router.navigate(["tabs/"+route]);
    //this.updateSelectionParams(route);
  }

  updateSelectionParams(router) {
    for (var i=0; i<this.tabs.length; i++) {
      const tab = this.tabs[i];
      if (location.href.lastIndexOf(tab.href)==location.href.length-tab.href.length) {
        if (!this.tabSelectionParams || this.tabSelectionParams[0]!=tab.route) {
          // switch the view to select that tab
          this.tabSelectionParams = ['select_tab',tab.route];
        }
      }
    }
  }


  ngOnDestroy() {
    //this.routerSubscription.unsubscribe();
  }
}
