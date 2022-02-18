import React from "react"
import {CREATE, VIEW, MAPS, CREATE_PAGE, VIEW_PAGE, MAP_PAGE} from "./constants"
import {Nav, Navbar, Container} from "react-bootstrap"
import { NavLink as RouterNavLink } from "react-router-dom"
import {WOQLClientObj} from './init-woql-client'

export const Menu = () => {

    const {
		setPage
	} = WOQLClientObj()

    return <Navbar className={`navbar navbar-expand-lg navbar-dark bg-dark mb-3`}>
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        as={RouterNavLink}
                        title={CREATE}
                        to={CREATE_PAGE}
                        exact
                        id={CREATE}
                        onClick={(e) => setPage(CREATE_PAGE)}
                    >
                        {CREATE}
                    </Nav.Link>
                    <Nav.Link
                        as={RouterNavLink}
                        title={VIEW}
                        to={VIEW_PAGE}
                        exact
                        id={VIEW}
                        onClick={(e) => setPage(VIEW_PAGE)}
                        >
                        {VIEW}
                    </Nav.Link>
                    <Nav.Link
                        as={RouterNavLink}
                        title={MAPS}
                        to={MAP_PAGE}
                        exact
                        id={MAPS}
                        onClick={(e) => setPage(MAP_PAGE)}
                        >
                        {MAPS}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
  </Navbar>
}