import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotesService } from '../notes.service';
import jwt_decode from 'jwt-decode';
declare var $: any;
// import { decode } from 'querystring';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  stickyToken = localStorage.getItem('stickyToken');

  decoded: any;
  userToken: any;
  userID: any;
  allNotes: any = [];
  token: any;
  noteForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });
  editNote: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });
  constructor(
    private _AuthService: AuthService,
    private _NotesService: NotesService
  ) { }

  onSubmit() {
    let data = {
      title: this.noteForm.value.title,
      desc: this.noteForm.value.desc,
      token: this.token,
      citizenID: this.decoded._id,
    };
    this._NotesService.addNote(data).subscribe((response) => {
      if (response.message == 'success') {
        $('#addNote').modal('hide');
        this.noteForm.reset();
        this.getAllNotes();
      }
    });
  }
  number: number = 1;
  getAllNotes() {
    let data = {
      token: this.token,
      userID: this.decoded._id,
    };
    this.userID = data.userID;
    this._NotesService.getAllNotes(data).subscribe((response) => {
      this.allNotes = response.Notes;
    });
    for (let i = 0; i < this.allNotes.length; i++) {
      this.number = i
    }
  }

  noteID: any;

  getId(id: any) {
    this.noteID = id;
  }

  cancel() {
    this.noteEdit()
    $('#Edit').modal('hide');
    this.getAllNotes()
  }

  deleteNote() {
    let data = {
      NoteID: this.noteID,
      token: this.stickyToken,
    };
    this._NotesService.deleteNote(data).subscribe((response) => {
      $('#delete').modal('hide');
      this.getAllNotes();
    });
  }

  noteEdit() {
    let data = {
      title: this.editNote.value.title,
      desc: this.editNote.value.desc,
      token: this.token,
      NoteID: this.noteID
    };
    for (let index = 0; index < this.allNotes.length; index++) {
      if (this.allNotes[index]._id == this.noteID) {
        this.editNote.controls.title.setValue(this.allNotes[index].title)
        this.editNote.controls.desc.setValue(this.allNotes[index].desc)
        this._NotesService.editNote(data).subscribe(response => {
          if (response.message == "updated") {
            $('#Edit').modal('hide');
            this.getAllNotes()
          }
        })
      }
    }
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('stickyToken');
    this.userToken = this.token;
    if (this.token) {
      this.decoded = jwt_decode(this.token);
    }
    this.getAllNotes()
  }
}
