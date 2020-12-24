
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
import {UpdateUserInfoComponent} from "../Components/Pages/admin/update-user-info/update-user-info.component";
import {AddUserComponent} from "../Components/Pages/admin/add-user/add-user.component";
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListUserComponent
  },
  {
    path: 'add-user',
    canActivate: [AuthGuard],
    component: AddUserComponent
  },
  {
    path: 'users/:id',
    canActivate: [AuthGuard],
    component: UserInfoComponent
  },
  {
    path: 'update-user-profile/:id',
    canActivate: [AuthGuard],
    component: UpdateUserInfoComponent
  },
];

@NgModule({
  declarations: [
    ListUserComponent,
    UserInfoComponent,
    UpdateUserInfoComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AdminModule {
}
