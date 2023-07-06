const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const getKeyByValue = (object, value) => {
    return Number.parseInt(Object.keys(object).find(key => object[key] === value));
}

const piece_positon = (piece) => {
    const piece_position = piece.parentElement.id;
    const piece_position_list = piece_position.split('-');
    return piece_position_list;
}

const piece_color_finder = (piece) => {
    const piece_color = piece.classList[1];
    return piece_color;
}

const piece_type_finder = (piece) => {
    const piece_type = piece.classList[2];
    return piece_type;
}

let turn = 1;

let selected_piece = document.getElementById('a-1').children[0];

const turn_counter = () => {
    if(turn == 1) {
        turn = 0;
    }
    else {
        turn = 1;
    }
}

const turn_indicator = (turn) => {
    if(turn == 1) {
        return 'white';
    }
    else {
        return 'black';
    }
}

const possible_moves = (selected_piece) => {
    
    const piece_type = piece_type_finder(selected_piece);
    const piece_color = piece_color_finder(selected_piece);
    const current_row = piece_positon(selected_piece)[0];
    const current_column = Number.parseInt(piece_positon(selected_piece)[1]);
    let possible_moves = [];
    let index = 0

    if(piece_type == 'rook'){
        for(let i = 0; i < 8; i++){
            for(let j = 1; j < 9; j++){
                if(rows[i] == current_row && j != current_column){
                    possible_moves[index] = `${rows[i]}-${j}`;
                    index++;
                }
                else if(j == current_column && rows[i] != current_row){
                    possible_moves[index] = `${rows[i]}-${j}`;
                    index++;
                }
            }
        }
    }

    else if(piece_type == 'bishop'){
        for(let i = 0; i < 8; i++){
            for(let j = 1; j < 9; j++){
                if(Math.abs(getKeyByValue(rows, current_row) - i) == Math.abs(current_column - j) && j != current_column){
                    possible_moves[index] = `${rows[i]}-${j}`;
                    index++;
                }
            }
        }
        
    }

    else if(piece_type == 'queen'){
        for(let i = 0; i < 8; i++){
            for(let j = 1; j < 9; j++){
                if(rows[i] == current_row && j != current_column){
                    possible_moves[index] = `${rows[i]}-${j}`;
                    index++;
                }
                else if(j == current_column && rows[i] != current_row){
                    possible_moves[index] = `${rows[i]}-${j}`;
                    index++;
                }
            }
        }
        for(let i = 0; i < 8; i++){
            for(let j = 1; j < 9; j++){
                if(Math.abs(getKeyByValue(rows, current_row) - i) == Math.abs(current_column - j) && j != current_column){
                    possible_moves[index] = `${rows[i]}-${j}`;
                    index++;
                }
            }
        }
    }

    else if(piece_type == 'king'){
        for(let i = getKeyByValue(rows, current_row) - 1; i < getKeyByValue(rows, current_row) + 2; i++){
            for(let j = current_column - 1; j < current_column + 2; j++){
                if(rows[i] == current_row && j != current_column){
                    if(!(i < 0 || i > 7 || j < 1 || j > 8)){
                        possible_moves[index] = `${rows[i]}-${j}`;
                        index++;
                    }
                }
                else if(j == current_column && rows[i] != current_row){
                    if(!(i < 0 || i > 7 || j < 1 || j > 8)){
                        possible_moves[index] = `${rows[i]}-${j}`;
                        index++;
                    }
                }
            }
        }
        for(let i = getKeyByValue(rows, current_row) - 1; i < getKeyByValue(rows, current_row) + 2; i++){
            for(let j = current_column - 1; j < current_column + 2; j++){
                if(Math.abs(getKeyByValue(rows, current_row) - i) == Math.abs(current_column - j) && j != current_column){
                    if(!(i < 0 || i > 7 || j < 1 || j > 8)){
                        possible_moves[index] = `${rows[i]}-${j}`;
                        index++;
                    }
                }
            }
        }
    }

    else if(piece_type == 'knight'){
        for(let i = 0; i < 8; i++){
            for(let j = 1; j < 9; j++){
                if(Math.abs(i - getKeyByValue(rows, current_row)) == 2 && Math.abs(j - current_column) == 1){
                    if(!(i < 0 || i > 7 || j < 1 || j > 8)){
                        possible_moves[index] = `${rows[i]}-${j}`;
                        index++;
                    }
                }
                else if(Math.abs(i - getKeyByValue(rows, current_row)) == 1 && Math.abs(j - current_column) == 2){
                    if(!(i < 0 || i > 7 || j < 1 || j > 8)){
                        possible_moves[index] = `${rows[i]}-${j}`;
                        index++;
                    }
                }
            }
        }
    }

    else if(piece_type == 'pawn'){
        for(let i = 0; i < 8; i++){
            if(piece_color == 'white'){
                if(current_row == 'b'){
                    if(i < getKeyByValue(rows, current_row) + 3 && i > getKeyByValue(rows, current_row)){
                        possible_moves[index] = `${rows[i]}-${current_column}`;
                        index++;
                    }
                }
                else{
                    if(i < getKeyByValue(rows, current_row) + 2 && i > getKeyByValue(rows, current_row)){
                        possible_moves[index] = `${rows[i]}-${current_column}`;
                        index++;
                    }
                }
            }
            else if(piece_color == 'black'){
                if(current_row == 'g'){
                    if(i > getKeyByValue(rows, current_row) - 3 && i < getKeyByValue(rows, current_row)){
                        possible_moves[index] = `${rows[i]}-${current_column}`;
                        index++;
                    }
                }
                else{
                    if(i > getKeyByValue(rows, current_row) - 2 && i < getKeyByValue(rows, current_row)){
                        possible_moves[index] = `${rows[i]}-${current_column}`;
                        index++;
                    }
                }
            }
        }
    }

    return possible_moves;
}

