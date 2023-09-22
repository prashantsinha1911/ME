// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginViaAuth0", (username, password) => {
  let domainName = "https://auth-staging.dev.marginedge.com";
  cy.intercept(
    "POST",
    "https://auth-staging.dev.marginedge.com/oauth/token"
  ).as("token");
  cy.intercept("POST", "/api/vanity?fromUrl*").as("vanity");
  cy.visit(Cypress.env("host"));
  cy.wait(2000);
  // cy.origin(domainName, { args: { username, password, domainName } }, ({ username, password }) => {
  // verify localstorage token in auth0 page
  cy.wrap(localStorage).invoke("getItem", "ls.token").should("not.exist");
  // auth0 page logo, username and password
  cy.get("#custom-prompt-logo").should("be.visible");
  cy.get("input[name='username']")
    .should("be.visible")
    .and("not.be.disabled")
    .clear()
    .type(username, { delay: 0 })
    .should("have.value", username);
  cy.get("#custom-prompt-logo").should("be.visible").click();
  cy.get("input[name='password']")
    .should("be.visible")
    .and("not.be.disabled")
    .clear()
    .type(password, { delay: 0 });
  cy.get("#custom-prompt-logo").should("be.visible").click();
  // submit form works the same way as clicking continue button
  cy.get("form").submit((event) => {
    event.preventDefault();
  });
  cy.wait(1000);
  cy.wait("@token").its("response.statusCode").should("equal", 200);
  cy.wait("@vanity").its("response.statusCode").should("equal", 200);
  // });
  cy.wait(2000);
  // verify token in home page
  // cy.wrap(localStorage)
  //     .invoke('getItem', 'ls.token')
  //     .should('exist');
  cy.window().then((win) => {
    const token = win.localStorage.getItem("ls.token");
    expect(token).to.exist;
  });
  // verify cookies in home page
  cy.document()
    .its("cookie")
    .should("contain", "tmhDynamicLocale.locale")
    .and("contain", "NG_TRANSLATE_LANG_KEY");
  cy.get(`[data-testid='navbar-logo']`).should("be.visible");
  cy.get(`[ng-controller="PurchasingReportController"]`).should("be.visible");
  cy.get(`[ng-controller="BudgetOverviewController"]`).should("be.visible");
  cy.xpath(
    `//*[@heading="Top Price Movers"]//div[@class="panel panel-primary"]`
  ).should("be.visible");
});
