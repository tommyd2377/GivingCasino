import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

export const firebaseConfig = {
  apiKey: "AIzaSyBeLCLcD6zpGDT-sfusG6fkYwDHduuIKuE",
  authDomain: "giving-casino.firebaseapp.com",
  databaseURL: "https://giving-casino.firebaseio.com",
  projectId: "giving-casino",
  storageBucket: "",
  messagingSenderId: "511170909222",
  appId: "1:511170909222:web:2e73628afb55c88b"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
