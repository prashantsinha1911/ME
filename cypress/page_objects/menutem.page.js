const recipeSetupPage = require("./recipeSetup.page");

class menuItemPage {
  element = {
    addNewMenuItemBtn: () => cy.xpath(`//*[@href="#/menuItem/new"]`),
    addNameTxt: () => cy.get(`input[ng-model="recipe.name"]`),
    addType: () => cy.get(`div[ng-model="recipe.type"]`),
    typeAddType: () => cy.xpath(`//*[@aria-label="Select a Recipe Type"]`),
    selectOption: () =>
      cy.xpath(`(//*[@class='ui-select-choices-row-inner'])[1]`),
    addQuantityy: () => cy.get(`input[ng-change="updateYield(c)"]`),
    clickUnitDD: () => cy.get(`[name="yield_new1_unit"]`),
    clickUnitDD2: () => cy.get(`div[ng-change="updateYield(c)"]`),
    selectItem: () => cy.contains("Bag"),
    menuPrice: () => cy.get(`[ng-model="recipe.salePrice"]`),
    saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
    searchValue: () => cy.xpath('//*[@ng-model="filterValue"]'),
    assertionList: () => cy.get(".ui-grid-row.ng-scope"),
    viewList: () => cy.xpath(`//*[@role="table"]`),
    selectItemFromList: () => cy.xpath(`(//*[@role="row"])[2]`),
    editRecipe: () => cy.xpath(`//*[@data-testid="editButton"]`),
    deleteBtn: () => cy.get(`[ng-click="delete()"]`),
    print: () => cy.xpath(`//*[@data-testid='print']`),
    printCard: () => cy.xpath(`//*[@data-testid='print-recipe-card']`),
    selectedRecipeItem: () =>
      cy.xpath(`(//*[@role='rowgroup']//*[@role='row'])[1]`),
    searchValueField: () => cy.xpath(`//*[@placeholder='Search']`),
    addMedia: () => cy.xpath(`//*[@translate='inviosoApp.recipe.addMedia']`),
    uploadMedia: () => cy.xpath(`//*[@type='file']`),
    okButton: () => cy.get(`button[ng-click="photoDirectiveOkCallback()"]`),
    confirmDeleteBtn: () =>
      cy.xpath(`//*[@class='btn btn-danger'][@type='submit']`),
    addEquipment: () => cy.get(`button[ng-click="addUtensil()"]`),
    selectEquipment: () => cy.get(`div[name="utensil_0_utensil"]`),
    selctItemEq: () =>
      cy.xpath(`(//*[@class="ui-select-choices-row-inner"])[1]`),
    addRecipe: () => cy.get(`button[ng-click="addIngredient('recipe')"]`),
    handleItem: () =>
      cy.xpath(
        `(//*[contains(@class,'ui-grid-cell-contents ng-binding ng-scope')])[1]`
      ),
    addPrepItem: () => cy.get(`div[ng-model="row.entity['code']"]`),
    addPrepItemTxt: () =>
      cy.get(`input[placeholder="Choose (Type at least 2 characters)"]`),
    handleQuantity: () =>
      cy.xpath(
        `(//*[contains(@class,'ui-grid-cell-contents ng-binding ng-scope')])[4]`
      ),
    addQuantityRecipe: () =>
      cy.get(`[ng-model="row.entity['quantityDisplay']"]`),
    handleUnit: () =>
      cy.xpath(
        `(//*[contains(@class,'ui-grid-cell-contents ng-binding ng-scope')])[5]`
      ),
    printDD: () =>
      cy.xpath(`//*[local-name() = 'svg'][@data-testid='ArrowDropDownIcon']`),
    addAlcoholBtn: () => cy.get(`[ng-click="addIngredient('alcohol')"]`),
    selectWrap: () => cy.xpath(`//ui-select-wrap[@class='ng-scope']`),
    itemInputField: () => cy.xpath(`//*[@aria-label='Select box']`)
  };

  viewListandAdd() {
    this.element.viewList().should("be.visible");
    this.element.addNewMenuItemBtn().should("not.exist");
  }

  viewRecipes() {
    this.element.viewList().should("be.visible");
  }

  checkForDeleteEditAndPrint() {
    this.element.selectItemFromList().click();
    this.element.editRecipe().should("be.disabled");
    this.element.deleteBtn().should("not.exist");
    this.element.printDD().should("not.be.disabled").click();
    this.element.print().should("be.visible");
    this.element.printCard().should("be.visible");
  }

