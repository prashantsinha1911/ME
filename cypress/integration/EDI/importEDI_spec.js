const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const utilObj = require("../../utils/util_generic");
const centralVendorPage = require("../../page_objects/centralVendor.page");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const vendorsPage = require("../../page_objects/vendors.page");
const EDIData = require("../../fixtures/EDIData.json");
const integrationIntacctPage = require("../../page_objects/integrationIntacct.page");
const orderPage = require("../../page_objects/order.page");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

let newVendor = testData.vendorName + utilObj.makeId();

describe("QA-90: import EDI invoices to improve Reconciliation process", () => {
  it("check inbound EDI of JFC", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToVendorCentral();
    centralVendorPage.searchCentralVendor("JFC");
    centralVendorPage.verifyEDIData();
    cy.wait(2000);
    hamburgerMenuPageObj.goToVendor();
    // verify JFC vendor default EDI status
    vendorsPage.verifyEDIProcessing(
      "JFC",
      EDIData.EDI_Processing.No_EDI_Processing,
      EDIData.creditMode.combined
    );
    hamburgerMenuPageObj.goToVendor();
    // change EDI status to No Handwritten and creditMode to `SKIPPED`
    vendorsPage.selectEDIProcessing(
      "JFC",
      EDIData.EDI_Processing.Process_EDI_No_Handwritten_Adjustments,
      EDIData.creditMode.skipped,
      "99999"
    );
    loginPageObjs.logout();
  });

  it("throw mock-events for JFC", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToIntegration();
    integrationIntacctPage.throwMockEvent(
      "inboundemail-marginedge-com",
      EDIData.mockEventData
    );
    loginPageObjs.logout();
  });
  // adding this step in the middle to make sure the imported order is available in the next test-step

  it("attach an invoice and cancel preprocessing", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.attachInvoice();
    orderPage.cancelPreProcessingForAdmin();
    loginPageObjs.logout();
  });

  it("login as Developer, verify email Handler", () => {
    loginPageObjs.loginAs(creds.developer, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.viewInbox();
    orderPage.forceHandleEmail();
    loginPageObjs.logout();
  });

  it("verify imported2 order for JFC", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInReconciliation("IMPORTED2");
    orderPage.verifyImportedOrder();
    loginPageObjs.logout();
  });

  it("login as lead analyst,complete final review, observe order in account manager Review", () => {
    loginPageObjs.loginAs(creds.leadAnalyst, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToFinalReview("IMPORTED2");
    orderPage.completeFRforleadAnalyst();
    loginPageObjs.logout();
  });

  it("delete email from inbox & delete the imported order from JFC", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    // the order comes with invoice number `IMPORTED2`
    orderPage.changeStatusToAccountManagerReview("IMPORTED2");
    orderPage.element
      .recociliationSourceLabel()
      .should("include.text", "Source: EDI");
    orderPage.deletePendingReconciliation();
    orderPage.viewInbox();
    orderPage.deleteEmail("HANDLED");
    loginPageObjs.logout();
  });

  // making sure JFC is in initial/default state for the second run
  it("Shift to initial state  from JFC", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToVendor();
    // random vendor account number
    vendorsPage.selectEDIProcessing(
      "JFC",
      EDIData.EDI_Processing.No_EDI_Processing,
      EDIData.creditMode.combined,
      "56334243789"
    );
    loginPageObjs.logout();
  });

  it("create a new vendor, edit its Inbound EDI & request EDI enrollment", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToVendor();
    vendorsPage.createVendorWithOnlyName(newVendor);
    vendorsPage.verifyNoEDIProcessing(newVendor);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToVendorCentral();
    centralVendorPage.addInboundEmail(newVendor);
    cy.wait(2000);
    hamburgerMenuPageObj.goToVendor();
    vendorsPage.verifyPreRequestEDIProcessing(newVendor);
    vendorsPage.requestEDIEnrollment(newVendor);
    hamburgerMenuPageObj.goToVendor();
    vendorsPage.verifyEDIProcessing(
      newVendor,
      EDIData.EDI_Processing.Process_Images_with_EDI_Backup,
      EDIData.creditMode.combined
    );
    loginPageObjs.logout();
  });

  it("Complete IR with invoice Number `IMPORTED1`", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    orderPage.irProcessWithInvoiceNumber(newVendor, "IMPORTED1");
    loginPageObjs.logout();
  });

  it("select imageProcess with EDI backup for the new vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToVendor();
    // change EDI status to No Handwritten and creditMode to `SKIPPED`
    vendorsPage.selectEDIProcessing(
      newVendor,
      EDIData.EDI_Processing.Process_Images_with_EDI_Backup,
      EDIData.creditMode.combined,
      "12345"
    );
    loginPageObjs.logout();
  });

  it("throw  mock-Event for the new Vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToIntegration();
    integrationIntacctPage.throwMockEvent(
      "inboundemail-marginedge-com",
      EDIData.mockEventData
    );
    loginPageObjs.logout();
  });

  it("complete reconciliation on imported order(IMPORTED1) from the new vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInReconciliation("IMPORTED1");
    orderPage.reconciliationProcessEDI(
      testData.tenantName,
      newVendor,
      "IMPORTED1"
    );
    loginPageObjs.logout();
  });

  it("delete email from inbox & delete the imported order from the new vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    // the order comes with invoice number `IMPORTED1`
    orderPage.changeStatusToInReconciliation("IMPORTED1");
    orderPage.element
      .recociliationSourceLabel()
      .should("include.text", "Source: Uploaded");
    orderPage.deletePendingReconciliation();
    orderPage.viewInbox();
    orderPage.deleteEmail("SEPARATED");
    loginPageObjs.logout();
  });

  // making sure JFC is in initial/default state for the second run
  it("Shift to initial state  from new Vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToVendor();
    // random account number
    vendorsPage.selectEDIProcessing(
      newVendor,
      EDIData.EDI_Processing.No_EDI_Processing,
      EDIData.creditMode.combined,
      "56334243789"
    );
    loginPageObjs.logout();
  });
});
