var concat = require('concat-stream');

process.stdin
  .pipe(concat(function (input) {
    var reversed = input.toString().split('').reverse().join('');
    console.log(reversed);
  }))
;
