/* global module, require */

var _                    = require("underscore");

var Action = require("./action.js");

module.exports = function(){
  "use strict";

  function PassNoteAction( initiator, target, note ){
    Action.apply( this, arguments );
    this.target = target;
    this.note = note;
  }

  PassNoteAction.prototype = _.extend( _.clone( Action.prototype ), {
    type : "PassNote",
    cost : 5,
    onTrigger : function( game ){
      this.target.receiveMessageFromCharacter( this.note, this.initiator );
    }
  });

  return PassNoteAction;
  
}();