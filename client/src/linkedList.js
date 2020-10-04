class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SelfImplementedLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
    let currentNode = this.head;
    let newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.size++;
      return;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = newNode;
    this.size++;
    return;
  }

  findNodeWithValue(value) {
    const result = [];
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value.word.startsWith(value)) {
        result.push(currentNode.value);
      };
      currentNode = currentNode.next;
    }

    return result;
  }

  getAllNodeValue() {
    const result = [];

    let currentNode = this.head;

    if (currentNode === null) {
      return result;
    }

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return result;
  }

  removeAt(index) {
    let currentNode = this.head;
    let count = 0;

    if (this.size === 0) {
      throw new Error("Database is empty");
    }

    if (index > this.size) {
      throw new Error("Not valid index");
    }

    if (index === 0) {
      this.head = this.head.next;
      this.size--;
    }

    while (currentNode.next && count < index - 1) {
      currentNode = currentNode.next;
      count++;
    }

    currentNode.next = currentNode.next.next;
    this.size--;
    return;
  }

  selectNodeAt(index) {
    let currentNode = this.head;
    let count = 0;

    if (this.size === 0) {
      throw new Error("The database is empty");
    }

    if (index > this.size) {
      throw new Error("Not valid index");
    }

    while (currentNode.next && count < index) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  logAll() {
    let currentNode = this.head;

    while (currentNode) {
      console.log(currentNode.value)
      currentNode = currentNode.next;
    }
  }
}

export default SelfImplementedLinkedList