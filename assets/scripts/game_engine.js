const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const getKeyByValue = (obj, value) => {
    return Number.parseInt(Object.keys(obj).find(key => obj[key] === value));
}

const board_generator = () => {
    const board = document.getElementById('board');
    for (i = 1; i < 9; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.id = `${rows[i - 1]}`;
        for (j = 1; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${rows[i - 1]}-${j}`;
            row.appendChild(cell);
            if (i % 2 == 0) {
                if (j % 2 == 0) {
                    cell.classList.add('white');
                } else {
                    cell.classList.add('black');
                }
            }
            else {
                if (j % 2 == 0) {
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

const prev_board = [];
for (let i = 0; i < 8; i++) {
    prev_board[i] = [];
    for (let j = 0; j < 8; j++) {
        prev_board[i][j] = board[i][j];
    }
}

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
                index += 2;
            }
            if (column - 1 > -1) {
                possible_moves[index] = `${row + 1}-${column - 1}`;
                possible_moves[index + 1] = `${row}-${column - 1}`;
                index += 2;
            }
        }
        if (row - 1 > -1) {
            possible_moves[index] = `${row - 1}-${column}`;
            index++;
            if (column + 1 < 8) {
                possible_moves[index] = `${row - 1}-${column + 1}`;
                possible_moves[index + 1] = `${row}-${column + 1}`;
                index += 2;
            }
            if (column - 1 > -1) {
                possible_moves[index] = `${row - 1}-${column - 1}`;
                possible_moves[index + 1] = `${row}-${column - 1}`;
                index += 2;
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

let selected = null;

const threatmap = (board, color) => {
    const threatmap = [];
    let index = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j]) {
                if (piece_color_finder(board[i][j]) != color) {
                    const moves = possible_moves(`${i}-${j}`);
                    moves.forEach(move => {
                        const r = Number.parseInt(move.split('-')[0]);
                        const c = Number.parseInt(move.split('-')[1]);
                        if (board[i][j].toUpperCase() != 'P') {
                            if (board[r][c]) {
                                if (piece_color_finder(board[i][j]) != piece_color_finder(board[r][c])) {
                                    threatmap[index] = move;
                                    index++;
                                }
                            }
                            else {
                                threatmap[index] = move;
                                index++;
                            }
                        }
                        else {
                            if (piece_color_finder(board[i][j]) == 'black') {
                                if (i - 1 > -1) {
                                    if (j - 1 > -1) {
                                        threatmap[index] = `${i - 1}-${j - 1}`;
                                        index++;
                                    }
                                    if (j + 1 < 8) {
                                        threatmap[index] = `${i - 1}-${j + 1}`;
                                        index++;
                                    }
                                }
                            }
                            else {
                                if (i + 1 < 8) {
                                    if (j - 1 > -1) {
                                        threatmap[index] = `${i + 1}-${j - 1}`;
                                        index++;
                                    }
                                    if (j + 1 < 8) {
                                        threatmap[index] = `${i + 1}-${j + 1}`;
                                        index++;
                                    }
                                }
                            }
                        }
                    })
                }
            }
        }
    }
    return threatmap;
}

const virtual_board = (position) => {
    const v_board = board;
    const r = Number.parseInt(position.split('-')[0]);
    const c = Number.parseInt(position.split('-')[1]);
    let possible_positions = possible_moves(`${r}-${c}`);
    let color = piece_color_finder(v_board[r][c]);
    let saving_moves = [];
    let kr = 0;
    let kc = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (possible_positions.includes(`${i}-${j}`)) {
                if (v_board[i][j] == null || piece_color_finder(v_board[i][j]) != color) {
                    v_board[i][j] = v_board[r][c];
                    v_board[r][c] = undefined;
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            if (v_board[i][j]) {
                                if (v_board[i][j].toUpperCase() == 'K' && piece_color_finder(v_board[i][j]) == color) {
                                    kr = i;
                                    kc = j;
                                }
                            }
                        }
                    }
                    let threats = threatmap(v_board, color);
                    if (!threats.includes(`${kr}-${kc}`)) {
                        saving_moves.push(`${i}-${j}`);
                    }
                    v_board[r][c] = v_board[i][j];
                    v_board[i][j] = undefined;
                }
            }
        }
    }
    return saving_moves;
}

const move_piece = (move) => {
    const target = move.currentTarget;
    console.log(target.id);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(board[i][j] != prev_board[i][j]){
                board[i][j] = prev_board[i][j];
            }
        }
    }
    if (target) {
        if (target.classList.contains('cut') || target.classList.contains('possible')) {
            const old = document.querySelectorAll('.cut, .possible');
            old.forEach(cell => {
                cell.removeEventListener("click", move_piece, { once: true });
                cell.classList.remove('cut', 'possible');
            });
            const row = getKeyByValue(rows, target.id.split('-')[0]);
            const col = Number.parseInt(target.id.split('-')[1]) - 1;
            const sel_row = Number.parseInt(selected.split('-')[0]);
            const sel_col = Number.parseInt(selected.split('-')[1]);
            board[row][col] = board[sel_row][sel_col];
            board[sel_row][sel_col] = undefined;
            selected = null;
            turn = (turn + 1) % 2;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    prev_board[i][j] = board[i][j];
                }
            }
            clear_board();
            piece_generator(board);
            piece_selector();
        }
    }
}

const pieceClicked = (piece) => {

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(board[i][j] != prev_board[i][j]){
                board[i][j] = prev_board[i][j];
            }
        }
    }

    if (piece.currentTarget.parentElement.classList.contains('cell')) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (cell.classList.contains('selected')) {
                cell.classList.remove('selected');
            }
            if (cell.classList.contains('possible')) {
                cell.classList.remove('possible');
            }
            if (cell.classList.contains('cut')) {
                cell.classList.remove('cut');
            }
        })

        const row = getKeyByValue(rows, piece.currentTarget.parentElement.id.split('-')[0]);
        const col = Number.parseInt(piece.currentTarget.parentElement.id.split('-')[1]) - 1;
        if (piece_color_finder(board[row][col]) == turn_indicator(turn)) {
            selected = `${row}-${col}`;

            piece.currentTarget.parentElement.classList.add('selected');

            const moves = virtual_board(selected);
            const ui_moves = [];
            index = 0;

            moves.forEach(move => {
                const lr = rows[Number.parseInt(move.split('-')[0])];
                const lc = Number.parseInt(move.split('-')[1]) + 1;
                const p = board[Number.parseInt(move.split('-')[0])][Number.parseInt(move.split('-')[1])];
                if (p) {
                    if (piece_color_finder(p) != piece_color_finder(board[row][col])) {
                        ui_moves[index] = `${lr}-${lc}`;
                        index++;
                    }
                }
                else {
                    ui_moves[index] = `${lr}-${lc}`;
                    index++;
                }
            })

            ui_moves.forEach(move => {
                if (document.getElementById(move).children[0]) {
                    document.getElementById(move).classList.add('cut');
                }
                else {
                    document.getElementById(move).classList.add('possible');
                }
            })

            ui_moves.forEach(move => {
                document.getElementById(move).addEventListener("click", move_piece, { once: true });
            })
        }
    }
}

const piece_selector = () => {
    const pieces = document.querySelectorAll('.piece');

    pieces.forEach(piece => {

        if (piece.parentElement.classList.contains('selected')) {
            piece.parentElement.classList.remove('selected');
        }
        piece.addEventListener("click", pieceClicked);
    })
}

piece_selector();