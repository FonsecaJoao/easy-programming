import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { AppComponent } from "./app.component";
import { FlowchartComponent } from './components/flowchart/flowchart.component';

@NgModule({
  declarations: [AppComponent, FlowchartComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTabsModule, FormsModule, CodemirrorModule, DiagramModule, SymbolPaletteModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
