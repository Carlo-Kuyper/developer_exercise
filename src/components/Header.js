import {Container, Nav, Navbar, Image} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return(
      <Navbar collapseOnSelect expand="lg" fixed="top" style={{backgroundColor:'#131313', boxShadow: '0px 4px 8px 0px rgba(0,0,0,1)'}} variant="dark">
        <Container>
          <Navbar.Brand href="/" className="d-flex justify-content-between w-100"><Image style={{ width:'3vw'}} src="../logo.png"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link href="#home" activeclassname="active">Home</Nav.Link>              
              <Nav.Link href="#active" activeclassname="active">About</Nav.Link>              
              <Nav.Link href="#sermons" activeclassname="active">Sermons</Nav.Link>          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Header;