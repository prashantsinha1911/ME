const util_generic = require("../utils/util_generic");
const inviteUserPage = require("./inviteUser.page");

class loginPage {
  element = {
    marginedgeLogo: () => cy.xpath(`//*[@data-testid='navbar-logo']`),
    userNameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    loginText: () => cy.xpath(`//label[text()='Login']`),
    forgetPasswordLink: () => cy.xpath(`//*[@href="#/forgot"]`),
    signInBtn: () => cy.get("#signInBtn"),
    logoutDD: () => cy.get(`#userNameDropdown`),
    clickLogout: () => cy.get(`#logoutBtn`),
    storeToggle: () => cy.get("#unitMenu_dd"),
    // there is a 1 second debounce in search input filter
    search: () => cy.wait(1000).get(`#searchTenant`),
    selectTenant: () => cy.wait(3000).get(`#unitname`), // wait for server-side restaurant unit search to complete before clicking
    dashboardElement: () =>
      cy.xpath(`//*[@ng-controller="PurchasingReportController"]`),
    budgetDashboardElem: () =>
      cy.xpath(`//*[@ng-controller="BudgetOverviewController"]`),
    topPriceMoverDashboardElem: () =>
      cy.xpath(
        `//*[@heading="Top Price Movers"]//div[@class="panel panel-primary"]`
      ),
    salesDashboardElement: () =>
      cy.xpath(
        `//panel[@class='ng-scope ng-isolate-scope']//div[@class='panel panel-green']`
      ),
    settings: () => cy.xpath(`//*[@href='#/settings']`),
    passwordChange: () => cy.xpath(`//*[@data-testid='user-password']`),
    emailAddressInput: () => cy.xpath(`//input[@placeholder='Your e-mail']`),
    saveBtn: () => cy.xpath(`//button[normalize-space()='Save']`)
  };

  verifyHomePageForUser() {
    this.element.dashboardElement().should("be.visible");
    this.element.budgetDashboardElem().should("be.visible");
    this.element.topPriceMoverDashboardElem().should("be.visible");
  }

  verifyHomePage() {
    this.element.dashboardElement().should("be.visible");
    this.element.budgetDashboardElem().should("be.visible");
    this.element.topPriceMoverDashboardElem().should("be.visible");
    this.element.salesDashboardElement().should("be.visible");
  }

  verifyLoginPageElement() {}

  loginAs(username, password) {
    cy.loginViaAuth0(username, password);
  }

  logout() {
    cy.wait(2000);
    this.element.logoutDD().should("be.visible").click({
      force: true
    });
    this.element.clickLogout().should("be.visible").click({
      force: true
    });
    cy.wait(2000);
    let domainName = "https://auth-staging.dev.marginedge.com";
    // cy.origin(domainName, () => {
    // auth page userName and password
    cy.get("input[name='username']")
      .should("be.visible")
      .and("not.be.disabled");
    cy.get("input[name='password']")
      .should("be.visible")
      .and("not.be.disabled");
    cy.get("#custom-prompt-logo").should("be.visible");
    cy.get(`[data-testid='navbar-logo']`).should("not.exist");
    // })
    cy.wait(500);
  }

  chooseTenant(tenant) {
    util_generic.checkRestUnit(tenant, tenant);
  }

  checkPasswordChangeAndSettings() {
    this.element.logoutDD().should("be.visible").click({
      force: true
    });
    // this element is no longer visible in the UI
    // this.element.passwordChange().should('be.visible');
    this.element.settings().should("be.visible");
  }

  loginAsNewUser(username, password) {
    this.element.userNameInput().should("be.visible").clear().type(username);
    this.element.passwordInput().type(password);
    this.element.signInBtn().should("not.be.disabled").click();
    cy.get("body").then(($body) => {
      if ($body.find('//*[@value="accept"]').length) {
        cy.get('//*[@value="accept"]').click();
      } else {
        cy.wait(3000);
      }
    });
    inviteUserPage.accpetTerms();
    this.element.marginedgeLogo().should("be.visible");
    this.element.dashboardElement().should("be.visible");
  }

  setEmailAddressExistingUser() {
    cy.wait(1000);
    this.element.logoutDD().should("be.visible").click({
      force: true
    });
    this.element.settings().should("be.visible").click();
    //this.element.emailAddressInput().should('be.visible').clear().type(`edge.testlab1@gmail.com`);
    this.element.saveBtn().should("be.visible").click();
  }
}
module.exports = new loginPage();
