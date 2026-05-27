import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CmdaMemberModule } from './cmda-member/cmda-member.module'; // Import du module cmda-member
import { UserManagementModule } from './user-management/user-management.module'; // Import du module UserManagementModule

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthInterceptor } from './user-management/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CmdaMemberModule, // Ajout du module cmda-member
    UserManagementModule // Ajout du module UserManagementModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
