import { Request } from "express";

const express = require("express");
const corsPack = require("cors");


const whitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "https://localhost:3443",
  "http://localhost:3001",
  "https://envision-cp.herokuapp.com",
  "https://envision-cp-visualizer.web.app"
];
var corsOptionsDelegate = (req:Request, callback: (arg0: null, arg1: { origin: boolean; }) => void) => {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")!) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = corsPack();
exports.corsWithOptions = corsPack(corsOptionsDelegate);
