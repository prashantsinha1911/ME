const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Login for All Roles Part-2", () => {
  it("Pre-SignIn Verification, Login As Accountant", () => {
    //login as
    loginPageObjs.loginAs(usernames.accountantUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Unit Admin", () => {
    //login as
    loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As MarginEdge Admin", () => {
    //login as
    loginPageObjs.loginAs(usernames.marginedgeAdminUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Payroll Manager", () => {
    //login as
    loginPageObjs.loginAs(usernames.payrollManagerUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Bill Pay User", () => {
    //login as
    loginPageObjs.loginAs(usernames.billpayuserUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Associate Accountant", () => {
    //login as
    loginPageObjs.loginAs(usernames.associateAccUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });

  it("Pre-SignIn Verification, Login As Shift Reviewer", () => {
    //login as
    loginPageObjs.loginAs(usernames.shiftRevieweUN, creds.password);
    //check for the 1st header
    loginPageObjs.element.dashboardElement().should("exist");
    //logout from app
    loginPageObjs.logout();
  });
});
