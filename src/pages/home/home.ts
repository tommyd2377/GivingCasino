import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userForm: FormGroup;
  email: string;
  country: string;
  city: string;
  zip: string;
  date;
  currentTime;
  slideIndex: number;

  constructor(public navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private fb: FormBuilder) {

    
    this.userForm = this.fb.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => 
      this.onValueChanged(data));
      this.onValueChanged();
  }

  



  createUser() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, "givingcasino1")
      .then(() => {
        let user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: (this.email)
        }).then(() => {
              user.sendEmailVerification().then(() => {
              console.log("email verification sent");
              console.log(this.getTime());
              let uid = user.uid
              const userData = this.db.object('user-data/' + uid);
              userData.set({ zip: (this.zip), country: (this.country), city: (this.city), 
              email: (this.email), uid: (uid), signedUp: (this.getTime())})
            })
        })
        .catch(error => 
          console.log("database error: " + error))
      })
    .catch(error =>
      console.log("createUser error: " + error));
  }
  
  onValueChanged(data?: any) {
    if (!this.userForm) { 
      return; 
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  formErrors = {
    'email': ''
  };
  
  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Must be a valid email.'
    }
  }

  getTime() {
    this.date = new Date();
    this.currentTime = this.date.getTime();
    return this.currentTime;
  }

}
