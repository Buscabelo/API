describe('Teste de busca', () => {
  it('Pesquisar por um estabelecimento', () => {
    cy.visit('http://localhost:3001')

    cy.get('.searchinput').type('Tik Corte')
    cy.get('.searchicon').click()

    cy.request({
      method:'GET', 
      url: 'http://localhost:3000/v1/providers/search?name=Tik Corte'
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.success).to.eq(true)
    })
  })
})