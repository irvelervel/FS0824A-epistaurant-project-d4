import { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

// name -> string
// phone -> string/number
// numberOfPeople -> string/number
// smoking -> boolean
// dateTime -> date string (ISO format)
// specialRequests -> string (facoltativo)

// Ogni volta che un componente React deve interagire con un form,
// questo componente deve possedere uno STATE

// two-way data binding tra lo stato del componente e i campi del form

class Reservation extends Component {
  // lo scopo di oggi è capire come lavorare in React con i FORM
  // se prima (in vanilla JS) raccoglievate i valori dei campi del form
  // solamente alla fine della compilazione dello stesso, quando intervenivate
  // all'evento di submit, adesso con React il componente sarà SEMPRE in pieno
  // controllo del contenuto del form, man mano che l'utente lo compilerà.
  // Arrivati alla fine del form, il componente avrà già raccolto tutti i dati
  // e dovrà semplicemente inviarli con la chiamata POST.
  // Raggiungeremo questo obiettivo creando un collegamento a DUE-VIE (two-way data binding) su OGNI campo del form, collegandolo alla corrispondente proprietà di "reservation" nello state.

  state = {
    reservation: {
      name: '',
      phone: '',
      numberOfPeople: '1',
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
  }

  submitReservation = (e) => {
    e.preventDefault()
    // facciamo la chiamata POST
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      method: 'POST',
      body: JSON.stringify(this.state.reservation),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // prenotazione salvata
          alert('Prenotazione inviata!')
          // svuotare i campi del form!
          // per svuotare il form, devo solo resettare lo stato!
          // ogni campo del form è collegato alla propria proprietà in "reservation"
          this.setState({
            reservation: {
              name: '',
              phone: '',
              numberOfPeople: '1',
              smoking: false,
              dateTime: '',
              specialRequests: '',
            },
          })
        } else {
          // errore nella prenotazione
          throw new Error('Errore nel salvataggio della prenotazione')
        }
      })
      .catch((err) => {
        console.log('ERRORE!!', err)
      })
  }

  render() {
    console.log('RENDER DEL FORM')

    return (
      <>
        <h2>PRENOTA UN TAVOLO</h2>

        <Form className="text-start" onSubmit={this.submitReservation}>
          <Form.Group className="mb-3">
            <Form.Label>Nome prenotazione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mario Rossi"
              required
              // PRIMA FRECCIA (LEGGO)
              value={this.state.reservation.name}
              // SECONDA FRECCIA (SCRIVO)
              onChange={
                // qui devo fare una funzione che in base a quello che ho scritto
                // setti il valore di this.state.reservation.name
                (e) => {
                  // console.log('THIS', this)
                  // console.log('e', e)
                  this.setState({
                    reservation: {
                      ...this.state.reservation, // phone, numberOfPeople etc.
                      name: e.target.value, // contenuto attuale dell'input
                    },
                  })
                }
              }
            />
          </Form.Group>

          {/* OPERATORE && (short-circuit) */}

          {/* se ti chiami "Pupo" o se ti chiami "Gigi" mostra l'Alert */}
          {(this.state.reservation.name === 'Pupo' ||
            this.state.reservation.name === 'Gigi') && (
            <Alert variant="success">Bel nome!</Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Numero di telefono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="340xxxxxxx"
              required
              value={this.state.reservation.phone}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    phone: e.target.value,
                  },
                })
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quanti sarete?</Form.Label>
            <Form.Select
              aria-label="Numero di persone"
              value={this.state.reservation.numberOfPeople}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    numberOfPeople: e.target.value,
                  },
                })
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Tavolo all'esterno?"
              checked={this.state.reservation.smoking}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    smoking: e.target.checked,
                  },
                })
              }}
            />
          </Form.Group>

          {/* generalmente le graffe servono per interpolare della logica nel JSX */}
          {/* {console.log('CIAO')} */}

          {/* oltre allo short-circuit è possibile utilizzare il ternary operator*/}
          {/* ? : */}
          {/* per simulare un if/else */}
          {this.state.reservation.smoking === true ? (
            <Form.Group className="mb-3">
              <Form.Label>Come mai?</Form.Label>
              <Form.Select aria-label="Perchè fumi">
                <option>Fumavano i miei</option>
                <option>Abitudine tra amici</option>
                <option>Non lo so</option>
              </Form.Select>
            </Form.Group>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label>Hai mai pensato di cominciare?</Form.Label>
              <Form.Select aria-label="Perchè non fumi">
                <option>Si</option>
                <option>No</option>
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Quando arrivi?</Form.Label>
            <Form.Control
              type="datetime-local"
              required
              value={this.state.reservation.dateTime}
              onChange={(e) =>
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    dateTime: e.target.value,
                  },
                })
              }
              min={`${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}T00:00`}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Allergie, richieste particolari?</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={this.state.reservation.specialRequests}
              onChange={(e) => {
                this.setState({
                  reservation: {
                    ...this.state.reservation,
                    specialRequests: e.target.value,
                  },
                })
              }}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Invia prenotazione
          </Button>
        </Form>
      </>
    )
  }
}

export default Reservation
