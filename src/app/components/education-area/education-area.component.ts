import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { pythonToPseudocode } from "src/modules/code-to-pseudocode/python-to-pseudocode";
import { pseudoCodeToPython } from "src/modules/pseudocode-to-code/pseudocode-to-python";

import { ExerciseService } from "src/app/services/exercise.service";
import { Exercise } from "src/app/entities/interfaces/exercise.interface";

import { HttpClient } from "@angular/common/http";


declare var pyscript: any;

interface ElementWithInnerText extends Element {
  innerText: string;
}

enum TabsIndex {
  EXERCISE = 0,
  PSEUDOCODE = 1,
  CODE = 2,
  FLOWCHART = 3,
}
@Component({
  selector: "app-education-area",
  templateUrl: "./education-area.component.html",
  styleUrls: ["./education-area.component.css"],
  // encapsulation: ViewEncapsulation.None,
})
export class EducationAreaComponent implements OnInit, OnDestroy {
  private _selectedTabIndex = 1;
  private _previousSelectedTabIndex = 1;
  private authStatusSub$!: Subscription;
  public exerciseId!: number;

  tabsIndex = TabsIndex;
  selectedExercise!: Exercise;
  userIsAuthenticated = false;
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

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private exerciseService: ExerciseService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub$ = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.exerciseId = Number(
      this.activatedRoute.snapshot.paramMap.get("exerciseId")
    );
    if (this.exerciseId) {
      this.exerciseService.getExerciseById(this.exerciseId).subscribe(
        (exercise: Exercise) => {
          console.log(exercise);
          this.selectedExercise = exercise;
        },
        (error) => {
          console.error("Erro ao buscar o exercício:", error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.authStatusSub$.unsubscribe();
  }

  private checkTerminalVisibility(index: number): void {
    const hideTerminalConditions = [TabsIndex.FLOWCHART, TabsIndex.EXERCISE];
    this.hideTerminal = hideTerminalConditions.includes(index) ? true : false;
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
    // Verificar onde o utilizar está
    if (this.selectedTabIndex === TabsIndex.PSEUDOCODE) {
      console.log("estou no pseudocodigo", this.pseudoCode);
      // this.selectPseudoCodeOperations(toCurrentIndex);
    } else if (this.selectedTabIndex === TabsIndex.CODE) {
      console.log("estou no codigo");
      // this.convertFromCodeToPseudoCode();
      // this.selectCodeOperations(toCurrentIndex);
    } else {
      console.log("estou no flowchart");
      // this.selectFlowchartOperations(toCurrentIndex);
    }
    // Escolher a conversão certa para o pseudocódigo
    // !!!Cuidado!!! se tiver no flowchart, não tem conversão
    // Salvar o pseudocódigo
    // const repl = document.getElementsByClassName("cm-content");
    // const code = (repl[0] as ElementWithInnerText).innerText;
    // this.code = code.trim();
  }

  tabChanged(event: number): void {
    this.checkTerminalVisibility(event);
    this.selectOperationBasedOnTabChange(event);
  }

  savePseudocode(): void {
    const pseudoCode = this.pseudoCode;
    const exerciseId = this.exerciseId;

    const payload: SavePseudoCodePayload = {
      pseudoCode,
      exerciseId,
    };

    this.exerciseSolutionService.saveSolution(payload).subscribe({
      next: () => console.log("Pseudocódigo guardado com sucesso"),
      error: (error) => console.error("Erro ao guardar:", error),
    });
  }

  handleChange(event: string) {
    console.log(event);
  }
}
