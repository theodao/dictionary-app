const express = require('express');
var cors = require('cors');
const app = express();

var fs = require('fs');

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

    if (!currentNode) {
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

const data = [];

app.use(cors());

app.get('/data', (req, res) => {
  let data = [];
  const hashMap = {

  };
  fs.readFile('./en-vi-dict.txt', 'utf-8', (err, data) => {
    const result = [];
    const rawData = data.split('\n').filter(s => s !== '');
    let obj = {};
    console.log(rawData);
    for (let i = 0; i < rawData.length; i++) {
      
      if (rawData[i].includes('@')) {
        obj = {};
        const wordPronounce = rawData[i].split(' ');
        obj['word'] = wordPronounce[0].split('@').filter(i => i !== '@').join('');;
        obj['pronounce'] = wordPronounce[1]
      }
  
      if (rawData[i].includes('*')) {
        const type = rawData[i].split('*')
        obj['type'] = type.filter(i => i !== '*').join('');
      }
  
      if (rawData[i].includes('-')) {
        const def = rawData[i].split('-');
        obj['def'] = def.filter(i => i !== '-').join('');
      }
  
      if (rawData[i].includes('=')) {
        const example = rawData[i].split('=');
        obj['example'] = example.filter(i => i !== '=').join('');
        result.push(obj);
      }
    } 

    let responseData = [];

    for (let c of result) {
      if (!hashMap[c.word]) {
        hashMap[c.word] = c.word
        responseData.push(c);
      } else {
        continue;
      }
    }

    res.json(responseData);
  })

})

app.listen(5000, () => {
  console.log('server is runnign');
})