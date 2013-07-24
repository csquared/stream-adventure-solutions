var http = require('http');
var through = require('through');

var server = http.createServer(function (req, res) {
  if(req.method == 'POST') {
    function write (buf) {
      this.queue(buf.toString().toUpperCase())
    }
    req.pipe(through(write)).pipe(res)
  }else{
    res.end();
  }
});
server.listen(8000);
