import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule } from '@angular/router';
import { UsersListComponent } from './home/users-list/users-list.component';
import { PracticeComponent } from './practice/practice.component';
const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'practice', loadChildren:()=> import('./practice/practice.module').then(m=> m.PracticeModule) }

]


@NgModule({
  declarations: [
    HomeComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
