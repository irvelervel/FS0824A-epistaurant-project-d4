import { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

class Admin extends Component {
  state = {
    // già adesso devo predisporre il mio oggetto state
    // con tutte le proprietà di cui intenderò disporre
    reservations: [],
    // se riesco a riempire questo array di reservations, l'interfaccia
    // è già "programmata" per creare tanti <li> quante sono le prenotazioni
  }

  render() {
    return (
      <>
        <h2>TAVOLI PRENOTATI</h2>
        <ListGroup>
          {this.state.reservations.map((res) => {
            return (
              <ListGroup.Item>
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
