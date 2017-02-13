/***************************************************
 * bke.js
 * -------------------------------------------------
 * In dit bestand staat alle javascript code
 * om ons spel te laten werken.
 *
 **************************************************/

/********************
Globale Variabelen
 *******************/

// CONSTANTEN
var GAME_BUTTON_ELEMENT = document.getElementsByClassName('game-button')[0];
var GAME_FIELD_ELEMENT = document.getElementById('speelveld').getElementsByTagName('img');

var SCORE_PLAYER1_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[1];
var SCORE_PLAYER2_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[3];

var CURRENT_ROUND_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[5];
var TURN_PLAYERIMAGE_ELEMENT = document.getElementsByClassName('players-turn')[0]
    .getElementsByTagName('img')[0];
var TURN_PLAYERNUMBER_ELEMENT = document.getElementsByClassName('players-turn')[0]
    .getElementsByTagName('td')[2];

var PLAYER_IMAGES = [ 'img/empty.jpg', 'img/cross.jpg', 'img/circle.jpg'];
//                          index 0         index 1            index 2

//variables
var score_player1 = 0;
var score_player2 = 0;
var current_round = 0;
var player_turn = 0;

// Initialisatie - wat er moet gebeuren om te spelen, gebeurt als de pagina geladen wordt
window.onload = function() {
    // 1. button klikbaar maken
    GAME_BUTTON_ELEMENT.onclick = buttonClickHandler;

    // 2. scores resetten
    score_player1 = 0;
    score_player2 = 0;
    current_round = 0;

    // 3. beurt bepalen
    player_turn = Math.round(Math.random() + 1);
    TURN_PLAYERNUMBER_ELEMENT.innerHTML = player_turn;
    TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[player_turn];

    // 4. speelveld resetten
    clearGameField();

}; //EINDE initialisatie


//function clearGameField - maakt het speelveld leeg
function clearGameField() {
    for (var celnum = 0; celnum < 9; celnum++) {
        GAME_FIELD_ELEMENT[celnum].src = PLAYER_IMAGES[0];
    }
}  //EINDE clearGameField


/*
 buttonClickHandler
 Deze functie wordt steeds gestart/aangeroepen op het moment
 dat er op de button geklikt wordt, en handelt alles af wat
 nodig is na een klik.
 */
function buttonClickHandler() {

    //knop veranderen in 'reset ronde', +1 ronde, speelveld leegmaken, speelveld klikbaar maken.
    if(GAME_BUTTON_ELEMENT.innerHTML == 'Start spel'){

        GAME_BUTTON_ELEMENT.innerHTML = "Reset ronde";
        clearGameField();
        current_round = current_round +1;
        CURRENT_ROUND_ELEMENT.innerHTML = current_round;
        for (var celnum = 0; celnum < 9; celnum++) {
            GAME_FIELD_ELEMENT[celnum].onclick = cellClickHandler;
        }
    }
    else {
        //knop veranderen in 'start spel', speelveld leegmaken, geen ronde optellen, speelveld onklikbaar maken
        GAME_BUTTON_ELEMENT.innerHTML = 'Start spel';
        clearGameField();
        current_round = current_round -1;
        CURRENT_ROUND_ELEMENT.innerHTML = current_round;
        for (celnum = 0; celnum < 9; celnum++) {
            GAME_FIELD_ELEMENT[celnum].onclick = killEvent;
        }
    }
}   // EINDE FUNCTION buttonClickHandler


//function: killEvent - deze functie maakt het speelveld onklikbaar
function killEvent(evt) {
    evt = evt || window.event;
    if (evt.preventDefault) {
        evt.preventDefault();
    }
}  //EINDE function killEvent


//function: cellClickHandler - plaatje huidige speler tonen, winnaar checken, beurt doorgeven.
function cellClickHandler(event_info) {
    if(event_info.target.src.search('empty') > -1){

        //1. plaatje van huidige speler tonen
        event_info.target.src = PLAYER_IMAGES[player_turn];

        //2. checken of iemand gewonnen heeft, of een gelijkspel
        if(checkWinner(1)){
            score_player1 ++;
            current_round ++;
            SCORE_PLAYER1_ELEMENT.innerHTML = score_player1;
            CURRENT_ROUND_ELEMENT.innerHTML = current_round;
            setTimeout("alert('speler 1 wint')", 10);
            setTimeout("clearGameField()", 200);
        }

        if(checkWinner(2)){
            score_player2 ++;
            current_round ++;
            SCORE_PLAYER2_ELEMENT.innerHTML = score_player2;
            CURRENT_ROUND_ELEMENT.innerHTML = current_round;
            setTimeout("alert('speler 2 wint')", 10);
            setTimeout("clearGameField()", 200);
        }

        if(draw()){
            setTimeout("alert('Gelijkspel')", 10);
            setTimeout("clearGameField()", 200);
        }

        //3. beurt doorgeven
        if(player_turn == 1){
            player_turn = 2;
        }
        else{
            player_turn = 1;
        }

        TURN_PLAYERNUMBER_ELEMENT.innerHTML = player_turn;
        TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[player_turn];

    }

}  //EINDE function cellClickHandler


//function: checkWinner - deze functie kijkt op het speelveld of iemand drie op een rij heeft
function checkWinner(player_num) {

    //rij 1 - 0, 1, 2
    if(GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //rij 2 - 3, 4, 5
    if(GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //rij 3 - 6, 7, 8
    if(GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //verticale rij 1 - 0, 3, 6
    if(GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //verticale rij 2 - 1, 4, 7
    if(GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //verticale rij 3 - 2, 5, 8
    if(GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //diagonale rij 1 - 0, 4,8
    if(GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;

    //diagonale rij 2 - 2, 4,6
    if(GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
            GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[player_num]) > -1 )
                return true;
    return false;
}  //EINDE function checkWinner


//function: draw - bepaalt of er een gelijkspel is
function draw() {
    var return_value = true;

    for (celnum = 0; celnum < 9; celnum++) {
        if (GAME_FIELD_ELEMENT[celnum].src.search(PLAYER_IMAGES[0]) > -1) {
            return_value = false;
            break;
        }
    }
    return return_value;
}  //EINDE function draw