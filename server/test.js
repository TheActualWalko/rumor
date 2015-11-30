/* global module, require */

var _                     = require("underscore");

var Game                  = require("./game.js");
var StartMajorRumorAction = require("./start-major-rumor-action.js");
var AddSpecialistAction   = require("./add-specialist-action.js");
var Rumor                 = require("./rumor.js");


(function(){

  "use strict";

  var game = new Game();

  var player1 = game.createPlayer();
  var player2 = game.createPlayer();

  player1.character.name = "SamLady";
  player2.character.name = "AmianiWoman";

  var specialist = game.genSpecialist();

  player2.character.actionQueue.recess.push(
    new AddSpecialistAction(
      player2.character,
      specialist
    )
  );

  player1.character.actionQueue.lunch.push( 
    new StartMajorRumorAction(
      player1.character,
      new Rumor(
        player2.character,
        new AddSpecialistAction(
          player2.character,
          specialist
        )
      )
    ) 
  );

  game.begin();

  game.advance();
  game.advance();
  game.advance();
  game.advance();
  game.advance();
  game.advance();
  game.advance();

  game.log();

})();