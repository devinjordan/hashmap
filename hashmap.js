class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export default class Hashmap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.loadFactor = 0.8;
    this.capacity = this.buckets.length;
    this.occupied = 0;
  }

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  } 
 
  set(key, value) {
    const bucket = this.hash(key);
    
    if (!this.has(key)) {
      // bucket is empty
      if (this.buckets[bucket] == null) {
        const node = new Node(key, value);
        this.occupied++;
        this.buckets[bucket] = node;

        // collision
      } else {
        let temp = this.buckets[bucket];
        while (this.buckets[bucket].next != null) {
          temp = this.buckets[bucket].next;
        }
        temp.next = new Node(key, value);
      }

    } else {
      // overwrite
      this.buckets[bucket].value = value;
    };
  };

  get(key) {
    const bucket = this.hash(key);
    let temp = this.buckets[bucket];
    if (temp == null) return null;
    while (temp.key != key) {
      temp = temp.next;
    };
    if (temp.key == key) return temp.value;
    else return null;
  };

  has(key) {
    const bucket = this.hash(key);
    let temp = this.buckets[bucket];
    if (temp == null) return false;
    else if (temp.key == key) return true;
    else {
      while (temp.next != null) {
        temp = temp.next;
        if (temp.key == key) return true;
      }
    }
    return false;
  };

  remove(key) {
    const bucket = this.hash(key);
    let curr = this.buckets[bucket];
    let prev = null;
    if (curr == null) return false;
    else if (curr.next == null) {
      this.buckets[bucket] = null;
      return true;
    } else {
      while (curr.key != key && curr.next != null) {
        prev = curr;
        curr = curr.next;
      }
      if (curr.key == key) {
        prev.next = null;
        curr = null;
        return true;
      } else return false;
    }
  }

  length() {
    let length = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == null) continue;
      else if (this.buckets[i].next == null) {
        length++;
      } else {
        let temp = this.buckets[i];
        while (temp != null) {
          length++;
          temp = temp.next;
        }
      }
    } 
    return length;
  }
}
