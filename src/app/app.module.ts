import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './Components/Blocks/menu/menu.component';
import {UsersComponent} from './Components/Blocks/login/users.component';
import {HeaderComponent} from './Components/Blocks/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './Components/Pages/users/register/register.component';
import {CarouselComponent} from './Components/Blocks/carousel/carousel.component';
import {FooterComponent} from './Components/Blocks/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { LoginComponent } from './Components/Pages/users/login/login.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NewPasswordComponent } from './Components/Pages/users/new-password/new-password.component';
import { AllFriendComponent } from './Components/Pages/friend/all-friend/all-friend.component';
import { GeneralFriendsComponent } from './Components/Pages/friend/general-friends/general-friends.component';
import { PostComponent } from './Components/Pages/posts/post/post.component';
import { TestComponent } from './test/test.component';
import { FriendswallComponent } from './Components/Pages/posts/friendswall/friendswall.component';
import { YourwallComponent } from './Components/Pages/posts/yourwall/yourwall.component';
import { WebsocketComponent } from './websocket/websocket.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    HeaderComponent,
    RegisterComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    AllFriendComponent,
    GeneralFriendsComponent,
    PostComponent,
    TestComponent,
    FriendswallComponent,
    YourwallComponent,
    WebsocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
