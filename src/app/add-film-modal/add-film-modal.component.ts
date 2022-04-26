import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-film-modal',
  templateUrl: './add-film-modal.component.html',
  styleUrls: ['./add-film-modal.component.scss']
})
export class AddFilmModalComponent implements OnInit {
  addFilmForm: any;

  constructor(public dialogRef: MatDialogRef<AddFilmModalComponent>) { }

  ngOnInit(): void {
    this.addFilmForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      imageURL: new FormControl('', [Validators.required]),
      cash: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required, Validators.minLength(4) , Validators.maxLength(4)]),
      actors: new FormArray([])

    })
  }

  addNewActor(event: any) {
    event.preventDefault();
    this.addFilmForm.get('actors').push(new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    }))
  }

  addNewFilm() {
    this.dialogRef.close(this.addFilmForm.value);
  }
}
