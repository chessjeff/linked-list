export default function HashSet() {
  let buckets = new Array(16);
  const loadFactor = 0.75;

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }
    return hashCode;
  }

  function set(key) {
    const index = hash(key);
    buckets[index] = { key: key };
    let entries = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) entries.push(buckets[i]);
    }
    if (entries.length >= buckets.length * loadFactor) {
      buckets = new Array(buckets.length * 2);
      entries.forEach((entry) => {
        set(entry.key);
      });
    }
  }

  function has(key) {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }
    if (buckets[index].key === key) return true;
    return false;
  }

  function remove(key) {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }
    if (buckets[index]) {
      buckets[index] = "";
      return true;
    }
    return false;
  }

  function length() {
    let values = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) values.push(buckets[i]);
    }
    return values.length;
  }

  function clear() {
    buckets = new Array(16);
  }

  function keys() {
    let keys = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) keys.push(buckets[i].key);
    }
    return keys;
  }

  return { hash, set, has, remove, length, clear, keys };
}
