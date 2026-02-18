export interface Pedido {
  numero: number;
  timestamp: number;
}

export type Estado = 'enPreparacion' | 'aRetirar';

export interface AppState {
  contadorActual: number;
  enPreparacion: Pedido[];
  aRetirar: Pedido[];
}
