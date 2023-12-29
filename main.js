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
    let round = "open";
    

    // Gets the dom nodes
    const computer = document.querySelector('#computer');
    const friends = document.querySelector('#friends');
    const dialogFriends = document.querySelector('#dialogFriends');
    const dialogComputer = document.querySelector('#dialogComputer');
    const btnFriendsForm = document.querySelector('#friends-form');
    const btnComputerForm = document.querySelector('#computer-form');
    const friendSelctedMarker = document.querySelector('#friendmarker');
    const computerSelctedMarker = document.querySelector('#computermarker');
    const modes = document.querySelector('#choice');
    const gamediv = document.querySelector('#thegame');
    const cells = document.querySelectorAll('.cells');
    const firstPlayerName = document.querySelector('.player1Name');
    const firstPlayerScore = document.querySelector('.player1Score');
    const secondPlayerName = document.querySelector('.player2Name');
    const secondPlayerScore = document.querySelector('.player2Score');
    const scoreDiv = document.querySelector('.scores');
    const scoreRestart = document.querySelector('.score-restart');
    const nextRound = document.querySelector('.next-round');
    const refreshPage = document.querySelector('.page-refresh');

    

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
        scoreRestart.addEventListener('click', restartGame);
        nextRound.addEventListener('click', startNextRound);
        refreshPage.addEventListener('click', restartGame);
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
        if(!e.target.textContent && currentPlayer.name != "Computer"){
            e.target.textContent = currentPlayer.marker;
            getcellId(e)
            switchActivePlayer();
            computerPlay(e);
        }
        else{
            computerPlay();
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
            let name = e.target.firstElementChild.nextElementSibling.value
            const marker = getRadioInputValue(e);
            
            // Generating the player and computer objects

            if(name == ''){
               name = "Player";
            }
            else{
                name = name.toLowerCase();
            }
            player1 = player(name, marker);

            if(marker == "X"){
                player2 = player("Computer", "O");
            }
            else{
                player2 = player("Computer", "X");
            } 
        }
        else{                 
                let player1Name = e.target.firstElementChild.nextElementSibling.value;
                let player2Name = e.target.lastElementChild.previousElementSibling.value;
                const marker = getRadioInputValue(e);
                console.log(marker);

                if(player2Name == ''){
                    player2Name = "Player 2";
                }else{
                    player2Name = player2Name.toLowerCase()
                }
                if(player1Name == ''){
                    player1Name = "Player 1";
                }else{
                    player1Name = player1Name.toLowerCase()
                }
                
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
    function getRadioInputValue(e){
        if(e.target.id == "computer-form"){
            const marker = computerSelctedMarker.value;
            return marker;
        }
        else{
            const marker = friendSelctedMarker.value;
            return marker;
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
        //display for players
        firstPlayerName.textContent = player1.name;
        firstPlayerScore.textContent = `Score: ${player1.score}`;

        secondPlayerName.textContent = player2.name;
        secondPlayerScore.textContent = `Score: ${player2.score}`;
    }

    function restartGame(){
        location.reload();
    }

    function startNextRound(){
        toggleRound();
        game.resetBoard();
        resetUiScreen();
        scoreDiv.style.display = "none";
        if(player2.name == "Computer" && round == "open")
            computerPlay()
    }

    function toggleRound(){
        if(round == "closed")
            round = "open";
        else
            round = "closed";
    }
    function displayScore(activePlayer, aDraw){
        if(aDraw == 9){
            scoreDiv.style.display = "flex";
            scoreDiv.firstElementChild.textContent = (`It's a Tie`);
            toggleRound();
            console.log(round);
        }
        else{
            scoreDiv.style.display = "flex";
            scoreDiv.firstElementChild.textContent = (`${activePlayer.name} wins`);
        }
        
    }
    function declareWinner(winStat){
        if(winStat){
            if(winStat == 'X'){
                if(player1.marker == 'X'){
                    displayScore(activePlayer, 1); // 1 as second argument to indicate it's not a draw
                    player1.score++;
                    displayplayerDetails();
                    toggleRound();
                }
                else{
                    displayScore(activePlayer, 1); // 1 as second argument to indicate it's not a draw
                    player2.score++;
                    displayplayerDetails();
                    toggleRound();
                }
                
            }
            else if (winStat == 'O') {
                if(player1.marker == "O"){
                    displayScore(activePlayer, 1); // 1 as second argument to indicate it's not a draw
                    player1.score++;
                    displayplayerDetails();
                    toggleRound();
                }
                else{
                    displayScore(activePlayer, 1); // 1 as second argument to indicate it's not a draw
                    player2.score++;
                    displayplayerDetails();
                    toggleRound();
                }
            }
        }
        else{
            drawChecker();
        }
    }
    function resetUiScreen(){
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
    function computerPlay(){
        if(activePlayer.name == "Computer" && player2.name == "Computer" && round == "open"){

            //getting all available cells
            const available = [];
            for (let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(game.gameBoard.board[i][j] == '-'){
                        available.push({i, j})
                    }
                }
            }
            // Randomly picking a cell to play
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

    // Randomly selects a index from the array passed to it
    function random(array){
        const arrayLenght = array.length;
        let randomSelect = Math.floor(Math.random( )* arrayLenght);
        return array[randomSelect];
    }
    function drawChecker(){
        const draw = [];
        for (let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(game.gameBoard.board[i][j] == 'X' || game.gameBoard.board[i][j] == 'O'){
                   draw.push('Yes');
                }
            }
        }
        if(draw.length === 9){
            const aDraw = draw.length;
            displayScore(activePlayer, aDraw);
        }
    }
}

const theGame = GameControl();
