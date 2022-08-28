import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DataResolverService } from '../resolver/data-resolver.service';
import { DataResolverService2 } from '../resolver/add-resolver.sevice';


const routes: Routes = [
  {
    path: 'home/todolist',
    component: TabsPage,
    resolve: {
      special: DataResolverService,
      afterAdd: DataResolverService2,
    },
    // loadChildren: () => import('../add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path: '',
    redirectTo: '/home/todolist',
    pathMatch: "full"
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
