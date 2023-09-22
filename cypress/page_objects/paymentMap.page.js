class paymentMapPage {
  element = {
    selctRow: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[2]`),
    selectInternalRow: () =>
      cy.xpath(`//*[@class='ui-select-match-text pull-left']`),
    addTxt: () => cy.xpath(`//*[@aria-label="Select box"]`),
    selectItem: () =>
      cy.xpath(`(//*[@class='ui-select-choices-row-inner'])[1]`),
    saveBtn: () => cy.get(`[ng-click="saveSync()"]`),
    addAccount: () => cy.xpath(`//*[@ng-click='addRow()']`),
    paymentAccountName: () =>
      cy.get(
        `.ui-grid-cell.ng-scope.ui-grid-coluiGrid-0006 > .ui-grid-cell-contents.ng-binding.ng-scope`
      ),
    accSaveBtn: () => cy.xpath(`//button[normalize-space()='Save']`),
    okBtn: () => cy.xpath(`//button[contains(text(),'OK')]`),
    selectPaymentOther: () =>
      cy.get(`div[aria-label='Row 5, Row Selection Checkbox']`),
    deleteSelectedAccount: () => cy.xpath(`//*[@ng-click='deleteRows()']`),
    titleAcc: () => cy.xpath(`//h2[@class='ng-scope']`),
    refWarningPayment: () =>
      cy.xpath(
        `//div[contains(text(),'Payment account is referenced by one or more order')]`
      )
  };

  paymentMapping() {
    cy.wait(5000);
    this.element.selctRow().dblclick();
    this.element.selectInternalRow().click();
    this.element.addTxt().type("Suntrust");
    this.element.selectItem().click();
    this.element.saveBtn().click();
    cy.reload();
  }
  addPaymentAccount(accountName) {
    cy.wait(3000);
    this.element.addAccount().should("be.visible").click();
    cy.wait(2000);
    this.element.titleAcc().click();
    this.element.paymentAccountName().last().type(accountName);
    this.element.saveBtn().should("be.visible").click();
    this.element.accSaveBtn().should("be.visible").click();
    this.element.okBtn().should("be.visible").click();
  }
  deletePaymentAccount() {
    cy.wait(3000);
    this.element.selectPaymentOther().should("be.visible").click();
    cy.wait(2000);
    this.element.deleteSelectedAccount().should("be.visible").click();
    this.element.okBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.saveBtn().should("be.visible").click();
    cy.wait(2000);
  }

  deletePaymentAccount2() {
    cy.wait(3000);
    this.element.selectPaymentOther().should("be.visible").click();
    cy.wait(2000);
    this.element.deleteSelectedAccount().should("be.visible").click();
    this.element.okBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.saveBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.okBtn().should("be.visible").click();
  }

  verifyDeletePaymentAccount() {
    cy.wait(2000);
    this.element.refWarningPayment().should("be.visible");
    this.element.okBtn().should("be.visible").click();
  }
}
module.exports = new paymentMapPage();
