const loginPageObjs = require("../../../page_objects/login.pageObjects");
const usernames = require("../../../fixtures/userNames.json");
const creds = require("../../../fixtures/credentials.json");
const testData = require("../../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../../page_objects/hamburgerMenu.pageObj");
const vendorsPage = require("../../../page_objects/vendors.page");
const orderPage = require("../../../page_objects/order.page");
const orderExtendedPage = require("../../../page_objects/orderExtended.page");
const priorityReportPage = require("../../../page_objects/priorityReport.page");
const utilObj = require("../../../utils/util_generic");
const sanityTestData = require("../../../fixtures/testData_Sanity.json");

let createVendorName = testData.vendorName + utilObj.makeId();
let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let invoiceNumberStr = sanityTestData.invoiceNumber + utilObj.makeId();

//QA-4 Reconciliation View
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("QA-4: Reconciliation View", () => {
  it("Check Initial Review State for Place New Order", () => {
    // login as manager
    loginPageObjs.loginAs(usernames.managerUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPage.placeNewOrder("JFC");
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach the picture
    orderPage.searchOrder("JFC");
    orderPage.attachPhoto();
    // search order
    orderPage.searchOrder("JFC");
    // end preprocessing
    orderPage.endPreProcessing();
    //change status to IR
    orderPage.changeStatusToInitialReview();
    // search order
    orderPage.searchOrder("JFC");
    // check initial review status
    orderExtendedPage.checkOrderStatus("Initial Review");
    orderPage.irProcessOnly(newInvoiceNum);
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Initial Review State for Attach Invoice Order", () => {
    // login as manager
    loginPageObjs.loginAs(usernames.managerUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    //logout from app
    loginPageObjs.logout();
    // login as manager
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToPreprocessing();
    //select first order
    orderPage.firstOrderSelect();
    // end preprocessing
    orderPage.endPreProcessing();
    //change status to IR
    orderPage.changeStatusToInitialReview();
    //select first order
    orderPage.firstOrderSelect();
    // check initial review status
    orderExtendedPage.checkOrderStatus("Initial Review");
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Initial Review as Analyst from Order Page", () => {
    // login as Analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    //change status to IR
    orderPage.changeStatusToInitialReview();
    //select first order
    orderPage.firstOrderSelect();
    //check IR Button Disable
    orderExtendedPage.checkIRbtnOn();
    //logout from app
    loginPageObjs.logout();
  });

  it("Complete Initial Review as Analyst from Priority Report", () => {
    // login as Analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
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
    //go to home page
    hamburgerMenuPageObj.goToHome();
    //go to order page
    hamburgerMenuPageObj.goToOrders();
    //change status to IR
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    //This order can't be processed by you since you completed the Initial Review
    orderPage.checkAnalystCompleteRec();
    //logout from app
    loginPageObjs.logout();
  });

  it("Check Reconciliation as Second Analyst from Priority Report", () => {
    // login as Analyst
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    //change status to IR
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    //check Rec Button Disable
    orderExtendedPage.checkRecbtnOn();
    //logout from app
    loginPageObjs.logout();
  });

  it("Complete Reconciliation as Second Analyst from Priority Report", () => {
    // login as Analyst
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk rec and verify the photo
    priorityReportPage.startReconcillations(testData.tenantName);
    cy.wait(10000);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    //go to home page
    hamburgerMenuPageObj.goToHome();
    //go to order page
    hamburgerMenuPageObj.goToOrders();
    //change status to IR
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    //check final review status
    orderExtendedPage.checkOrderStatus("Final Review");
    //logout from app
    loginPageObjs.logout();
  });

  it("Close order as a Lead Analyst", () => {
    // login as Lead Analyst
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //go to order page
    hamburgerMenuPageObj.goToOrders();
    //change status to IR
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    //close order
    orderPage.closeOrderWithRules();
    // delete closed order
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });
});
