/* global module, require */

var _                    = require("underscore");

module.exports = function(){
  "use strict";

  function Rumor( target, subject ){
    this.target    = target;
    this.subject   = subject;
    this.health    = 100;
    this.power     = 0;
  }

  Rumor.prototype = {
    confirm : function(){
      return this.target.actionHistory.reduce( function( found, action ){
        return found || action.matches( this.subject );
      }.bind(this), false );
    }
  };

  return Rumor;

}();