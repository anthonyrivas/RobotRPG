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
            h3.text(name);
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
            hpDisplay.text('HP: ' + hp);
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
            $('.unselected-enemy').click(function () {
                $('.unselected-enemy').off();
                $(this).data('minAtk', $(this).data('minAtk') / 2);
                $(this).data('mmaxAtk', $(this).data('maxAtk') / 2);
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
                    $('.defend-button').on('click', game.defend);
                }
                game.domContainers.activeBattleContainer.append(this);
            });
        },
        attack: function () {
            var char = $('.selected-character')
            var enemy = $('.selected-enemy')
            var charAtk = Math.floor(Math.random() * (char.data('maxAtk') - char.data('minAtk') + 1) + char.data('minAtk'));
            var enemyAtk = Math.floor(Math.random() * (enemy.data('maxAtk') - enemy.data('minAtk') + 1) + enemy.data('minAtk'));
            game.updateHp(enemy, charAtk);
            game.updateHp(char, enemyAtk);
        },
        defend: function () {
            var char = $('.selected-character');
            var enemy = $('.selected-enemy');
            var charAtk = Math.floor(Math.random() * (char.data('maxAtk') - char.data('minAtk') + 1) + char.data('minAtk') / 2);
            enemy.data('maxAtk', Math.floor(enemy.data('maxAtk') * .9));
            if (enemy.data('maxAtk') <= enemy.data('minAtk')) {
                enemy.data('maxAtk', enemy.data('minAtk') + 5);
            }
            var enemyAtk = Math.floor(Math.random() * (enemy.data('maxAtk') - enemy.data('minAtk') + 1) + enemy.data('minAtk'));
            game.updateHp(enemy, charAtk);
            game.updateHp(char, enemyAtk);
        },
        updateHp: function (char, atk) {
            $(char).data('hp', $(char).data('hp') - atk);
            if ($(char).data('hp') < 0) {
                $(char).data('hp', 0);
            }
            $(char).find('.hp-display').text('HP: ' + $(char).data('hp'));
            if ($(char).data('hp') === 0) {
                game.death(char);
            }
        },
        death: function (char) {
            $('.combat-controls').remove();
            $(char).remove();
            if ($('.selected-character').length == 0) {
                $('.game').html("<div class='death-message'>You have died, refresh the page to try again!</div>")
            } else {
                game.chooseEnemy();
            }
        }
    };
    game.characters.push(game.createCharacter("Gundam", 150, 'assets/images/gundam.png', 10, 40));
    game.characters.push(game.createCharacter("Voltron", 150, 'assets/images/voltron.png', 10, 40));
    game.characters.push(game.createCharacter("Wall-e", 150, 'assets/images/walle.png', 10, 40));
    game.characters.push(game.createCharacter("Zoids", 150, 'assets/images/zoid.jpg', 10, 40));
    $.each(game.characters, function (index, val) {
        game.domContainers.unselectedCharactersContainer.append(val.div);
    });
    game.chooseCharacter();
});