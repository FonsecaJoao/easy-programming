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
  pseudocodeStoredInDatabase: string = "";
  pseudocodeOptions = {
    lineNumbers: true,
    theme: "default",
    mode: "python",
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Q": function (cm: any) {
        cm.foldCode(cm.getCursor());
      },
    },
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  };

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

  handleChange(event: string) {
    // console.log("this.content", this.content);
    console.log(event);
  }
}
