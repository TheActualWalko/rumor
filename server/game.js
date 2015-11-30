/* global module, require */

var _                    = require("underscore");
var Character            = require("./character.js");
var Player               = require("./player.js");
var genSpecialist        = require("./gen-specialist.js");

module.exports = function(){
  "use strict";

  function Game(){
    this.activeRumors = [];
    this.players = [];
  }

  Game.prototype = {

    periodNames : [
      "beforeClass",
      "class1",
      "recess",
      "class2",
      "lunch",
      "class3",
      "afterClass"
    ],

    activityPoints : {
      beforeClass : 0,
      class1      : 10,
      recess      : 20,
      class2      : 10,
      lunch       : 40,
      class3      : 10,
      afterClass  : 0
    },

    createPlayer : function(){
      var player = new Player();
      player.setCharacter( this.genCharacter() );
      this.players.push( player );
      return player;
    },
    
    genCharacter : function(){
      var character = new Character();
      character.rollStats();
      return character;
    },
    
    genSpecialist : function(){
      return genSpecialist();
    },
    
    activateRumor : function( rumor ){
      this.activeRumors.push( rumor );
    },
    
    begin : function(){
      this.period = this.getNextPeriodName();
      this.afterChangePeriod();
    },
    
    advance : function(){
      this.beforeChangePeriod();
      this.period = this.getNextPeriodName();
      this.afterChangePeriod();
    },
    
    getNextPeriodName : function(){
      if( this.period == null ){
        return this.periodNames[0];
      }
      return this.periodNames[ ( this.periodNames.indexOf( this.period ) + 1 ) % this.periodNames.length ];
    },
    
    forEachActiveSpecialist : function( callback ){
      this.players.forEach( function( player ){
        player.character.specialists.forEach( callback );
      }.bind(this));
    },
    
    beforeChangePeriod : function(){
      this.forEachActiveSpecialist( function( specialist ){
        specialist.effects.onPeriodEnd.forEach( function( effect ){
          effect( specialist, this );
        }.bind(this));
      }.bind(this));
    },
    
    afterChangePeriod : function(){
      this.updateActivityPoints();
      this.advanceRumors();
      this.triggerQueuedActions();
      this.forEachActiveSpecialist( function( specialist ){
        specialist.effects.onPeriodStart.forEach( function( effect ){
          effect( specialist, this );
        }.bind(this));
      }.bind(this));
    },
    
    updateActivityPoints : function(){
      var activityPointsForPeriod = this.activityPoints[ this.period ];
      this.players.forEach( function( player ){
        player.character.activityPoints = activityPointsForPeriod;
      });
    },
    
    advanceRumors : function(){
      var rumorsToRemove = [];
      this.activeRumors.forEach( function( rumor ){
        if( rumor.health <= 0 ){
          rumorsToRemove.push( rumor );
        }else{
          rumor.health -= 25;
          rumor.power  += 5;
          rumor.target.popularity -= rumor.power;
        }
      });
      rumorsToRemove.forEach( function( rumor ){
        this.activeRumors.splice( this.activeRumors.indexOf( rumor ), 1 );
      }.bind(this));
    },
    
    triggerQueuedActions : function(){
      this.players.forEach( function( player ){
        player.character.actionQueue[ this.period ].forEach( function( action ){
          this.triggerActionForCharacterIfAffordable( action, player.character );
        }.bind(this));
        player.character.actionQueue[ this.period ] = [];
      }.bind(this));
    },
    
    triggerActionForCharacterIfAffordable : function( action, character ){
      if( character.activityPoints >= action.cost ){
        character.activityPoints -= action.cost;
        action.trigger( this );
        console.log( "triggered " + action.type );
        return true;
      }else{
        return false;
      }
    },
    
    log : function(){
      console.log( "\n===== " + this.period + " =====" );
      console.log( "\nCharacters:");
      this.players.forEach( function( player ){
        player.character.log( "  " );
      });
      console.log("");
    }
    
  };

  return Game;
  
}();