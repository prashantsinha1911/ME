const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");
class reconciliationPage {
  element = {
    selectRow: () => cy.get(`.ui-grid-row.ng-scope`).first(),
    searchFilter: () => cy.get(`[ng-model='filterValue']`)
  };

  // check the mistake count and the user
  checkReconciliationMistake(user) {
    this.element
      .searchFilter()
      .should("be.visible")
      .clear()
      .type(user, { delay: 0 });
    this.element.selectRow().should("be.visible").and("contain", user);
    // mistake count will be checked in the following ticket
  }
}
module.exports = new reconciliationPage();
