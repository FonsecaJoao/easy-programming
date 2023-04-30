import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { AppComponent } from "./app.component";

import { DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTabsModule, FormsModule, CodemirrorModule, DiagramModule, SymbolPaletteModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
