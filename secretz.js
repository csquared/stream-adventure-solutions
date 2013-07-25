var crypto = require('crypto');
var tar    = require('tar');
var zlib   = require('zlib');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var parser = tar.Parse();

parser.on('entry', function(entry) {
  if(entry.type != 'File') return;

  var md5Hash = crypto.createHash('md5', { encoding: 'hex' })
  entry.on('data', function(data) {
    md5Hash.update(data)
  })

  entry.on('end', function() {
    var digest = md5Hash.digest('hex');
    console.log(digest + ' ' + entry.path)
  })
})

process.stdin
  .pipe(decipher)
  .pipe(zlib.createGunzip())
  .pipe(parser)

