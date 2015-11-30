/* global module, require */

var _                    = require("underscore");

var Action = require("./action.js");

module.exports = function(){
  "use strict";

  function StartMajorRumorAction( initiator, rumor ){
    Action.apply( this, arguments );
    this.rumor = rumor;
  }

  StartMajorRumorAction.prototype = _.extend( _.clone( Action.prototype ), {
    type : "StartMajorRumor",
    cost : 40,
    onTrigger : function( game ){
      game.activateRumor( this.rumor );
    },
    matches : function( action ){
      return (
        Action.prototype.matches.call( this, action )
        &&
        this.rumor.target === action.rumor.target
        &&
        this.rumor.subject.type === action.rumor.subject.type
      );
    }
  });

  return StartMajorRumorAction;
  
}();