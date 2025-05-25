import { Routes } from '@angular/router';
import { HomePageComponent } from './Dashboard-Module/home-page/home-page.component';
import { LogoPageComponent } from './logo/logo-page/logo-page.component';
import { AddItemComponent } from './Dashboard-Module/add-item/add-item.component';
import { UserProfilePageComponent } from './Profile/user-profile-page/user-profile-page.component';


export const routes: Routes = [
   {path: "", component: LogoPageComponent},
   {path: "home", component: HomePageComponent },
   {path: "add-item", component: AddItemComponent},
   {path: "profile", component: UserProfilePageComponent}
];
