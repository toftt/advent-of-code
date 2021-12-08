interface Edge<T> {
  from: Vertex<T>;
  to: Vertex<T>;
  weight: number;
}

interface Vertex<T> {
  value: T;
}
