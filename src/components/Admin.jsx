import { Component } from 'react'
import { ListGroup, Spinner, Alert, Button } from 'react-bootstrap'

// PARTE INIZIALE DELLA LEZIONE (impostazione delle basi)
// 1) Ho creato un componente a classe perchè avevo bisogno di uno "state", un oggetto dove "parcheggiare" i dati che eventualmente recupererò dalle API
// 2) Ho inizializzato "reservations" nello state come array vuoto, perchè so che in futuro diventerà un array di oggetti (di prenotazioni)
// 3) ho creato il metodo "render" (obbligatorio nei componenti a classe) per istruire l'interfaccia a generare tanti <li> quanti sono gli elementi nell'array reservations all'interno dello state
// 4) quindi il componente si monta, inizializza lo stato, invoca render() una prima volta e disegna l'h2, la ul e mappa l'array delle reservations per capire quanti <li> creare: poichè l'array è vuoto, crea 0 <li> e il componente finisce la fase di montaggio.

// INTRODUZIONE DELLA FETCH PER IL RECUPERO DATI
// 1) creo un metodo "getReservations()" il cui scopo è effettuare una HTTP REQUEST tramite il metodo "fetch()" e recuperare dall'endpoint "/reservation" la lista delle prenotazioni attualmente esistenti.
// 2) una volta ottenuto il JSON di risposta utilizzo il metodo this.setState() per modificare lo stato del componente: il nuovo valore di "reservations" è ora l'array di prenotazioni recuperato dalle API
// 3) ora il metodo getReservations() è completo: devo solo invocarlo.
// --- WARNING: QUESTA È SOLO UNA DIMOSTRAZIONE DI COSA NON FARE ---
// Provo a inserirlo dentro il metodo render(), che viene eseguito automaticamente all'avvio del componente: questo provoca un L O O P INFINITO! Abbiamo appena imparato che NON dobbiamo inserire un metodo che esegue un this.setState() all'interno dell'invocazione di render(). Come mai?
// - OGNI VOLTA CHE CAMBIANO LE PROPS O CAMBIA LO STATE, render() VIENE RE-INVOCATO -
// quindi il fatto di invocare getReservations (che contiene un this.setState) in render() ci porta in un ciclo senza fine, perchè dopo setState viene invocato render, che invoca getReservations, che invoca render etc. etc.
// --- FINE WARNING ---
// abbiamo quindi necessità di utilizzare un metodo di lifecycle che NON sia render(): ci servirebbe un metodo che venga invocato sempre all'avvio del componente ma che NON venga re-invocato in caso di cambio di stato. Questo metodo si chiama "componentDidMount".

// STEPS DI FUNZIONAMENTO AD APPLICAZIONE COMPLETATA:
// 1) il componente inizia la fase di montaggio: crea uno stato con un array vuoto, e lancia render() la prima volta: viene creato il titolo (l'h2), viene creato il guscio per la lista ma il suo contenuto è vuoto, perchè viene mappato un array vuoto e nessun contenuto viene generato.

// 2) se presente, componentDidMount viene lanciato, immediatamente dopo il primo render() (e non verrà invocato mai più!); il nostro componentDidMount lancia getReservations, che si occupa di fare la fetch, recupera un array pieno di prenotazioni e lo salva nello state.

// 3) A causa del setState, il metodo render() si risveglia e ricomincia a ridisegnare il contenuto del componente. Il titolo h2 è lo stesso del primo render (e quindi non lo ridisegna), la <ul> è la stessa del primo render ma il contenuto della lista dipende da un array che è cambiato: si mette quindi a disegnare tutti gli <li> necessari. La pagina si è caricata.

class Admin extends Component {
  state = {
    // già adesso devo predisporre il mio oggetto state
    // con tutte le proprietà di cui intenderò disporre
    reservations: [],
    // se riesco a riempire questo array di reservations, l'interfaccia
    // è già "programmata" per creare tanti <li> quante sono le prenotazioni

    // inserisco una variabile di stato aggiuntiva che mi permetterà di mostrare/nascondere l'indicatore di caricamento
    isLoading: true,
    isError: false,
  }

