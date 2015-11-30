/* global module, require */

var _                    = require("underscore");

module.exports = function(){
  "use strict";

  function Action( initiator ){
    this.timestamp = null;
    this.initiator = initiator;
  }

  Action.prototype = {
    cost : 0,
    onTrigger : function(){
      throw new Error( "The base Action type cannot be triggered." );
    },
    trigger : function( game ){
      this.timestamp = new Date().getTime();
      this.initiator.actionHistory.push( this );
      this.onTrigger( game );
    },
    matches : function( action ){
      return (
        this.initiator === action.initiator
        &&
        action.type === this.type
      );
    }
  };

  return Action;
  
}();