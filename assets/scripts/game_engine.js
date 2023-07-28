const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const getKeyByValue = (obj, value) => {
    return Number.parseInt(Object.keys(obj).find(key => obj[key] === value));
}

const board = [];
for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
        if (i == 0 || i == 7) {
            if (j == 0 || j == 7) {
                board[i][j] = 'r';
            }
            else if (j == 1 || j == 6) {
                board[i][j] = 'n';
            }
            else if (j == 2 || j == 5) {
                board[i][j] = 'b';
            }
            else if (j == 4) {
                board[i][j] = 'k';
            }
            else {
                board[i][j] = 'q';
            }
        }
        if (i == 1 || i == 6) {
            board[i][j] = 'p';
        }
        if (i == 6 || i == 7) {
            board[i][j] = board[i][j].toUpperCase();
        }
    }
}

board[5][4] = 'n';

let selected_piece_position = null;

const clear_board = () => {
    document.querySelectorAll('.piece').forEach(piece => {
        piece.remove();
    })
}

const piece_generator = (board) => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] != null) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                if (board[i][j] == board[i][j].toUpperCase()) {
                    piece.classList.add('black')
                }
                else {
                    piece.classList.add('white');
                }
                if (board[i][j].toUpperCase() == 'R') {
                    piece.classList.add('rook');
                }
                else if (board[i][j].toUpperCase() == 'N') {
                    piece.classList.add('knight');
                }
                else if (board[i][j].toUpperCase() == 'B') {
                    piece.classList.add('bishop');
                }
                else if (board[i][j].toUpperCase() == 'Q') {
                    piece.classList.add('queen');
                }
                else if (board[i][j].toUpperCase() == 'K') {
                    piece.classList.add('king');
                }
                else if (board[i][j].toUpperCase() == 'P') {
                    piece.classList.add('pawn');
                }
                document.getElementById(`${rows[i]}-${j + 1}`).appendChild(piece);
            }
        }
    }
}

piece_generator(board);

let turn = 0;

const turn_indicator = (turn) => {
    if (turn == 0) {
        return 'white';
    }
    else {
        return 'black';
    }
}

const piece_color_finder = (piece) => {
    if (piece.toUpperCase() != piece) {
        return 'white';
    }
    else {
        return 'black';
    }
}

