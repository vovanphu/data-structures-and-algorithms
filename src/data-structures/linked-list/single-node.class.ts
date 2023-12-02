export class SingleNode<T> {
  public value: T;
  public next: SingleNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
