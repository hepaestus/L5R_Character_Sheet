  angular.module('myApp').service('LoadCharacterService', ['$localStorage', 'DataService', function($localStorage, DataService) {

    var saved_characters_array = [];

    this.returnSavedCharacterArray = function(index) {
      return saved_character_array[index];
    };


    this.loadCharacters = function() {
      var saved_stored_characters_obj = $localStorage.characters;
      //console.log("Saved Stored Characters Array: " + JSON.stringify(saved_stored_characters_obj));
      if ( saved_stored_characters_obj ) {
        for ( var time in saved_stored_characters_obj) {
          var character = saved_stored_characters_obj[time];
          if ( character ) {
            saved_characters_array.push(character);
          }
        }
      }
      return saved_characters_array;
    };


    this.getSavedCharacter = function(index) {
      //console.log("Getting Character : " + JSON.stringify(saved_characters_array[index]));      
      return DataService.updateCharacter( saved_characters_array[index] );
    };


    this.deleteSavedCharacter = function(character_date_string) {
      for( var date in $localStorage.characters) {
        if ( date == character_date_string ) {
          delete $localStorage.characters[date];
        }
      }
    };


    this.saveCharacter = function(character) {
      //console.log("Save Character : " + DataService.character() );
      var d = new Date();
      var date_string = d.toString().replace(/:/g, "-");
      var date_string = date_string.toString().replace(/\(|\)/g, "");
      var date_string = date_string.toString().replace(/\s/g, "_");
      character.last_saved = date_string;
      console.log("Date : " + date_string );
      var characters = [];
      if ( $localStorage.characters ) {
        characters = $localStorage.characters;
      }
      character = DataService.updateCharacter(character);
      characters[date_string] = character;
      $localStorage.characters = characters;
    }; 

  }]);//end loadcharacterservice
