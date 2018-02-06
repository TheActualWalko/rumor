/* global module, require */

var _ = require("underscore");

module.exports = function(){
  "use strict";

  function Rumor( strength, subject ){
    
  }
  
  Rumor.prototype = {
    with : function( props ){
      return new Rumor(
      )
    }
  };

  return Rumor;

}();
