const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const centraCompanyConfigPageObj = require("../../page_objects/centralCompanyConfig.page");
const orderPage = require("../../page_objects/order.page");
const orderExtendedPage = require("../../page_objects/orderExtended.page");
const leadPriorityReportPage = require("../../page_objects/leadPriorityReport.page");
const testData = require("../../fixtures/rolePermission.json");
const utilObj = require("../../utils/util_generic");
const restaurantPageObj = require("../../page_objects/restaurant.page");

// static variable
const raiseConcernType = "NOT";
const raiseConcernType2 = "miscellaneous";
const text = "Test Concern";
const vendorName = "Arrow";
const invoiceNumberStr = testData.invoiceNum + utilObj.makeId();
const createConceptName = "Lena's";
const companyName = "Mid-States Management Group";
let createRestName = "rest" + "_regression_" + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Prashant" + utilObj.makeId().toLowerCase();
let lastName = "Sinha" + utilObj.makeId().toLowerCase();

const assignOrderToRole = (username, password, role) => {
  loginPageObjs.loginAs(username, password);
  hamburgerMenuPageObj.goToInvTaskItemsBellIcon();
  orderExtendedPage.assignToLeadAnalyst(role);
  loginPageObjs.logout();
};

const loginAsAccountManager = () => {
  loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
  loginPageObjs.chooseTenant(testData.tenantName);
};

const goToCentralAndCompanyConfig = () => {
  hamburgerMenuPageObj.goToCentralCompConfig();
};

const deleteAndAddCompanyConfig = (configType) => {
  centraCompanyConfigPageObj.deleteConfig();
  centraCompanyConfigPageObj.addConfigDeleteInvFlow(configType);
};

const goToOrdersPage = () => {
  hamburgerMenuPageObj.goToOrders();
};

const placeOrderAndPerformActions = () => {
  hamburgerMenuPageObj.goToPlaceOrders();
  orderPage.placeNewOrderForDelInv(vendorName);
  orderPage.searchOrder(vendorName);
  orderPage.attachPhoto();
  orderPage.searchOrder(vendorName);
  orderPage.endPreProcessing();
};

const logout = () => {
  loginPageObjs.logout();
};

const performOrderActionAndDeleteWithReason1 = () => {
  hamburgerMenuPageObj.goToOrdersParent();
  placeOrderAndPerformActions();
  orderPage.searchOrderWithoutsorting(vendorName);
  // delete the order with 1st reason
  orderExtendedPage.deleteOrderWithReason(0, text);
  // place the order again
  placeOrderAndPerformActions();
  orderPage.searchOrderWithoutsorting(vendorName);
};

//QA-215 Deleted Invoice Workflow
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", {
    failOnNonZeroExit: false
  });
});

