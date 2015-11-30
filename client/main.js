var $api;
$(function(){
  "use strict";
  var api = function( endpoint, payload ){
    var promise = {
      successCallbacks : [],
      errorCallbacks : [],
      success : function( callback ){
        this.successCallbacks.push( callback );
        return this;
      },
      error : function( callback ){
        this.errorCallbacks.push( callback );
        return this;
      },
      onSuccess : function(){
        var args = arguments;
        this.successCallbacks.forEach( function( callback ){
          callback.apply( this, args );
        }.bind(this));
      },
      onError : function(){
        var args = arguments;
        this.errorCallbacks.forEach( function( callback ){
          callback.apply( this, args );
        }.bind(this));
      }
    };
    $.ajax({
      url         : "http://127.0.0.1:8214/" + endpoint,
      method      : "POST",
      data        : JSON.stringify( payload ),
      contentType : 'text/plain; charset=UTF-8',
      success     : function( response ){
        promise.onSuccess( JSON.parse( response ) );
      },
      error : function( response ){
        console.log( response );
        promise.onError( JSON.parse( response.responseText ) );
      }
    });
    return promise;
  };
  $api = function( endpoint, payload ){
    api( endpoint, payload )
      .success( function( response ){
        console.log( response );
      })
      .error( function( response ){
        console.log( response );
      });
  };
});