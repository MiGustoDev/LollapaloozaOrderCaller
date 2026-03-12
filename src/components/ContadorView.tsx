import { useEffect } from 'react';
import { AppState } from '../types';
import { Minus, Plus, Send, Trash2, Delete } from 'lucide-react';

interface Props {
  state: AppState;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetContador: (value: number) => void;
  onEnviar: () => void;
  onEliminar: (numero: number, lista: 'enPreparacion' | 'aRetirar') => void;
}

export function ContadorView({
  state,
  onIncrement,
  onDecrement,
  onSetContador,
  onEnviar,
  onEliminar,
}: Props) {
  const handleKeypadDigit = (digit: number) => {
    const nuevoValor = state.contadorActual * 10 + digit;
    onSetContador(nuevoValor > 999 ? state.contadorActual : nuevoValor);
  };

  const handleKeypadBackspace = () => {
    const nuevoValor = Math.floor(state.contadorActual / 10);
    onSetContador(nuevoValor);
  };

  const handleKeypadClear = () => {
    onSetContador(0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
        const digit = Number(event.key);
        handleKeypadDigit(digit);
        return;
      }

      if (event.key === 'Backspace') {
        event.preventDefault();
        handleKeypadBackspace();
        return;
      }

      if (event.key === 'Delete' || event.key.toLowerCase() === 'c') {
        event.preventDefault();
        handleKeypadClear();
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        if (state.contadorActual > 0) {
          onEnviar();
        }
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onIncrement();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (state.contadorActual > 0) {
          onDecrement();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.contadorActual, onEnviar, onIncrement, onDecrement]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mb-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
            Contador de Pedidos
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-8 sm:gap-12 md:gap-16 flex-wrap">
            {/* Izquierda: número y botones +/- */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="text-9xl font-bold text-white tabular-nums">
                {state.contadorActual}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onDecrement}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-8 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={state.contadorActual <= 0}
                >
                  <Minus size={48} strokeWidth={3} />
                </button>

                <button
                  onClick={onIncrement}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-8 transition-all active:scale-95 shadow-lg"
                >
                  <Plus size={48} strokeWidth={3} />
                </button>
              </div>

              <button
                onClick={onEnviar}
                disabled={state.contadorActual === 0}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 font-bold text-2xl px-12 py-6 rounded-lg transition-all active:scale-95 shadow-lg flex items-center justify-center gap-4"
              >
                <Send size={32} />
                Enviar a Llamador
              </button>
            </div>

            {/* Derecha: teclado numérico */}
            <div className="flex flex-col items-stretch flex-1 min-w-[260px] max-w-[400px] w-full">
              <p className="text-gray-400 text-sm mb-3 text-center">
                Teclado numérico
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 flex-1 min-h-[240px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null].map((n, i) =>
                  n !== null ? (
                    <button
                      key={n}
                      onClick={() => handleKeypadDigit(n)}
                      className="bg-gray-700 hover:bg-gray-600 text-white text-2xl sm:text-3xl font-bold rounded-xl p-4 sm:p-5 min-h-[56px] transition-all active:scale-95 shadow-lg"
                    >
                      {n}
                    </button>
                  ) : i === 9 ? (
                    <button
                      key="backspace"
                      onClick={handleKeypadBackspace}
                      className="bg-gray-600 hover:bg-gray-500 text-white rounded-xl p-4 sm:p-5 min-h-[56px] transition-all active:scale-95 shadow-lg flex items-center justify-center"
                      title="Borrar último dígito"
                    >
                      <Delete size={32} />
                    </button>
                  ) : (
                    <button
                      key="clear"
                      onClick={handleKeypadClear}
                      className="bg-red-700 hover:bg-red-600 text-white text-xl font-bold rounded-xl p-4 sm:p-5 min-h-[56px] transition-all active:scale-95 shadow-lg"
                      title="Limpiar"
                    >
                      C
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-green-700 rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Retirar pedido ({state.aRetirar.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {state.aRetirar.length === 0 ? (
                <p className="text-white text-center py-8 opacity-70">
                  No hay pedidos para retirar
                </p>
              ) : (
                state.aRetirar.map((pedido) => (
                  <div
                    key={pedido.timestamp}
                    className="bg-white rounded-lg p-4 flex items-center justify-between shadow-md"
                  >
                    <span className="text-4xl font-bold text-gray-900">
                      {pedido.numero}
                    </span>
                    <button
                      onClick={() => onEliminar(pedido.numero, 'aRetirar')}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all active:scale-95"
                      title="Eliminar"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
