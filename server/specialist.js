/* global module, require */

var _                    = require("underscore");

module.exports = function(){
  "use strict";

  function Specialist(){
    this.name = "Unnamed";
    this.popularity = 0;
    this.owner = null;
    this.effects = {
      onAction      : [],
      onPeriodStart : [],
      onPeriodEnd   : []
    };
  }

  Specialist.prototype = {
    type : "Specialist"
  };

  return Specialist;
  
}();