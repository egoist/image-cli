'use strict';
const fs = require('fs');
const path = require('path');
const co = require('co');
const got = require('got');
const isUrl = require('is-url');
const imgcat = require('term-img');
const FormData = require('form-data');
const form = new FormData();
const download = require('./download');
const spin = require('./spin');

const uploadSpin = spin('Uploading');

module.exports = co.wrap(function* post(filePath) {
  // if filePath is url
  // download it and temp-write it to a file
  if (isUrl(filePath)) {
    filePath = yield download(filePath).catch(err => console.log(err.stack));
  }

  // output image in terminal
  yield imgcat(filePath).catch(() => {/* do nothing */});
  const file = fs.createReadStream(path.resolve(filePath));

  // start spinner
  uploadSpin.start();

  // create form
  form.append('smfile', file);
  form.append('ssl', 'true');

  // post form
  const data = yield got.post('https://sm.ms/api/upload', {
    headers: form.getHeaders(),
    body: form,
    json: true
  }).then(res => res.body);

  // stop spinner
  uploadSpin.stop();

  // exit when error occurs
  if (data.code !== 'success') {
    console.log(data.msg.red);
    process.exit(1);
  }

  // return result
  return data.data;
});
