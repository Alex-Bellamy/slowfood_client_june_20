describe('User can add a product to his/her order', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/products',
      response: "fixture:products.json",
    });
    
    cy.visit("/")
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:registration_response.json",
      headers: {
        uid: "user@mail.com"
      }
    })

    cy.get("#login").click()
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com")
      cy.get("#password").type("password")
      cy.get('button').contains("Submit").click()
    })

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: "fixture:order_post_response",
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/orders/1",
      response: {
        message: "The product has been added to your order",
        order_id: 1,
      },
    });
  });

  it("user get a confirmation when adding product to order", () => {
    cy.get("#product-1").within(() => {
      cy.get("button").contains("Add to order").click();
      cy.get("#order-message").should("contain",
        "The product has been added to your order"
      );
    });
    cy.get("product-3").within(() => {
      cy.get("button").contains("Add to order").click();
      cy.get('.message').should(
        "contain",
        "The product has been added to your order"
      );
    });

  });

});