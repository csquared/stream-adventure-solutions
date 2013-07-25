var crypto = require('crypto');
var tar    = require('tar');
var zlib   = require('zlib');
var through = require('through');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var parser = tar.Parse();

parser.on('entry', function(entry) {
  if(entry.type != 'File') return;

  var md5Hash = crypto.createHash('md5', { encoding: 'hex' })
  entry.pipe(through(function(data) {
    md5Hash.update(data)
  },
  function(){
    var digest = md5Hash.digest('hex');
    console.log(digest + ' ' + entry.path)
  }))
})

process.stdin
  .pipe(decipher)
  .pipe(zlib.createGunzip())
  .pipe(parser)

