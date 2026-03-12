import { AppState } from '../types';

interface Props {
  state: AppState;
}

export function LlamadorView({ state }: Props) {
  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <div className="bg-yellow-400 py-8 px-6 shadow-2xl">
        <div className="flex items-center justify-center">
          <img 
            src="/Logo Mi Gusto 2025.png" 
            alt="Mi Gusto" 
            className="h-24 w-auto object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-green-700 p-8 overflow-hidden">
        <h2 className="text-6xl font-black text-white mb-12 text-center uppercase tracking-widest">
          Retirar pedido
        </h2>
        <div className="flex-1 overflow-y-auto px-4">
          {state.aRetirar.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-white text-5xl opacity-40 font-black italic">
                Sin pedidos para retirar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
              {state.aRetirar.map((pedido) => (
                <div
                  key={pedido.timestamp}
                  className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-12 flex items-center justify-center animate-fadeIn border-8 border-green-600/20"
                >
                  <span className="text-9xl font-black text-gray-900 tabular-nums">
                    {pedido.numero}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
