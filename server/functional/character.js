/* global module, require */

var _ = require("underscore");

module.exports = function(){
  "use strict";

  function Character( name, popularity, skills, notes, inventory, friends ){
    this.name       = name        || "Unnamed";
    this.popularity = popularity  || 0;
    this.skills     = skills      || {
      math    : 0,
      science : 0,
      english : 0
    };
    this.notes      = notes      || {
      math    : [],
      science : [],
      english : []
    };
    this.inventory = inventory  || [];
    this.friends   = friends    || [];
  }
  
  Character.prototype = {

    with : function( props ){
      return new Character(
        props.name        || this.name,
        props.popularity  || this.popularity,
        props.skills      || this.skills,
        props.notes       || this.notes,
        props.inventory   || this.inventory,
        props.friends     || this.friends
      );
    },

    withPopularity : function( popularity ){
      return this.with( { popularity : popularity } );
    },
    gainPopularity : function( gain ){
      return this.withPopularity( this.popularity + gain );
    },

    withSkills : function( skills ){
      return this.with( { skills : skills } );
    },
    setSkill : function( skillName, value ){
      return this.withSkills( 
        _.mapObject( 
          this.skills,
          function( existingVal, key ){
            if( key === skillName ){
              return value;
            }else{
              return existingVal;
            }
          }
        )
      );
    },
    gainSkill : function( skillName, gain ){
      return this.setSkill( skillName, this.skills[ skillName ] + gain );
    },

    withNotes : function( notes ){
      return this.with( { notes : notes } );
    },
    addNotes : function( noteType, notes ){
      if( notes.length > 0 ){
        return this.addNote( noteType, notes[0] ).addNotes( noteType, notes.slice( 1 ) );
      }
      return this;
    },
    addNote : function( noteType, note ){
      return this.withNotes( 
        _.mapObject( 
          this.notes,
          function( existingVal, key ){
            if( key === noteType ){
              return existingVal.concat( [ note ] );
            }else{
              return existingVal;
            }
          }
        )
      );
    },
    spendNotes : function( noteType, notes ){
      return this.withNotes(
        _.mapObject( 
          this.notes,
          function( existingVal, key ){
            if( key === noteType ){
              return _.difference( existingVal, notes );
            }else{
              return existingVal;
            }
          }
        )
      );
    },
    getNotes : function( noteType, count ){
      if( count === undefined ){
        return this.notes[ noteType ];
      }
      return this.notes[ noteType ].slice( 0, count );
    },
    countNotes : function( noteType ){
      return this.notes[ noteType ].length;
    },

    withInventory : function( inventory ){
      return this.with( { inventory : inventory } );
    },
    addToInventory : function( items ){
      if( !_.isArray( items ) ){
        items = [ items ];
      }
      return this.withInventory( this.inventory.concat( items ) );
    },

    withFriends : function( friends ){
      return this.with( { friends : friends } );
    },
    addFriend : function( specialistID ){
      return this.withFriends(  _.union( this.friends, [ specialistID ] ) );
    },
    removeFriend : function( specialistID ){
      return this.withFriends( _.difference( this.friends, [ specialistID ] ) );
    },
    hasFriend : function( specialistID ){
      return this.friends.indexOf( specialistID ) >= 0; 
    }

  };

  return Character;

}();
