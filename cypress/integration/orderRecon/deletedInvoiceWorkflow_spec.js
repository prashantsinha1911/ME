const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const centraCompanyConfigPageObj = require("../../page_objects/centralCompanyConfig.page");
const orderPage = require("../../page_objects/order.page");
const orderExtendedPage = require("../../page_objects/orderExtended.page");
const leadPriorityReportPage = require("../../page_objects/leadPriorityReport.page");
const testData = require("../../fixtures/rolePermission.json")

// static variable
const raiseConcernType = "NOT";
const text = "Test Concern";
const vendorName = "Arrow";

const assignOrderToLeadAnalyst = (username, password, role) => {
  loginPageObjs.loginAs(username, password);
  hamburgerMenuPageObj.goToInvTaskItemsBellIcon();
  orderExtendedPage.assignToLeadAnalyst(role);
  loginPageObjs.logout();
};

//QA-215 Deleted Invoice Workflow
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", {
    failOnNonZeroExit: false,
  });
});

describe("QA-215 Deleted Invoice Workflow", () => {
  it("Set Company Config for Delete Invoice", () => {
    // login as account manager
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    // go to Central and company config
    hamburgerMenuPageObj.goToCentralCompConfig();
    // create new company config
    centraCompanyConfigPageObj.addConfigDeleteInvFlow();
  });

  it("Place an Order, Attach Invoice, Cancel Preprocessing, Raise Concern", () => {
    // login as account manager
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.placeNewOrderForDelInv(vendorName);
    // attach the picture
    orderPage.searchOrder(vendorName);
    orderPage.attachPhoto();
    // cancel preprocessing
    orderPage.searchOrder(vendorName);
    // end preprocessing
    orderPage.endPreProcessing();
    // logout as acc manager
    loginPageObjs.logout();
    // login as analyst and raise a concern
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // search order
    orderPage.searchOrder(vendorName);
    // add concern
    orderPage.raiseConcern(raiseConcernType, text);
  });

  it("Escalate the Order in various user roles", () => {
    const userRoles = [
      {
        username: usernames.analyst2UN,
        password: creds.password,
        role: "Lead",
      },
      {
        username: usernames.leadanalystUN,
        password: creds.password,
        role: "Managing",
      },
      {
        username: usernames.managinganalystUN,
        password: creds.password,
        role: "Lead",
      },
      {
        username: usernames.accountManagerUN,
        password: creds.password,
        role: "Admin",
      },
    ];
    for (const { username, password, role } of userRoles) {
      assignOrderToLeadAnalyst(username, password, role);
    }
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    // go to lead priority report and click question report
    hamburgerMenuPageObj.goToSetupLeadPriorityReport();
    leadPriorityReportPage.clickQuestionReport();
  });

  it("Try to Delete the Order as Staff User", () => {
    // login as staff user
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
     // go to order page
     hamburgerMenuPageObj.goToOrders();
     orderPage.searchOrder(vendorName);
     // delete order
     orderExtendedPage.deleteOrderWithReason();
  });

  it("Try to Delete the Order as Non Staff User", () => {
    // login as staff user
    loginPageObjs.loginAs(usernames.marginedgeAdminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
     // go to order page
     hamburgerMenuPageObj.goToOrders();
     orderPage.searchOrderWithoutsorting(vendorName);
     // delete order
     orderExtendedPage.deleteOrderWithoutReason();
  });
});
