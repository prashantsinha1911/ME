class vendorMapPage {
  element = {
    accSysVendor: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[2]`),
    openaccSys: () => cy.xpath(`//*[@aria-label="Select box activate"]`),
    selectBox: () => cy.xpath(`//*[@aria-label="Select box"]`),
    selectItem: () => cy.get(`.ui-select-choices-row-inner`),
    saveBtn: () => cy.get(`[ng-click="saveSync()"]`)
  };

  mapVendor() {
    cy.wait(5000);
    this.element.accSysVendor().dblclick();
    this.element.openaccSys().click();
    this.element.selectBox().type("American Express");
    this.element.selectItem().click();
    this.element.saveBtn().click();
    cy.reload();
  }
}
module.exports = new vendorMapPage();
