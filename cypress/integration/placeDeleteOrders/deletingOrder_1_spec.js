const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const utilObj = require("../../utils/util_generic");

let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;

//QA-3 Deleting Order
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

describe("QA-3: Deleting Order", () => {
  it("Sent and saved order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // send order
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.placeOrder();
    orderPage.viewOrder();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete sent and saved order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // change status to all
    orderPage.changeStatusToSent();
    orderPage.viewOrder();
    // delete order
    orderPage.deleteOrderInv();
    // save order
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPage.saveOrder();
    orderPage.changeStatusToSaved();
    // delete saved order
    orderPage.deleteOrderInv();
    //logout from app
    loginPageObjs.logout();
  });

  it("IR delete as Admin", () => {
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
    orderPage.irProcessOnly(newInvoiceNum);
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Rec Order delete as Admin", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
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
      newCustomerName
    );
    // go to home
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("FR, AM and closed order delete as Admin, Retire, Close, Reopen, delete", () => {
    //Final Review to AM Review
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
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
      newCustomerName
    );
    // go to home
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    // go to home
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // delete pending Reconciliation
    orderPage.deletePendingReconciliation();
    // goto retired order
    orderPage.changeStatusToRetiredOrder();
    // undelete Order
    orderPage.undeleteOrder(newInvoiceNum);
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("FR, AM and closed order delete as Admin, delete", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to home
    hamburgerMenuPageObj.goToHome();
    //Reopen and Delete Order
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    // reopen the closed order and then again close the order
    orderPage.reOpenOrder(newInvoiceNum);
    // delete closed order
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Needs Attention delete as Admin", () => {
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
    orderPage.irProcessOnly(newInvoiceNum);
    orderPage.searchOrder(newInvoiceNum);
    // ask Questions
    orderPage.askQuestionInitialReview();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // select First Order
    orderPage.changeStatusToInitialReview();
    orderPage.searchOrder(newInvoiceNum);
    orderPage.assignToUnitAdmin();
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.searchOrder(newInvoiceNum);
    orderPage.deleteIROrder();
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Delete IR Order as Lead Analyst, Managing Analyst, Account Manager", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Delete IR Order as Lead Analyst", () => {
    // login as lead analyst
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // reconcile order
    orderPage.firstOrderSelect();
    orderPage.checkDeleteOrder();
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Delete IR Order as Managing Analyst", () => {
    // login as managing analyst
    loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // reconcile order
    orderPage.firstOrderSelect();
    orderPage.checkDeleteOrder();
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Delete IR Order as Account Manager", () => {
    // login as account manager
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // reconcile order
    orderPage.firstOrderSelect();
    orderPage.checkOrderDeleteConfirmText();
    //logout from app
    loginPageObjs.logout();
  });
});
