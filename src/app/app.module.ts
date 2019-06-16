import { HomeModule } from './features/+home/home.module';
import { HttpGuard } from './core/guards/http.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { EntryModule } from './features/+entry/entry.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher } from '@angular/material';
import { FormErrorStateMatcher } from './shared/forms/error-matcher';
import { InfoModule } from './features/+info/info.module';
import { ProfileModule } from './features/+profile/profile.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    EntryModule.forRoot(),
    ProfileModule.forRoot(),
    HomeModule.forRoot(),
    InfoModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: FormErrorStateMatcher}, HttpGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
