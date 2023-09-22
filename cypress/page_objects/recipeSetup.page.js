class recipeSetupPage {
  element = {
    recipeSetupBtn: () => cy.xpath(`//*[@href="#/recipeType"]`),
    addNewRecipeTypeBtn: () => cy.get(`[href="/#/recipeType/new"]`),
    addNameTxt: () => cy.get('[name="name"]'),
    addCategoryDD: () => cy.xpath(`//*[@placeholder="Select a Category Type"]`),
    selectMenuItems: () =>
      cy.get('.MuiAutocomplete-popper li[data-option-index="0"]'),
    selectMenuItems2: () =>
      cy.get('.MuiAutocomplete-popper li[data-option-index="1"]'),
    selectMenuItems3: () =>
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]'),
    saveBtn: () => cy.xpath(`//*[text()='Save']`),
    selectRecipeItem: () => cy.xpath(`(//*[@role="row"])[2]`),
    editRecipeSetup: () => cy.xpath(`//*[@ng-show='isEdit']`),
    openKitchendisplayAppPage: () =>
      cy.xpath(`//*[.='Open Kitchen Display Application']`),
    manageAllergenBtn: () => cy.get(`a[href="#/allergen"]`),
    manageEquipments: () => cy.get(`a[href="#/utensil"]`),
    exportDD: () => cy.contains("Export as")
  };

  createMenuTypes(name) {
    this.element.recipeSetupBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.addNewRecipeTypeBtn().should("be.visible").click();
    this.element.addNameTxt().should("be.visible").type(name);
    this.element.addCategoryDD().click();
    this.element.selectMenuItems().click();
    this.element.saveBtn().click();
    this.element.addNewRecipeTypeBtn().should("be.visible");
    this.element.exportDD().should("be.visible");
    cy.wait(2000);
  }

  createMenuTypes2(name) {
    this.element.recipeSetupBtn().click();
    this.element.addNewRecipeTypeBtn().click();
    this.element.addNameTxt().type(name);
    this.element.addCategoryDD().click();
    this.element.selectMenuItems2().click();
    this.element.saveBtn().click();
    cy.wait(2000);
  }
  createMenuTypes3(name) {
    this.element.recipeSetupBtn().click();
    this.element.addNewRecipeTypeBtn().click();
    this.element.addNameTxt().type(name);
    this.element.addCategoryDD().click();
    this.element.selectMenuItems3().click();
    this.element.saveBtn().click();
    cy.wait(2000);
  }

  checkForEditRecipeSetup() {
    this.element.recipeSetupBtn().click();
    this.element.selectRecipeItem().should("be.visible").click();
    this.element.editRecipeSetup().should("not.exist");
  }

  goToOpenDisplayKitchenApplicationPage() {
    this.element.openKitchendisplayAppPage().should("be.visible");
  }

  manageAllergen() {
    this.element.manageAllergenBtn().click();
  }

  manageEquipments() {
    this.element.manageEquipments().click();
  }
}
module.exports = new recipeSetupPage();
