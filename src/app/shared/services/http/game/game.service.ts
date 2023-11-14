import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';
import {GameList} from 'src/app/shared/models/http/game/GameList';
import {NewGame} from 'src/app/shared/models/http/game/NewGame';
import {UpdateGame} from "../../../models/http/game/UpdateGame";
import {GameData} from "../../../models/http/game/GameData";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  createGame(newGame: NewGame): Observable<void>{
    return this.http.post<void>(`${apiUrl}/game/add`, newGame)
  }

  updateGame(gameId: string | null, updatedGame: UpdateGame): Observable<void>{
    return this.http.put<void>(`${apiUrl}/game/update/${gameId}`, updatedGame)
  }

  getGameById(gameId: string | null): Observable<GameData>{
    return this.http.get<GameData>(`${apiUrl}/game/${gameId}`)
  }

  gamesUser$ = this.http.get<GameList[]>(`${apiUrl}/game/by/user`)

  deleteGame(gameId: string): Observable<void>{
    return this.http.delete<void>(`${apiUrl}/game/${gameId}`)
  }
}
