describe('POST Providers', () => {
    it('Should be able to create a new provider', () => {
        cy.request({
            method: 'POST',
            url: 'providers',
            failOnStatusCode:false,
            body: {
			    "name": "Barbearia do Jorginho",
                "password":"123",
			    "address": "Av. Prudente de Morais, 6509,Candelária, Natal",
                "latitude":"-5.838215908220095",
                "longitude":"-35.2197227441876",
			    "description": "A melhor da Cidade",
			    "email": "barbeariajorge@gmail.com"
            }
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true);
        })
    }); 
});