  createRecipes(name, typeName, productName) {
    this.element.addNewMenuItemBtn().should("be.visible").click();
    this.element.addNameTxt().type(name);
    this.element.addType().click();
    this.element.typeAddType().type(typeName);
    this.element.selectOption().click();
    this.element.addQuantityy().type("100");
    this.element.clickUnitDD().click();
    this.element.selectItem().click();
    this.element.addAlcoholBtn().should("be.visible").click();
    // add item
    this.element.handleItem().should("be.visible").click();
    this.element.selectWrap().should("be.visible").click();
    this.element
      .itemInputField()
      .should("be.visible")
      .clear()
      .type(productName, { delay: 0 });
    this.element.selectOption().should("be.visible").click();
    // add quantity
    this.element.handleQuantity().should("be.visible").click();
    this.element.addQuantityRecipe().should("be.visible").clear().type(15);
    cy.wait(2000);
    // add unit
    this.element.handleUnit().should("be.visible").click();
    this.element.selectWrap().should("be.visible").click();
    this.element.selectOption().should("be.visible").click();
    this.element.menuPrice().type("45");
    this.element.saveBtn().should("not.be.disabled").click();
  }

  createRecipesWithPreparedItemAndEquipment(name, typeName) {
    this.element.addNewMenuItemBtn().should("be.visible").click();
    this.element.addNameTxt().type(name);
    this.element.addType().click();
    this.element.typeAddType().type(typeName);
    this.element.selectOption().click();
    this.element.addQuantityy().type("100");
    cy.wait(1000);
    this.element.clickUnitDD2().click({ force: true });
    this.element.selectItem().click();
    // add equipment
    this.element.addEquipment().click();
    this.element.selectEquipment().click();
    this.element.selctItemEq().click();
    this.element.menuPrice().type("45");
    this.element.saveBtn().click();
  }

  createRecipeItemAndUploadImage(newRecipeName, newRecipeTypeName) {
    this.element.addNewMenuItemBtn().should("be.visible").click();
    this.element.addNameTxt().should("be.visible").clear().type(newRecipeName);
    this.element.addType().click();
    this.element.typeAddType().clear().type(newRecipeTypeName);
    this.element.selectOption().click();
    this.element.addQuantityy().clear().type("100");
    this.element.clickUnitDD().click();
    this.element.selectItem().click();
    this.element.menuPrice().clear().type("45");
    //uploading image
    const mediaName = "image.jpg";
    this.element.addMedia().click();
    this.element.uploadMedia().attachFile(mediaName);
    cy.wait(10000);
    this.element.okButton().should("not.be.disabled").click();
    this.element.saveBtn().click();
    recipeSetupPage.element.exportDD().should("be.visible");
  }

  searchAndEditRecipe(newRecipeName, newRecipeTypeName) {
    this.element
      .searchValueField()
      .should("be.visible")
      .clear()
      .type(newRecipeName);
    this.element.selectedRecipeItem().click();
    this.element.printDD().should("not.be.disabled").and("be.visible");
    cy.wait(1000);
    this.element.editRecipe().should("be.visible").click();
    this.element
      .addNameTxt()
      .should("be.visible")
      .clear()
      .type("Edited" + newRecipeName);
    this.element.addQuantityy().clear().type("123");
    this.element.saveBtn().click();
    this.element.printDD().should("not.be.disabled").and("be.visible");
    this.element.editRecipe().should("be.visible");
    cy.wait(2000);
  }

  printAndDeleteRecipeItem(newRecipeName) {
    this.element.printDD().should("not.be.disabled").click().and("be.visible");
    this.element.print().should("be.visible").click();
    cy.readFile("cypress/downloads/recipe.pdf").should("exist");
    cy.wait(1000);
    this.element.printDD().should("be.visible").and("be.visible").click();
    this.element.printCard().click();
    cy.readFile("cypress/downloads/recipeCard.pdf").should("exist");
    this.element.editRecipe().should("be.visible").click();
    this.element.deleteBtn().should("be.visible").click();
    this.element.confirmDeleteBtn().click();
    this.element.addNewMenuItemBtn().should("be.visible");
    cy.wait(2000);
  }

  deleteRecipe() {
    this.element.selectedRecipeItem().click();
    cy.wait(1000);
    this.element.editRecipe().should("be.visible").click();
    this.element.deleteBtn().should("be.visible").click();
    this.element.confirmDeleteBtn().should("be.visible").click();
    cy.wait(2000);
  }
}
module.exports = new menuItemPage();
