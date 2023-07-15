import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import {
  DiagramModule,
  SymbolPaletteModule
} from "@syncfusion/ej2-angular-diagrams";
import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EducationAreaComponent } from "./components/education-area/education-area.component";
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { FlowchartComponent } from "./components/flowchart/flowchart.component";
import { ErrorInterceptor } from "./interceptors/error-interceptor";
import { ErrorComponent } from "./components/error/error.component";
import { HeaderComponent } from "./components/header/header.component";

import { AuthInterceptor } from "./auth/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FlowchartComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    EducationAreaComponent,
    ExerciseListComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CodemirrorModule,
    DiagramModule,
    SymbolPaletteModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
