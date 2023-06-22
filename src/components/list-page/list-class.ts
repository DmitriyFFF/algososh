export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
    // this.next = (next === undefined ? null : next);
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
    const newNode = new Node(element);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    // this.size++;//??

    return this;//??
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    if (!this.tail) {
      this.tail = node;
      // this.head = node;
      // this.head.next = null;
      // return this;
    }
    // this.tail.next = node;
    // this.tail = node;

    // this.size++;//??

    return this;//??
  }

  deleteHead() {
    if (!this.head) return null;
    const deletedHead = this.head.value;

    // this.head = this.head.next;

    if(this.head.next) {
      this.head = this.head.next;
    } else {
      this.tail = null;
    }
    this.size--;//???
    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) return null;
    const deletedTail = this.tail.value;

    // this.head = this.head.next;

    if(this.tail.next) {
      this.tail = this.tail.next;
    } else {
      this.head = null;
    }
    this.size--;//???
    return deletedTail;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.head = new Node(element, this.head);
      return;
    }

    const newNode = new Node(element);
    // let prev;

    let current = this.head;
    let count = 0;

    if (current !== null) {
      while (count < index) {
        newNode.next = current.next;
        current.next = newNode;
        count++;
        // current = current.next;
      }
    }

    newNode.next = current;//??
    // prev.next = newNode;
    this.size++;//??
  }

  deleteByIndex(index: number) {
    // if (!this.head) return null;??
    if (index === 0) {
      return this.deleteHead();
    }

    let deletedNode = null;
    let current = this.head;
    let count = 0;

    if (current !== null && current.next !== null) {
      while (count < index) {
        if (current.next === this.tail) {
          this.tail = current;
        }
        deletedNode = current.next;
        // current = current?.next;
        count++;
        // current = current.next;
      }
    }
    return deletedNode;

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
