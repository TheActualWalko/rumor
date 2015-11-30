/* global module, require */

var _ = require("underscore");

module.exports = function(){
  "use strict";

  function Character(){
    this.name = "Unnamed";
    this.popularity = 100;
    this.skills = {
      class1 : 75,
      class2 : 75,
      class3 : 75
    };
    this.notes = {
      class1 : 2,
      class2 : 2,
      class3 : 2
    };
    this.favouritism = {
      class1 : 0,
      class2 : 0,
      class3 : 0
    };
    this.specialists = [];
    this.actionQueue = {
      beforeClass : [],
      class1      : [],
      recess      : [],
      class2      : [],
      lunch       : [],
      class3      : [],
      afterClass  : []
    };
    this.actionHistory = [];
    this.activityPoints = 0;
  }

  Character.prototype = {
    addSpecialist : function( specialist ){
      specialist.owner = this;
      this.specialists.push( specialist );
    },
    rollStats : function(){
      if( this.statsRolled ){
        throw new Error("This Character has already rolled for stats");
      }
      this.statsRolled = true;
      var statRollRanges = {
        skills      : [ 50, 100 ],
        notes       : [ 0, 4 ],
        favouritism : [ -25, 25 ]
      };
      Object.keys( statRollRanges ).forEach( function( statGroupName ){
        var statGroup = this[ statGroupName ];
        var range = statRollRanges[ statGroupName ];
        var min = range[0];
        var max = range[1];
        Object.keys( statGroup ).forEach( function( className ){
          statGroup[ className ] = Math.round( Math.random() * ( max - min ) ) + min;
        });
      }.bind(this));
    },
    log : function( prefix ){
      console.log( "" );
      console.log( prefix, this.name, "\n" );
      console.log( prefix, "Popularity: ",  this.popularity );
      console.log( prefix, "AP:         ",  this.activityPoints, "\n" );

      console.log( prefix, "Skills: " );
      Object.keys( this.skills ).forEach( function( className ){
        console.log( prefix, "  ", className, this.skills[ className ] );
      }.bind(this));
      console.log( "" );

      console.log( prefix, "Notes: " );
      Object.keys( this.notes ).forEach( function( className ){
        console.log( prefix, "  ", className, this.notes[ className ] );
      }.bind(this));
      console.log( "" );
      
      console.log( prefix, "Favouritism: " );
      Object.keys( this.favouritism ).forEach( function( className ){
        console.log( prefix, "  ", className, this.favouritism[ className ] );
      }.bind(this));
      console.log( "" );

    }
  };

  return Character;
  
}();