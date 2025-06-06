import { Routes } from '@angular/router';
import { HomePageComponent } from './Dashboard-Module/home-page/home-page.component';
import { LogoPageComponent } from './logo/logo-page/logo-page.component';
import { AddItemComponent } from './Dashboard-Module/add-item/add-item.component';
import { UserProfilePageComponent } from './Profile/user-profile-page/user-profile-page.component';
import { LoginPageComponent } from './Auth-module/login-page/login-page.component';
import { RegistrationComponent } from './Auth-module/registration/registration.component';

import { ErrorShowComponent } from './error-show/error-show.component';

export const routes: Routes = [
   {path: "", component: LogoPageComponent},
   {path: "home", component: HomePageComponent },
   {path: "add-item", component: AddItemComponent},
   {path: "profile", component: UserProfilePageComponent},
   { path: "login", component: LoginPageComponent },
    { path: "registration", component: RegistrationComponent },
    
];
