const loginPageObjs = require("../../page_objects/login.pageObjects");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");
const creds = require("../../fixtures/credentials.json");
const utilObj = require("../../utils/util_generic");
const testData = require("../../fixtures/rolePermission.json");
const productPage = require("../../page_objects/product.page");
const orderPageObj = require("../../page_objects/order.page");
const taskPageObj = require("../../page_objects/notificationTask.page");
const setupPage = require("../../page_objects/setup.page");

let categoryTypeName;
let countSheetName;
let productName1;
let productName2;
let productName3;
let vendorItem;
let countSheetName2;
let sectionName;
let sectionName2;
let countSheetName3;
let invoiceNum;
let itemCode;

before(() => {
  cy.log("Inventory Management part1 Already completed?");
  // load saved data from part-1
  cy.task("loadData").then((inventoryManagementData) => {
    categoryTypeName = inventoryManagementData.categoryTypeName;
    countSheetName = inventoryManagementData.countSheetName;
    productName1 = inventoryManagementData.productName;
    productName2 = inventoryManagementData.productName2;
    productName3 = inventoryManagementData.productName3;
    vendorItem = inventoryManagementData.vendorItem;
    countSheetName2 = inventoryManagementData.countSheetName2;
    sectionName = inventoryManagementData.sectionName;
    sectionName2 = inventoryManagementData.sectionName2;
    countSheetName3 = inventoryManagementData.countSheetName3;
    invoiceNum = inventoryManagementData.invoiceNum;
    itemCode = inventoryManagementData.itemCode;
  });
});

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

// step (43-44) for inventory management(QA-11)  is executed in placing order (part2) spec since there already exists a closed order

