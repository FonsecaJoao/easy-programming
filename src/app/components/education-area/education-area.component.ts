import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { AuthService } from "src/app/auth/auth.service";
import { pythonToPseudocode } from "src/modules/code-to-pseudocode/python-to-pseudocode";
import { pseudoCodeToPython } from "src/modules/pseudocode-to-code/pseudocode-to-python";

import { Subscription } from "rxjs";

import { HttpClient } from "@angular/common/http";

declare var pyscript: any;

interface ElementWithInnerText extends Element {
  innerText: string;
}

enum TabsIndex {
  PSEUDOCODE = 0,
  CODE = 1,
  FLOWCHART = 2,
}
@Component({
  selector: "app-education-area",
  templateUrl: "./education-area.component.html",
  styleUrls: ["./education-area.component.css"],
  // encapsulation: ViewEncapsulation.None,
})
export class EducationAreaComponent implements OnInit, OnDestroy {
  private _selectedTabIndex = 0;
  private _previousSelectedTabIndex = 0;

  private authStatusSub!: Subscription;
  userIsAuthenticated = false;

  exercises:any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.recuperarExercicio();
  }


  //Exercise ( a funcionar)

  recuperarExercicio():void {
    this.http.get("http://localhost:3000/exercise").subscribe(
      (exercises:any) => {
        this.exercises = exercises;
      },
      (error) => {
        console.error('Erro ao recuperar o exercicio:', error);
      }
    )
  }

  
  hideTerminal = false;
  code = "for i in range(8):\n\t\tprint(i)";
  pseudoCode: string = "";
  pseudoCodeOptions = {
    lineNumbers: true,
    theme: "default",
    mode: "plaintext",
    gutters: ["CodeMirror-linenumbers"],
  };

  get selectedTabIndex() {
    return this._selectedTabIndex;
  }

  set selectedTabIndex(value: number) {
    this._previousSelectedTabIndex = this._selectedTabIndex;
    this._selectedTabIndex = value;
  }

  private checkTerminalVisibility(index: number): void {
    this.hideTerminal = index == TabsIndex.FLOWCHART ? true : false;
  }

  private selectOperationBasedOnTabChange(toCurrentIndex: number): void {
    if (this._previousSelectedTabIndex === TabsIndex.PSEUDOCODE) {
      this.selectPseudoCodeOperations(toCurrentIndex);
    } else if (this._previousSelectedTabIndex === TabsIndex.CODE) {
      this.selectCodeOperations(toCurrentIndex);
    } else {
      this.selectFlowchartOperations(toCurrentIndex);
    }
  }

  // Code Operations
  private selectCodeOperations(toCurrentIndex: number) {
    if (toCurrentIndex === TabsIndex.PSEUDOCODE) {
      this.convertFromCodeToPseudoCode();
    }
    if (toCurrentIndex === TabsIndex.FLOWCHART) {
      this.convertFromCodeToFlowchart();
    }
  }

  private retrieveCodeFromHtml(): string[] {
    const repl = document.getElementsByClassName("cm-content");
    const collection: HTMLCollection = repl[0].children;
    const code: string[] = [];

    for (const item in collection) {
      if (collection.hasOwnProperty(item)) {
        const element = collection[item] as ElementWithInnerText;
        code.push(element.innerText);
      }
    }
    return code;
  }

  private convertFromCodeToPseudoCode(): void {
    const code: string[] = this.retrieveCodeFromHtml();
    this.pseudoCode = pythonToPseudocode(code);
  }

  private convertFromCodeToFlowchart() {
    throw new Error("Method not implemented.");
  }

  // PseudoCode Operations
  private selectPseudoCodeOperations(toCurrentIndex: number): void {
    if (toCurrentIndex === TabsIndex.CODE) this.convertFromPseudoCodeToCode();
    if (toCurrentIndex === TabsIndex.FLOWCHART) {
      this.convertFromPseudoCodeToFlowchart();
    }
  }

  private convertFromPseudoCodeToFlowchart() {
    throw new Error("Method not implemented.");
  }

  private convertFromPseudoCodeToCode() {
    const pseudoCode: string[] = this.pseudoCode.split("\n");
    const code = pseudoCodeToPython(pseudoCode);
    const repl = document.getElementsByClassName("cm-content");
    (repl[0] as ElementWithInnerText).innerText = code;
  }

  // Flowchart Operations
  private selectFlowchartOperations(toCurrentIndex: number) {
    if (toCurrentIndex === TabsIndex.PSEUDOCODE) {
      this.convertFromFlowchartToPseudoCode();
    }
    if (toCurrentIndex === TabsIndex.CODE) {
      this.convertFromFlowchartToCode();
    }
  }

  private convertFromFlowchartToCode() {
    throw new Error("Method not implemented.");
  }

  private convertFromFlowchartToPseudoCode() {
    throw new Error("Method not implemented.");
  }

  execute(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    pyscript.interpreter.run(code.trim());
  }

  save(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    this.code = code.trim();
  }

  handleChange(event: string) {
    console.log(event);
  }

  tabChanged({ index }: MatTabChangeEvent) {
    this.checkTerminalVisibility(index);
    this.selectOperationBasedOnTabChange(index);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
