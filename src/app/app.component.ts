import { Component, ViewEncapsulation } from "@angular/core";

declare var pyscript: any;

interface ElementWithInnerText extends Element {
  innerText: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  codeStoredInDatabase = "for i in range(8):\n\t\tprint(i)";

  execute(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    pyscript.interpreter.run(code.trim());
  }

  save(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    this.codeStoredInDatabase = code.trim();
  }
}
