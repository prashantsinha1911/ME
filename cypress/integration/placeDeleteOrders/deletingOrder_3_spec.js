const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const utilObj = require("../../utils/util_generic");
const centralPage = require("../../page_objects/central.page");

let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum2 = testData.invoiceNum + utilObj.makeId();
let newInvoiceNum4 = testData.invoiceNum + utilObj.makeId();

//QA-3 Deleting Order
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

describe("QA-3: Deleting Order", () => {
  it("Verify Delete&Sent Order for Missing Invoice or Unclear Image Part 1", () => {
    // login as accountant
    loginPageObjs.loginAs(usernames.accountantUN, creds.password);
    loginPageObjs.setEmailAddressExistingUser();
    //logout from app
    loginPageObjs.logout();
  });

  it("Verify Delete&Sent Order for Missing Invoice or Unclear Image Part 2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPage.placeNewOrder("JFC");
    // attach the picture
    orderPage.searchOrder("JFC");
    orderPage.attachPhoto();
    // cancel preprocessing
    orderPage.searchOrder("JFC");
    orderPage.cancelPreProcessingRecon();
    // complete the IR
    orderPage.searchOrder("JFC");
    orderPage.iROnlyInvoiceNumber(newInvoiceNum);
    // ask Questions
    orderPage.askQuestionMissingInvoice();
    orderPage.searchOrder(newInvoiceNum);
    orderPage.verifySendEmailBtn();
    orderPage.changeStatusToSent();
    //logout from app
    loginPageObjs.logout();
  });

  it("Verify Delete & Send Email button is not appearing", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPage.placeNewOrder("Larry's Lettuce");
    // attach the picture
    orderPage.searchOrder("Larry's Lettuce");
    orderPage.attachPhoto();
    // end preprocessing
    orderPage.searchOrder("Larry's Lettuce");
    orderPage.endPreProcessing();
    // complete the IR
    orderPage.searchOrder("Larry's Lettuce");
    orderPage.iROnlyInvoiceNumber(newInvoiceNum);
    // ask Questions
    orderPage.askQuestionInitialReview();
    orderPage.searchOrder(newInvoiceNum);
    orderPage.askQuestionMissingInvoice();
    orderPage.searchOrder(newInvoiceNum);
    orderPage.resolveConcern();
    orderPage.searchOrder(newInvoiceNum);
    orderPage.checkDeletAndSendEmailBtn();
    //logout from application
    loginPageObjs.logout();
  });

  it("Deleting all orders", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    orderPage.deleteClosedOrder(newInvoiceNum);
    // go to Sent order page
    orderPage.changeStatusToSent();
    orderPage.viewOrder();
    // delete order
    orderPage.deleteOrderInv();
    //logout from appl
    loginPageObjs.logout();
  });

  it("Verify Delete & Send Email button is appearing", () => {
    // login as admin
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
    orderPage.iROnlyInvoiceNumber(newInvoiceNum4);
    // ask Questions
    orderPage.askQuestionMissingInvoice();
    orderPage.searchOrder(newInvoiceNum4);
    orderPage.verifySendEmailBtn2();
    //logout from application
    loginPageObjs.logout();
  });

  it("Verify Delete & Send Email button is appearing 2", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    //go to setup
    hamburgerMenuPageObj.goToSetup();
    //go to notification
    hamburgerMenuPageObj.goToNotification();
    //logout from app
    loginPageObjs.logout();
  });

  it("Verify Delete & Send Email button is appearing 2 part 2", () => {
    // login as account manager
    loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
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
    orderPage.irProcessOnly(newInvoiceNum2);
    orderPage.searchOrder(newInvoiceNum2);
    // ask Questions
    orderPage.askQuestionMissingInvoice();
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // select First Order
    orderPage.changeStatusToInitialReview();
    orderPage.searchOrder(newInvoiceNum2);
    orderPage.verifySendEmailBtn();
    //logout from app
    loginPageObjs.logout();
  });

  it("EDI Orders in a sent stats will be deleted automatically", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToCompanyConfigCentral();
    centralPage.createVendorAutoDeleteSentOrdersEDI();
    //logout from application
    loginPageObjs.logout();
  });

  it("Vendor Auto Delete Sent Orders (Delete)", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToCompanyConfigCentral();
    centralPage.vendorAutoDeleteSentOrdersDelete();
    //logout from application
    loginPageObjs.logout();
  });

  it("Deleting sent orders", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // go to order page
    hamburgerMenuPageObj.goToOrders();
    // go to Sent order page
    orderPage.changeStatusToSent();
    orderPage.viewOrder();
    // delete order
    orderPage.deleteOrderInv();
    //logout from appl
    loginPageObjs.logout();
  });
});
