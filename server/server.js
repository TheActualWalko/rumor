/* global module, require, Buffer */

var api  = require("./api.js");
var http = require("http");

(function(){
  "use strict";

  var PORT = 8214;

  function respond( response, data ){
    response.writeHead( 
      200, { 
        "Content-Type" : "text/plain",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
      }
    );
    response.end( JSON.stringify( data ) );
  }

  var server = http.createServer(function( request, response ){
    var endpoint = request.url.replace("/","");
    var data = [];
    request.on("data", function( chunk ){
      data.push( chunk );
    }).on("end", function(){
      var payload;
      if( data.length > 0 ){
        payload = JSON.parse( Buffer.concat(data).toString() );
      }
      respond( response, api( endpoint, payload ) );
    });
  });
  server.listen(
    PORT,
    function(){
      console.log("Server running at http://127.0.0.1:"+PORT+"/");
    }
  );

})();