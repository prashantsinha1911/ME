const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPageObj = require("../../page_objects/order.page");
const utilObj = require("../../utils/util_generic");
const vendorPageObj = require("../../page_objects/vendors.page");
const vendorItemPageObj = require("../../page_objects/vendorItems.page");
const sanityTestData = require("../../fixtures/testData_Sanity.json");

let timeStamp = new Date().toISOString();

let createVendorName = "JFC";
let invoiceNumberStr2 = "Inv2" + timeStamp;
let invoiceNumberStr4 = "Inv4" + timeStamp;
let createVendorNameStr = sanityTestData.vendorName + timeStamp;
let vendorItemName = sanityTestData.VIName + utilObj.makeId();
let itemCode = sanityTestData.itemCode + utilObj.makeId();
let lineItemVI = sanityTestData.itemCode + utilObj.makeId();

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Reconcillation Verification", () => {
  it("Create a Vendor", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    let emailIDV = "test" + utilObj.makeId() + "@gmail.com";
    utilObj.checkRestUnit(
      sanityTestData.defaultUnit,
      sanityTestData.defaultUnit,
    );
    // go to vendors
    hamburgerMenuPageObj.goToVendor();
    // create new vendor
    vendorPageObj.createVendor(createVendorNameStr, emailIDV); // add placing order in the flow
    vendorPageObj.element
      .filterSearch()
      .should("be.visible")
      .clear()
      .type(createVendorNameStr);
    // assert the created vendor
    vendorPageObj.element.assertionList().should("be.visible");
    //logout from app
    loginPageObjs.logout();
  });

  it("Create Vendor Items and add in order guide setup", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit("Tysons", "Tysons");
    // go to vendors
    hamburgerMenuPageObj.goToVendorItems();
    // create new vendor item
    vendorItemPageObj.createVI(
      createVendorNameStr,
      vendorItemName,
      utilObj.makeId(),
      "Apple Juice",
      "Test",
      "4",
      "40",
    );
    vendorItemPageObj.element.searchValue().type(vendorItemName);
    // assert the created vendor items
    vendorItemPageObj.element.assertionList().should("be.visible");
    // go to vendor
    hamburgerMenuPageObj.goToVendorOnly();
    vendorPageObj.selectVendor(createVendorNameStr);
    //logout from app
    loginPageObjs.logout();
  });

  it("Place Order, Complete IR and change the Price on Recon Page", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(
      sanityTestData.defaultUnit,
      sanityTestData.defaultUnit,
    );
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPageObj.placeNewOrder("JFC");
    // attach the picture
    orderPageObj.searchOrder("JFC");
    orderPageObj.attachPhoto();
    // cancel preprocessing
    orderPageObj.searchOrder("JFC");
    orderPageObj.cancelPreProcessingRecon();
    // complete the IR
    orderPageObj.searchOrder("JFC");
    orderPageObj.irProcessWOVendor(invoiceNumberStr2);
    // check for verify button on Recon Page
    orderPageObj.searchOrder(invoiceNumberStr2);
    // complete the Recon Process with changed price
    orderPageObj.reconcialltionProcesswithPriceChange(invoiceNumberStr2);
    //logout from app
    loginPageObjs.logout();
  });

  it("Place Order, and complete the flow with adding line item in FR", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit("Tysons", "Tysons");
    // go to place new order
    hamburgerMenuPageObj.goToPlaceOrders();
    // place new order
    orderPageObj.placeNewOrder(createVendorName);
    // attach the picture
    orderPageObj.searchOrder("JFC");
    orderPageObj.attachPhoto();
    // cancel preprocessing
    orderPageObj.searchOrder("JFC");
    orderPageObj.cancelPreProcessingRecon();
    // complete the IR
    orderPageObj.searchOrder("JFC");
    orderPageObj.irProcessWOVendor(invoiceNumberStr4);
    // check for verify button on Recon Page
    orderPageObj.searchOrder(invoiceNumberStr4);
    orderPageObj.completeRecon(invoiceNumberStr4);
    cy.wait(3000);
    // complete final review and add line item
    orderPageObj.searchOrder(invoiceNumberStr4);
    orderPageObj.finalReviewProcess(itemCode, lineItemVI, "beef");
    cy.wait(3000);
    // close the order
    orderPageObj.searchOrder(invoiceNumberStr4);
    orderPageObj.closeOrder();
    //logout from app
    loginPageObjs.logout();
  });
});
