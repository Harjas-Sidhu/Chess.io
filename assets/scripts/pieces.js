const start_position = ['a', 'b', 'g', 'h'];

const piece_generator = () => {
    for(i = 0; i < 4; i++) {
        for(j = 1; j < 9; j++) {
            const cell = document.getElementById(`${start_position[i]}-${j}`);
            const piece = document.createElement('div');
            piece.classList.add('piece');
            if(start_position[i] == 'a' || start_position[i] == 'b') {
                piece.classList.add('white');
            }
            else {
                piece.classList.add('black');
            }
            if(start_position[i] == 'b' || start_position[i] == 'g') {
                piece.classList.add('pawn');
            }
            else{
                if(j == 1 || j == 8) {
                    piece.classList.add('rook');
                }
                else if(j == 2 || j == 7) {
                    piece.classList.add('knight');
                }
                else if(j == 3 || j == 6) {
                    piece.classList.add('bishop');
                }
                else if(j == 4) {
                    piece.classList.add('queen');
                }
                else {
                    piece.classList.add('king');
                }
            }
            cell.appendChild(piece);
        }
    }
}

piece_generator();


const new_bishop = document.createElement('div');
new_bishop.classList.add('piece');
new_bishop.classList.add('white');
new_bishop.classList.add('bishop');
document.getElementById('e-4').appendChild(new_bishop);