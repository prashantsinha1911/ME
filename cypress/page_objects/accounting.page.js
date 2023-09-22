class accounting {
  element = {
    titleModify: () => cy.xpath(`//h4[normalize-space()='Modify Invoice']`),
    searchInvoice: () => cy.xpath(`//input[@placeholder='Search']`),
    clickItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
    otherActions: () =>
      cy.xpath(`//button[@class='btn bill-pay-btn-default dropdown-toggle']`),
    modifyInv: () => cy.xpath(`//*[@ng-click='modify()']`),
    invoiceNum: () => cy.xpath(`//input[@name='invoiceNum']`),
    invoiceDate: () => cy.xpath(`//input[@name='invoiceDate']`),
    todayDate: () => cy.get(`[ng-click="select('today', $event)"]`),
    saveBtn: () => cy.xpath(`//button[@type='submit']`),
    duplicateInvoiceTxt: () =>
      cy.xpath(`//div[@ng-show='duplicateInvoiceNumber']`),
    cancelBtn: () => cy.xpath(`//button[contains(text(),'Cancel')]`)
  };
  searchInvoice(invoiceName) {
    this.element.searchInvoice().should("be.visible").clear().type(invoiceName);
    this.element.clickItem().click();
  }
  modifyInvoices() {
    this.element.otherActions().should("not.be.disabled").click();
    this.element.modifyInv().click();
    this.element
      .invoiceNum()
      .should("be.visible")
      .clear()
      .type("InvoiceNumberChanged");
    this.element.invoiceDate().click();
    this.element.todayDate().click();
    this.element.saveBtn().should("not.be.disabled").click();
  }
  checkDuplicateModifiedInvoice() {
    this.element.otherActions().click();
    this.element.modifyInv().click();
    this.element
      .invoiceNum()
      .should("be.visible")
      .clear()
      .type("InvoiceNumberChanged");
    this.element.titleModify().click();
    this.element
      .duplicateInvoiceTxt()
      .parent()
      .scrollIntoView()
      .should("be.visible");
  }
}
module.exports = new accounting();
