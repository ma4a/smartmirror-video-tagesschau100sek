'use strict';

exports.get = (params) => {

  return new Promise((resolve, reject) => {

    const pageURL = 'http://www.tagesschau.de/100sekunden/';
    const regex = new RegExp('http:\/\/download.media.tagesschau.de\/video\/[/A-Za-z0-9-]*.websm.h264.mp4', 'g');

    const lib = pageURL.startsWith('https') ? require('https') : require('http');
    const zlib = require('zlib');

    const request = lib.get(pageURL, (response) => {

      const chunks = [];

      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }

      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        var buffer = Buffer.concat(chunks);
        var encoding = response.headers['content-encoding'];
        if (encoding == 'gzip') {
          zlib.gunzip(buffer, function(err, decoded) {
            reject(err, decoded && decoded.toString());
            console.log(err, decoded && decoded.toString())
          });
        } else if (encoding == 'deflate') {
          zlib.inflate(buffer, function(err, decoded) {
            reject(err, decoded && decoded.toString());
            console.log(err, decoded && decoded.toString())
          })
        } else {
          var regexResult = buffer.toString().match(regex);
          if(regexResult.length > 0) {
            console.log('Video URL: ' + regexResult[0]);
            resolve(regexResult[0]);
          }
          else {
            reject('No regex match')
          }
        }
      });
    });

    request.on('error', (err) => {
      reject(err);
    });
  })
};