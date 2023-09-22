class allergenPageSetup {
  element = {
    manageAllergenBtn: () => cy.get(`a[href="#/allergen"]`),
    addNewAllergen: () => cy.get(`a[href="/#/allergen/new"]`),
    nameAllergen: () => cy.get(`input[name="name"]`),
    saveBtn: () => cy.xpath(`//*[text()='Save']`)
  };

  createAllergen(allergenName) {
    this.element.addNewAllergen().click();
    this.element.nameAllergen().type(allergenName);
    this.element.saveBtn().click();
  }
}
module.exports = new allergenPageSetup();
