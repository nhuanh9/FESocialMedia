
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateUserProfileComponent} from '../Components/Pages/users/update-user-profile/update-user-profile.component';
import {ProfileComponent} from '../Components/Pages/users/profile/profile.component';
import {NewPasswordComponent} from "../Components/Pages/users/new-password/new-password.component";
const routes: Routes = [
  {
    path: 'update-profile/:id',
    component: UpdateUserProfileComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'new-password/:id',
    component: NewPasswordComponent
  }
];

@NgModule({
  declarations: [
    UpdateUserProfileComponent,
    ProfileComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class UserModule {
}
