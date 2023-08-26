class preparedItemPage {
  element = {
    addNewPreparedItemBtn: () => cy.get(`[href="#/preparedItem/new"]`),
    addNameTxt: () => cy.get(`input[ng-model="recipe.name"]`),
    addType: () => cy.get(`div[ng-model="recipe.type"]`),
    typeAddType: () => cy.xpath(`//*[@aria-label="Select a Recipe Type"]`),
    selectOption: () =>
      cy.xpath(`(//*[@class='ui-select-choices-row-inner'])[1]`),
    addQuantityy: () => cy.get(`input[ng-change="updateYield(c)"]`),
    clickUnitDD: () => cy.get(`[name="yield_new1_unit"]`),
    selectItem: () => cy.contains("Bag"),
    menuPrice: () => cy.get(`[ng-model="recipe.price"]`),
    saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
    searchValue: () => cy.xpath('//*[@ng-model="filterValue"]'),
    assertionList: () => cy.get(".ui-grid-row.ng-scope"),
    viewList: () => cy.xpath(`//*[@role="table"]`),
    selectItemFromList: () => cy.xpath(`(//*[@role="row"])[2]`),
    editRecipe: () =>
      cy.get(`[ng-click="askEditConfirmationIfExternalRecipe(recipe)"]`),
    deleteBtn: () => cy.get(`[ng-click="delete()"]`),
    print: () => cy.get(`[ng-click="print(false)"]`),
    printCard: () => cy.get(`[ng-click="print(true)"]`),
    selectedRecipeItem: () =>
      cy.xpath(`(//*[@role='rowgroup']//*[@role='row'])[1]`),
    searchValueField: () => cy.xpath(`//*[@placeholder='Search']`),
    addMedia: () => cy.xpath(`//*[@translate='inviosoApp.recipe.addMedia']`),
    uploadMedia: () => cy.xpath(`//*[@type='file']`),
    okButton: () => cy.get(`button[ng-click="photoDirectiveOkCallback()"]`),
    confirmDeleteBtn: () =>
      cy.xpath(`//*[@class='btn btn-danger'][@type='submit']`),
  };

  createPreparedItems(name, typeName) {
    this.element.addNewPreparedItemBtn().click();
    this.element.addNameTxt().type(name);
    this.element.addType().click();
    this.element.typeAddType().type(typeName);
    this.element.selectOption().click();
    this.element.addQuantityy().type("100");
    this.element.clickUnitDD().click();
    this.element.selectItem().click();
    // this.element.menuPrice().type("45");
    this.element.saveBtn().click();
  }
}
module.exports = new preparedItemPage();
