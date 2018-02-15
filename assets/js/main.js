$( document ).ready( function () {
    var unselectedCharactersContainer = $( '.characters' );
    var unselectedEnemysContainer = $( '.enemy-characters' );
    var activeBattleContainer = $( '.active-battle' );

    var game = {
        characters: [],
        newCharacter: function ( name, hp, src, minAtk, maxAtk ) {
            var char = {
                "name": name,
                "hp": hp,
                "src": src,
                "minimumAttack": minAtk,
                "maximumAttack": maxAtk,
                "div": null
            };
            var newDiv = $( '<div></div>' );
            newDiv.addClass( 'unselected-character character col-2 p-3 m-3' );
            var img = $( '<img/>' );
            img.attr( 'class', 'img-fluid character-image' );
            img.attr( 'src', src );
            newDiv.append( img );
            newDiv.data( 'name', name );
            newDiv.data( 'hp', hp );
            newDiv.data( 'minAtk', minAtk );
            newDiv.data( 'maxAtk', maxAtk );
            char.div = newDiv;
            return char;
        }
    };
    game.characters.push( game.newCharacter( "Bob", 150, 'assets/images/bob.jpg', 10, 40 ) );
    game.characters.push( game.newCharacter( "joe", 150, 'assets/images/bob.jpg', 10, 40 ) );
    game.characters.push( game.newCharacter( "jim", 150, 'assets/images/bob.jpg', 10, 40 ) );
    game.characters.push( game.newCharacter( "tim", 150, 'assets/images/bob.jpg', 10, 40 ) );
    $.each( game.characters, function ( index, val ) {
        unselectedCharactersContainer.append( val.div );
    } );
    $( '.unselected-character' ).click( function () {
        $( this ).addClass( 'selected-character' );
        $( this ).removeClass( 'unselected-character' );
        activeBattleContainer.append( this );
        $( this ).off();
        $( '.unselected-character' ).off();
        $( '.unselected-character' ).each( function ( index, val ) {
            $( val ).addClass( 'unselected-enemy' );
            $( val ).removeClass( 'unselected-character' );
            unselectedEnemysContainer.append( val );
        } );
        $( '.unselected-enemy' ).click( function () {
            $( this ).addClass( 'selected-enemy' );
            $( this ).removeClass( 'unselected-enemy' );
            console.log( $( this ).data( 'name' ) );
            console.log( $( this ).data( 'hp' ) );
            console.log( $( this ).data( 'minAtk' ) );
            console.log( $( this ).data( 'maxAtk' ) );
            activeBattleContainer.append( this );
            $( this ).off();
            $( '.unselected-enemy' ).off();
        } );
    } );
} );