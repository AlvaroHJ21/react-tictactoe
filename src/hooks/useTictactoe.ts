import { useState } from 'react';
import { toast } from 'react-hot-toast';
interface Cell {
  id: number;
  value: string;
  resalt?: boolean;
}

const initCells: Cell[] = [
  { id: 0, value: '' },
  { id: 1, value: '' },
  { id: 2, value: '' },
  { id: 3, value: '' },
  { id: 4, value: '' },
  { id: 5, value: '' },
  { id: 6, value: '' },
  { id: 7, value: '' },
  { id: 8, value: '' },
];

export const useTictactoe = () => {
  const [turn, setTurn] = useState(true);
  const [cells, setCells] = useState<Cell[]>(initCells);
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState(false);

  function initGame() {
    setCells(initCells);
    setTurn(true);
    setWinner(null);
    setDraw(false);
  }

  function chooseCell(id: number) {
    const cell = cells.find((cell) => cell.id === id);

    if (winner || draw) return toast('El juego ya terminó!', { position: 'bottom-center' });
    if (cell?.value !== '') return;

    const value = turn ? 'X' : 'O';

    const newCells = cells.map((cell) => {
      if (cell.id === id) return { ...cell, value };
      return cell;
    });

    setCells(newCells);
    setTurn(!turn);
    validWin(newCells);
  }

  function validWin(cells: Cell[]) {
    const winCases = [
      [0, 1, 2], // 1st row
      [3, 4, 5], // 2nd row
      [6, 7, 8], // 3rd row
      [0, 3, 6], // 1st column
      [1, 4, 7], // 2nd column
      [2, 5, 8], // 3rd column
      [0, 4, 8], // 1st diagonal
      [2, 4, 6], // 2nd diagonal
    ];

    const win = winCases.find((winCase) => {
      const [a, b, c] = winCase;
      return (
        cells[a].value !== '' &&
        cells[a].value === cells[b].value &&
        cells[a].value === cells[c].value
      );
    });

    if (win) {
      setWinner(cells[win[0]].value);
      toast.success(`Ganó ${cells[win[0]].value}!`);

      const newCells = cells.map((cell) => {
        if (win?.includes(cell.id)) return { ...cell, resalt: true };
        return cell;
      });
      setCells(newCells);
    }

    const countValues = cells.reduce((acc, cell) => {
      if (cell.value !== '') return acc + 1;
      return acc;
    }, 0);

    if (countValues === 9 && !win) {
      toast('Empate!');
      setDraw(true);
    }
  }

  return { cells, winner, turn, draw, initGame, chooseCell };
};
