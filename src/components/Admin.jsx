import { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

// STEPS

class Admin extends Component {
  state = {
    // già adesso devo predisporre il mio oggetto state
    // con tutte le proprietà di cui intenderò disporre
    reservations: [],
    // se riesco a riempire questo array di reservations, l'interfaccia
    // è già "programmata" per creare tanti <li> quante sono le prenotazioni
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
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // un metodo che invoca un this.setState() non deve MAI essere invocato
  // liberamente all'interno di render()! Questo perchè un this.setState()
  // PROVOCA una ri-esecuzione di render(), che richiamerebbe il this.setState()
  // e così via... entrando in un ciclo infinito.

  // quindi la soluzione qual è? la soluzione è NON invocare getReservations() dentro render(), perchè causerebbe un ciclo infinito! dobbiamo trovare un metodo di lifecycle DIVERSO che venga eseguito UNA-VOLTA-SOLA, al montaggio del componente e basta! questo metodo si chiama "componentDidMount()"

  componentDidMount() {
    this.getReservations()
  }

  // render() in un componente React viene invocato al MONTAGGIO del componente (cioè quando raggiunge il DOM) e viene RE-invocato ogni volta che cambia lo STATE e ogni volta che cambiano le PROPS

  render() {
    // NON SI METTE IN RENDER!
    // this.getReservations()
    return (
      <>
        <h2>TAVOLI PRENOTATI</h2>
        <ListGroup>
          {this.state.reservations.map((res) => {
            // console.log(res)
            return (
              <ListGroup.Item key={res._id}>
                {res.name} per {res.numberOfPeople} il {res.dateTime}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </>
    )
  }
}

export default Admin
