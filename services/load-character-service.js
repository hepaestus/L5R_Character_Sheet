  angular.module('myApp').service('LoadCharacterService', ['$cookieStore', function($cookieStore) {

    var saved_characters_array = [];

    this.returnSavedCharacterArray = function(index) {
      return saved_character_array[index];
    };

    this.loadCharacters = function() {
      var saved_character_cookie_array = $cookieStore.get('characters');
      saved_characters_array = [];
      if ( saved_character_cookie_array ) {
        for ( var i = 0; i < saved_character_cookie_array.length; i++) {
          //console.log("Getting Character " +i+ " : " + saved_character_cookie_array[i]);
          var character = $cookieStore.get(saved_character_cookie_array[i]);
          if ( character ) {
            //console.log("Pushing Character Into Array : " + character.name);
            saved_characters_array.push(character);
          }
        }
      }
      //console.log("Saved Characters Array : " + saved_characters_array);
      //console.log("Saved Characters Array : " + saved_characters_array.length );
      return saved_characters_array;
    };

    this.getSavedCharacter = function(index) {
      console.log("Getting Character : " + saved_characters_array[index]);
      return saved_characters_array[index];
    };

    this.deleteSavedCharacter = function(character_date_string) {
      $cookieStore.remove(character_date_string);
      var stored_char_strings = $cookieStore.get('characters');
      var idx = stored_char_strings[character_date_string];
      stored_char_strings.splice(idx,1);
      $cookieStore.put('characters', stored_char_strings);
    };

    var saved_characters_date_array = [];    

    this.saveCharacter = function(character) {
      var d = new Date();
      var date_string = d.toString().replace(/ /g, "_");
      var date_string = d.toString().replace(/:/g, "-");
      console.log("Date : " + date_string );
      character.last_saved = date_string;
      var stored_chars = $cookieStore.get('characters');
      if ( stored_chars != null ) {
        for( var i=0; i < stored_chars.length; i++ ) {
          saved_characters_date_array.push(stored_chars[i]);
        }
      }
      saved_characters_date_array.push('character_' + date_string);
      console.log("Saved Character Dates: " + saved_characters_date_array);
      $cookieStore.put('characters', saved_characters_date_array  );
      $cookieStore.put('character_' + date_string, character);
    }; 

  }]);//end loadcharacterservice
