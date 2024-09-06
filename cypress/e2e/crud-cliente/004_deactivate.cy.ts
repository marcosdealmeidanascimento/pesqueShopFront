/// <reference types="cypress" />

describe('test-filtering', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('should display all items', () => {
        cy.visit('http://localhost:5173/clients/')
        cy.get('#deleteBtn').click()
        cy.get('.acceptDelete').click()
        cy.get('#statusFiltro').click()
        cy.get('#filtrarBtn').click()
    })
})