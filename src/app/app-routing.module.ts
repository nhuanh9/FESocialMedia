import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './Components/Pages/users/register/register.component';
import {CarouselComponent} from './Components/Blocks/carousel/carousel.component';
import {LoginComponent} from './Components/Pages/users/login/login.component';
import {AuthGuard} from './helper/auth-guard';
import {AllFriendComponent} from './Components/Pages/friend/all-friend/all-friend.component';
import {GeneralFriendsComponent} from './Components/Pages/friend/general-friends/general-friends.component';
import {PostComponent} from './Components/Pages/post/post.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'friends',
    component: AllFriendComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'generalfriend',
    component: GeneralFriendsComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./module/user.module').then(module => module.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./module/admin.module').then(module => module.AdminModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
