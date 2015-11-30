/* global module, require */

var _                    = require("underscore");

var Action = require("./action.js");

module.exports = function(){
  "use strict";

  function RemoveSpecialistAction( initiator, specialist ){
    Action.apply( this, arguments );
    this.specialist = specialist;
  }

  RemoveSpecialistAction.prototype = _.extend( _.clone( Action.prototype ), {
    type : "RemoveSpecialist",
    cost : 20,
    onTrigger : function(){
      this.initiator.specialists.splice( this.initiator.specialists.indexOf( this.specialist ), 1 );
    }
  });

  return RemoveSpecialistAction;
  
}();