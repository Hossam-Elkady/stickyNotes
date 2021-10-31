import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }
  baseUrl: string = "https://routeegypt.herokuapp.com/";

  addNote(note: any): Observable<any> {
    return this.http.post(this.baseUrl + "addNote", note)
  }

  editNote(note: any): Observable<any> {
    return this.http.put(this.baseUrl + "updateNote", note)
  }

  getAllNotes(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "getUserNotes", data)
  }

  deleteNote(note: any): Observable<any> {
    let options = {
      body: {
        NoteID: note.NoteID,
        token: note.token
      }
    }
    return this.http.delete(this.baseUrl + "deleteNote", options)
  }

}
