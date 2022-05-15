import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersComponent } from './components/dealers/dealers.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  {
    path:'proveedores', component: DealersComponent
  }, {
    path:'tareas', component: TasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
