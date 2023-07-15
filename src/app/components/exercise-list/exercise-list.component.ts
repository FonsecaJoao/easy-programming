import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.css"],
})
export class ExerciseListComponent  {
  constructor(
    private readonly router: Router,
  ) {}

  navigateToExercise(id: string) {
    this.router.navigate(["/exercise", id]);
  }
}
