#!/usr/bin/env node
const fs = require('fs');

if(process.argv[2] === undefined || process.argv[3] === undefined) {console.log('Usage\nxelem <input> <output>'); process.exit();}
let inc = 1000;
let elemName = 'xelem';

let parseHTML = (html) => {

  let result = '';

  let tagName = html.slice(html.indexOf('<') + 1, html.indexOf(' '));
  result += `let ${elemName}${inc} = document.createElement('${tagName}');`;
  html = html.slice(html.indexOf(' '));

  while(html.indexOf('=') !== -1 && html.indexOf('=') < html.indexOf('>')) {
    let attr = html.slice(0, html.indexOf('=')).trim();
    let value = html.slice(html.indexOf('=') + 2, html.indexOf('"', html.indexOf('"') + 1));
    result += `${elemName}${inc}.setAttribute('${attr}','${value}');`;
    html = html.slice(html.indexOf('"', html.indexOf('"') + 1) + 1).trim()
  }

  html = html.slice(html.indexOf('>') + 1);
  if(html.lastIndexOf('<') !== -1) {
   let innerHTML = html.slice(0, html.lastIndexOf('<')).trim();
   result += `${elemName}${inc}.innerHTML = '${innerHTML}';`;
  }
  return result;
}

let fileString = fs.readFileSync(process.argv[2], 'utf8');
let data = fileString;
let newFileString = '';
let generatedJS = '';

while(data.indexOf('{{') !== -1) {
  newFileString += data.slice(0, data.indexOf('{{'));
  let html = data.slice(data.indexOf('{{') + 2, data.indexOf('}}')).trim();
  generatedJS += parseHTML(html);
  data = data.slice(data.indexOf('}}') + 2);
  newFileString += `${elemName}${inc}`;
  ++inc;
}

newFileString += data;
newFileString = (generatedJS + newFileString);

fs.writeFile(process.argv[3], newFileString, (err) => {
  if (err) throw err;
  console.log(process.argv[3] + ' was constructed.');
});
