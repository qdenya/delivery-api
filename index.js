// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

import bodyParser from 'body-parser';
import express from "express";
import router from './routes/routes.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
//const analytics = getAnalytics(app);

//const bodyParser = require('body-parser');
//const express = require('express');
const port = 3002; 
const application = express();

application.use(bodyParser.json());
// application.use(bodyParser.urlencoded({
//     extended: true,
// }));
application.use(express.raw());

application.use(function (req, res, next) { 
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});



router(application);

const server = application.listen(port, (error) => {
    if(error) return console.log(error);
    console.log(server.address().port);
});