const possible_moves = (piece_position) => {
    const row = Number.parseInt(piece_position.split('-')[0]);
    const column = Number.parseInt(piece_position.split('-')[1]);
    const piece_color = piece_color_finder(board[row][column]);
    const piece_type = board[row][column].toUpperCase();
    const possible_moves = [];
    let index = 0;

    if (piece_type == 'R') {
        for (let i = row; i < 8; i++) {
            if (i != row) {
                if (board[i][column] == undefined) {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                    break;
                }
            }
        }
        for (let i = row; i >= 0; i--) {
            if (i != row) {
                if (board[i][column] == undefined) {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                    break;
                }
            }
        }
        for (let i = column; i < 8; i++) {
            if (i != column) {
                if (board[row][i] == undefined) {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                    break;
                }
            }
        }
        for (let i = column; i >= 0; i--) {
            if (i != column) {
                if (board[row][i] == undefined) {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                    break;
                }
            }
        }
    }

    else if (piece_type == 'N') {
        if (row + 2 < 8) {
            if (column + 1 < 8) {
                possible_moves[index] = `${row + 2}-${column + 1}`;
                index++;
            }
            if (column - 1 > -1) {
                possible_moves[index] = `${row + 2}-${column - 1}`;
                index++;
            }
        }
        if (row - 2 > -1) {
            if (column + 1 < 8) {
                possible_moves[index] = `${row - 2}-${column + 1}`;
                index++;
            }
            if (column - 1 > -1) {
                possible_moves[index] = `${row - 2}-${column - 1}`;
                index++;
            }
        }
        if (column + 2 < 8) {
            if (row + 1 < 8) {
                possible_moves[index] = `${row + 1}-${column + 2}`;
                index++;
            }
            if (row - 1 > -1) {
                possible_moves[index] = `${row - 1}-${column + 2}`;
                index++;
            }
        }
        if (column - 2 > -1) {
            if (row + 1 < 8) {
                possible_moves[index] = `${row + 1}-${column - 2}`;
                index++;
            }
            if (row - 1 > -1) {
                possible_moves[index] = `${row - 1}-${column - 2}`;
                index++;
            }
        }
    }

    else if (piece_type == 'B') {
        let obstacle = 0;
        for (let i = row; i < 8; i++) {
            for (let j = column; j < 8; j++) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }

        obstacle = 0;
        for (let i = row; i < 8; i++) {
            for (let j = column; j >= 0; j--) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }

        obstacle = 0;
        for (let i = row; i >= 0; i--) {
            for (let j = column; j < 8; j++) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }

        obstacle = 0;
        for (let i = row; i >= 0; i--) {
            for (let j = column; j >= 0; j--) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }
    }

    else if (piece_type == 'Q') {
        for (let i = row; i < 8; i++) {
            if (i != row) {
                if (board[i][column] == undefined) {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                    break;
                }
            }
        }
        for (let i = row; i >= 0; i--) {
            if (i != row) {
                if (board[i][column] == undefined) {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${i}-${column}`;
                    index++;
                    break;
                }
            }
        }
        for (let i = column; i < 8; i++) {
            if (i != column) {
                if (board[row][i] == undefined) {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                    break;
                }
            }
        }
        for (let i = column; i >= 0; i--) {
            if (i != column) {
                if (board[row][i] == undefined) {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                }
                else {
                    possible_moves[index] = `${row}-${i}`;
                    index++;
                    break;
                }
            }
        }

        let obstacle = 0;
        for (let i = row; i < 8; i++) {
            for (let j = column; j < 8; j++) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }

        obstacle = 0;
        for (let i = row; i < 8; i++) {
            for (let j = column; j >= 0; j--) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }

        obstacle = 0;
        for (let i = row; i >= 0; i--) {
            for (let j = column; j < 8; j++) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }

        obstacle = 0;
        for (let i = row; i >= 0; i--) {
            for (let j = column; j >= 0; j--) {
                if (i != row && j != column) {
                    if (Math.abs(row - i) == Math.abs(column - j)) {
                        if (board[i][j] == undefined) {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                        }
                        else {
                            possible_moves[index] = `${i}-${j}`;
                            index++;
                            obstacle = 1;
                            break;
                        }
                    }
                    if (obstacle) {
                        break;
                    }
                }
            }
        }
    }

    else if (piece_type == 'K') {
        if (row + 1 < 8) {
            possible_moves[index] = `${row + 1}-${column}`;
            index++;
            if (column + 1 < 8) {
                possible_moves[index] = `${row + 1}-${column + 1}`;
                possible_moves[index + 1] = `${row}-${column + 1}`;
                if (row - 1 > -1) {
                    possible_moves[index + 2] = `${row - 1}-${column}`;
                    possible_moves[index + 3] = `${row - 1}-${column + 1}`;
                }
                index += 4;
            }
            if (column - 1 > -1) {
                possible_moves[index] = `${row + 1}-${column - 1}`;
                possible_moves[index + 1] = `${row}-${column - 1}`;
                if (row - 1 > -1) {
                    possible_moves[index + 2] = `${row - 1}-${column - 1}`;
                }
                index += 3;
            }
        }
    }

    else if (piece_type == 'P') {
        let obstacle = 0;
        if (piece_color == 'white') {
            if (row + 1 < 8) {
                if (board[row + 1][column] == undefined) {
                    possible_moves[index] = `${row + 1}-${column}`;
                    index++;
                }
                else {
                    obstacle = 1;
                }
                if (board[row + 1][column + 1] != undefined) {
                    possible_moves[index] = `${row + 1}-${column + 1}`;
                    index++;
                }
                if (board[row + 1][column - 1] != undefined) {
                    possible_moves[index] = `${row + 1}-${column - 1}`;
                    index++;
                }
            }
            if (row == 1 && obstacle == 0 && board[row + 2][column] == undefined) {
                possible_moves[index] = `${row + 2}-${column}`;
                index++;
            }
        }
        else if (piece_color == 'black') {
            if (row - 1 > -1) {
                if (board[row - 1][column] == undefined) {
                    possible_moves[index] = `${row - 1}-${column}`;
                    index++;
                }
                else {
                    obstacle = 1;
                }
                if (board[row - 1][column + 1] != undefined) {
                    possible_moves[index] = `${row - 1}-${column + 1}`;
                    index++;
                }
                if (board[row - 1][column - 1] != undefined) {
                    possible_moves[index] = `${row - 1}-${column - 1}`;
                    index++;
                }
            }
            if (row == 6 && obstacle == 0 && board[row - 2][column] == undefined) {
                possible_moves[index] = `${row - 2}-${column}`;
                index++;
            }
        }
    }

    return possible_moves;
}

const piece_selector = () => {
    let cells = document.querySelectorAll('.cell');
    let pieces = document.querySelectorAll('.piece');
    let prev_turn = turn;
    let tar_pos = null;
    selected_piece_position = null;
    pieces.forEach(piece => {
        piece.addEventListener("click", (piece) => {
            if (piece.target.classList[1] == turn_indicator(turn) && piece.target.parentElement.classList.contains('cell')) {
                let position = piece.target.parentElement.id;
                selected_piece_position = `${getKeyByValue(rows, position.split('-')[0])}-${Number.parseInt(position.split('-')[1]) - 1}`;
                for (let i = 0; i < pieces.length; i++) {
                    if (pieces[i] != piece.target) {
                        pieces[i].parentElement.classList.remove('selected');
                    }
                }
                piece.target.parentElement.classList.add('selected');
            }
            if (selected_piece_position != null) {
                const list = possible_moves(selected_piece_position);
                list.forEach(move => {
                    const row = Number.parseInt(move.split('-')[0]);
                    const column = Number.parseInt(move.split('-')[1]);
                    const selected_row = selected_piece_position.split('-')[0];
                    const selected_column = selected_piece_position.split('-')[1];
                    if (board[row][column] != undefined) {
                        if (piece_color_finder(board[row][column]) == piece_color_finder(board[selected_row][selected_column])) {
                            delete list[getKeyByValue(list, move)];
                        }
                    }
                })
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].classList.contains('possible')) {
                        cells[i].classList.remove('possible');
                    }
                    if (cells[i].classList.contains('cut')) {
                        cells[i].classList.remove('cut');
                    }
                }
                for (i in list) {
                    const row = Number.parseInt(list[i].split('-')[0]);
                    const col = Number.parseInt(list[i].split('-')[1]);
                    const pos = `${rows[row]}-${col + 1}`;
                    if (document.getElementById(pos).children[0] != undefined) {
                        if (document.getElementById(pos).children[0].classList.contains('piece')) {
                            document.getElementById(pos).classList.add('cut');
                        }
                    }
                    else {
                        document.getElementById(pos).classList.add('possible');
                    }
                }

                const sel_row = selected_piece_position.split('-')[0];
                const sel_col = selected_piece_position.split('-')[1];
                const sel_piece = board[sel_row][sel_col];
                console.log(board[sel_row][sel_col]);

                if (selected_piece_position != null) {
                    const elems = document.querySelectorAll('.cut, .possible');
                    elems.forEach(elem => {
                        elem.addEventListener("click", (move) => {
                            if (move.target.classList.contains('cell')) {
                                tar_pos = move.target.id;
                            }
                            let moves = [];
                            let index = 0;
                            document.querySelectorAll('.cut, .possible').forEach(elem => {
                                moves[index] = elem.id;
                                index++;
                            })
                            if (moves.includes(tar_pos)) {
                                const row = getKeyByValue(rows, tar_pos.split('-')[0]);
                                const col = Number.parseInt(tar_pos.split('-')[1]) - 1;
                                board[row][col] = sel_piece;
                                if (board[row][col] == board[sel_row][sel_col] && board[row][col] == sel_piece && piece_color_finder(board[row][col]) == turn_indicator(turn)) {
                                    board[sel_row][sel_col] = undefined;
                                    if (prev_turn == turn) {
                                        if (turn == 0) {
                                            turn = 1;
                                        }
                                        else {
                                            turn = 0;
                                        }
                                    }
                                    clear_board();
                                    piece_generator(board);
                                    document.querySelectorAll('.possible, .cut').forEach(move => {
                                        if (move.classList.contains('possible')) {
                                            move.classList.remove('possible');
                                        }
                                        else if (move.classList.contains('cut')) {
                                            move.classList.remove('cut');
                                        }
                                    })
                                    document.getElementsByClassName('selected')[0].classList.remove('selected');
                                    selected_piece_position = null;
                                }
                            }
                            move.stopPropagation();
                            piece_selector();
                        }, { once: true, bubbles: true });
                    })
                }
            }
        }, true)
    })
}

piece_selector();