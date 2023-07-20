const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const board_generator = () => {
    const board = document.getElementById('board');
    for(i = 1; i < 9; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.id = `${list[i - 1]}`;
        for(j = 1; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${list[i-1]}-${j}`;
            row.appendChild(cell);
            if(i%2 == 0){
                if(j%2 == 0){
                    cell.classList.add('white');
                } else {
                    cell.classList.add('black');
                }
            }
            else {
                if(j%2 == 0){
                    cell.classList.add('black');
                } else {
                    cell.classList.add('white');
                }
            }
        }
        board.appendChild(row);
    }
}

board_generator();

const board = [];
for(let i = 0; i < 8; i++){
    board[i] = [];
    for(let j = 0; j < 8; j++){
        if(i == 0 || i == 7){
            if(j == 0 || j == 7) {
                board[i][j] = 'r';
            }
            else if(j == 1 || j == 6) {
                board[i][j] = 'n';
            }
            else if(j == 2 || j == 5) {
                board[i][j] = 'b';
            }
            else if(j == 4) {
                board[i][j] = 'k';
            }
            else {
                board[i][j] = 'q';
            }
        }
        if(i == 1 || i == 6){
            board[i][j] = 'p';
        }
        if(i == 6 || i== 7){
            board[i][j] = board[i][j].toUpperCase();
        }
    }
}

board[5][0] = 'p';