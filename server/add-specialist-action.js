/* global module, require */

var _                    = require("underscore");

var Action = require("./action.js");

module.exports = function(){
  "use strict";

  function AddSpecialistAction( initiator, specialist ){
    Action.apply( this, arguments );
    this.specialist = specialist;
  }

  AddSpecialistAction.prototype = _.extend( _.clone( Action.prototype ), {
    type : "AddSpecialist",
    cost : 20,
    onTrigger : function( game ){
      this.initiator.addSpecialist( this.specialist );
    },
    matches : function( action ){
      return (
        Action.prototype.matches.call( this, action )
        &&
        this.specialist === action.specialist
      );
    }
  });

  return AddSpecialistAction;
  
}();