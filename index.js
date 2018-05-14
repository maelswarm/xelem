#!/usr/bin/env node
const fs = require('fs');

if(process.argv[2] === undefined || process.argv[3] === undefined) {console.log('Usage\nxelem <input> <output>'); process.exit();}
let inc = 1000;
let elemName = 'xelem';

let parseHTML = (html) => {

  let result = '';

  result += `let ${elemName}${inc} = document.createElement('div');`;

/*
  let tagName = html.slice(html.indexOf('<') + 1, html.indexOf(' '));
  result += `let ${elemName}${inc} = document.createElement('${tagName}');`;
  html = html.slice(html.indexOf(' '));

  while(html.indexOf('=') !== -1 && html.indexOf('=') < html.indexOf('>')) {
    if((html.indexOf('="') < html.indexOf('="${') && html.indexOf('="') !== -1) || html.indexOf('="${') === -1 && html.indexOf('="') !== -1) {
      let attr = html.slice(0, html.indexOf('=')).trim();
      let value = html.slice(html.indexOf('=') + 2, html.indexOf('"', html.indexOf('"') + 1));
      result += `${elemName}${inc}.setAttribute('${attr}','${value}');`;
      html = html.slice(html.indexOf('"', html.indexOf('"') + 1) + 1).trim();
    } else if(html.indexOf('="${') !== -1) {
      let attr = html.slice(0, html.indexOf('=')).trim();
      let value = html.slice(html.indexOf('=') + 4, html.indexOf('}', html.indexOf('{') + 1));
      result += `${elemName}${inc}.setAttribute('${attr}',${value});`;
      html = html.slice(html.indexOf('}"') + 2).trim();
    }
  }*/

  //html = html.slice(html.indexOf('>') + 1);
  if(html.lastIndexOf('<') !== -1) {
   let innerHTML = html.slice(0, html.lastIndexOf('<')).trim();
   result += `${elemName}${inc}.innerHTML = \`${innerHTML}\`;`;
  }
  return result;
}

let fileString = fs.readFileSync(process.argv[2], 'utf8');
let data = fileString;
let newFileString = '';

while(data.indexOf('{{') !== -1) {
  let tmp = '';
  tmp = data.slice(0, data.indexOf('{{'));
  if(tmp.lastIndexOf(';') !== -1) {
    newFileString += tmp.slice(0, tmp.lastIndexOf(';') + 1);
    tmp = tmp.slice(tmp.lastIndexOf(';') + 1);
  } else if(tmp.lastIndexOf('{') !== -1) {
    newFileString += tmp.slice(0, tmp.lastIndexOf('{') + 1);
    tmp = tmp.slice(tmp.lastIndexOf('{') + 1);
  }
  let html = data.slice(data.indexOf('{{') + 2, data.indexOf('}}')).trim();
  let generatedJS = parseHTML(html);
  data = data.slice(data.indexOf('}}') + 2);
  tmp += `${elemName}${inc}`;
  tmp += data.slice(0, data.indexOf(';') + 1);
  data = data.slice(data.indexOf(';') + 1);
  newFileString += (generatedJS + tmp);
  ++inc;
}

newFileString += data;

fs.writeFile(process.argv[3], newFileString, (err) => {
  if (err) throw err;
  console.log(process.argv[3] + ' was constructed.');
});
