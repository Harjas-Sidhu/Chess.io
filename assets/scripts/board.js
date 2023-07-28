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