const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPageObj = require("../../page_objects/order.page");
const utilObj = require("../../utils/util_generic");
const vendorPageObj = require("../../page_objects/vendors.page");
const vendorItemPageObj = require("../../page_objects/vendorItems.page");
const sanityTestData = require("../../fixtures/testData_Sanity.json");
const testData = require("../../fixtures/rolePermission.json");
const util_generic = require("../../utils/util_generic");
const billPayPage = require("../../page_objects/billPay.page");
const reconciliationPageObj = require("../../page_objects/reconciliation.page");
const restaurantPage = require("../../page_objects/restaurant.page");
const centralPage = require("../../page_objects/central.page");
const productPage = require("../../page_objects/product.page");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let newVendor;
let newVendor2;
let newVendor3;
let vendorItemName;
let invoiceNumberStr;
let invoiceNumberStr2;
let createRestName;
let emailID;
let loginID;
let firstName;
let lastName;
let productName;

before(() => {
  cy.log("Placing Order part1 Already completed?");
  // load saved data from part-1
  cy.task("loadData").then((placingOrderData) => {
    newVendor = placingOrderData.newVendor;
    newVendor2 = placingOrderData.newVendor2;
    newVendor3 = placingOrderData.newVendor3;
    vendorItemName = placingOrderData.vendorItemName;
    invoiceNumberStr = placingOrderData.invoiceNumberStr;
    invoiceNumberStr2 = placingOrderData.invoiceNumberStr2;
    createRestName = placingOrderData.createRestName;
    emailID = placingOrderData.emailID;
    loginID = placingOrderData.loginID;
    firstName = placingOrderData.firstName;
    lastName = placingOrderData.lastName;
    productName = placingOrderData.productName;
  });
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

describe("place Order Verification Part-2", () => {
  it("turn invoice approval on", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInvoiceApproval();
    orderPageObj.enableInvoiceApproval();
    loginPageObjs.logout();
  });

  it("complete initial review", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.attachInvoice();
    orderPageObj.cancelPreProcessingForAdmin();
    orderPageObj.changeStatusToInitialReview();
    orderPageObj.element.clickItem().click();
    orderPageObj.irProcessWithPaymentTerms(
      testData.tenantName,
      newVendor,
      invoiceNumberStr,
      testData.package2,
      testData.irAddress
    );
    loginPageObjs.logout();
  });

  it("complete reconciliation", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToInReconciliation(invoiceNumberStr);
    // reconciliation with same address as IR
    orderPageObj.reconciliationProcessWithPaymentTerms(
      testData.tenantName,
      newVendor,
      vendorItemName,
      invoiceNumberStr,
      testData.package2,
      testData.reconciliationAddress
    );
    loginPageObjs.logout();
  });

  it("close the order and verify vendor payment terms", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToFinalReview(invoiceNumberStr);
    orderPageObj.closeOrderWithRules();
    orderPageObj.changeStatustoPendingApproval(invoiceNumberStr);
    cy.wait(3000);
    orderPageObj.element
      .uploadedStatusText()
      .should("contain.text", "Source: Uploaded");
    orderPageObj.element.approveInvoiceBtn().should("be.visible").click();
    cy.wait(3000);
    orderPageObj.changeStatusToClosed();
    orderPageObj.searchOrder(invoiceNumberStr);
    orderPageObj.verifyDisabledAddressField(invoiceNumberStr);
    cy.wait(2000);
    // verify vendor payment terms
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.selectVendor(newVendor);
    vendorPageObj.verifyVendorPaymentTerms(testData.noOfdueDays);
    loginPageObjs.logout();
  });

  it("turn off Bill pay and verify vendor remittance address not visible", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.gotoBillPay();
    hamburgerMenuPageObj.gotoBillPaySetup();
    billPayPage.disableBillPay(`Mike's Meat`);
    hamburgerMenuPageObj.goToOrderParent();
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.attachInvoice();
    orderPageObj.cancelPreProcessingForAdmin();
    orderPageObj.changeStatusToInitialReview();
    orderPageObj.element.clickItem().should("be.visible").click();
    // vendor remittance address is not visible for `Mike's Meat` vendor
    orderPageObj.checkAddress(`Mike's Meat`);
    loginPageObjs.logout();
  });

  it("create a second New Vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.createVendorWithOnlyName(newVendor2);
    loginPageObjs.logout();
  });

  it("Turn bill pay on and verify vendor remittance", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToInitialReview();
    orderPageObj.element.clickItem().should("be.visible").click();
    orderPageObj.irProcessWithPaymentTerms(
      testData.tenantName,
      newVendor2,
      invoiceNumberStr2,
      testData.package2,
      testData.irAddress
    );
    hamburgerMenuPageObj.gotoBillPay();
    hamburgerMenuPageObj.gotoBillPaySetup();
    billPayPage.disableBillPay(newVendor2);
    hamburgerMenuPageObj.gotoBillPaySetup();
    billPayPage.enableBillPay(newVendor2, testData.irAddress);
    hamburgerMenuPageObj.goToOrderParent();
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToInReconciliation(newVendor2);
    orderPageObj.insertVendorData(newVendor2);
    orderPageObj.insertVendorRemittanceAddress(testData.irAddress);
    loginPageObjs.logout();
  });

  it("verify one par value from vendor order guide", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.selectVendor(newVendor);
    vendorPageObj.selectOnePar();
    loginPageObjs.logout();
  });

  it("reopen Order, edit vendor remittance address and close the order again", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit("Wasabi Tysons", "Wasabi Tysons");
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToClosed();
    orderPageObj.reClosingOrderWithNoAddress(invoiceNumberStr);
    // verify reconciliation mistake data
    // To do - reconciliation mistake data is not coming consistently within the expected amount of time
    loginPageObjs.logout();
  });

  it("place an order with setting OH value", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPageObj.placeNewOrderWithParValue(newVendor, testData.parDefaultValue);
    loginPageObjs.logout();
  });

  it("verify daily par value from vendor order guide", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.selectVendor(newVendor);
    vendorPageObj.selectDailyPar();
    loginPageObjs.logout();
  });

  it("place an order with setting OH value", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToPlaceOrders();
    const today = new Date();
    let day = today.getDay();
    let parData = testData.weeklyParData[day];
    // by default sunday is the 0th day with par value 14
    // verify par is appearing for the next day
    orderPageObj.placeNewOrderWithParValue(newVendor, parData);
    loginPageObjs.logout();
  });

  it("create a new restaurant unit, move invoice to the newly created unit", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
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
      lastName
    );
    hamburgerMenuPageObj.goToOrderParent();
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToInitialReview();
    // reload to get the tenant before moving the invoice
    cy.reload();
    orderPageObj.moveInvoice(createRestName);
    //login and select the tenant
    util_generic.checkRestUnit(createRestName, createRestName);
    orderPageObj.changeStatusToInitialReview();
    orderPageObj.verifyOrderStatusAndDelete();
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.createVendorWithOnlyName(newVendor3);
    hamburgerMenuPageObj.goToOrderParent();
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPageObj.veifyVendorSetupArticle();
    loginPageObjs.logout();
  });

  // deleting the orders from reconciliation so that this order doesn't affect the later suites
  it("deleting order ", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToInReconciliation(newVendor2);
    // the order is in reconciliation status
    orderPageObj.deletePendingReconciliation();
    loginPageObjs.logout();
  });

  // turning invoice approval off so it doesn't affect other suites
  it("Turning invoice approval off", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToInvoiceApproval();
    orderPageObj.disableInvoiceApproval();
    loginPageObjs.logout();
  });

  it("reopen and delete inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.reOpenInventories();
    inventoriesRolePage.deleteInventories();
    loginPageObjs.logout();
  });
});
