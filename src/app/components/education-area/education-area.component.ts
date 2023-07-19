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
import { ExerciseSolutionService } from "src/app/services/exercise-solution.service";
import { SavePseudoCodePayload } from "src/app/entities/interfaces/save-pseudocode-payload.interface";

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
})
export class EducationAreaComponent implements OnInit, OnDestroy {
  private _selectedTabIndex = 1;
  private _previousSelectedTabIndex = 1;
  private authStatusSub$!: Subscription;
  public exerciseId!: number;

  isSaveSucess = false;
  isSaveError = false;

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
    private readonly exerciseService: ExerciseService,
    private readonly exerciseSolutionService: ExerciseSolutionService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub$ = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.exerciseId = this.getExerciseIdFromRoute();
    this.getExercise();
    this.checkTerminalVisibility(this.selectedTabIndex);
  }

  ngOnDestroy() {
    this.authStatusSub$.unsubscribe();
  }

  private getExerciseIdFromRoute(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get("exerciseId"));
  }

  private getExercise() {
    if (!this.exerciseId) return;

    this.exerciseService.getExerciseById(this.exerciseId).subscribe({
      next: (exercise: Exercise) => (this.selectedExercise = exercise),
      error: (error) => console.error("Erro ao buscar o exercício:", error),
    });
  }

  private checkTerminalVisibility(index: number): void {
    const hideTerminalConditions = [
      TabsIndex.FLOWCHART,
      TabsIndex.EXERCISE,
      TabsIndex.PSEUDOCODE,
    ];
    this.hideTerminal = hideTerminalConditions.includes(index) ? true : false;
  }

  private selectOperationBasedOnTabChange(toCurrentIndex: number): void {
    switch (this._previousSelectedTabIndex) {
      case TabsIndex.CODE:
        this.selectCodeOperations(toCurrentIndex);
        break;
      case TabsIndex.PSEUDOCODE:
        this.selectPseudoCodeOperations(toCurrentIndex);
        break;
      case TabsIndex.FLOWCHART:
        this.selectFlowchartOperations(toCurrentIndex);
        break;
      default:
        // Do nothing because the tab is the exercise one
        break;
    }
  }

  // Code Operations
  private selectCodeOperations(toCurrentIndex: number) {
    if (toCurrentIndex === TabsIndex.PSEUDOCODE) {
      const code: string[] = this.retrieveCodeFromHtml();
      this.convertFromCodeToPseudoCode(code);
      this.storeCodeInMemory(code);
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

  private storeCodeInMemory(code: string[]): void {
    this.code = code.join("\n");
  }

  private convertFromCodeToPseudoCode(code: string[]): void {
    this.pseudoCode = pythonToPseudocode(code);
  }

  private convertFromCodeToFlowchart() {
    throw new Error("Method not implemented.");
  }

  // PseudoCode Operations
  private selectPseudoCodeOperations(toCurrentIndex: number): void {
    if (toCurrentIndex === TabsIndex.CODE) {
      this.convertFromPseudoCodeToCode();
    }
    if (toCurrentIndex === TabsIndex.FLOWCHART) {
      this.convertFromPseudoCodeToFlowchart();
    }
  }

  private convertFromPseudoCodeToFlowchart() {
    throw new Error("Method not implemented.");
  }

  private convertFromPseudoCodeToCode() {
    if (!this.pseudoCode) return;
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

  // Menu Operations
  private checkCodeExists(): boolean {
    if (!this.code) return false;
    return true;
  }

  private savePseudocode(): void {
    const pseudoCode = this.pseudoCode;
    const exerciseId = this.exerciseId;

    const payload: SavePseudoCodePayload = {
      pseudoCode,
      exerciseId,
    };

    this.exerciseSolutionService.saveSolution(payload).subscribe({
      next: () => {
        console.log("Pseudocódigo guardado com sucesso"),
        this.isSaveSucess = true;
        this.isSaveError = false;
      },
      error: (error) => {
        console.error("Erro ao guardar:", error);
        this.isSaveSucess = false;
        this.isSaveError = true;
      },
    });
  }

  execute(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    pyscript.interpreter.run(code.trim());
  }

  save(): void {
    if (this.selectedTabIndex === TabsIndex.PSEUDOCODE) {
      if (!this.pseudoCode && this.checkCodeExists()) {
        const code: string[] = this.code.split("\n");
        this.convertFromCodeToPseudoCode(code);
      }
      this.savePseudocode();
    } else if (this.selectedTabIndex === TabsIndex.CODE) {
      const code: string[] = this.retrieveCodeFromHtml();
      this.convertFromCodeToPseudoCode(code);
      this.savePseudocode();
    } else {
      this.savePseudocode();
    }
  }

  tabChanged(event: number): void {
    this.checkTerminalVisibility(event);
    this.selectOperationBasedOnTabChange(event);
  }

  handleChange(event: string) {
    console.log(event);
  }
}