  getReservations = () => {
    // questa funzione recupererà dalle API una lista di prenotazioni
    // e ce la farà vedere
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore nel recupero prenotazioni')
        }
      })
      .then((arrayOfReservations) => {
        // abbiamo recuperato l'array di prenotazioni
        console.log('PRENOTAZIONI ESISTENTI', arrayOfReservations)
        // una volta recuperate le prenotazioni, le salvo nello stato
        this.setState({
          reservations: arrayOfReservations,
          isLoading: false, // spengo lo spinner!
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          // qua le prenotazioni non ci sono, siamo in uno stato di errore...
          // ...però almeno spengo lo spinner!
          isLoading: false,
          // se finisco qua, è il caso di mostrare un errore all'utente!
          // accendo l'Alert
          isError: true,
        })
      })
  }

  // un metodo che invoca un this.setState() non deve MAI essere invocato
  // liberamente all'interno di render()! Questo perchè un this.setState()
  // PROVOCA una ri-esecuzione di render(), che richiamerebbe il this.setState()
  // e così via... entrando in un ciclo infinito.

  // quindi la soluzione qual è? la soluzione è NON invocare getReservations() dentro render(), perchè causerebbe un ciclo infinito! dobbiamo trovare un metodo di lifecycle DIVERSO che venga eseguito UNA-VOLTA-SOLA, al montaggio del componente e basta! questo metodo si chiama "componentDidMount()"

  componentDidMount() {
    // cascasse il mondo, questo componentDidMount verrà eseguito UNA VOLTA SOLA (dopo il primo render all'avvio) e non verrà più lanciato per tutto il ciclo vita del componente; è il posto perfetto per eseguire operazioni lunghe/complesse nella fase di montaggio, nel 90% dei casi un recupero dati nelle API per il popolamento dell'interfaccia
    this.getReservations()
  }

  // render() in un componente React viene invocato al MONTAGGIO del componente (cioè quando raggiunge il DOM) e viene RE-invocato ogni volta che cambia lo STATE e ogni volta che cambiano le PROPS

  render() {
    // NON SI METTE IN RENDER!
    // this.getReservations()
    console.log('RENDER DI ADMIN')
    return (
      <>
        <h2>TAVOLI PRENOTATI</h2>

        {/* TRUE && TRUE -> TRUE */}
        {/* FALSE && TRUE -> FALSE */}
        {/* TRUE && FALSE -> FALSE */}
        {/* FALSE && FALSE -> FALSE */}
        {/* if(10 > 5 && name==='Stefano'){} */}

        {/* qui vado ad inserire un messaggio d'errore nel caso la fetch vada male */}
        {this.state.isError && (
          <Alert variant="danger">Oops! Qualcosa è andato storto!😭</Alert>
        )}

        {/* qui vado ad inserire un indicatore di caricamento */}
        {/* un AND ha bisogno di TRUE && TRUE per essere valido */}
        {/* if this.state.loading... */}
        {this.state.isLoading && (
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {/* ultimo caso limite: il caricamento va a buon fine, non ci sono errori ma l'array di prenotazioni è vuoto. Come lo mostro all'utente? */}
        {!this.state.isLoading &&
          !this.state.isError &&
          this.state.reservations.length === 0 && (
            <ListGroup>
              <ListGroup.Item>
                Non ci sono al momento prenotazioni
              </ListGroup.Item>
            </ListGroup>
          )}

        <ListGroup>
          {this.state.reservations.map((res) => {
            // console.log(res)
            return (
              <ListGroup.Item
                key={res._id}
                className="d-flex justify-content-between align-items-center"
              >
                <span>
                  {res.name} per {res.numberOfPeople} il {res.dateTime}
                </span>
                <Button
                  variant="warning"
                  onClick={() => {
                    fetch(
                      'https://striveschool-api.herokuapp.com/api/reservation/' +
                        res._id,
                      {
                        method: 'DELETE',
                      }
                    )
                      .then((response) => {
                        if (response.ok) {
                          // ho eliminato l'elemento
                          alert('eliminato')
                          // ottimo! ora aggiorniamo la lista in tempo reale: vado a recuperare nuovamente
                          // tutte le prenotazioni rimaste in database
                          this.getReservations()
                          // lo stato viene ri-settato con l'array attuale, a causa di ciò render() viene
                          // nuovamente re-invocato e grazie alla key che identifica ogni elemento capisce al volo quale elemento non c'è più e in un nanosecondo lo rimuove dalla lista!
                        } else {
                          throw new Error('errore durante eliminazione')
                        }
                      })
                      .catch((err) => {
                        alert('non eliminato', err)
                      })
                  }}
                >
                  X
                </Button>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </>
    )
  }
}

export default Admin
