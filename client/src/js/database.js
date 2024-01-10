import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to save data to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Open a connection to the database
  const jateDb = await openDB('jate', 1);
  // Create a transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // Ge the object store from the transaction
  const store = tx.objectStore('jate');
  // Put the data into the object store
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result.value);
};

// Function to get data from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Open a connection to the database
  const jateDb = await openDB('jate', 1);
  // Create a transaction
  const tx = jateDb.transaction('jate', 'readonly');
  // Get the object store from the transaction
  const store = tx.objectStore('jate');
  // Get the data from the object store
  const request = store.get(1);
  const result = await request;
  // Log the retrieved data or a message if no data was found
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};
// Call the init function to initialize the database
initdb();
