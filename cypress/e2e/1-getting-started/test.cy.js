/// <reference types="cypress" />

describe('test-filtering', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('should display all items', () => {
        cy.visit('http://localhost:5173/clients/')
        cy.get('#clientTable .p-datatable-header #optionsFilter #nomeFiltro').type('M')
        cy.get('#clientTable .p-datatable-header #actionsFilter #filtrarBtn').click()
        cy.get('#clientTable .p-datatable-header #actionsFilter #limparBtn').click()
        cy.get('#clientTable .p-datatable-header #optionsFilter #cpfFiltro').type('483-769-268-02')
        cy.get('#clientTable .p-datatable-header #actionsFilter #filtrarBtn').click()
    })
})