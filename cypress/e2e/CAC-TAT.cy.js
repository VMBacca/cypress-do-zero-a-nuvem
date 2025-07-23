describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {    
      cy.visit('./src/index.html')
})

  it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os camposobrigatórios e envia o formulário', ()=>{
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyz', 10)
    cy.get('#firstName').type('Vini')
    cy.get('#lastName').type('MB')
    cy.get('#email').type('vini@test.com.br')
    cy.get('#open-text-area').type(longText, {delay : 0})
    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
    cy.get('#firstName').type('Vini')
    cy.get('#lastName').type('MB')
    cy.get('#email').type('vinitest.com.br')
    cy.get('#open-text-area').type('Teste')
    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('verifica se um valor não numerico for digitado no campo telefone seu valor será vazio', () => {
    cy.get('#phone')
      .type('abc')
        .should('have.value', '')
  })  

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Vini')
    cy.get('#lastName').type('MB')
    cy.get('#email').type('vini@test.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check();

    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Vini').should('have.value', 'Vini').clear().should('have.value', '')
    cy.get('#lastName').type('MB').should('have.value', 'MB').clear().should('have.value', '')
    cy.get('#email').type('vini@test.com.br').should('have.value', 'vini@test.com.br').clear().should('have.value', '')
    cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
    cy.get('#phone').type('5599996666').should('have.value', '5599996666').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado HARD CODED', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado WITH VARIABLES', () => {
    const data = {
      firstName: 'Vini',
      lastName: 'MB',
      email: 'vini@test.com.br',
      text: 'Teste.'
    }
    
    cy.fillMandatoryFieldsAndSubmitWithVariables(data)

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado WITH DEFAULT VARIABLES', () => {
    // const data = {
    //   firstName: 'Vini',
    //   lastName: 'MB',
    //   email: 'vini@test.com.br',
    //   text: 'Teste.'
    // }
    
    //cy.fillMandatoryFieldsAndSubmitWithDefaultVariables(data)
    cy.fillMandatoryFieldsAndSubmitWithDefaultVariables()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('myFixture')
    
    cy.get('#file-upload')
      .selectFile('@myFixture')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})
