/* global module, require */

var _ = require("underscore");

var Game = require("./game.js");

module.exports = function(){
  "use strict";

  var currentGame;

  function api( endpoint, payload ){
    var routes = {
      hi : function( payload ){
        return "hi yourself";
      },
      newGame : function(){
        currentGame = new Game();
      },
      createPlayer : function( name ){
        var player = currentGame.createPlayer();
        player.character.name = name;
      },
      players : function(){
        return currentGame.players.map( function( player ){
          return player.character.name;
        });
      }
    };

    var response;
    
    if( routes[ endpoint ] == null ){
      response = "unrecognized endpoint";
    }else{
      response = routes[ endpoint ]( payload );
      if( response == null ){
        response = "success";
      }
    }
    
    console.log( "API call" );
    console.log( "| endpoint: ", endpoint );
    console.log( "| response: ", response );
    console.log( "" );

    return response;
  }

  return api;

}();