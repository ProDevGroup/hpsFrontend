import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlanningComponent } from './component/planning/create-planning/create-planning.component';
import { PlanningComponent } from './component/planning/planning.component';
import { IconsProviderModule } from './icons-provider.module';
import {ImportDataComponent} from "./component/import-data/import-data.component";

const routes: Routes = [
  { path: 'importData', component: ImportDataComponent},
  { path: 'createPlanning', component: CreatePlanningComponent},
  { path: 'planning', component: PlanningComponent},
  { path: '', pathMatch: 'full', redirectTo: 'planning' }
];

@NgModule({
  imports: [IconsProviderModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
