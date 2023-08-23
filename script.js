const categories = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'K',
    9: 'L',
    10: 'M',
    11: '0/1',
    12: '0/2',
    13: '0/3'

};

const emptyCellEmoji = '🖕🏻';
let selectedCellIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const totalCells = 100;
    const winningCellIndices = [11, 22, 33, 44, 55, 66, 77, 88, 99, 10, 21, 32, 43];

    const resetButton = document.getElementById('resetButton');

    resetButton.addEventListener('click', () => {
        const enteredKey = prompt('Введите ключ доступа:');
        if (enteredKey === 'wehguhw84828r8hewhuwr') {
            localStorage.clear();
            selectedCellIndex = null;
            resetCells(grid);
            window.location.reload();
        } else {
            alert('Неверный ключ доступа.');
        }
    });

    function resetCells(grid) {
        grid.innerHTML = '';

        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.dataset.category = getCategoryForCell(i);
            cell.classList.add('cell');
            cell.textContent = i + 1;
            grid.appendChild(cell);

            const savedCellState = localStorage.getItem(`cell_${i}`);
            if (savedCellState) {
                const { revealed, category } = JSON.parse(savedCellState);
                if (revealed) {
                    updateCellAppearance(cell, category);
                }
            }

            if (selectedCellIndex === i) {
                cell.style.pointerEvents = 'none';
            }

            cell.addEventListener('click', () => {
                if (selectedCellIndex === null) {
                    selectedCellIndex = i;
                    updateCellAppearance(cell, cell.dataset.category);
                    saveCellState(i, cell.dataset.category);
                }
            });
        }
    }

    function getCategoryForCell(cellIndex) {
        if (winningCellIndices.includes(cellIndex)) {
            const randomCategory = Math.floor(Math.random() * 13) + 1;
            return categories[randomCategory];
        } else if (cellIndex % 3 === 0) {
            const randomCategory = Math.floor(Math.random() * 13) + 1;
            return categories[randomCategory];
        } else {
            return '0';
        }
    }

    function updateCellAppearance(cell, category) {
        cell.classList.add('revealed');
        cell.textContent = category === '0' ? emptyCellEmoji : category;
        cell.style.backgroundColor = 'black';
        cell.style.color = 'white';
        cell.style.pointerEvents = 'none';
    }

    function saveCellState(index, category) {
        const cellState = {
            revealed: true,
            category: category
        };
        localStorage.setItem(`cell_${index}`, JSON.stringify(cellState));
    }

    resetCells(grid);
});

