
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateUserProfileComponent} from '../Components/Pages/users/update-user-profile/update-user-profile.component';
import {ProfileComponent} from '../Components/Pages/users/profile/profile.component';
import {NewPasswordComponent} from "../Components/Pages/users/new-password/new-password.component";
import {ListUserComponent} from "../Components/Pages/admin/list-user/list-user.component";
import {UserInfoComponent} from "../Components/Pages/admin/user-info/user-info.component";
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListUserComponent
  },
  {
    path: 'users/:id',
    canActivate: [AuthGuard],
    component: UserInfoComponent
  }
];

@NgModule({
  declarations: [
    ListUserComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AdminModule {
}