describe("QA-215 Deleted Invoice Workflow", () => {
  it("Set Company Config for Delete Invoice", () => {
    // login as account manager
    loginAsAccountManager();
    // go to Central and company config
    goToCentralAndCompanyConfig();
    // create new company config
    centraCompanyConfigPageObj.addConfigDeleteInvFlow("NONE");
  });

  it("Place an Order, Attach Invoice, Cancel Preprocessing, Raise Concern", () => {
    // login as account manager
    loginAsAccountManager();
    // go to order page
    goToOrdersPage();
    // go to place new order
    placeOrderAndPerformActions();
    // logout as acc manager
    loginPageObjs.logout();
    // login as analyst and raise a concern
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // go to order page
    goToOrdersPage();
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
        role: "Lead"
      },
      {
        username: usernames.leadanalystUN,
        password: creds.password,
        role: "Managing"
      },
      {
        username: usernames.managinganalystUN,
        password: creds.password,
        role: "Lead"
      },
      {
        username: usernames.accountManagerUN,
        password: creds.password,
        role: "Admin"
      }
    ];
    for (const { username, password, role } of userRoles) {
      assignOrderToRole(username, password, role);
    }
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to lead priority report and click question report
    hamburgerMenuPageObj.goToSetupLeadPriorityReport();
    leadPriorityReportPage.clickQuestionReport();
  });

  it("Try to Delete the Order as Staff User", () => {
    // login as staff user
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    goToOrdersPage();
    orderPage.searchOrder(vendorName);
    // delete order
    orderExtendedPage.deleteOrderWithReasonStaff();
  });

  it("Try to Delete the Order as Non Staff User", () => {
    // login as staff user
    loginPageObjs.loginAs(usernames.marginedgeAdminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    goToOrdersPage();
    orderPage.searchOrderWithoutsorting(vendorName);
    // delete order
    orderExtendedPage.deleteOrderWithoutReason();
  });

  it("Login, Place Order, Raise Concern and Save", () => {
    // login as account manager
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
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

  it("Escalate the Order in various user roles and assign it to CS Lead", () => {
    const userRoles = [
      {
        username: usernames.analyst2UN,
        password: creds.password,
        role: "Lead"
      },
      {
        username: usernames.leadanalystUN,
        password: creds.password,
        role: "Managing"
      },
      {
        username: usernames.managinganalystUN,
        password: creds.password,
        role: "Lead"
      }
    ];
    for (const { username, password, role } of userRoles) {
      assignOrderToRole(username, password, role);
    }
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
  });

  it("Login as CS Lead, Add Response in Text Box and Save", () => {
    // login as account manager
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to invoice tasks
    hamburgerMenuPageObj.goToInvTaskItemsBellIcon();
    // add response and save
    orderExtendedPage.addResponseAndSaveInvoice(text);
    // go to Order page and check for the concern and delete the order
    hamburgerMenuPageObj.goToOrders();
    // search order
    orderPage.searchOrder(vendorName);
    orderPage.checkConcern();
  });

  it("Login as Analyst 1, complete IR and Recon with adding new concern Miscellaneous", () => {
    //  login as account manager
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // go to place new order
    placeOrderAndPerformActions();
    // logout as acc manager
    loginPageObjs.logout();
    // login as analyst and raise a concern
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // search order
    orderPage.searchOrderWithoutsorting(vendorName);
    // add concern
    orderPage.raiseConcern(raiseConcernType, text);
    // search order
    orderPage.searchOrderWithoutsorting(vendorName);
    // complete IR
    orderPage.irProcess(invoiceNumberStr);
    // search order
    orderPage.searchOrderWithoutsorting(invoiceNumberStr);
    // add concern
    orderPage.raiseConcernForRecon(raiseConcernType2, text);
    // search order
    orderPage.searchOrderWithoutsorting(invoiceNumberStr);
    // complete reconcillation
    orderPage.completeReconWithResolvingConcern(invoiceNumberStr);
    // search order
    orderPage.searchOrderWithoutsorting(invoiceNumberStr);
    // delete Order
    orderPage.deleteOrder(text);
  });

  it("Login as Account Manager, Change the Config, Place Orders and Delete as an accountant", () => {
    // using the common methods to login as account manager
    loginAsAccountManager();
    loginPageObjs.chooseTenant(testData.tenantName);
    // using the common methods to go to company config
    goToCentralAndCompanyConfig();
    // method for deleting and adding new company config
    deleteAndAddCompanyConfig("EMAIL");
    hamburgerMenuPageObj.goToOrdersParent();
    placeOrderAndPerformActions();
    logout();
    // login as accountant
    loginPageObjs.loginAs(usernames.accountantUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    goToOrdersPage();
    orderPage.searchOrderWithoutsorting(vendorName);
    // delete order without adding any reason
    orderExtendedPage.deleteOrderWithoutReason();
    logout();
    // using the common methods to login as account manager
    loginAsAccountManager();
    goToCentralAndCompanyConfig();
    deleteAndAddCompanyConfig("ESCALATE");
    hamburgerMenuPageObj.goToOrdersParent();
    placeOrderAndPerformActions();
    logout();

    loginPageObjs.loginAs(usernames.accountantUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    goToOrdersPage();
    orderPage.searchOrderWithoutsorting(vendorName);
    orderExtendedPage.deleteOrderWithoutReason();
    logout();
  });

  it("Login as Account Manager, Delete the Config, Place Orders and Delete as an accountant", () => {
    loginAsAccountManager();
    loginPageObjs.chooseTenant(testData.tenantName);
    goToCentralAndCompanyConfig();
    centraCompanyConfigPageObj.deleteConfig();
    hamburgerMenuPageObj.goToOrdersParent();
    placeOrderAndPerformActions();
    logout();

    loginPageObjs.loginAs(usernames.accountantUN, creds.password);
    goToOrdersPage();
    orderPage.searchOrderWithoutsorting(vendorName);
    orderExtendedPage.deleteOrderWithoutReason();
    logout();
  });

  it("Login as Account Manager, Add the Config in Email and Escalate Mode, Place Orders and Delete with reason 1 and 2", () => {
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    goToCentralAndCompanyConfig();
    centraCompanyConfigPageObj.addConfigDeleteInvFlow("EMAIL");
    performOrderActionAndDeleteWithReason1();
    // delete the order with 2nd reason
    orderExtendedPage.deleteOrderWithReason(1, text);
    // change the config
    goToCentralAndCompanyConfig();
    deleteAndAddCompanyConfig("ESCALATE");
    performOrderActionAndDeleteWithReason1();
    // delete the order with 2nd reason
    orderExtendedPage.deleteOrderWithReason(1, text);
    goToCentralAndCompanyConfig();
    centraCompanyConfigPageObj.deleteConfig();
  });

  it("Login as Admin, Add the Config in Email, Create Restaurant Uint, add companyt concept", () => {
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    goToCentralAndCompanyConfig();
    // create a config in email mode
    centraCompanyConfigPageObj.addConfigDeleteInvFlow("EMAIL");
    // create a restaurant
    //go to restaurant
    hamburgerMenuPageObj.goToRestaurant();
    //create restaurant
    restaurantPageObj.createRestaurant(
      createConceptName,
      companyName,
      createRestName,
      emailID,
      loginID,
      firstName,
      lastName
    );
  });

  it("Login as Admin, Add Config in Email Mode, Place Orders, and Delete with Reasons", () => {
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    // using loops to iterate over the reason number 3 to 5 and then others
    for (let reasonIndex = 2; reasonIndex <= 5; reasonIndex++) {
      placeOrderAndPerformActions();
      orderPage.searchOrderWithoutsorting(vendorName);
      orderExtendedPage.deleteOrderWithReason(reasonIndex, text);
    }
  });

  it("Login as Admin, Add Config in Escalate Mode, Place Orders, and Delete with Reasons", () => {
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    loginPageObjs.chooseTenant(testData.tenantName);
    goToCentralAndCompanyConfig();
    deleteAndAddCompanyConfig("ESCALATE");
    hamburgerMenuPageObj.goToOrdersParent();
    // using loops to iterate over the reason number 3 to 5 and then others
    for (let reasonIndex = 2; reasonIndex <= 5; reasonIndex++) {
      placeOrderAndPerformActions();
      orderPage.searchOrderWithoutsorting(vendorName);
      orderExtendedPage.deleteOrderWithReason(reasonIndex, text);
    }
    goToCentralAndCompanyConfig();
    centraCompanyConfigPageObj.deleteConfig();
  });
});
