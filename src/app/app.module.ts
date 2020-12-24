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
import { LoginComponent } from './Components/Pages/users/login/login.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NewPasswordComponent } from './Components/Pages/users/new-password/new-password.component';
import { ListUserComponent } from './Components/Pages/admin/list-user/list-user.component';
import { UserInfoComponent } from './Components/Pages/admin/user-info/user-info.component';
import { UpdateUserInfoComponent } from './Components/Pages/admin/update-user-info/update-user-info.component';

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
