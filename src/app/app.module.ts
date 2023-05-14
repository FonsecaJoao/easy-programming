import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EducationAreaComponent } from "./components/education-area/education-area.component";
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, FlowchartComponent, HeaderComponent, LoginComponent, SignupComponent, EducationAreaComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, CodemirrorModule, DiagramModule, SymbolPaletteModule, AngularMaterialModule, AppRoutingModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
