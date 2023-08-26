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
const centralPage = require("../../page_objects/central.page");

let createVendorName2 = testData.vendorName + utilObj.makeId();
let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let createRestName = testData.restaurant + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Bruce" + utilObj.makeId().toLowerCase();
let lastName = "Wayne" + utilObj.makeId().toLowerCase();
let createVendorName = testData.vendorName + utilObj.makeId();

//QA-58 Reconciliation Process
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("QA-58: Reconciliation Process", () => {
  it("Exact Match IR P1", () => {
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
    orderPage.irProcessWithVendor("invoiceNumber", "Arrow");
    // attach and upload invoice
    orderPage.attachInvoice();
    // end preprocessing
    orderPage.endPreProcessing();
    cy.wait(3000);
    //logout from app
    loginPageObjs.logout();
  });

  it("Exact Match IR P2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.analystUN, creds.password);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    cy.wait(10000);
    //start the bulk IR
    priorityReportPage.startIR(testData.tenantName);
    // complete IR
    orderPage.iRInvoiceNumber("invoiceNumber", "Arrow");
    orderPage.exactMatchInvoiceNumber();
    cy.reload();
    //verify Oops
    //orderPage.verifyOopsWarning();
    //logout from app
    loginPageObjs.logout();
  });

  it("Exact Match IR P3", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    //start the bulk Rec
    priorityReportPage.startReconcillations(testData.tenantName);
    orderPage.ReconcialltionProcessWithTenantCheck(
      testData.tenantName,
      "invoiceNumber",
      newCustomerName,
    );
    // go to Home
    hamburgerMenuPageObj.goToHome();
    //logout from app
    loginPageObjs.logout();
  });

  it("Exact Match REC", () => {
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
    orderPage.irProcessWithVendor("invoiceNumber1", "Arrow");
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.analyst2UN, creds.password);
    //go to Priority Report
    hamburgerMenuPageObj.goToPriorityReport();
    //start the bulk Rec
    priorityReportPage.startReconcillations(testData.tenantName);
    // complete Rec
    orderPage.recInvoiceNumber("invoiceNumber");
    orderPage.exactMatchInvoiceNumberRec();
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order
    hamburgerMenuPageObj.goToOrders();
    // Delete Order
    orderPage.deleteClosedOrder("invoiceNumber1");
    // Delete Order
    orderPage.deleteClosedOrder("invoiceNumber");
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
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToRestaurant();
    // created a restaurant with the same company-concept as Wasabi Tyson to make transfer under order visible
    restaurantPage.createRestaurant(
      "Wasabi",
      "Wasabi Sushi Co",
      createRestName,
      emailID,
      loginID,
      firstName,
      lastName,
    );
    cy.reload();
    loginPageObjs.chooseTenant(createRestName);
    //verify console log
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("log");
      });
    cy.wait(1000);
    cy.get("@log")
      .invoke("getCalls")
      .then(console.table)
      .each((call) => {
        call.args.forEach((args) => {
          expect(String(arg)).to.not.contain("error");
        });
      });
    //logout
    loginPageObjs.logout();
    // login as developer
    loginPageObjs.loginAs(usernames.developerUN, creds.password);
    loginPageObjs.chooseTenant(createRestName);
    hamburgerMenuPageObj.goToCentral();
    // go to Users
    hamburgerMenuPageObj.goToUsersCentral();
    assertionPage.checkContentDisplayed();
    centralPage.impersonateUser();
    //logout from app
    loginPageObjs.logout();
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    //Reopen and Delete Order
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum);
    //logout from app
    loginPageObjs.logout();
  });

  it("Edit Handwritten Vendor Credit Process to Separate", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to vendor page
    hamburgerMenuPageObj.goToVendor();
    // create new vendor
    vendorsPage.createVendor(createVendorName, emailID);
    // select the new vendor
    vendorsPage.selectVendor(createVendorName);
    // edit and delete the newly created vendor
    vendorsPage.editAndDeleteVendor(createVendorName);
    vendorsPage.selectVendor(testData.existingVendor);
    //edit vendor hand written adjustment
    vendorsPage.editVendorHandrittenAdjustment();
    //logout from app
    loginPageObjs.logout();
  });

  it("Complete IR-Rec", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPage.placeNewOrder("Arrow");
    // attach the picture
    orderPage.searchOrder("Arrow");
    cy.wait(10000);
    orderPage.attachPhoto();
    // cancel preprocessing
    orderPage.searchOrder("Arrow");
    // end preprocessing
    orderPage.endPreProcessing();
    // complete the IR
    orderPage.searchOrder("Arrow");
    orderPage.irProcessWOVendor("ArrowCreditOrder");
    // complete the Rec
    orderPage.searchOrder("ArrowCreditOrder");
    //Create Handwritten Adjustment
    orderPage.createHandWrittenAdjustmentOrder();
    //logout from app
    loginPageObjs.logout();
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInReconciliation("ArrowCreditOrder");
    orderPage.ReconcialltionProcessWithJFC(
      testData.tenantName,
      "ArrowCreditOrder",
      newCustomerName,
    );
    orderPage.changeStatusToFinalReview("ArrowCreditOrder");
    // add line item in the final Review
    let newVendorItem5 = testData.vendorItem + utilObj.makeId();
    let newVendorItemCode5 = testData.vendorItemCode + utilObj.makeId();
    orderPage.finalReviewProcess(
      newVendorItemCode5,
      newVendorItem5,
      testData.productName,
    );
    orderPage.changeStatusToAccountManagerReview("ArrowCreditOrder");
    // solve questions regarding vendor item
    orderPage.resolveQuestionsInAMReview();
    //logout from app
    loginPageObjs.logout();
  });

  it("Move Invoice to other tenant", () => {
    // login as Admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // Search Order
    orderPage.searchOrder("ArrowCreditOrder");
    //Create Handwritten Adjustment
    orderPage.moveInvoice(createRestName);
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Order", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    utilObj.checkRestUnit(createRestName, createRestName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.changeStatusToInitialReview();
    // complete the IR
    orderPage.firstOrderSelect();
    orderPage.iROnlyInvoiceNumber(newInvoiceNum);
    orderPage.deleteIROrder();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Order Changed Invoice Credit", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder("ChangedInvoice");
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Order Changed Invoice", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder("InvoiceNumberChanged");
    //logout from app
    loginPageObjs.logout();
  });
});
