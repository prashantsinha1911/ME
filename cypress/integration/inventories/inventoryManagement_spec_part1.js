const loginPageObjs = require("../../page_objects/login.pageObjects");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");
const creds = require("../../fixtures/credentials.json");
const utilObj = require("../../utils/util_generic");
const testData = require("../../fixtures/rolePermission.json");
const categoriesPage = require("../../page_objects/categories.page");
const countSheetPage = require("../../page_objects/countSheet.page");
const productPage = require("../../page_objects/product.page");
const vendorItemsPage = require("../../page_objects/vendorItems.page");
const performancePage = require("../../page_objects/performance.page");
const assertionPage = require("../../page_objects/assertion.page");

let categoryTypeName = "newCategoryTypeIM" + utilObj.makeId();
let countSheetName = "newCountSheetIM" + utilObj.makeId();
let productName1 = "newProduct1" + utilObj.makeId();
let productName2 = "newProduct2" + utilObj.makeId();
let productName3 = "newProduct3" + utilObj.makeId();
let vendorItem = "newVendorItem" + utilObj.makeId();
let countSheetName2 = "newCSIM2" + utilObj.makeId();
let sectionName = "newSection1" + utilObj.makeId();
let sectionName2 = "newSection2" + utilObj.makeId();
let countSheetName3 = "newCSIM3" + utilObj.makeId();
let invoiceNum = "invoiceNumIM" + utilObj.makeId();
let itemCode = utilObj.makeId();

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let inventoryManagementData = {
  categoryTypeName: categoryTypeName,
  countSheetName: countSheetName,
  productName1: productName1,
  productName2: productName2,
  productName3: productName3,
  vendorItem: vendorItem,
  countSheetName2: countSheetName2,
  sectionName: sectionName,
  sectionName2: sectionName2,
  countSheetName3: countSheetName3,
  invoiceNum: invoiceNum,
  itemCode: itemCode
};

before(() => {
  // save data to use in part-2
  cy.task("saveData", inventoryManagementData);
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

// step (43-44) for inventory management(QA-11)  is executed in placing order (part2) spec since there already exists a closed order

describe("Inventory management system Part-1", () => {
  it("close inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.closeInvWithMultipleCount();
    loginPageObjs.logout();
  });

  it("reopen and delete inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.printCountSheet();
    inventoriesRolePage.reOpenInventories();
    inventoriesRolePage.deleteInventories();
    loginPageObjs.logout();
  });

  it("Add a new category with new category types", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
    hamburgerMenuPageObj.goToAccounting();
    hamburgerMenuPageObj.goToCategoriesChildAcc();
    categoriesPage.addCategoryType(categoryTypeName);
    loginPageObjs.logout();
  });

  it("Create new Product and add it to a vendor item", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToProduct();
    productPage.createProduct(productName1);
    hamburgerMenuPageObj.goToVendorItems();
    // product price is modified in the vendor item packaging
    vendorItemsPage.createVI(
      testData.existingVendor,
      vendorItem,
      utilObj.makeId(),
      productName1,
      "package1",
      "1",
      testData.productData.packagingPriceInVI
    );
    loginPageObjs.logout();
  });

  it("create New CountSheet and Edit product price conversion", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.createCountSheet(
      countSheetName,
      productName1,
      "Cranberry Dessert (Carry out)"
    );
    // edit product price and remove recipe item
    countSheetPage.editProdFromCS(
      countSheetName,
      productName1,
      "Cranberry Dessert (Carry out)"
    );
    loginPageObjs.logout();
  });

  it("verify product price and ratio through ratio", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToProduct();
    productPage.verifyUpdatedProductPrice(productName1);
    loginPageObjs.logout();
  });

  it("create new count sheet organized by Sheet to Shelf", () => {
    let dateObj = utilObj.getDateObj(0);
    let formattedDate = utilObj.getformattedDate(
      dateObj.month,
      dateObj.day,
      dateObj.year,
      "/"
    );
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.createCSwithMultipleSection(
      sectionName,
      sectionName2,
      countSheetName2,
      productName1,
      "Simple Syrup"
    );
    countSheetPage.verifyCSHistory(
      creds.adminName,
      formattedDate,
      countSheetName,
      "CATEGORY"
    );
    loginPageObjs.logout();
  });

  it("enter a count verifying config mode", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.saveInvWithMultipleSection(
      countSheetName2,
      sectionName2,
      "Simple Syrup"
    );
    inventoriesRolePage.checkSavingMultipleInv(countSheetName2);
    inventoriesRolePage.close(countSheetName2);
    loginPageObjs.logout();
  });

  it("verify product form food usage report", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToPerformance();
    hamburgerMenuPageObj.goToFoodUsageReport();
    assertionPage.verifyPerfFoodUsage();
    performancePage.verifyProductData(
      productName1,
      testData.productData.productUnit
    );
    loginPageObjs.logout();
  });

  // removing closed inventory such that it doesn't affect other suites
  it("reopen and delete redundant inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.element
      .searchFilter()
      .should("be.visible")
      .type(countSheetName2);
    inventoriesRolePage.reOpenInventories();
    inventoriesRolePage.deleteInventories();
    loginPageObjs.logout();
  });

  it("create a new CS with all products from a category", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.createCSWithCategoryProduct(
      countSheetName3,
      sectionName,
      "Dairy Products",
      "Inari Tofu Pockets"
    );
    loginPageObjs.logout();
  });
});
