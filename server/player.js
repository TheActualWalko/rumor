/* global module, require */

var _                    = require("underscore");

module.exports = function(){
  "use strict";
  
  function Player(){
  
  }

  Player.prototype = {
    setCharacter : function( character ){
      if( this.character != null ){
        throw new Error("This player already has a character!");
      }
      this.character = character;
    }
  };

  return Player;

}();