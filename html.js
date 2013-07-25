var trumpet = require('trumpet');
var through = require('through');
var tr = trumpet();

tr.selectAll('.loud', function(elem){
  var stream = elem.createStream()
  stream.on('data', function(innerHTML){
    stream.write(innerHTML.toString().toUpperCase());
  })
})

process.stdin.pipe(tr).pipe(process.stdout);
