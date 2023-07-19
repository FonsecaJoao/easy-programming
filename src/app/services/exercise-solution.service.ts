import { HttpClient } from "@angular/common/http";
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
}
