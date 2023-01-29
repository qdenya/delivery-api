// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

import bodyParser from 'body-parser';
import express from "express";
import router from './routes/routes.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyB0jfoBdTC-SBSWKt48NM16DPl-E0SeV-w",
  authDomain: "delivery-pracownia.firebaseapp.com",
  projectId: "delivery-pracownia",
  storageBucket: "delivery-pracownia.appspot.com",
  messagingSenderId: "806003720663",
  appId: "1:806003720663:web:ba98156583e309e51f0b92",
  measurementId: "G-VJ6B721WGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

const port = 3002; 
const application = express();

application.use(bodyParser.json());
application.use(express.raw());

application.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router(application);

const server = application.listen(port, (error) => {
    if(error) return console.log(error);
    console.log("Server is ready on " + server.address().port + " port.");
});