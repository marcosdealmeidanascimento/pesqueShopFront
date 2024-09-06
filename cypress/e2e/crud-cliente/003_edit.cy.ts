/// <reference types="cypress" />

describe('test-filtering', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('should display all items', () => {
        cy.visit('http://localhost:5173/clients/')
        cy.get('#viewBtn').click()
        cy.get('#editarDadosPessoais').click()
        cy.get('#email').clear()
        cy.get('#email').type('marcos@mail.com')
        cy.get('#salvarDadosPessoaisBtn').click()
        cy.get('#dadosEndereco').click()
        // cy.get('#dadosSenha').click()
        // cy.get('#dadosCartao').click()
        // cy.get('#dadosPessoais').click()
    })
})