import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CursusLijstComponent } from './cursus-lijst/cursus-lijst.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CursusService } from './cursus.service';
import { DatePipe } from '@angular/common';
import { UploadCursussenComponent } from './upload-cursussen/upload-cursussen.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cursussen', component: CursusLijstComponent },
  { path: 'cursus-invoeren', component: UploadCursussenComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CursusLijstComponent,
    UploadCursussenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CursusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
