"use strict";
const fsP = require("fs/promises");
const axios = require("axios");
const {MarkovMachine} = require("./markov.js") 


/* Print file to the console */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log('Error', err);
    process.exit(1);
  }
  let mm = new MarkovMachine(contents);
  let newText = mm.getText();
  return newText;
}

/* takes in an string path and print html if the url is valid */
async function webCat(pathType, path) {
  if (pathType === "file"){
    let newText = await cat(path);
    console.log(newText);
  }
  else if (pathType === "url"){
    let resp;
    try {
      resp = await axios.get(path);
    } catch (err) {
      console.log('Error', err);
    }
    let mm = new MarkovMachine(resp.data);
    console.log(mm.getText());
  }
  else{
    console.error("Error: invalid path type");
  }
}
// controller function that calls cat and webcat 

const pathType = process.argv[2];
const path = process.argv[3];

webCat(pathType, path);

