import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlanningComponent } from './component/planning/create-planning/create-planning.component';
import { PlanningComponent } from './component/planning/planning.component';
import { IconsProviderModule } from './icons-provider.module';
import {ImportDataComponent} from "./component/import-data/import-data.component";
import { LoginComponent } from './component/auth/login/login.component';
import { RoleGuardService as RoleGuard } from './component/auth/services/role-guard.service';
import { RegisterComponent } from './component/auth/register/register.component';

const routes: Routes = [
  { path: 'importData', component: ImportDataComponent, canActivate: [RoleGuard],
  data: { roles: ['ADMIN_ROLE', 'PROFILE_ROLE'] }},

  { path: 'createPlanning', component: CreatePlanningComponent, canActivate: [RoleGuard],
    data: { roles: ['ADMIN_ROLE', 'PROFILE_ROLE'] }},

  { path: 'planning', component: PlanningComponent, canActivate: [RoleGuard],
    data: { roles: ['ADMIN_ROLE', 'PROFILE_ROLE'] }},

  { path: '', pathMatch: 'full', redirectTo: 'login'},

  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  
  { path: 'register', component: RegisterComponent }
  
];

@NgModule({
  imports: [IconsProviderModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
