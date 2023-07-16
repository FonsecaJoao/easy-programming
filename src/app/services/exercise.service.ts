import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Exercise } from "../entities/interfaces/exercise.interface";

@Injectable({
  providedIn: "root",
})
export class ExerciseService {

  private baseUrl = 'http://localhost:3000/exercise';
  constructor(private readonly http: HttpClient) {}

  getExercisesList(): Observable<any> {
    return this.http.get("http://localhost:3000/exercise");
  }

  getExerciseById(id: number): Observable<Exercise> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Exercise>(url);
  }

}
