/*
 * TicTacToe
 */

$(function () {
    FastClick.attach(document.body);
});

$(document).ready(function () {     //Carica tutti gli oggetti in pagina tramite il selettore JQuery $

    var firstPlay = true;
    var enablePlay = false;
    var systemBusy = false;
    var availableCells = [];
    var busyCells = [];
    var interval = null;
    var moves = 1;

    //TIMER
    var timer = 30;                             //Timer = 30s, se l'utente non gioca entro 30s perde

    function startTimer() {
        interval = setInterval(function () {    //eseguo questa funzione ogni 1000ms = 1s
            timer--;                            //decremento il timer ogni 1000ms
            $('#timer').text('You now have ' + timer + ' seconds');
            if (timer == 0) {                   //Quando il timer arriva a 0s
                stopTimer();                    
                openModalSystemWin();           //vince il computer
            }
        }, 1000);
    }
    function stopTimer() {
        if (interval) {
            clearInterval(interval);            //Se esiste interval, viene stoppato
        }
    }

    for (var i = 1; i <= 9; i++) {              //Popolo l' array delle celle disponibili
        availableCells.push(i);
    }

    //RELOAD PAGE
    $('#reload').click(function () {            //Al click del pulsante
        window.location.reload();               //ricarica la pagina
    });

    $('#board td').click(function () {
        startTimer();
        enablePlay = true;
        $('#reload').fadeIn(500);

        //Se l'oggetto cliccato non ha la classe 'selected' e non sta a noi giocare
        if (!$(this).hasClass('selected') && !systemBusy && enablePlay) {

            var num = $(this).data('num');              //regola css a cui mi voglio agganciare, seleziono gli elementi in pagina
            $(this).addClass('circle');
            $(this).addClass('selected');

            checkWinner();                              //Richiamo la funzione checkWinner

            busyCells.push(num);                        //Popolo l'array delle celle occupare (aumenta di 1)
            var index = availableCells.indexOf(num);    //Tolgo un elemento dalle celle disponibili

            if (index > -1) {
                availableCells.splice(index, 1);        //1 indica quanti eliminarne partendo dalla posizione index

            }

            var win = checkWinner();                    //Controllo sulla vittoria
            if (!win) {                                 //Se non ho vinto gioca l'avversario
                systemBusy = true;
                setTimeout(function () {
                    systemPlay();                       //Gioca l'avversario
                    systemBusy = false;
                }, 200);                                //setTimeout: l'avversario gioca con 700ms di ritardo (il PC fa finta di pensare alla prossima mossa)              
            }

        } else if ($(this).hasClass('selected') && enablePlay) {
            console.error('Cell already clicked!');     //Stampa su console Cella già cliccata!
        }
        moves++;
    });

    //RANDOM CHOICE 
    function systemChooseRandomCell() {                 //Sceglie la cella in cui posizionarsi in modo casuale
        var index = Math.floor(Math.random() * (availableCells.length));
        var num = availableCells[index];
        return num;
    }

    //ROW BLOCKER
    function rowBlock(row) {
        var counterCircle = 0;
        var num = -1;
        for (var col = row; col < row + 3; col++) {     //Cicla le righe della tabella
            if ($('#cell-' + col).hasClass('circle')) { //Controlla se sulla riga è presente la classe 'circle'
                counterCircle++;                        //se è presente incrementa il contatore
            }
        }
        if (counterCircle == 2) {                       //Se in una riga ci sono due cerchi 
            var col = row;
            //Controlla le combinazioni possibili
            if ($('#cell-' + col).hasClass('circle') && $('#cell-' + (col + 1)).hasClass('circle') && !$('#cell-' + (col + 2)).hasClass('selected')) {
                return num = (col + 2);
            } else if ($('#cell-' + (col + 1)).hasClass('circle') && $('#cell-' + (col + 2)).hasClass('circle') && !$('#cell-' + col).hasClass('selected')) {
                return num = col;
            } else if (!$('#cell-' + (col + 1)).hasClass('selected')) {
                return num = (col + 1);
            }
        }
        return num;
    }
    //COLUMN BLOCKER
    function columnBlock(col) {
        var counterCircle = 0;
        var num = -1;
        for (var i = col; i < 10; i += 3) {
            if ($('#cell-' + i).hasClass('circle')) {
                counterCircle++;
            }
        }
        if (counterCircle == 2) {
            var i = col;
            //Controlla le combinazioni possibili
            if ($('#cell-' + i).hasClass('circle') && $('#cell-' + (i + 3)).hasClass('circle') && !$('#cell-' + (i + 6)).hasClass('selected')) {
                return num = (i + 6);
            } else if ($('#cell-' + (i + 3)).hasClass('circle') && $('#cell-' + (i + 6)).hasClass('circle') && !$('#cell-' + i).hasClass('selected')) {
                return num = i;
            } else if (!$('#cell-' + (i + 3)).hasClass('selected')) {
                return num = (i + 3);
            }
        }
        return num;
    }
    //MAIN DIAGONAL BLOCKER
    function diagBlockP(uno) {
        var counterCircle = 0;
        var num = -1;
        for (var i = uno; i < uno + 9; i += 4) {
            if ($('#cell-' + i).hasClass('circle')) {
                counterCircle++;
            }
        }
        if (counterCircle == 2) {
            var i = uno;
            //Controlla le combinazioni possibili
            if ($('#cell-' + i).hasClass('circle') && $('#cell-' + (i + 4)).hasClass('circle') && !$('#cell-' + (i + 8)).hasClass('selected')) {
                return num = (i + 8);
            } else if ($('#cell-' + (i + 4)).hasClass('circle') && $('#cell-' + (i + 8)).hasClass('circle') && !$('#cell-' + i).hasClass('selected')) {
                return num = i;
            } else if (!$('#cell-' + (i + 4)).hasClass('selected')) {
                return num = (i + 4);
            }
        }
        return num;
    }
    //SECONDARY DIAGONAL BLOCKER
    function diagBlockS(tre) {
        var counterCircle = 0;
        var num = -1;
        for (var i = tre; i < tre + 5; i += 2) {
            if ($('#cell-' + i).hasClass('circle')) {
                counterCircle++;
            }
        }
        if (counterCircle == 2) {
            var i = tre;
            //Controlla le combinazioni possibili
            if ($('#cell-' + i).hasClass('circle') && $('#cell-' + (i + 2)).hasClass('circle') && !$('#cell-' + (i + 4)).hasClass('selected')) {
                return num = (i + 4);
            } else if ($('#cell-' + (i + 2)).hasClass('circle') && $('#cell-' + (i + 4)).hasClass('circle') && !$('#cell-' + i).hasClass('selected')) {
                return num = i;
            } else if (!$('#cell-' + (i + 2)).hasClass('selected')) {
                return num = (i + 2);
            }
        }
        return num;
    }
    //SYSTEM BLOCK
    function systemBlockRow() {
        var num = rowBlock(1);
        if (num == -1) {
            num = rowBlock(4);
        }
        if (num == -1) {
            num = rowBlock(7);
        }
        return num;
    }
    function systemBlockColumn() {
        var num = columnBlock(1);
        if (num == -1) {
            num = columnBlock(2);
        }
        if (num == -1) {
            num = columnBlock(3);
        }
        return num;
    }
    function systemBlockDiag() {
        var num = diagBlockP(1);
        if (num == -1) {
            num = diagBlockS(3);
        }
        return num;
    }

    //WINNING IN ROW
    function winningRow(row) {
        var counterCross = 0;
        var num = -1;
        for (var col = row; col < row + 3; col++) {
            if ($('#cell-' + col).hasClass('cross')) {
                counterCross++;
            }
        }
        if (counterCross == 2) {
            var col = row;
            //Controlla le combinazioni possibili
            if ($('#cell-' + col).hasClass('cross') && $('#cell-' + (col + 1)).hasClass('cross') && !$('#cell-' + (col + 2)).hasClass('selected')) {
                return num = (col + 2);
            } else if ($('#cell-' + (col + 1)).hasClass('cross') && $('#cell-' + (col + 2)).hasClass('cross') && !$('#cell-' + col).hasClass('selected')) {
                return num = col;
            } else if (!$('#cell-' + (col + 1)).hasClass('selected')) {
                return num = (col + 1);
            }
        }
        return num;
    }
    //WINNING IN COLUMN
    function winningColumn(col) {
        var counterCross = 0;
        var num = -1;
        for (var i = col; i < 10; i += 3) {
            if ($('#cell-' + i).hasClass('cross')) {
                counterCross++;
            }
        }
        if (counterCross == 2) {
            var i = col;
            //Controlla le combinazioni possibili
            if ($('#cell-' + i).hasClass('cross') && $('#cell-' + (i + 3)).hasClass('cross') && !$('#cell-' + (i + 6)).hasClass('selected')) {
                return num = (i + 6);
            } else if ($('#cell-' + (i + 3)).hasClass('cross') && $('#cell-' + (i + 6)).hasClass('cross') && !$('#cell-' + i).hasClass('selected')) {
                return num = i;
            } else if (!$('#cell-' + (i + 3)).hasClass('selected')) {
                return num = (i + 3);
            }
        }
        return num;
    }
    //WINNING IN MAIN DIAGONAL
    function winningDiagP(uno) {
        var counterCross = 0;
        var num = -1;
        for (var i = uno; i < uno + 9; i += 4) {
            if ($('#cell-' + i).hasClass('cross')) {
                counterCross++;
            }
        }
        if (counterCross == 2) {
            var i = uno;
            //Controlla le combinazioni possibili
            if ($('#cell-' + i).hasClass('cross') && $('#cell-' + (i + 4)).hasClass('cross') && !$('#cell-' + (i + 8)).hasClass('selected')) {
                return num = (i + 8);
            } else if ($('#cell-' + (i + 4)).hasClass('cross') && $('#cell-' + (i + 8)).hasClass('cross') && !$('#cell-' + i).hasClass('selected')) {
                return num = i;
            } else if (!$('#cell-' + (i + 4)).hasClass('selected')) {
                return num = (i + 4);
            }
        }
        return num;
    }
    //WINNING IN SECONDARY DIAGONAL
    function winningDiagS(tre) {
        var counterCross = 0;
        var num = -1;
        for (var i = tre; i < tre + 5; i += 2) {
            if ($('#cell-' + i).hasClass('cross')) {
                counterCross++;
            }
        }
        if (counterCross == 2) {
            var i = tre;
            //Controlla le combinazioni possibili
            if ($('#cell-' + i).hasClass('cross') && $('#cell-' + (i + 2)).hasClass('cross') && !$('#cell-' + (i + 4)).hasClass('selected')) {
                return num = (i + 4);
            } else if ($('#cell-' + (i + 2)).hasClass('cross') && $('#cell-' + (i + 4)).hasClass('cross') && !$('#cell-' + i).hasClass('selected')) {
                return num = i;
            } else if (!$('#cell-' + (i + 2)).hasClass('selected')) {
                return num = (i + 2);
            }
        }
        return num;
    }
    //SYSTEM WINNING
    function systemWinningRow() {
        var num = winningRow(1);
        if (num == -1) {
            num = winningRow(4);
        }
        if (num == -1) {
            num = winningRow(7);
        }
        return num;
    }
    function systemWinningColumn() {
        var num = winningColumn(1);
        if (num == -1) {
            num = winningColumn(2);
        }
        if (num == -1) {
            num = winningColumn(3);
        }
        return num;
    }
    function systemWinningDiag() {
        var num = winningDiagP(1);
        if (num == -1) {
            num = winningDiagS(3);
        }
        return num;
    }
    //WINNING CHOICE
    function winning() {
        var num = systemWinningRow();
        if (num == -1) {
            num = systemWinningColumn();
        }
        if (num == -1) {
            num = systemWinningDiag();
        }
        return num;
    }
    function systemChooseWinningCell() {
        var num = -1;
        if (firstPlay) {                    //Se è la prima mossa
            num = systemChooseRandomCell(); //sceglie la cella in cui posizionarsi in modo casuale
        }
        //SYSTEM CHOSE CENTER CELL
        if (firstPlay && !$('#cell-' + 5).hasClass('circle') && !$('#cell-' + 5).hasClass('selected')) {
            return num = 5;
        }
        while (num == -1) {
            num = winning();
            if (num == -1) {
                num = systemBlockRow();
            }
            if (num == -1) {
                num = systemBlockColumn();
            }
            if (num == -1) {
                num = systemBlockDiag();
            }
            if (num == -1) {
                num = systemChooseRandomCell();
            }
        }
        return num;
    }

    //SYSTEM PLAY
    function systemPlay() {
        if (availableCells.length > 0) {            //Se ci sono ancora celle disponibili, l'avversario (il PC) gioca
            var num = systemChooseWinningCell();
            $('#cell-' + num).addClass('cross');
            $('#cell-' + num).addClass('selected');

            index = availableCells.indexOf(num);    //Tolgo un elemento dalle celle disponibili
            if (index > -1) {
                availableCells.splice(index, 1);    //1 indica quanti eliminarne partendo dalla posizione index
            }
            busyCells.push(num);                    //Popolo l'array delle celle occupare (aumenta di 1)
            checkWinner();                          //Controllo se qualcuno ha vinto
        }
        firstPlay = false;
    }

    //CHECK WINNER
    function checkWinner() {
        var win = checkWinnerRow(1);
        if (!win) {
            win = checkWinnerRow(4);
        }
        if (!win) {
            win = checkWinnerRow(7);
        }
        if (!win) {
            win = checkWinnerColumn(1);
        }
        if (!win) {
            win = checkWinnerColumn(2);
        }
        if (!win) {
            win = checkWinnerColumn(3);
        }
        if (!win) {
            win = checkWinnerDiagonalP(1);
        }
        if (!win) {
            win = checkWinnerDiagonalS(3);
        }
        return win;
    }
    //CHECK WINNER IN ROW
    function checkWinnerRow(row) {
        var counterCircle = 0;                                  //Contatore cerchi inizializzato a zero
        var counterCross = 0;                                   //Contatore croce inizializzato a zero
        for (var col = row; col <= row + 2; col++) {            //Cicla le righe della tabella
            if ($('#cell-' + col).hasClass('circle')) {         //Controlla quanti sono i cerchi
                counterCircle++;                                //Incrementa contatore cerchi
            } else if ($('#cell-' + col).hasClass('cross')) {   //Controlla quante sono le croci
                counterCross++;                                 //Incrementa contatori croci
            }
        }
        var win = false;                                        //Variabile booleana
        if (counterCircle == 3) {                               //Se il contatore cerchi è 3 
            openModalPlayerWin();                               //allora il cerchio ha vinto
            win = true;                                         //quindi la variabile booleana va a true
        } else if (counterCross == 3) {                         //Se il contatore croce è 3 
            openModalSystemWin();                               //allora la croce ha vinto
            win = true;                                         //quindi la variabile booleana va a true
        } else if (availableCells == 0) {                       //Se non ci sono celle disponibili
            openModalTie();                                     //è un pareggio e la variabile booleana resta a false
        }
        return win;                                             //Restituisce il valore della variabile booleana
    }
    //CHECK WINNER IN COLUMN
    function checkWinnerColumn(col) {
        var counterCircle = 0;
        var counterCross = 0;
        for (var row = col; row <= 9; row += 3) {
            if ($('#cell-' + row).hasClass('circle')) {
                counterCircle++;
            } else if ($('#cell-' + row).hasClass('cross')) {
                counterCross++;
            }
        }
        var win = false;
        if (counterCircle == 3) {
            openModalPlayerWin();
            win = true;
        } else if (counterCross == 3) {
            openModalSystemWin();
            win = true;
        } else if (availableCells == 0) {
            openModalTie();
        }
        return win;
    }
    //CHECK WINNER IN DIAGONAL1
    function checkWinnerDiagonalP(diag) {
        var counterCircle = 0;
        var counterCross = 0;
        for (var i = diag; i < diag + 9; i += 4) {
            if ($('#cell-' + i).hasClass('circle')) {
                counterCircle++;
            } else if ($('#cell-' + i).hasClass('cross')) {
                counterCross++;
            }
        }
        var win = false;
        if (counterCircle == 3) {
            openModalPlayerWin();
            win = true;
        } else if (counterCross == 3) {
            openModalSystemWin();
            win = true;
        } else if (availableCells == 0) {
            openModalTie();
        }
        return win;
    }
    //CHECK WINNER IN DIAGONAL2
    function checkWinnerDiagonalS(diag) {
        var counterCircle = 0;
        var counterCross = 0;
        for (var i = diag; i < diag + 5; i += 2) {
            if ($('#cell-' + i).hasClass('circle')) {
                counterCircle++;
            } else if ($('#cell-' + i).hasClass('cross')) {
                counterCross++;
            }
        }
        var win = false;
        if (counterCircle == 3) {
            openModalPlayerWin();
            win = true;
        } else if (counterCross == 3) {
            openModalSystemWin();
            win = true;
        } else if (availableCells == 0) {
            openModalTie();
        }
        return win;
    }

    // Modals
    var modal = document.querySelector('.modal');

    $('#restart').click(function () {
        window.location.reload();
    });

    function openModalPlayerWin() {
        enablePlay = false;
        $('#message').addClass('success');
        $('#message').text('Congratulations!!');
        $('#timer').hide();
        $('#moves').text('You won in ' + moves + ' moves and ');
        $('#end-time').text(30-timer + ' seconds!');
        $('#reload').hide();
        stopTimer();
        modal.style.display = 'block';
    }
    function openModalTie() {
        enablePlay = false;
        $('#message').addClass('tie');
        $('#message').text("It's a tie");
        $('#p').hide();
        $('#timer').hide();
        $('#reload').hide();
        stopTimer();
        modal.style.display = 'block';
    }
    function openModalSystemWin() {
        moves--;
        enablePlay = false;
        $('#message').addClass('failure');
        $('#message').text('I\'m sorry...');
        $('#timer').hide();
        $('#moves').text('You lost in ' + moves + ' moves and ');
        $('#end-time').text(30-timer + ' seconds!');
        $('#reload').hide();
        stopTimer();
        modal.style.display = 'block';
    }

    var close = document.querySelector('.close-modal');    
    close.addEventListener('click', closeModal);
    function closeModal() {
        modal.style.display = 'none';
    }

});
