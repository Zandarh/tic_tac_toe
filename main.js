function gameBoard(){

    const gameBoard = {
    
        board: []
    }
    const row = 3;
    const column = 3;
    createBoard();

    function createBoard(){
        for (let i = 0; i < row; i++){
            gameBoard.board[i] = [];
            for(let j = 0; j < column; j++){
                gameBoard.board[i].push('-');
                }
            }
        }

        function render(){
            console.table(gameBoard.board);
            
        }
        function checkCell(row, column){
            if(gameBoard.board[row][column] == '-'){
                return true;
            }
            else{
                return false;
            }
        }

        function addPlayerMarker(player, row, column){
            gameBoard.board[row][column] = player.marker;
        }

        function checkForWin(){
            const board = gameBoard.board;
            for (let i = 0, j= 0; i < row; i++){
                if (board[i][j] == board[i][j+1]){
                    if(board[i][j] == board[i][j+2])
                        return(board[i][j]);
                }
            }
            for (let i = 0, j = 0; j < column; j++){
                if(board[i][j] == board[i+1][j]){
                    if(board[i][j] == board[i+2][j])
                        return(board[i][j]);
                }
            }
            for (let i = 0, j = 0; i < row; i++){
                if(board[i][j] == board[i+1][j+1]){
                    if(board[i][j] = board[i+2][j+2]){
                        console.log(board[i][j]);
                        return(board[i][j]);
                    }
                }
                else if(board[i][j+2] == board[i+1][j+1]){
                    if(board[i][j+2] == board[i+2][j]){
                        console.log(board[i][j]);
                        return(board[i][j+2]);
                    }
                }
                break;
            }
        }
        function resetBoard(){
            createBoard();
        }
    return{checkCell, addPlayerMarker, render, checkForWin, resetBoard}
}
function player(name, marker){
    let score = 0;
    return{name, marker, score}

}
function GameControl(){
    // const game = gameBoard();

    //Empty player objects
    let player1 = {};
    let player2 = {};
    activePlayer = {};
    

    // Gets the dom nodes
    const computer = document.querySelector('#computer');
    const friends = document.querySelector('#friends');
    const dialogFriends = document.querySelector('#dialogFriends');
    const dialogComputer = document.querySelector('#dialogComputer');
    const btnFriendsForm = document.querySelector('#friends-form');
    const btnComputerForm = document.querySelector('#computer-form');
    const computerRadio = document.getElementsByName('marker');
    const modes = document.querySelector('#choice');
    const gamediv = document.querySelector('#thegame');
    const cells = document.querySelectorAll('.cells');
    const firstPlayerName = document.querySelector('.player1Name');
    const firstPlayerScore = document.querySelector('.player1Score');
    const secondPlayerName = document.querySelector('.player2Name');
    const secondPlayerScore = document.querySelector('.player2Score');

    

    bindEvents();

    // Binds Event
    function bindEvents(){
        computer.addEventListener('click', openComputerDialog);
        friends.addEventListener('click', openFriendsDialog);
        btnFriendsForm.addEventListener('submit', getPlayerDetails);
        btnComputerForm.addEventListener('submit', getPlayerDetails)
        cells.forEach(cell => {
            cell.addEventListener('click', showMarker)
        });
    }

    function openComputerDialog(){
        dialogComputer.showModal();
    }

    function openFriendsDialog(){
        dialogFriends.showModal();
    }
    function closeFriendsDialog(){
        dialogFriends.close();
    }
    function closeComputerDailog(){
        dialogComputer.close();
    }

    function showMarker(e){
        const currentPlayer = getActivePlayer();
        console.log(player1);
        console.log(player2);
        e.target.textContent = currentPlayer.marker;
        switchActivePlayer();

    }
    //get player details
    function getPlayerDetails(e){
        e.preventDefault();

        if(e.target.id == "computer-form"){
            const name = e.target.firstElementChild.nextElementSibling.value
            const marker = getRadioInputValue();
            player1 = player(name, marker);

            if(marker == "X"){
                player2 = player("computer", "O");
            }
            else{
                player2 = player("computer", "X");
            } 
        }
        else{                 
                const player1Name = e.target.firstElementChild.nextElementSibling.value;
                const player2Name = e.target.lastElementChild.previousElementSibling.value;
                const marker = getRadioInputValue();
                
                if(marker == "X"){
                    player2 = player(player2Name, "O");
                    player1 = player(player1Name, marker);
                }
                else{
                    player2 = player(player2Name, "X")
                    player1 = player(player1Name, marker);

                }
            }
        modes.setAttribute("style", "display: none");
        gamediv.setAttribute("style", "display: grid");
        closeFriendsDialog();
        closeComputerDailog();
        
        // Setting the activePlayer object
        activePlayer = player1;

        displayplayerDetails();       
    }

   

    //Getting the player markers from the form
    function getRadioInputValue(){
        for(let i = 0; i < computerRadio.length; i++){
            if(computerRadio[i].checked)
                return computerRadio[i].value;
        }
    }
    //switches between players
    function switchActivePlayer(){
        if (activePlayer == player1){
            activePlayer = player2;
        }else{
            activePlayer = player1;
        }
    }

   function getActivePlayer(){
    return activePlayer;
    }

    function displayplayerDetails(){
        console.log(player1);
        console.log(player2.name);
        //display for player 1
        firstPlayerName.textContent = player1.name;
        firstPlayerScore.textContent = `Score: ${player1.score}`;

        secondPlayerName.textContent = player2.name;
        secondPlayerScore.textContent = `Score: ${player2.score}`;
    }

    // function declareWinner(winStat){
    //     if(winStat){
    //         if(winStat == 'X'){
    //             console.log(`${player1.name} wins`);
    //             player[0].score++;
    //             game.resetBoard();
    //         }
    //         else if (winStat == 'O') {
    //             console.log(`${player2.name} wins`);
    //             player[1].score++;
    //             game.resetBoard();
    //         }
    //         console.log(`${playe1.name} score:  ${player1.score}`)
    //         console.log(`${player2.name} score:  ${player2.score}`)
    //     }
    //     else{
    //         console.log('Tie');
    //         console.log(`${player1.name} score:  ${player1.score}`)
    //         console.log(`${player2.name} score:  ${player2.score}`)
    //         game.resetBoard;
    //     }
    // }

//    function playRound(){
//     const {row, column} = getPlayerChoice();
//     const emptycell = game.checkCell(row, column);
    
//     if (emptycell){
//         game.addPlayerMarker(activePlayer, row, column);
//         console.log(`dropping ${activePlayer.name}'s marker in row: ${row} and column: ${column}`);
//         const winStat = game.checkForWin();
//         declareWinner(winStat);
            

//         switchActivePlayer();
//         printNewRound();
//     }
//     else{
//         console.log(`Cell already taken, play again`);
//         playRound();
//     }
//    }
//    return{
//     playRound
//    }
   

}

const theGame = GameControl();
