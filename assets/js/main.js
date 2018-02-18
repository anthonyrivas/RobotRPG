var game;
$(document).ready(function () {
    game = {
        characters: [],
        domContainers: {
            unselectedCharactersContainer: $('.characters'),
            unselectedEnemysContainer: $('.enemy-characters'),
            activeBattleContainer: $('.active-battle')
        },
        createCharacter: function (name, hp, src, minAtk, maxAtk) {
            var char = {
                "name": name,
                "hp": hp,
                "src": src,
                "minimumAttack": minAtk,
                "maximumAttack": maxAtk,
                "div": null
            };
            var newDiv = $('<div></div>');
            newDiv.addClass('unselected-character character col-2 p-3 m-3');
            var h3 = $('<h3>');
            h3.text(char.name);
            newDiv.append(h3);
            var img = $('<img/>');
            img.attr('class', 'img-fluid character-image');
            img.attr('src', src);
            newDiv.append(img);
            newDiv.data('name', name);
            newDiv.data('hp', hp);
            newDiv.data('minAtk', minAtk);
            newDiv.data('maxAtk', maxAtk);
            var hpDisplay = $('<div>');
            hpDisplay.attr('class', 'hp-display');
            hpDisplay.text('HP: ' + char.hp);
            newDiv.append(hpDisplay);
            char.div = newDiv;
            return char;
        },
        chooseCharacter: function () {
            $('.unselected-character').click(function () {
                $('.unselected-character').off();
                $(this).addClass('selected-character');
                $(this).removeClass('unselected-character');
                game.domContainers.activeBattleContainer.append(this);
                $('.unselected-character').each(function (index, val) {
                    $(val).addClass('unselected-enemy');
                    $(val).removeClass('unselected-character');
                    game.domContainers.unselectedEnemysContainer.append(val);
                });
                $('.enemy-characters').removeClass('hidden');
                $('.active-battle').removeClass('hidden');
                $('.characters').addClass('hidden');
                game.chooseEnemy();

            });
        },
        chooseEnemy: function () {
            $('.selected-enemy').remove();
            $('.unselected-enemy').click(function () {
                $('.unselected-enemy').off();
                $(this).addClass('selected-enemy');
                $(this).removeClass('unselected-enemy');
                if ($('.combat-controls').length === 0) {
                    var controls = $('<div>');
                    controls.attr('class', 'combat-controls col-2 p-3 m-3');
                    var atkBtn = $('<div>');
                    atkBtn.attr('class', 'attack-button btn btn-outline-primary mt-3');
                    atkBtn.text('Attack');
                    var defBtn = $('<div>');
                    defBtn.attr('class', 'defend-button btn btn-outline-primary mt-3');
                    defBtn.text('Defend');
                    controls.append(atkBtn, defBtn);
                    game.domContainers.activeBattleContainer.append(controls);
                    $('.attack-button').on('click', game.attack);
                }
                game.domContainers.activeBattleContainer.append(this);
            });
        },
        attack: function () {
            var char = $('.selected-character')
            var enemy = $('.selected-enemy')
            var charAtk = Math.floor(Math.random() * (char.data('maxAtk') - char.data('minAtk') + 1) + char.data('minAtk'));
            var enemyAtk = Math.floor(Math.random() * (enemy.data('maxAtk') - enemy.data('minAtk') + 1) + enemy.data('minAtk'));
            enemy.data('hp', enemy.data('hp') - charAtk);
            char.data('hp', char.data('hp') - enemyAtk);
            $('.selected-character .hp-display').text('HP: ' + char.data('hp'));
            $('.selected-enemy .hp-display').text('HP: ' + enemy.data('hp'));
        },
        defend: function () {

        },
        checkDeath: function (char) {

        }
    };
    game.characters.push(game.createCharacter("Gundam", 150, 'assets/images/gundam.png', 1, 40));
    game.characters.push(game.createCharacter("Voltron", 150, 'assets/images/voltron.png', 10, 40));
    game.characters.push(game.createCharacter("Wall-e", 150, 'assets/images/walle.png', 10, 40));
    game.characters.push(game.createCharacter("Zoids", 150, 'assets/images/zoid.jpg', 10, 40));
    $.each(game.characters, function (index, val) {
        game.domContainers.unselectedCharactersContainer.append(val.div);
    });
    game.chooseCharacter();
});