const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const utilObj = require("../../utils/util_generic");
const centralPage = require("../../page_objects/central.page");

let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let dayAheadOrder = utilObj.selectDate();

//QA-3 Deleting Order
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

describe("QA-3: Deleting Order", () => {
  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 1", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToCompanyConfigCentral();
    centralPage.createVendorAutoDeleteSentOrders();
    // go to home
    hamburgerMenuPageObj.goToOrderParent();
    // send order
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.placeOrder();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 3", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 4", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    orderPage.searchOrder(newInvoiceNum);
    cy.wait(2000);
    orderPage.firstOrderSelect();
    orderPage.orderDateChangedToAhead(dayAheadOrder);
    // go to home
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToSent();
    orderPage.changeStatusToRetiredOrder();
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    // go to home
    hamburgerMenuPageObj.goToHome();
    // send order
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.placeOrder();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheckAndJFC(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 5", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithTenantCheckAndJFC(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 6", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem1 = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode1 = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode1,
      newVendorItem1,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 7", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    orderPage.searchOrder(newInvoiceNum);
    cy.wait(2000);
    orderPage.firstOrderSelect();
    orderPage.orderDateChangedToAhead(dayAheadOrder);
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Yes) test scenarios part 8", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToSent();
    orderPage.firstOrderSelect();
    // go to home
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToSent();
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (No) test scenarios Part 1", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToCompanyConfigCentral();
    centralPage.vendorAutoDeleteSentOrdersNo();
    cy.wait(5000);
    // go to home
    hamburgerMenuPageObj.goToHome();
    // send order
    cy.wait(5000);
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.placeOrder();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (No) test scenarios Part 2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (No) test scenarios Part 3", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    orderPage.searchOrder(newInvoiceNum);
    cy.wait(2000);
    orderPage.firstOrderSelect();
    orderPage.orderDateChangedToAhead(dayAheadOrder);
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (No) test scenarios Part 4", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from application
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Delete) test scenarios Part 1", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToCompanyConfigCentral();
    centralPage.vendorAutoDeleteSentOrdersDelete();
    // go to home
    hamburgerMenuPageObj.goToHome();
    // send order
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.placeOrder();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Delete) test scenarios Part 2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName,
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Delete) test scenarios Part 3", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem2 = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode2 = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode2,
      newVendorItem2,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Delete) test scenarios Part 4", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    orderPage.searchOrder(newInvoiceNum);
    cy.wait(2000);
    orderPage.firstOrderSelect();
    orderPage.orderDateChangedToAhead(dayAheadOrder);
    //logout from app
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Delete) test scenarios Part 5", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToSent();
    orderPage.changeStatusToRetiredOrder();
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });
});
