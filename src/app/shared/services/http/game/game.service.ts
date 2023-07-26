import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';
import {GameList} from 'src/app/shared/models/http/game/GameList';
import {NewGame} from 'src/app/shared/models/http/game/NewGame';

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

  getGameByUserId(): Observable<GameList[]>{
    return this.http.get<GameList[]>(`${apiUrl}/game/by/user`)
  }

  deleteGame(gameId: string): Observable<void>{
    return this.http.delete<void>(`${apiUrl}/game/${gameId}`)
  }
}
