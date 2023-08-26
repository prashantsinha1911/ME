const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const orderPage = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const restaurantPage = require("../../page_objects/restaurant.page");
const utilObj = require("../../utils/util_generic");
const sanityTestData = require("../../fixtures/testData_Sanity.json");
const accountingPageObj = require("../../page_objects/accounting.page");
const paymentMapPage = require("../../page_objects/paymentMap.page");

let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let createRestName = testData.restaurant + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Bruce" + utilObj.makeId().toLowerCase();
let lastName = "Wayne" + utilObj.makeId().toLowerCase();
let invoiceNumberStr3 = sanityTestData.invoiceNumber + utilObj.makeId();
let invoiceNumberStr4 = sanityTestData.invoiceNumber + utilObj.makeId();
let invoiceNumberStr5 = sanityTestData.invoiceNumber + utilObj.makeId();
let invoiceNumberStr6 = sanityTestData.invoiceNumber + utilObj.makeId();
let invoiceNumberStr7 = sanityTestData.invoiceNumber + utilObj.makeId();
let invoiceNumberStr8 = sanityTestData.invoiceNumber + utilObj.makeId();
let dayAheadOrder = utilObj.selectDate();

//QA-58 Reconciliation Process
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("QA-58: Reconciliation Process", () => {
  it("Invoice number and date modification for closed order", () => {
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
      newCustomerName,
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
      newCustomerName,
    );
    // go to home
    hamburgerMenuPageObj.goToHome();
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
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to home
    hamburgerMenuPageObj.goToHome();
    //Reopen and Delete Order
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    //complete the reconcillations
    orderPage.searchOrder(newInvoiceNum);
    //change of invoice number and invoice date
    orderPage.changeInvoiceNumberAndInvoiceDate(dayAheadOrder);
    //logout from app
    loginPageObjs.logout();
  });

  it("Invoice number and date modification for closed order accounting page ", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to accounting page
    hamburgerMenuPageObj.goToAccounting();
    //go to export page
    hamburgerMenuPageObj.goToExportChildAcc();
    //unable to find invoice
    accountingPageObj.searchInvoice("ChangedInvoice");
    //modifyInvoice number and date
    accountingPageObj.modifyInvoices();
    //logout from app
    loginPageObjs.logout();
    // login as admin
  });

  it("Duplicate Invoice number warning in accounting page", () => {
    //invoice number duplicate verification
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
      newCustomerName,
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
      newCustomerName,
    );
    // go to home
    hamburgerMenuPageObj.goToHome();
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
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to home
    hamburgerMenuPageObj.goToHome();
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    //complete the reconcillations
    orderPage.searchOrder(newInvoiceNum);
    //change of invoice number and invoice date
    orderPage.changeInvoiceNumberAndInvoiceDate(dayAheadOrder);
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to accounting page
    hamburgerMenuPageObj.goToAccounting();
    //go to export page
    hamburgerMenuPageObj.goToExportChildAcc();
    accountingPageObj.searchInvoice("ChangedInvoice");
    //duplicate modifyInvoice number and date
    accountingPageObj.checkDuplicateModifiedInvoice();
    cy.reload();
    //logout from app
    loginPageObjs.logout();
  });

  it("Couple of line items - verify", () => {
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
      newCustomerName,
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
      newCustomerName,
    );
    // go to home
    hamburgerMenuPageObj.goToHome();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    let newVendorItem1 = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode1 = testData.vendorItemCode + utilObj.makeId();
    let newVendorItem2 = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode2 = testData.vendorItemCode + utilObj.makeId();
    let newVendorItem3 = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode3 = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    orderPage.finalReviewProcessOnlyVIAdd(
      newVendorItemCode1,
      newVendorItem1,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    orderPage.finalReviewProcessOnlyVIAdd(
      newVendorItemCode2,
      newVendorItem2,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    orderPage.finalReviewProcessOnlyVIAdd(
      newVendorItemCode3,
      newVendorItem3,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    //Delete Order
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Search Keywords in closed order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order
    hamburgerMenuPageObj.goToOrders();
    // upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    orderPage.changeStatusToInitialReview();
    // complete IR
    orderPage.irProcessWithVendor(invoiceNumberStr6, "Arrow");
    orderPage.changeStatusToInReconciliation(invoiceNumberStr6);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      invoiceNumberStr6,
      newCustomerName,
    );
    orderPage.changeStatusToFinalReview(invoiceNumberStr6);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(invoiceNumberStr6);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order
    hamburgerMenuPageObj.goToOrders();
    orderPage.searchOrder(invoiceNumberStr6);
    orderPage.searchKeyWordLineItem(newVendorItemCode);
    orderPage.searchKeyWordLineItem("search");
    // go to order
    hamburgerMenuPageObj.goToOrders();
    // Delete Order
    orderPage.deleteClosedOrder(invoiceNumberStr6);
    //logout from app
    loginPageObjs.logout();
  });

  it("Zero Byte Order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order
    hamburgerMenuPageObj.goToOrders();
    // upload invoice
    //Zero Byte file not uploading, Currently using normal jpg file
    orderPage.attachZeroBytes();
    // end preprocessing
    orderPage.endPreProcessing();
    orderPage.changeStatusToInitialReview();
    // complete IR
    orderPage.irProcessWithVendor(invoiceNumberStr7, "Arrow");
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    // Delete Order
    orderPage.deleteClosedOrder(invoiceNumberStr7);
    //logout from app
    loginPageObjs.logout();
  });

  it("New Payment account type", () => {
    // login as developer
    loginPageObjs.loginAs(usernames.developerUN, creds.password);
    // go to accounting
    hamburgerMenuPageObj.goToAccounting();
    //  go to payment accounts
    hamburgerMenuPageObj.goToPaymentAccountsChildAcc();
    assertionPage.verifyAccountPageChildren();
    let paymentAccName = testData.paymentAccountName;
    //add payment account
    paymentMapPage.addPaymentAccount(paymentAccName);
    //logout from app
    loginPageObjs.logout();
  });

  it("New Payment account type selection", () => {
    // login as developer
    loginPageObjs.loginAs(usernames.developerUN, creds.password);
    // go to order
    hamburgerMenuPageObj.goToOrders();
    // upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    orderPage.changeStatusToInitialReview();
    // complete IR
    orderPage.irProcessWithVendor(invoiceNumberStr8, "Arrow");
    orderPage.changeStatusToInReconciliation(invoiceNumberStr8);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      invoiceNumberStr8,
      newCustomerName,
    );
    orderPage.changeStatusToFinalReview(invoiceNumberStr8);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview(invoiceNumberStr8);
    //change payment account type
    orderPage.changePaymentAccountType();
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    orderPage.changeStatusToClosed();
    // reopen the closed order and then again close the order
    orderPage.reOpenOrder(invoiceNumberStr8);
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Payment account type", () => {
    // login as developer
    loginPageObjs.loginAs(usernames.developerUN, creds.password);
    // go to accounting
    hamburgerMenuPageObj.goToAccounting();
    //  go to payment accounts
    hamburgerMenuPageObj.goToPaymentAccountsChildAcc();
    assertionPage.verifyAccountPageChildren();
    //delete payment account
    paymentMapPage.deletePaymentAccount();
    cy.wait(2000);
    paymentMapPage.verifyDeletePaymentAccount();
    cy.reload();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete order", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(invoiceNumberStr8);
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Payment Account", () => {
    // login as developer
    loginPageObjs.loginAs(usernames.developerUN, creds.password);
    // go to accounting
    hamburgerMenuPageObj.goToAccounting();
    //  go to payment accounts
    hamburgerMenuPageObj.goToPaymentAccountsChildAcc();
    assertionPage.verifyAccountPageChildren();
    //delete payment account
    paymentMapPage.deletePaymentAccount2();
    cy.wait(2000);
    //logout from app
    loginPageObjs.logout();
  });
});
