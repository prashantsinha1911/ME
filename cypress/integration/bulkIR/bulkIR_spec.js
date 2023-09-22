const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const orderExtendedPage = require("../../page_objects/orderExtended.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const utilObj = require("../../utils/util_generic");
const util_generic = require("../../utils/util_generic");
const restaurantPage = require("../../page_objects/restaurant.page");

let timeStamp = new Date().toISOString();
let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum2 = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum3 = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum4 = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum5 = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum6 = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum7 = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let newCustomerName2 = testData.customerName;
let newCustomerName3 = testData.customerName;
let createRestName1 = testData.restaurant + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Bruce" + utilObj.makeId().toLowerCase();
let lastName = "Wayne" + utilObj.makeId().toLowerCase();

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

//QA-119 Bulk IR
describe("Bulk IR", () => {
  it("Attach two Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    cy.wait(1000);
    //another invoice processing
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    loginPageObjs.logout();
  });

  it("IR order Complete", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    // complete initial Review without IRComplete Checkbox
    orderExtendedPage.irProcessWithoutinitialReviewCompleteCheck(
      testData.tenantName,
      newInvoiceNum2,
      newCustomerName2
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete order", () => {
    //Delete order
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Continue and skip button", () => {
    // login as analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startContinue(testData.tenantName);
    //verify skip button
    orderExtendedPage.verifySkipInvoice();
    // ask Questions
    orderPage.askQuestionInitialReview();
    loginPageObjs.logout();
  });

  it("Delete 2nd order", () => {
    //Delete 2nd order
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum2);
    //logout from app
    loginPageObjs.logout();
  });

  it("Needs Attention order not appeared in priority report part 1", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPage.placeNewOrder("JFC");
    // attach the picture
    orderPage.searchOrder("JFC");
    orderPage.attachPhoto();
    // cancel preprocessing
    orderPage.searchOrder("JFC");
    // end preprocessing
    orderPage.endPreProcessing();
    // complete the IR
    orderPage.searchOrder("JFC");
    orderPage.irProcessOnly(newInvoiceNum3);
    orderPage.searchOrder(newInvoiceNum3);
    // ask Questions
    orderPage.askQuestionInitialReview();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // select First Order
    orderPage.changeStatusToInitialReview();
    orderPage.searchOrder(newInvoiceNum3);
    orderPage.assignToUnitAdmin();
    //logout from app
    loginPageObjs.logout();
  });

  it("Needs Attention order not appeared in priority report part 2", () => {
    // login as analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk rec and verify the photo
    priorityReportPage.clickIRBtn();
    priorityReportPage.noWorkLeftWarningForAnalyst();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Needs Attention order", () => {
    //Delete order
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum3);
    //logout from app
    loginPageObjs.logout();
  });

  it("Attach Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("Ask Question and verify priority page", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(50000);
    cy.reload();
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // ask Questions
    orderPage.askQuestionMissingInvoice();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.clickIRBtn();
    priorityReportPage.noWorkLeftWarningForAnalyst();
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // complete the IR
    orderPage.firstOrderSelect();
    // complete initial Review
    orderPage.iROnlyInvoiceNumber(newInvoiceNum);
    //resolve concern
    orderPage.resolveConcern();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum4,
      newCustomerName
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum4);
    //logout from app
    loginPageObjs.logout();
  });

  it("Attach Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("IR check from order page Analyst role", () => {
    // login as analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // complete the IR
    orderPage.firstOrderSelect();
    // complete initial Review
    orderExtendedPage.checkIRAnalyst(
      testData.tenantName,
      newInvoiceNum5,
      newCustomerName
    );
    cy.reload();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum5,
      newCustomerName
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("IR check from order page Analyst role", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum5);
    //logout from app
    loginPageObjs.logout();
  });

  it("Attach Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("IR check from order page Lead Analyst", () => {
    // login as lead analyst
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // complete the IR
    orderPage.firstOrderSelect();
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum5,
      newCustomerName
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum5);
    //logout from app
    loginPageObjs.logout();
  });

  it("Reporting off in new restaurant unit", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to central
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToRestaurant();
    // created a restaurant with the same company-concept as Wasabi Tyson to make transfer under order visible
    restaurantPage.createRestaurantWithoutReporting(
      "Wasabi",
      "Wasabi Sushi Co",
      createRestName1,
      emailID,
      loginID,
      firstName,
      lastName
    );
    cy.reload();
    //logout from app
    loginPageObjs.logout();
  });

  it("Reporting off in new restaurant unit Priority report", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    util_generic.checkRestUnit(createRestName1, createRestName1);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(1000);
    //start the bulk IR
    priorityReportPage.clickIRBtn();
    priorityReportPage.noWorkLeftWarning();
    //logout from app
    loginPageObjs.logout();
  });

  it("Attach Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete order from priority report", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload first invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(50000);
    cy.reload();
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    orderPage.deleteIROrder();
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum6,
      newCustomerName3
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum6);
    //logout from app
    loginPageObjs.logout();
  });

  it("Attach Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("Suggest for deletion", () => {
    // login as analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(50000);
    cy.reload();
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    orderExtendedPage.suggestForInvoiceDeletion();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Order", () => {
    // login as second analyst
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // complete the IR
    orderPage.firstOrderSelect();
    orderPage.iROnlyInvoiceNumber(newInvoiceNum7);
    orderPage.deleteIROrder();
    //logout from app
    loginPageObjs.logout();
  });
});
