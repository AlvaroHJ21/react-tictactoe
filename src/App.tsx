import { useTictactoe } from './hooks/useTictactoe';
import { Toaster } from 'react-hot-toast';

function App() {
  const { turn, winner, draw, cells, initGame, chooseCell } = useTictactoe();

  return (
    <main className="min-h-screen grid place-content-center">
      <h1 className="text-center uppercase my-4">Tic tac toe</h1>
      <h2 className="text-center text-cyan-600 mb-4 font-bold">
        {!(winner || draw) ? `Turno: ${turn ? 'X' : 'O'}` : "Fin del juego"}
      </h2>
      <div className="border w-[300px] h-[300px] md:w-[480px] md:h-[480px] m-auto">
        <div className="grid grid-cols-3 grid-rows-3">
          {cells.map((cell, index) => (
            <div
              key={index}
              onClick={() => chooseCell(index)}
              className={`border h-[100px] md:h-[160px] grid place-content-center text-5xl font-bold ${
                cell.resalt ? 'text-cyan-600' : ''
              }`}
            >
              {cell.value}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[500px] m-auto mt-4 flex justify-center">
        <button onClick={initGame} className="btn btn-primary">
          Jugar
        </button>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
