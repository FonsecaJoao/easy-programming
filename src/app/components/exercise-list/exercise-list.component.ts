import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Exercise } from "src/app/entities/interfaces/exercise.interface";
import { ExerciseService } from "src/app/services/exercise.service";

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.css"],
})
export class ExerciseListComponent implements OnInit {
  dataSource: Exercise[] = [];
  displayedColumns: string[] = ["id", "text_code"];

  constructor(
    private readonly router: Router,
    private readonly exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.getExercisesList();
  }

  private getExercisesList() {
    this.exerciseService.getExercisesList().subscribe({
      next: (exercises: Exercise[]) => (this.dataSource = exercises),
      error: (error: HttpErrorResponse) =>
        console.error("Erro ao buscar exercícios:", error),
    });
  }

  navigateToExercise(id: string) {
    this.router.navigate(["/exercise", id]);
  }
}