describe("Inventory management system Part2", () => {
  it("complete Initial Review As account Manager", () => {
    // login as account manager
    loginPageObjs.loginAs(creds.accountManager, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.attachInvoice();
    orderPageObj.cancelPreProcessingForAdmin();
    orderPageObj.changeStatusToInitialReview();
    orderPageObj.element.clickItem().should("be.visible").click();
    orderPageObj.irProcessWithTenantCheck(testData.tenantName, invoiceNum);
    loginPageObjs.logout();
  });

  it("complete reconciliation without Product in new  vendor item", () => {
    // login as account manager
    loginPageObjs.loginAs(creds.accountManager, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToOrders();
    orderPageObj.changeStatusToInReconciliation(invoiceNum);
    orderPageObj.reconProcessWithoutProd(invoiceNum, itemCode, vendorItem);
    orderPageObj.changeStatusToFinalReview(invoiceNum);
    orderPageObj.reviewOrderByCSLead();
    // the order will be in AM review
    loginPageObjs.logout();
  });

  it("create a new product from task page", () => {
    loginPageObjs.loginAs(creds.accountManager, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToHomeNotification();
    hamburgerMenuPageObj.goToNewVendorItemTask();
    taskPageObj.assignProduct();
    taskPageObj.createProduct();
    loginPageObjs.logout();
  });

  it("verify product on inventory status", () => {
    loginPageObjs.loginAs(creds.accountManager, creds.password);
    hamburgerMenuPageObj.goToProduct();
    //By default The created product shares the same name as its vendor item
    let productName = vendorItem;
    productPage.verifyInventoryStatus(testData.tenantName, productName, "Yes");
    // since Natick is not available in -Pci profile, commenting it out
    // productPage.verifyInventoryStatus('Wasabi Natick', productName, 'No');
    loginPageObjs.logout();
  });

  // CALENDAR configuration
  it("Create new Product2 to verify removed product from inventory in calendar configuration", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToProduct();
    productPage.createProduct(productName2);
    productPage.element.productTitle().should("be.visible");
    productPage.element
      .searchBtn()
      .should("be.visible")
      .clear()
      .type(productName2);
    // assert the created product
    productPage.element.assertList().should("be.visible");
    loginPageObjs.logout();
  });

  it("verify removed section appears when a product is uninventoried", () => {
    let productList = [productName2, "Baby Carrots"];
    loginPageObjs.loginAs(creds.adminName, creds.password);
    // add accounting period - CALENDAR
    hamburgerMenuPageObj.goToUnitSettings();
    // For calendar second parameter is not required
    setupPage.addAccPeriod("CALENDAR");
    cy.wait(500);
    hamburgerMenuPageObj.goToInventories();
    // close Inv on first day of the month
    let dateObj = utilObj.getDateObj(0);
    let firstdaydate = utilObj.getformattedDate(
      dateObj.month,
      "01",
      dateObj.year,
      "-",
    );
    inventoriesRolePage.closeInventoryForProducts(productList, firstdaydate);
    cy.wait(1000);
    // uncheck inventory for the created product
    hamburgerMenuPageObj.goToProduct();
    productPage.unInventoryProduct(productList[0]);
    hamburgerMenuPageObj.goToInventories();
    // close Inv on last day of the month
    dateObj = utilObj.getDateObj(0);
    let daysInCurrentMonth = utilObj.getDaysInCurrentMonth();
    let lastdayDate = utilObj.getformattedDate(
      dateObj.month,
      daysInCurrentMonth,
      dateObj.year,
      "-",
    );
    inventoriesRolePage.closeInventoryForProducts(
      ["Baby Carrots", "Cherry Tomato"],
      lastdayDate,
    );
    hamburgerMenuPageObj.goToInventoriesChild();
    // verify a removed section appears with the created product
    inventoriesRolePage.verifyRemovedSection(productList[0], lastdayDate);
    loginPageObjs.logout();
  });

  // Delete the first one created one in 1st day of the month
  it("reopen and delete inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.reOpenInventories();
    inventoriesRolePage.deleteInventories();
    loginPageObjs.logout();
  });

  // 13 4 weeks configuration
  it("Create new Product3 to verify removed product from inventory in `13-4 weeks` configuration", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    //goto product page
    hamburgerMenuPageObj.goToProduct();
    //create product
    productPage.createProduct(productName3);
    productPage.element.productTitle().should("be.visible");
    productPage.element
      .searchBtn()
      .should("be.visible")
      .clear()
      .type(productName3);
    //assert the created product
    productPage.element.assertList().should("be.visible");
    loginPageObjs.logout();
  });

  it("verify removed section appears when a product is uninventoried", () => {
    let productList = [productName3, "Baby Carrots"];
    loginPageObjs.loginAs(creds.adminName, creds.password);
    // add accounting period - CALENDAR
    hamburgerMenuPageObj.goToUnitSettings();
    // startDate has to be before current date
    let dateObj = utilObj.getDateObj(1);
    const startDate = utilObj.getformattedDate(
      dateObj.month,
      dateObj.day,
      dateObj.year,
      "-",
    );
    setupPage.addAccPeriod(`13-4-WEEK-PERIODS`, startDate);
    cy.wait(500);
    hamburgerMenuPageObj.goToInventories();
    // close Inv on first day of the month
    inventoriesRolePage.closeInventoryForProducts(productList, startDate);
    cy.wait(1000);
    // uncheck inventory for the created product
    hamburgerMenuPageObj.goToProduct();
    productPage.unInventoryProduct(productList[0]);
    hamburgerMenuPageObj.goToInventories();
    // close Inv on last day of the month
    dateObj = utilObj.getDateObj(0);
    let daysInCurrentMonth = utilObj.getDaysInCurrentMonth();
    let lastdayDate = utilObj.getformattedDate(
      dateObj.month,
      daysInCurrentMonth,
      dateObj.year,
      "-",
    );
    inventoriesRolePage.closeInventoryForProducts(
      ["Baby Carrots", "Cherry Tomato"],
      lastdayDate,
    );
    hamburgerMenuPageObj.goToInventoriesChild();
    // verify a removed section appears with the created product
    inventoriesRolePage.verifyRemovedSection(productList[0], lastdayDate);
    loginPageObjs.logout();
  });

  it("Delete accounting Period", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    // add accounting period - CALENDAR
    hamburgerMenuPageObj.goToUnitSettings();
    // For calendar second parameter is not required
    setupPage.deleteAccountingPeriod();
    loginPageObjs.logout();
  });

  // Delete the first one created one with startDate
  it("reopen and delete inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.reOpenInventories();
    inventoriesRolePage.deleteInventories();
    loginPageObjs.logout();
  });
});
