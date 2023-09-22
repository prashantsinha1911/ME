class priceAlertPage {
  element = {
    priceAlertBtn: () => cy.get(`button[href="#/priceAlert/new"]`),
    clickVendorDD: () => cy.get(`div[ng-change="selectVendor()"]`),
    categories: () => cy.xpath(`//*[@href="#/productType"]//*[@role="button"]`),
    selectItemFromDD: () =>
      cy.xpath(`(//*[@class="ui-select-choices-row-inner"])[1]`),
    clickVIDD: () => cy.get(`div[ng-model="alert.centralVendorProduct"]`),
    clickPODD: () => cy.get(`div[ng-model="alert.centralVendorProductUnit"]`),
    applyRule: () => cy.get(`input[ng-model="alert.effectiveDate"]`),
    clickToday: () => cy.get(`button[ng-click="select('today', $event)"]`),
    enterPrice: () => cy.get(`input[ng-model="alert.price"]`),
    saveBtn: () => cy.get(`button[ng-if="hasAccessToWholeCompanyConcept"]`)
  };

  createPriceAlert() {
    this.element.priceAlertBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.clickVendorDD().should("be.visible").click();
    this.element.selectItemFromDD().should("be.visible").click();
    this.element.clickVIDD().should("be.visible").click();
    this.element.selectItemFromDD().should("be.visible").click();
    this.element.clickPODD().should("be.visible").click();
    this.element.selectItemFromDD().should("be.visible").click();
    this.element.applyRule().should("be.visible").click();
    this.element.clickToday().should("be.visible").click();
    this.element.enterPrice().should("be.visible").clear().type("10");
    this.element.saveBtn().should("not.be.disabled").click();
    cy.wait(2000);
    this.element.priceAlertBtn().should("be.visible");
  }
}
module.exports = new priceAlertPage();
