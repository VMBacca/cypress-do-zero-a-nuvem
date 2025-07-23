Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Vini')
    cy.get('#lastName').type('MB')
    cy.get('#email').type('vini@test.com.br')
    cy.get('#open-text-area').type('Teste.')
    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithVariables', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithDefaultVariables', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    text: 'Test.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})