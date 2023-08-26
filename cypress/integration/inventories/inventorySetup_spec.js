const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");
const utilObj = require("../../utils/util_generic");
const countSheetPage = require("../../page_objects/countSheet.page");

let countSheetName = "newCountSheetIM" + utilObj.makeId();

//QA-58 Reconciliation Process
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("QA-86: Inventory - Support multiple inventory setups", () => {
  it("Create Count Sheet", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    hamburgerMenuPageObj.goToCountSheet();
    //create Count Sheet
    countSheetPage.addCategoryToCountSheet(countSheetName, "Apple Juice");
    countSheetPage.createOnlyCountSheet(countSheetName);
    //duplicate Count Sheet
    countSheetPage.verifyDuplicateCountSheet();
    cy.reload();
    //logout from app
    loginPageObjs.logout();
  });

  it("Delete Count Sheet", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.delecteCountSheet(countSheetName);
    loginPageObjs.logout();
  });

  it("Create Count Sheet", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    hamburgerMenuPageObj.goToCountSheet();
    //create Count Sheet
    countSheetPage.addCategoryToCountSheet(countSheetName, "Apple Juice");
    //logout from app
    loginPageObjs.logout();
  });

  it("Add inventory and select CS, verify warning", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.selectInvWithCSCount(countSheetName);
    loginPageObjs.logout();
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.selectCS(countSheetName);
    loginPageObjs.logout();
  });

  it("Close Inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.close(countSheetName);
    loginPageObjs.logout();
  });

  it("Delete Count Sheet and ref warning", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.delecteCountSheet(countSheetName);
    countSheetPage.refCSDelete();
    cy.reload();
    loginPageObjs.logout();
  });

  it("reopen and delete inventory", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToInventories();
    inventoriesRolePage.element
      .searchFilter()
      .should("be.visible")
      .type(countSheetName);
    inventoriesRolePage.reOpenInventories();
    inventoriesRolePage.deleteInventories();
    loginPageObjs.logout();
  });

  it("Delete Count Sheet", () => {
    loginPageObjs.loginAs(creds.adminName, creds.password);
    hamburgerMenuPageObj.goToCountSheet();
    countSheetPage.delecteCountSheet(countSheetName);
    loginPageObjs.logout();
  });
});
