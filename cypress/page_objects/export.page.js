class exportPage {
  element = {
    search: () => cy.get(`[ng-model="filterValue"]`),
    selectRow: () => cy.get(`[ng-model="row.isSelected"]`),
    sendBtn: () => cy.get(`[ng-click="enqueue()"]`),
    selectAllReprt: () => cy.get(`[auto-close="outsideClick"]`),
    selectAllCheck: () =>
      cy.xpath(`(//*[@ng-click="changeViewBy($event)"])[1]`),
  };

  exportInv(invoiceName) {
    this.element.search().type(invoiceName);
    this.element.selectRow().click();
    this.element.sendBtn().click();
    cy.wait(30000);
    cy.reload();
  }

  observeReport() {
    this.element.selectAllReprt().click();
    this.element.selectAllCheck().click();
    this.element.selectAllReprt().click();
    cy.screenshot("cypress/screenshots/intacctSentReport");
  }
}
module.exports = new exportPage();
