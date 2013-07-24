var split = require('split');
var through = require('through');
var i = 0;

function transform(line) {
  if(i % 2 ==0){
    this.queue(line.toString().toLowerCase());
  }else{
    this.queue(line.toString().toUpperCase());
  }
  this.queue('\n')
  i++;
}

process.stdin
  .pipe(split())
  .pipe(through(transform))
  .pipe(process.stdout)
;
