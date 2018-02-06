/* global module, require */
var Character = require( "../character.js" );
module.exports = function(){
  "use strict";
  return {

    gainPopularity : function( beforeExit, assert ){
      var character = new Character()
        .withPopularity(10)
        .gainPopularity(10);
      assert.equal( character.popularity, 20 );
    },

    setSkill : function( beforeExit, assert ){
      var character = new Character().setSkill( "math", 20 );
      assert.equal( character.skills.math, 20);
    },
    gainSkill : function( beforeExit, assert ){
      var character = new Character()
        .setSkill( "math", 20 )
        .gainSkill( "math", 10 );
      assert.equal( character.skills.math, 30 );
    },

    addNote : function( beforeExit, assert ){
      var note = { type : "standard" };
      assert.equal(
        new Character()
          .addNote( "math", note )
          .countNotes( "math" ),
        1
      );
    },
    getNotes : function( beforeExit, assert ){
      var note = { type : "standard" };
      var goldNote = { type : "gold" };
      var character = new Character().addNotes( "math", [ note, goldNote ] );
      var notes = character.getNotes( "math" );
      assert.includes( notes, note );
      assert.includes( notes, goldNote );
    },
    spendNotes : function( beforeExit, assert ){
      var note = { type : "standard" };
      var goldNote = { type : "gold" };
      var character = new Character().addNotes( "math", [ note, goldNote ] );
      var notes = character.getNotes( "math" );
      character = character.spendNotes( "math", notes );
      assert.equal( character.countNotes( "math" ), 0 );
    },

    addToInventory : function( beforeExit, assert ){
      var character = new Character().addToInventory( "pie" );
      assert.includes( character.inventory, "pie" );
    },
    addMultipleToInventory : function( beforeExit, assert ){
      var character = new Character().addToInventory( [ "pie", "money" ] );
      assert.includes( character.inventory, "pie" );
      assert.includes( character.inventory, "money" );
    },

    addFriend : function( beforeExit, assert ){
      var character = new Character().addFriend( "1" );
      assert.equal( character.hasFriend( "1" ), true );
    },
    removeFriend : function( beforeExit, assert ){
      var character = new Character().addFriend( "1" ).removeFriend( "1" );
      assert.equal( character.hasFriend( "1" ), false );
    }

  };
}();