/* global module, require */

var _                    = require("underscore");

var Specialist = require("./specialist.js");

module.exports = function(){
  "use strict";

  var specialistPrototypeGenerators = {

    nerd : function(){

      var bestClass = [ "class1", "class2", "class3" ][ Math.floor( Math.random() * 3 ) ];
      var skill = Math.round( Math.random() * 2 );

      return {
        popularityRange : [ -50, -25 ],
        effects : {
          onAction      : [],
          onPeriodStart : [],
          onPeriodEnd   : [
            function( specialist, game ){
              if( game.period === bestClass ){
                specialist.owner.notes[ bestClass ] += skill;
              }
            }
          ]
        }
      };
      
    }
    
  };

  function getRandomPrototype(){
    var generatorKeys = Object.keys( specialistPrototypeGenerators );
    return specialistPrototypeGenerators[ generatorKeys[ Math.floor( Math.random() * generatorKeys.length ) ] ]();
  }

  function genSpecialist(){

    var prototype = getRandomPrototype();
    var specialist = new Specialist();
    
    specialist.effects    = prototype.effects;

    var minPopularity = prototype.popularityRange[0];
    var maxPopularity = prototype.popularityRange[1];
    specialist.popularity = Math.round( Math.random() * ( maxPopularity - minPopularity ) ) - minPopularity;

    return specialist;

  }
  
  return genSpecialist;

}();