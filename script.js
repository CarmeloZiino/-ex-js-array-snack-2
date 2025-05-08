//Hai un array di oggetti rappresentanti libri:

const books = [
  {
    title: "React Billionaire",
    pages: 250,
    author: {
      name: "Alice",
      age: 35,
    },
    available: false,
    price: "101€",
    tags: ["advanced", "js", "react", "senior"],
  },
  {
    title: "Advanced JS",
    pages: 500,
    author: {
      name: "Bob",
      age: 20,
    },
    available: true,
    price: "25€",
    tags: ["advanced", "js", "mid-senior"],
  },
  {
    title: "CSS Secrets",
    pages: 320,
    author: {
      name: "Alice",
      age: 17,
    },
    available: true,
    price: "8€",
    tags: ["html", "css", "junior"],
  },
  {
    title: "HTML Mastery",
    pages: 200,
    author: {
      name: "Charlie",
      age: 50,
    },
    available: false,
    price: "48€",
    tags: ["html", "advanced", "junior", "mid-senior"],
  },
];

/* Snack 1 - Filtra e Modifica
Crea una funzione che somma due numeri.
Crea un array (longBooks) con i libri che hanno più di 300 pagine;
Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
Stampa in console ogni titolo nella console. */

const longBooks = books.filter((b) => b.pages > 300);
console.log(longBooks);

const longBooksTitles = longBooks.map((b) => b.title);
console.log(longBooksTitles);

/* Snack 2 - Il primo libro scontato
Creare un array (availableBooks) che contiene tutti i libri disponibili.
Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).*/

const availableBooks = books.filter((b) => b.available);
console.log(availableBooks);

const discountedBooks = availableBooks.map((b) => {
  const finalPrice = parseInt(b.price.replace(/[€\s]/g, "")) * 0.8;
  b.price = `${finalPrice} €`;
  return b;
});
console.log(discountedBooks);

const fullPricedBook = discountedBooks.find((b) => {

const price = parseFloat(b.price.replace('€', ""));
return price % 1 === 0
});
console.log(fullPricedBook);

/* Snack 3 - Ordinare gli Autori
Creare un array (authors) che contiene gli autori dei libri.
Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
Ordina l’array authors in base all’età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)*/

const authors = books.map((b) => b.author);
console.log(authors);

const areAuthorsAdults = authors.every((a) => a.age >= 18);
console.log(areAuthorsAdults);

authors.sort((a, b) => a.age + b.age);

/* Snack 4 - Calcola l’età media
Creare un array (ages) che contiene le età degli autori dei libri.
Calcola la somma delle età (agesSum) usando reduce.
Stampa in console l’età media degli autori dei libri.*/

const ages = books.map((b) => b.author.age);
console.log(ages);

const agesSum = ages.reduce((acc, num) => {
  return acc + num;
}, 0);
console.log(`La media dell'età dell'autore è ${agesSum / ages.length} anni`);

/* Snack 5 (Bonus) - Raccogli i libri
Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:
https://boolean-spec-frontend.vercel.app/freetestapi
al posto di:
https://freetestapi.com/api/v1

Ad esempio:
https://boolean-spec-frontend.vercel.app/freetestapi/users
per chiamare l'endpoint /users
Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} 
usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) 
che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] .*/

const urlBook = `http://localhost:5001/books/`;

const getFetch = async (url) => {
  const res = await fetch(`${url}`);
  const data = await res.json();
  return data;
};

const ids = [2, 13, 7, 21, 19];

async function getBooks(array) {
  const libri = await Promise.all(
    array.map((id) => getFetch(`${urlBook}${id}`))
  );
  return libri;
}

getBooks(ids)
  .then((res) => console.log(res))
  .catch((err) => err.message);

/* Snack 6 (Bonus) - Ordina i libri
Crea una variabile booleana (areThereAvailableBooks) per verificare 
se c’è almeno un libro disponibile.
Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
Ordina l’array booksByPricein base alla disponibilità (prima quelli disponibili), 
senza creare un nuovo array.*/

const areThereAvailableBooks = books.some((b) => b.available == true);
console.log(areThereAvailableBooks);

const booksByPrice = books.sort((a, b) => {
  a = parseInt(a.price.replace(/[€\s]/g, ""));
  b = parseInt(b.price.replace(/[€\s]/g, ""));
  return a - b;
});
console.log(booksByPrice);

booksByPrice.sort((a, b) => {
  if (a.available === true) {
    return a - b;
  }
});

/* Snack 7 (Bonus) - Analizza i tag
Usa reduce per creare un oggetto (tagCounts) 
che conta quante volte ogni tag viene usato tra i libri.
*/

const tagCounts = books.reduce((acc, libro) => {
  return libro.tags.reduce((libroAcc, tag) => {
    if (libroAcc[tag]) {
      libroAcc[tag] += 1;
    } else {
      libroAcc[tag] = 1;
    }
    return libroAcc;
  }, acc);
}, {});

console.log(
  "Ecco una lista di tutti i tag e delle volte che sono stati usati:",
  tagCounts
);
