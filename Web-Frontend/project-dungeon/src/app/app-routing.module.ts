import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MainPageComponent } from './routes/main-page/main-page.component';

const routes: Routes = [
  { path: "", component: MainPageComponent},
  { path: "login", component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
