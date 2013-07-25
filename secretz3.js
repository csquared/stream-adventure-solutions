var crypto = require('crypto');
var tar    = require('tar');
var zlib   = require('zlib');
var through = require('through');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var parser = tar.Parse();

parser.on('entry', function(entry) {
  if(entry.type != 'File') return;

  var md5Hash = crypto.createHash('md5', { encoding: 'hex' })
  var end = function (){ this.queue(' ' + entry.path + '\n') }
  entry.pipe(md5Hash).pipe(through(null, end)).pipe(process.stdout)
})

process.stdin
  .pipe(decipher)
  .pipe(zlib.createGunzip())
  .pipe(parser)

