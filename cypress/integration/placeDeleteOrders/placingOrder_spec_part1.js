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

let newVendor = testData.vendorName + util_generic.makeId();
// second new vendor
let newVendor2 = testData.vendorName + util_generic.makeId();
let newVendor3 = testData.vendorName + util_generic.makeId();
let vendorItemName = testData.vendorItem + util_generic.makeId();
let invoiceNumberStr = testData.invoiceNum + util_generic.makeId();
let invoiceNumberStr2 = testData.invoiceNum + util_generic.makeId();
let createRestName = testData.restaurant + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Bruce" + utilObj.makeId().toLowerCase();
let lastName = "Wayne" + utilObj.makeId().toLowerCase();
let productName = testData.testProductName + utilObj.makeId();

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let placingOrderData = {
  newVendor: newVendor,
  newVendor2: newVendor2,
  newVendor3: newVendor3,
  vendorItemName: vendorItemName,
  invoiceNumberStr: invoiceNumberStr,
  invoiceNumberStr2: invoiceNumberStr2,
  createRestName: createRestName,
  emailID: emailID,
  loginID: loginID,
  firstName: firstName,
  lastName: lastName,
  productName: productName,
};

before(() => {
  // save data to use in part-2
  cy.task("saveData", placingOrderData);
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

describe("place Order Verification Part-1", () => {
  it("verify Valid Email for vendor as Admin", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.selectVendor(testData.existingVendor);
    vendorPageObj.verifyVendorMail(testData.existingVendor);
    loginPageObjs.logout();
  });

  it("verify order status and upload date while placing a new order as manager", () => {
    loginPageObjs.loginAs(creds.manager, creds.password);
    util_generic.checkRestUnitWO(testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToSaved();
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPageObj.saveOrderWithVendorNote();
    orderPageObj.changeStatusToSaved();
    orderPageObj.editSavedOrder();
    loginPageObjs.logout();
  });

  it("verify send Order", () => {
    loginPageObjs.loginAs(creds.manager, creds.password);
    util_generic.checkRestUnitWO(testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToSent();
    hamburgerMenuPageObj.goToPlaceOrders();
    orderPageObj.placeNewOrder("Arrow");
    orderPageObj.changeStatusToSent();
    orderPageObj.resendOrder();
    loginPageObjs.logout();
  });

  it("attach invoice and save order", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToSent();
    orderPageObj.element.clickItem().should("be.visible").click();
    // attaching invoice in the previously sent order
    orderPageObj.attachPhoto();
    orderPageObj.changeStatusToPreprocessing();
    orderPageObj.element.clickItem().should("be.visible").click();
    orderPageObj.endPreProcessing();
    orderPageObj.changeStatusToInitialReview();
    loginPageObjs.logout();
  });

  it("Verify online order", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToVendor();
    vendorPageObj.uncheckOnlineOrder("SmokeTest House");
    hamburgerMenuPageObj.goToOrderParent();
    hamburgerMenuPageObj.goToPlaceOrders();
    // "SmokeTest House" is not visible while placing a new order
    orderPageObj.verifyOnlineOrder();
    loginPageObjs.logout();
  });

  it("enable Multiple Count Bys", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCentral();
    hamburgerMenuPageObj.goToCompanyConfigCentral();
    centralPage.enableMultipleCountBys();
    loginPageObjs.logout();
  });

  it("create a product", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToProduct();
    productPage.createProduct(productName);
    productPage.addInvUnits(productName);
    loginPageObjs.logout();
  });

  it("create New Vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToVendor();
    // uncheck decimal quantites, resending
    vendorPageObj.createVednorWithUncheckingUpdates(newVendor, testData.email);
    loginPageObjs.logout();
  });

  it("create vendor Item and place an order through the created vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToVendorItems();
    // create vendor items with multiple packaging
    vendorItemPageObj.createVIwithMultiplePackaging(
      newVendor,
      vendorItemName,
      utilObj.makeId(),
      productName,
    );
    loginPageObjs.logout();
  });
  // inventory is deleted in the part2
  it("close an inventory", () => {
    let productList = [productName];
    let dateObj = utilObj.getDateObj(0);
    let formattedDate = utilObj.getformattedDate(
      dateObj.month,
      dateObj.day,
      dateObj.year,
      "-",
    );
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.closeInventoryForProducts(productList, formattedDate);
    loginPageObjs.logout();
  });

  it("placing order with multiple packaging", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order through the created vendor
    orderPageObj.placeNewOrderwithMultiplePackaging(newVendor);
    orderPageObj.changeStatusToSent();
    loginPageObjs.logout();
  });
});
