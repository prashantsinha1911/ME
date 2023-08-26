class equipmentPage {
  element = {
    addNewEquipment: () => cy.get(`a[href="#/utensil/new"]`),
    nameAllergen: () => cy.get(`input[name="name"]`),
    saveBtn: () => cy.xpath(`//*[text()='Save']`),
  };

  createEquipment(equipmentName) {
    this.element.addNewEquipment().click();
    this.element.nameAllergen().type(equipmentName);
    this.element.saveBtn().click();
  }
}
module.exports = new equipmentPage();
