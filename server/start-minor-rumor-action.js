/* global module, require */

var _ = require("underscore");

var Action = require("./action.js");

module.exports = function(){
  "use strict";

  function StartMinorRumorAction( initiator, target, power ){
    Action.apply( this, arguments );
    this.target = target;
    this.power = power;
  }

  StartMinorRumorAction.prototype = _.extend( _.clone( Action.prototype ), {
    type : "StartMinorRumor",
    cost : 10,
    onTrigger : function( game ){
      this.target.popularity -= this.power;
    },
    matches : function( action ){
      return (
        Action.prototype.matches.call( this, action )
        &&
        this.target === action.target
      );
    }
  });

  return StartMinorRumorAction;
  
}();