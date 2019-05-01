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

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    EntryModule,
    InfoModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
  ],
  providers: [{provide: ErrorStateMatcher, useClass: FormErrorStateMatcher}, HttpGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
