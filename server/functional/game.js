/* global module, require */

var _ = require("underscore");
var Character        = require("./character.js");
var Player           = require("./player.js");
var RumorGraph       = require("./rumor-graph.js");


module.exports = function(){

  "use strict";
  
  function Game(){
    this.players      = {};
    this.characters   = {};
    this.charactersByPlayer = {};
    this.playersByCharacter = {};
    this.rumors = [];
  }
  
  Game.prototype = {
    
    join : function( name ){
      var playerID      = this.createPlayer();
      var characterID   = this.createCharacter( name );
      this.setCharacter( playerID, characterID );
      return playerID;
    },
    
    createCharacter : function( name ){
      var id = Math.random();
      this.characters[ id ] = new Character( name );
      return id;
    },
    
    createPlayer : function(){
      var id = Math.random();
      this.players[ id ] = new Player();
      return id;
    },
    
    setCharacter : function( playerID, characterID ){
      this.charactersByPlayer[ playerID ] = characterID;
      this.playersByCharacter[ characterID ] = playerID;
    },

    createRumor : function(){

    }
  
  };

  return Game;

}();