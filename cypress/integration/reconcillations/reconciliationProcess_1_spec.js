const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const vendorsPage = require("../../page_objects/vendors.page");
const orderPage = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const utilObj = require("../../utils/util_generic");
const sanityTestData = require("../../fixtures/testData_Sanity.json");

let createVendorName = testData.vendorName + utilObj.makeId();
let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let invoiceNumberStr = sanityTestData.invoiceNumber + utilObj.makeId();

//QA-58 Reconciliation Process
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("QA-58: Reconciliation Process", () => {
  it("IR Process part 1", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    //upload invoice
    orderPage.attachInvoice();
    //cancel preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
  });

  it("IR Process Part 2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR and verify the photo
    priorityReportPage.startIR(testData.tenantName);
    //check IR Button Disable
    orderPage.checkIRbtnOnRecon();
    orderPage.checkIRbtnOnReconciliation();
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    //logout from application
    loginPageObjs.logout();
  });

  it("Reconciliation Process Part 1", () => {
    // No work left for analyst has to be verifed in different way
    /*
        // login as analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        loginPageObjs.chooseTenant(testData.tenantName);
        //go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        cy.wait(10000);
        //start the bulk rec and verify the photo
        priorityReportPage.verifyStartReconcillationsAnalyst(testData.tenantName);
        priorityReportPage.noWorkLeftWarningForAnalyst();
        //logout from app
        loginPageObjs.logout();
        */
  });

  it("Reconciliation Process Part 2", () => {
    // No work left for analyst has to be verifed in different way
    // login as analyst2
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    //start the bulk rec and verify the photo
    priorityReportPage.startReconcillations(testData.tenantName);
    cy.wait(10000);
    //check IR Button Disable
    orderPage.checkRecbtnOnRecon();
    orderPage.checkRecbtnOnReconciliation();
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    //orderPage.checkDeleteBtn();
    //logout from app
    loginPageObjs.logout();
  });

  it("Reconciliation Process Part 3", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // delete pending Reconciliation
    orderPage.deletePendingReconciliation();
    //logout from app
    loginPageObjs.logout();
  });

  it("Different Vendor Selection in Reconciliation Process Part 1", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    //upload invoice
    orderPage.attachInvoice();
    //cancel preprocessing
    orderPage.endPreProcessing();
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR and verify the photo
    priorityReportPage.startIR(testData.tenantName);
    // complete initial Review
    orderPage.irProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    //logout from application
    loginPageObjs.logout();
  });

  it("Different Vendor Selection in Reconciliation Process Part 2", () => {
    // login as analyst2
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    //start the bulk rec and verify the photo
    priorityReportPage.startReconcillations(testData.tenantName);
    cy.wait(10000);
    orderPage.ReconcialltionProcessWithDifferentVendor(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    cy.reload();
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("FR Review", () => {
    // login as lead analyst
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcessVerification(
      newVendorItemCode,
      newVendorItem,
      testData.productName
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Ask Ques on FR Review", () => {
    // login as lead analyst
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    orderPage.askQuestionOnFR();
    orderPage.verifyConcern();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    orderPage.resolveConcerned();
    orderPage.completeFR();
    //logout from application
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Credit Order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    //upload invoice
    orderPage.attachInvoice();
    //cancel preprocessing
    orderPage.endPreProcessing();
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR and verify the photo
    priorityReportPage.startIR(testData.tenantName);
    orderPage.irProcessWithTenantCheckAdmin(
      testData.tenantName,
      "A. Russo & Sons, Inc.",
      "Credit"
    );
    hamburgerMenuPageObj.goToOrderParent();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    cy.wait(3000);
    //complete the reconcillations
    orderPage.searchOrder("Credit");
    // tenant, vendor, vendorItem,invoiceNumber
    orderPage.ReconcialltionProcessWithTenantCheckAdminCredit(
      testData.tenantName,
      "A. Russo & Sons, Inc.",
      "Heavy Cream",
      "Credit"
    );
    //close the order
    cy.wait(3000);
    orderPage.searchOrder("Credit");
    orderPage.closeOrderCredit();
    //logout from app
    loginPageObjs.logout();
  });

  it("Verify Reopen Closed Order", () => {
    // login as analyst
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    orderPage.verifyReOpenOrder("Credit");
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToClosed();
    // reopen the closed order and then again close the order
    orderPage.reOpenOrder("Credit");
    // delete closed order
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder("Credit");
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete attach invoice", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    //upload invoice
    orderPage.attachInvoice();
    orderPage.deleteAttachInvoice();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete photo IR", () => {
    // login as Admin
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
    //delete photo from order
    orderPage.deletePhotoOrder();
    orderPage.irProcessOnly(newInvoiceNum);
    // change status to all
    orderPage.changeStatusToSent();
    // delete order
    orderPage.deleteOrderInv();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete photo Rec Part 1", () => {
    // login as Admin
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
    // complete initial Review
    orderPage.irProcessWithTenantCheckJFC(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithJFC(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete photo Rec Part 2", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.searchOrder(newInvoiceNum);
    //delete photo from order
    orderPage.deletePhotoOrder();
    //logout from app
    loginPageObjs.logout();
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // delete pending Reconciliation
    orderPage.deletePendingReconciliation();
    //logout from app
    loginPageObjs.logout();
  });

  it("New Vendor Item P 1", () => {
    // login as Admin
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

  it("New Vendor Item P 2", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
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
    //logout from app
    loginPageObjs.logout();
  });

  it("New Vendor Item P 3", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    // reconcile order
    orderPage.changeStatusToInReconciliation(newInvoiceNum);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      newInvoiceNum,
      newCustomerName
    );
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview(newInvoiceNum);
    // add line item in the final Review
    let newVendorItem = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode,
      newVendorItem,
      testData.productName
    );
    //orderPage.changeStatusToAccountManagerReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("New Vendor Item P 4", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
    // go to pending reconciallations
    hamburgerMenuPageObj.goToNewVendorItemsBellIcon();
    // assign to managing analyst
    hamburgerMenuPageObj.clickInv();
    orderPage.assignToLeadAnalyst();
    //logout from app
    loginPageObjs.logout();
  });

  it("New Vendor Item P 5", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToAccountManagerReview(newInvoiceNum);
    orderPage.verifyResolveConcern();
    //logout from app
    loginPageObjs.logout();
  });

  it("New Vendor Item P 6", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPage.searchOrder(newInvoiceNum);
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    orderPage.changeStatusToClosed();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Verify Default Payment Account", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to vendor page
    hamburgerMenuPageObj.goToVendor();
    // create new vendor
    vendorsPage.createVendor(createVendorName, emailID);
    // select the new vendor
    vendorsPage.selectVendor(createVendorName);
    //edit Vendor Payment
    vendorsPage.editVendorPaymentAccount();
    //logout from app
    loginPageObjs.logout();
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    orderPage.changeStatusToInitialReview();
    // reconcile order
    orderPage.firstOrderSelect();
    orderPage.irCompleteCheckingAccount(createVendorName, invoiceNumberStr);
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(invoiceNumberStr);
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
    //logout from ap
    loginPageObjs.logout();
  });
});
