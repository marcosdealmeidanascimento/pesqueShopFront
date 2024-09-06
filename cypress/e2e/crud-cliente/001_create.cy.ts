/// <reference types="cypress" />

describe('test-filtering', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('should display all items', () => {
        cy.visit('http://localhost:5173/clients/')
        cy.get('#clientTable .p-datatable-header #criarBtn').click()
        cy.get('#nomeCompleto').type('Marcos de Almeida Nascimento')
        cy.get('#genero').click()
        cy.get('#genero_0 ').click()
        cy.get("body").click({ force: true, x: 0, y: Cypress.$(window).height() })
        cy.get('#email').type('marcos.nascimento@gmail.com')
        cy.get('#cpf').type('483.769.268-02')
        cy.get('#dataNascimento').clear()
        cy.get('#dataNascimento').type('01/05/2000')
        cy.get("body").click({ force: true, x: 0, y: Cypress.$(window).height() })
        cy.get('#telefone').type('11999999999')
        cy.get('#tipoTel').click()
        cy.get('#tipoTel_0').click()
        cy.get("body").click({ force: true, x: 0, y: Cypress.$(window).height() })
        cy.get("#secondStep").click()
        cy.scrollTo('top');
        cy.get('#cep').type('08577250')
        cy.get('#tipoLog').click()
        cy.get('#tipoLog_0').click()
        cy.get('body').click(0, 0)
        cy.get('#tipoRes').click()
        cy.get('#tipoRes_0').click()
        cy.get("body").click({ force: true, x: 0, y: Cypress.$(window).height() })
        cy.get('#numero').type('516')
        cy.get('#complemento').type('Casa')
        cy.get('#pais').type('Brasil')
        cy.get('#apelidoEnd').type('Casa Itaquá')
        cy.get('#observacao').type('Casa do Marcos')
        cy.get('#thirdStep').click()
        cy.get('#numeroCartao').type('1234567890123456')
        cy.get('#bandeira').click()
        cy.get('#bandeira_0').click()
        cy.get("body").click(0, 0)
        cy.get('#cvv').type('123')
        cy.get('#nomeImpresso').type('Marcos Almeida Nascimento')
        cy.get('#validade').clear()
        cy.get('#validade').type('11/2039')
        cy.get("body").click(0, 0)
        cy.get('#apelidoCartao').type('Cartão do Marcos')
        cy.get('#fourthStep').click()
        cy.get('body').click(0, 0)
        cy.get('#senha').type('!@#123qweQ')
        cy.get('#confSenha').type('!@#123qweQ')
        cy.get('#salvarBtn').click()
    })
})