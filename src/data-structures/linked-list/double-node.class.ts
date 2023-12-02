export class DoubleNode<T> {
  public value: T;
  public next: DoubleNode<T> | null = null;
  public prev: DoubleNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
