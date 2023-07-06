import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import {
  DiagramModule,
  SymbolPaletteModule,
} from "@syncfusion/ej2-angular-diagrams";
import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EducationAreaComponent } from "./components/education-area/education-area.component";
import { FlowchartComponent } from "./components/flowchart/flowchart.component";
import { HeaderComponent } from "./header/header.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    FlowchartComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    EducationAreaComponent,
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
