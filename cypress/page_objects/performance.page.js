class PerformancePage {
  element = {
    exportDD: () =>
      cy.xpath(`//*[@class='btn btn-md btn-primary dropdown-toggle']`),
    exportAsCsv: () => cy.xpath(`//*[@ng-click="exportGrid($event, 'csv')"]`),
    productName: (productName) => cy.get(`[title='${productName}']`),
    // the row is from the second table of food usage report page
    itemRow: () =>
      cy.xpath(`(//*[contains(@class,'ui-grid-row-selected')])[2]`),
    expandHeaderIcon: () => cy.get(`[ng-click='headerButtonClick($event)']`),
  };

  export(reportName) {
    this.element.exportDD().should("be.visible").click();
    this.element.exportAsCsv().click();
    cy.readFile(`cypress/downloads/${reportName}.csv`).should("exist");
  }

  // report by column in Food Usage page is verified
  verifyProductData(productName, reportByData) {
    this.element
      .expandHeaderIcon()
      .should("be.visible")
      .then(($el) => {
        // `+` icon means not expanded
        if ($el.hasClass("ui-grid-icon-plus-squared")) {
          this.element.expandHeaderIcon().click();
        }
      });
    this.element.productName(productName).should("be.visible").click();
    cy.wait(500);
    this.element
      .itemRow()
      .find(".ui-grid-cell-contents.ng-binding.ng-scope")
      .first()
      .should("include.text", reportByData);
    cy.wait(2000);
  }
}
module.exports = new PerformancePage();
