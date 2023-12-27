const board = [];
const row = 3;
const column = 3;

function checkForWin(){
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
            if(board[i][j] = board[i+2][j+2])
                return(board[i][j]);
        }
        else if(board[i][j+2] == board[i+1][j+1]){
            if(board[i][j+2] == board[i+2][j])
                return(board[i][j]);
        }
        break;
    }
}

function createBoard(){
    for (let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push('-');
            }
        }
}
createBoard();

board[1][0] = 'd';
board[1][1] = 'd';
board[1][2] = 'd';

console.table(board);
console.log(board[0].length);