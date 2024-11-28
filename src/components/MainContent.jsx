import { Component } from 'react'
import { Carousel, ListGroup } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
// ho importato l'array di oggetti di menu.json (le paste)
// con il nome di "pastasciutte"

class MainContent extends Component {
  state = {
    activePasta: pastasciutte[0], // carbonara
  }

  render() {
    return (
      <>
        <Carousel
          onSlid={(index) => {
            // console.log('SLIDE CAMBIATA!', index)
            // bene! ma quello che dobbiamo fare è mantenere aggiornato lo STATE
            // c'è solo un problema nel lavorare con lo state... è READ-ONLY
            // NON FATELO -> this.state.activePasta = "qualcos'altro"
            // this.setState è il metodo corretto per cambiare il valore di state
            this.setState({
              // questo oggetto verrà FUSO, "MERGIATO" lo stato corrente!
              activePasta: pastasciutte[index],
              // aggiorna l'activePasta con l'oggetto corrispondente al numero della slide visualizzata!!!
            })
          }}
        >
          {pastasciutte.map((pasta) => {
            return (
              <Carousel.Item key={pasta.id}>
                <img
                  src={pasta.image}
                  alt={'delicious ' + pasta.name}
                  className="img-fluid"
                />
                <Carousel.Caption>
                  <h3>{pasta.name}</h3>
                  <p>{pasta.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
        <ListGroup className="mt-3">
          {this.state.activePasta.comments.map((recensione) => {
            return (
              <ListGroup.Item key={recensione.id}>
                {recensione.author} voto {recensione.rating} -{' '}
                {recensione.comment}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
        <p>PREZZO PASTA CORRENTE: {this.state.activePasta.price}</p>
      </>
    )
  }
}

export default MainContent
