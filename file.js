// Creazione della classe RegistroDiClasse
class RegistroDiClasse {
  // Array che conterrà gli studenti
  studenti = [];

  // Metodo per aggiungere uno studente
  addStudent(id, nome, cognome) {
    // Creazione di un oggetto Student con ID, nome, cognome e un voto di default
    const Student = {
      id: id,
      nome: nome,
      cognome: cognome,
      voti: [{ voto: 0, commento: "", data: "" }],
    };
    // Aggiunta dello studente all'array studenti
    this.studenti.push(Student);
  }

  // Metodo per aggiungere un'interrogazione a uno studente specifico
  addInterrogation(id, voto, commento, data) {
    this.studenti.forEach(function (element) {
      if (element.id == id) {
        // Ciclo tra i voti dello studente e aggiornamento dei dettagli dell'interrogazione
        element.voti.forEach(function (elementdue) {
          elementdue.voto = voto;
          elementdue.commento = commento;
          elementdue.data = data;
        });
      } else {
        console.log("L'id non esiste"); // Stampa un messaggio se l'ID dello studente non esiste
      }
    });
  }

  // Metodo per eliminare uno studente tramite l'ID
  deleteRow(id) {
    const index = this.studenti.findIndex((student) => student.id === id);
    if (index !== -1) {
      // Rimuove lo studente dall'array studenti
      this.studenti.splice(index, 1);
      alert("Studente " + id + " rimosso"); // Alert per confermare la rimozione dello studente
    } else {
      alert("Nessuno studente rimosso"); // Alert nel caso in cui lo studente non venga trovato
    }
  }
}

const registro = new RegistroDiClasse(); // Creazione di un'istanza della classe RegistroDiClasse

// Funzione per salvare i dati nel localStorage
function setLocalStorage() {
  localStorage.setItem("registroStudenti", JSON.stringify(registro.studenti));
}

// Funzione per caricare i dati dal localStorage
function loadLocalStorage() {
  const storedData = localStorage.getItem("registroStudenti");
  if (storedData) {
    registro.studenti = JSON.parse(storedData); // Carica i dati salvati nel registro
    updateLocalStorage(); // Aggiorna la tabella con gli studenti presenti
  }
}

// Funzione per aggiornare la tabella HTML con gli studenti salvati nel localStorage
function updateLocalStorage() {
  // Recupera la tabella
  let table = document.getElementById("table");
  // Per ogni studente nel registro, crea una nuova riga nella tabella
  registro.studenti.forEach((student) => {
    let newRow = table.insertRow(-1);
    // Aggiunge le informazioni dello studente nelle celle della riga
    newRow.insertCell(0).innerHTML = student.id;
    newRow.insertCell(1).innerHTML = student.nome;
    newRow.insertCell(2).innerHTML = student.cognome;
    newRow.insertCell(3).innerHTML = student.voti[0].voto;
    newRow.insertCell(4).innerHTML = student.voti[0].commento;
    newRow.insertCell(5).innerHTML = student.voti[0].data;
    let cell6 = newRow.insertCell(6);
    let button1 = document.createElement("button");
    button1.className = "delete-button";
    button1.innerHTML = '<i class="fas fa-trash-alt"></i>';
    cell6.appendChild(button1);
    // Aggiunge un evento click al pulsante "Elimina" di ciascuna riga
    button1.addEventListener("click", function () {
      let row = this.parentNode.parentNode;
      let studentId = row.cells[0].innerHTML;
      row.parentNode.removeChild(row);
      registro.deleteRow(studentId); // Chiama il metodo per eliminare lo studente dal registro
      setLocalStorage(); // Aggiorna il localStorage dopo la rimozione dello studente
    });
  });
}

loadLocalStorage(); // Carica i dati dal localStorage all'avvio della pagina

// Gestione evento click sul pulsante "Aggiungi"
let button = document.querySelector("button");
let myform = document.querySelector("form");

// Impedisce il comportamento predefinito del form quando viene sottomesso
myform.addEventListener("submit", (e) => {
  e.preventDefault();
});

button.addEventListener("click", () => {
  // Recupero dei valori dai campi di input
  let id = document.querySelector("#id");
  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let vote = document.querySelector("#vote");
  let comment = document.querySelector("#comment");
  let date = document.querySelector("#date");
  // Verifica se tutti i campi sono compilati
  if (
    id.value == "" &&
    firstName.value == "" &&
    lastName.value == "" &&
    vote.value == "" &&
    comment.value == "" &&
    date.value == ""
  ) {
    return; // Esce dalla funzione se i campi non sono tutti compilati
  } else {
    // Aggiunge lo studente e l'interrogazione al registro
    registro.addStudent(id.value, firstName.value, lastName.value);
    registro.addInterrogation(id.value, vote.value, comment.value, date.value);

    // Aggiunge una nuova riga alla tabella con i dettagli dello studente aggiunto
    let table = document.getElementById("table");
    let newRow = table.insertRow(-1);
    newRow.insertCell(0).innerHTML = id.value;
    newRow.insertCell(1).innerHTML = firstName.value;
    newRow.insertCell(2).innerHTML = lastName.value;
    newRow.insertCell(3).innerHTML = vote.value;
    newRow.insertCell(4).innerHTML = comment.value;
    newRow.insertCell(5).innerHTML = date.value;
    let cell6 = newRow.insertCell(6);
    let button1 = document.createElement("button");
    button1.className = "delete-button";
    button1.innerHTML = '<i class="fas fa-trash-alt"></i>';
    cell6.appendChild(button1);
    // Aggiunge un evento click al pulsante "Elimina" della nuova riga
    button1.addEventListener("click", function () {
      let row = this.parentNode.parentNode;
      let studentId = row.cells[0].innerHTML;
      row.parentNode.removeChild(row);
      registro.deleteRow(studentId); // Chiama il metodo per eliminare lo studente dal registro
      saveToLocalStorage(); // Aggiorna il localStorage dopo la rimozione dello studente
    });

    setLocalStorage(); // Aggiorna il localStorage dopo l'aggiunta dello studente
  }
});
