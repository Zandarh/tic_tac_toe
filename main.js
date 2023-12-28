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
    function fillBoard(marker, row, column){
        if(gameBoard.board[row][column] == '-')
            gameBoard.board[row][column] = marker;

    }

    function checkForWin(){
        const board = gameBoard.board;
        for (let i = 0, j= 0; i < row; i++){
            if (board[i][j] == board[i][j+1]){
                if(board[i][j] == board[i][j+2]){
                    if(board[i][j] == 'X' || board[i][j] == 'O')
                        return(board[i][j]);
                }
            }
        }
        for (let i = 0, j = 0; j < column; j++){
            if(board[i][j] == board[i+1][j]){
                if(board[i][j] == board[i+2][j]){
                    if(board[i][j] == 'X' || board[i][j] == 'O')
                        return(board[i][j]);
                }
            }
        }
        for (let i = 0, j = 0; i < row; i++){
            if(board[i+2][j] == board[i+1][j+1]){
                if(board[i+2][j] == board[i][j+2]){
                    if(board[i][j+2] == 'X' || board[i][j+2] == 'O')
                        return(board[i][j+2]);
                }
            }
            
            else if(board[i][j] == board[i+1][j+1]){
                if(board[i][j] == board[i+2][j+2]){
                    if(board[i][j] == 'X' || board[i][j] == 'O')
                        return(board[i][j]);
                }
            }
            break;
            }
        }
        function resetBoard(){
            createBoard();
        }
    return{fillBoard, checkForWin, resetBoard, gameBoard}
}
function player(name, marker){
    let score = 0;
    return{name, marker, score}

}
function GameControl(){
    const game = gameBoard();

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
        if(!e.target.textContent && currentPlayer.name != "computer"){
            e.target.textContent = currentPlayer.marker;
            getcellId(e)
            switchActivePlayer();
            computerPlay(e);
        }
        else{
            computerPlay(e);
        }
    }

    function getcellId(e){
        const cellId = e.target.id;
        const array = cellId.split('');
        const row = array[0];
        const column = array[1];

        const marker = activePlayer.marker;
        game.fillBoard(marker, row, column);
        const winStat = game.checkForWin();
        declareWinner(winStat);
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
        //display for player 1
        firstPlayerName.textContent = player1.name;
        firstPlayerScore.textContent = `Score: ${player1.score}`;

        secondPlayerName.textContent = player2.name;
        secondPlayerScore.textContent = `Score: ${player2.score}`;
    }

    function declareWinner(winStat){
        if(winStat){
            if(winStat == 'X'){
                if(player1.marker == 'X'){
                    console.log(`${player1.name} wins`);
                    player1.score++;
                    displayplayerDetails()
                    game.resetBoard();
                    resetUiScreen();
                }
                else{
                    console.log(`${player2.name} wins`);
                    player1.score++;
                    displayplayerDetails()
                    game.resetBoard();
                    resetUiScreen();
                }
                
            }
            else if (winStat == 'O') {
                if(player1.marker == "O"){
                    console.log(`${player1.name} wins`);
                    player1.score++;
                    displayplayerDetails()
                    game.resetBoard();
                    resetUiScreen();
                }
                else{
                    console.log(`${player2.name} wins`)
                    player2.score++;
                    displayplayerDetails()
                    game.resetBoard();
                    resetUiScreen();
                }
            }
        }
    }
    function resetUiScreen(){
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
    function computerPlay(e){
        if(activePlayer.name == "computer"){
            
            const available = [];
            for (let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(game.gameBoard.board[i][j] == '-'){
                        available.push({i, j})
                    }
                }
            }
            console.log(available.length);
            let move = random(available);
            const string = String(move.i) + String(move.j);
            cells.forEach(cell => {
                if(cell.id == string){
                    cell.textContent = activePlayer.marker
                }
            });
            const marker = activePlayer.marker;
            game.fillBoard(marker, move.i, move.j);
            const winStat = game.checkForWin();
            declareWinner(winStat);
            switchActivePlayer();
        }
    }
    function random(array){
        const arrayLenght = array.length;
        let randomSelect = Math.floor(Math.random( )* arrayLenght);
        return array[randomSelect];
    }
}

const theGame = GameControl();
