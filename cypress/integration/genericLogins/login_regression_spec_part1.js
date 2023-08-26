const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Login for All Roles part-1", () => {
  it("Pre-SignIn Verification, Login As Developer", () => {
    //login as
    loginPageObjs.loginAs(usernames.developerUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Admin", () => {
    //login as
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Account Manager", () => {
    //login as
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Managing Analyst", () => {
    //login as
    loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Lead Analyst", () => {
    //login as
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Analyst", () => {
    //login as
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As User", () => {
    //login as
    loginPageObjs.loginAs(usernames.userUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Manager", () => {
    //login as
    loginPageObjs.loginAs(usernames.managerUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });
});