const move_validator = (possible_moves, selected_piece) => {
    const piece_type = piece_type_finder(selected_piece);
    const piece_color = piece_color_finder(selected_piece);
    let obstacle_col = [];
    let obstacle_row = [];
    let obstacle_index = 0;
    let valid_moves = [];
    let index = 0;

    for(i in possible_moves){
        if(document.getElementById(possible_moves[i]).children[0]){
            obstacle_row[obstacle_index] = possible_moves[i].split('-')[0];
            obstacle_col[obstacle_index] = possible_moves[i].split('-')[1];
            obstacle_index++;
        }
    }

    if(piece_type == 'knight'){
        for(i in possible_moves){
            const row = possible_moves[i].split('-')[0];
            const col = possible_moves[i].split('-')[1];
            if(obstacle_col != col && obstacle_row != row){
                valid_moves[index] = possible_moves[i];
                index++;
            }
            else{
                if(piece_color != piece_color_finder(document.getElementById(possible_moves[i]).children[0])){
                    valid_moves[index] = possible_moves[i];
                    index++;
                }
            }
        }
    }

    if(piece_type == 'bishop'){
        valid_moves = possible_moves;
    }

    return valid_moves;
}

const cell_selector = () => {
    const pieces = document.querySelectorAll('.piece');
    pieces.forEach(piece => {
        if(turn_indicator(turn) == piece_color_finder(piece)){
            piece.addEventListener('click', (piece)=>{
                for(i = 0; i < pieces.length; i++) {
                    if(pieces[i] != piece.target){
                        pieces[i].parentElement.classList.remove('selected');
                    }
                }
                if(piece.target.parentElement.classList.contains('selected')){
                    piece.target.parentElement.classList.remove('selected');
                }
                else{
                    piece.target.parentElement.classList.add('selected');
                    selected_piece = piece.target;
                }
                console.log(move_validator(possible_moves(selected_piece), selected_piece));
            })
        }
    });
}

cell_selector();