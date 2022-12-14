describe('GET Providers', () => {
    it('Should return all providers', () => {
        cy.request({
            method: 'GET',
            url: 'providers',
            failOnStatusCode:false
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true);
            if (response.body.providers.length != 0){
                expect(response.body.providers[0]).to.have.property('id')
                expect(response.body.providers[0]).to.have.property('name')
                expect(response.body.providers[0]).to.have.property('email')
                expect(response.body.providers[0]).to.have.property('address')
                expect(response.body.providers[0]).to.have.property('description')
                expect(response.body.providers[0]).to.have.property('rating')
            }      
        })
    }); 
});