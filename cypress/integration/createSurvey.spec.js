describe("CreateSurveyFlow", () => {
  it("creates survey, adds questions, edits questions", () => {
    cy.visit("/new");
    cy.get("[data-cy=input-survey-title]").type("Test");
    const date = Date.now();
    const survey = {title: 'test', slug: `slug-${date}`}
    cy.get("[data-cy=input-survey-slug]").type(survey.slug);
    cy.get("[data-cy=button-survey-create]").click();

//     // cy.get("[data-cy=button-checkout]").click();
    // cy.location("pathname").should("match", /\/checkout$/);
//     cy.get("[data-cy=input-firstname]").type("Hungry");
//     cy.get("[data-cy=input-street]").type("Burgerstraße 20/3");
//     cy.get("[data-cy=input-zip-code]").type("1030");
//     cy.get("[data-cy=input-creditcard-name]").type("Hungry Pete");
//     cy.get("[data-cy=input-creditcard-number]").type("1234556677889");
//     cy.get("[data-cy=input-ccv]").type("123");
//     cy.get("[data-cy=button-buy]").click();
//     cy.on("window:alert", (str) => {
//       expect(str).to.equal(`please enter a last name!`);
//     });
//     cy.get("[data-cy=input-lastname]").type("Pete");
//     cy.get("[data-cy=button-buy]").click();
//     cy.location("pathname").should("match", /\/checkout\/thanks$/);
  });
});
