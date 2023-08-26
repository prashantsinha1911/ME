const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");
class reconciliationPage {
  element = {
    selectRow: () => cy.get(`.ui-grid-row.ng-scope`).first(),
    searchFilter: () => cy.get(`[ng-model='filterValue']`),
  };

  checkReconciliationMistake() {
    hamburgerMenuPageObj.goToSetup();
    hamburgerMenuPageObj.goToReconciliationReportSetup();
    this.element.searchFilter().should("be.visible").clear().type("admin");
    cy.wait(500);
    this.element.selectRow().should("be.visible").click();
    cy.wait(1000);
    // reconciliation mistake data
    this.element.selectRow().should("be.visible");
  }
}
module.exports = new reconciliationPage();
