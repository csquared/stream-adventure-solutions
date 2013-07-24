var through = require('through')
var tr = through(write);

function write (buf) {
  this.queue(buf.toString().toUpperCase());
}

process.stdin.pipe(tr).pipe(process.stdout);
