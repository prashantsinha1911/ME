class notificationTaskPage {
  element = {
    selectOrderRow: () =>
      cy.xpath(`(//*[@ng-click='selectButtonClick(row, $event)'])[1]`),
    assignProductBtn: () => cy.get(`[ng-click='selectNewAssignProduct()']`),
    createProductRadiobtn: () =>
      cy.xpath(`(//*[@class='iradio_minimal-blue'])[1]`),
    reportUnit: () => cy.get(`#reportUnit`),
    selectCategory: () => cy.get(`#categoryDD`),
    selectDDItem: () => cy.get(`.ui-select-choices-row-inner`).first(),
    // How many each column Data locator
    convertionData: () =>
      cy.get(`.ui-grid-cell.ng-scope.required-grid-cell`).first(),
    uploadDate: () => cy.xpath(`(//span[text()='Upload Date'])[1]`),
    saveAndCloseProductModal: () =>
      cy.xpath(`//*[@ng-disabled='newAssignProductForm.$invalid']`),
    approveSelectedBtn: () => cy.get(`[ng-click='saveSelectedItems(true)']`),
    okBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
  };

  assignProduct() {
    this.element.uploadDate().should("be.visible").click();
    this.element.selectOrderRow().should("be.visible").click();
    this.element.assignProductBtn().should("not.be.disabled").click();
    cy.wait(2000);
  }

  createProduct() {
    this.element.createProductRadiobtn().should("be.visible").click();
    cy.wait(3000);
    // report unit
    this.element.reportUnit().should("be.visible").type("Bag");
    this.element.selectDDItem().click();
    cy.wait(1000);
    this.element.convertionData().click();
    this.element.convertionData().should("be.visible").type(10);
    cy.wait(1000);
    // add category
    this.element.selectCategory().should("be.visible").click();
    cy.wait(500);
    this.element.selectDDItem().should("be.visible").click();
    this.element.saveAndCloseProductModal().should("not.be.disabled").click();
    this.element.selectOrderRow().should("be.visible").click();
    this.element.approveSelectedBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.okBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.uploadDate().should("be.visible");
  }
}
module.exports = new notificationTaskPage();
