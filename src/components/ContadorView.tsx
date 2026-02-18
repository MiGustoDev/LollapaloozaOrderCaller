import { AppState, Pedido } from '../types';
import { Minus, Plus, Send, ArrowDown, Trash2 } from 'lucide-react';

interface Props {
  state: AppState;
  onIncrement: () => void;
  onDecrement: () => void;
  onEnviar: () => void;
  onMoverARetirar: (numero: number) => void;
  onEliminar: (numero: number, lista: 'enPreparacion' | 'aRetirar') => void;
}

export function ContadorView({
  state,
  onIncrement,
  onDecrement,
  onEnviar,
  onMoverARetirar,
  onEliminar,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 mb-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            Contador de Pedidos
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="text-9xl font-bold text-white">
              {state.contadorActual}
            </div>

            <div className="flex gap-4">
              <button
                onClick={onDecrement}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-8 transition-all active:scale-95 shadow-lg"
                disabled={state.contadorActual <= 1}
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
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-2xl px-12 py-6 rounded-lg transition-all active:scale-95 shadow-lg flex items-center gap-4"
            >
              <Send size={32} />
              Enviar a Llamador
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-orange-600 rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              En Preparación ({state.enPreparacion.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {state.enPreparacion.length === 0 ? (
                <p className="text-white text-center py-8 opacity-70">
                  No hay pedidos en preparación
                </p>
              ) : (
                state.enPreparacion.map((pedido) => (
                  <div
                    key={pedido.timestamp}
                    className="bg-white rounded-lg p-4 flex items-center justify-between shadow-md"
                  >
                    <span className="text-4xl font-bold text-gray-900">
                      {pedido.numero}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onMoverARetirar(pedido.numero)}
                        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-all active:scale-95"
                        title="Mover a retirar"
                      >
                        <ArrowDown size={24} />
                      </button>
                      <button
                        onClick={() => onEliminar(pedido.numero, 'enPreparacion')}
                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all active:scale-95"
                        title="Eliminar"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-green-700 rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              A Retirar ({state.aRetirar.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {state.aRetirar.length === 0 ? (
                <p className="text-white text-center py-8 opacity-70">
                  No hay pedidos listos
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
