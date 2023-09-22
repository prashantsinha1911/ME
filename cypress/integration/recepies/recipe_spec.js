const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const assertionPage = require("../../page_objects/assertion.page");
const recipeSetupPage = require("../../page_objects/recipeSetup.page");
const menuItemPageObj = require("../../page_objects/menutem.page");

const utilObj = require("../../utils/util_generic");

let newRecipeTypeName = testData.testRecipeTypeName + utilObj.makeId();
let newRecipeName = testData.testRecipeName + utilObj.makeId();

//QA-56 Recipe
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

after(() => {
  cy.exec("rm -rf cypress/downloads/*", { failOnNonZeroExit: false });
});

describe("QA-56: Recipe", () => {
  it("Create Recipe Type, Name", () => {
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    // make "Wasabi Tysons" as tenant to get feature  from Key visible
    loginPageObjs.chooseTenant(testData.tenantName);
    // view recipe setup
    hamburgerMenuPageObj.goToRecipeSetup();
    assertionPage.verifyRecipeSetupPage();
    // create menu type
    recipeSetupPage.createMenuTypes(newRecipeTypeName);
    hamburgerMenuPageObj.goToMenuItems();
    // view recipe items
    menuItemPageObj.viewRecipes();
    // create recipe with image
    menuItemPageObj.createRecipeItemAndUploadImage(
      newRecipeName,
      newRecipeTypeName
    );
    // edit recipe
    menuItemPageObj.searchAndEditRecipe(newRecipeName, newRecipeTypeName);
    // print and delete recipe
    menuItemPageObj.printAndDeleteRecipeItem();
    //logout from app
    loginPageObjs.logout();
  });
});
