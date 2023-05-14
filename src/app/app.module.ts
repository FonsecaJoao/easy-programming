import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { AppComponent } from "./app.component";
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from "./angular-material.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, FlowchartComponent, HeaderComponent, LoginComponent, SignupComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, CodemirrorModule, DiagramModule, SymbolPaletteModule, AngularMaterialModule, AppRoutingModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
