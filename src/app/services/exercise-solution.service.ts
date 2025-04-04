import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { SavePseudoCodePayload } from "../entities/interfaces/save-pseudocode-payload.interface";

@Injectable({
  providedIn: "root",
})
export class ExerciseSolutionService {
  constructor(private readonly httpClient: HttpClient) {}

  saveSolution(payload: SavePseudoCodePayload) {
    return this.httpClient.post(
      "http://localhost:3000/save_pseudocode",
      payload
    );
  }
  
  getExerciseSolutions(exerciseId: number, userId: number): Observable<any> {
    const url = `http://localhost:3000/exercise/${exerciseId}/${userId}`;
    return this.httpClient.get(url);
  }

}
