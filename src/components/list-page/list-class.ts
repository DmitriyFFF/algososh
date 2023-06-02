export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(initArray: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    initArray.forEach(item => this.append(item));
  }

  append(element: T) {
    const node = new Node(element);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;

    // return this;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (!this.tail) {
      this.tail = node;
      // this.head = node;
      // this.head.next = null;
      // return this;
    }
    // this.tail.next = node;
    // this.tail = node;
    this.size++;

    // return this;
  }

  deleteHead() {

  }

  deleteTail() {

  }

  addByIndex() {

  }

  deleteByIndex() {

  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
