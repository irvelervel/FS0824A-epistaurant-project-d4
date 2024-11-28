import { Navbar, Container, Nav } from 'react-bootstrap'

const CustomNavbar = (props) => {
  console.log('PROPS DELLA NAVBAR', props)
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid={props.isFluid}>
        <Navbar.Brand href="#home">Epistaurant - {props.subtitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Menu</Nav.Link>
            <Nav.Link href="#pricing">Prenota un tavolo</Nav.Link>
            <Nav.Link href="#admin">Amministrazione</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
