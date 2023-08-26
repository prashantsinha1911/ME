class assertionPage {
  element = {
    pageHeader: () => cy.get("h2.ng-scope"),
    kitchenDisplayPage: () =>
      cy.xpath(`//h2[text()='Kitchen Display Application']`),
    contentCheck: () => cy.get(`#content`),
    recipeSetupPage: () => cy.xpath(`//h2[text()='Recipe Setup']`),
    searchFilter: () => cy.xpath(`(//*[contains(@placeholder,'Search')])[2]`),
    exportAsDD: () =>
      cy.xpath(`//*[@class='btn btn-md btn-primary dropdown-toggle']`),
    perfCategoryreportInvoiceBtn: () =>
      cy.xpath(`//*[@class='btn btn-md btn-info']`),
    controllablePLsortByBtn: () => cy.get(`#sort-by`),
    notificationSetupCancelBtn: () => cy.xpath(`//*[@ng-click='leave()']`),
    exportAsCsvBtn: () => cy.xpath(`//button[text()='Export as CSV']`),
    posConnect: () =>
      cy.xpath(`//*[@class='btn btn-primary ng-scope ng-binding']`),
    refreshAssertionDiv: () => cy.get(`#refreshedData`),
    exportBtnPL: () => cy.get(`#exportBtnPL`),
    manageIndividualBtn: () =>
      cy.get(`[ng-click='changeNotificationsView(true)']`),
    integrationNotes: () => cy.get(`[ng-click='showIntegrationNotes()']`),
    filterCentralVendorBtn: () =>
      cy.get(`.btn.btn-md.btn-info.ng-binding.dropdown-toggle`),
    mergeProductBtn: () => cy.get(`[ng-click='mergeProducts()']`),
  };

  verifyPerfBudgetPage() {
    this.element.pageHeader().should("be.visible");
    this.element.contentCheck().should("be.visible");
    cy.wait(3000);
  }

  verifyPerfCategoryPage() {
    this.element.pageHeader().should("be.visible");
    this.element.perfCategoryreportInvoiceBtn().should("not.be.disabled");
  }

  verifyPerfControllablePL() {
    this.element.exportBtnPL().should("be.visible");
    this.element.controllablePLsortByBtn().should("be.visible");
  }

  verifyPerfCustomReports() {
    this.element.pageHeader().should(`be.visible`);
    this.element.searchFilter().should("be.visible");
  }

  verifyPerfFoodUsage() {
    this.element.pageHeader().should("be.visible");
    this.element.exportAsDD().should("not.be.disabled");
  }

  verifyPerfSales() {
    this.element.pageHeader().should("be.visible");
    this.element.contentCheck().should("be.visible");
    cy.wait(1000);
  }

  verifyPerfPriceAlert() {
    this.element.pageHeader().should("be.visible");
    this.element.searchFilter().should("be.visible");
  }

  verifyPerfPriceMovers() {
    this.element.pageHeader().should("be.visible");
    this.element.exportAsDD().should("be.visible");
  }

  verifyPerfTheorUsage() {
    this.element.pageHeader().should("be.visible");
    this.element.exportAsDD().should("not.be.disabled");
    cy.wait(3000);
  }

  verifyKitchenDisplayPage() {
    this.element.kitchenDisplayPage().should("be.visible");
  }

  checkContentDisplayed() {
    this.element.contentCheck().should("be.visible");
    this.element.searchFilter().should("be.visible");
  }

  verifyRecipeSetupPage() {
    this.element.recipeSetupPage().should("be.visible");
  }

  verifyKitchenDisplayPage() {
    this.element.kitchenDisplayPage().should("be.visible");
  }

  verifyPageSearchFilter() {
    this.element.searchFilter().should("be.visible");
  }

  verifyAccountPageChildren() {
    this.element.pageHeader().should("be.visible");
  }

  getFullMonth() {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    return month[date.getMonth()];
  }
  verifyRefreshAssertion() {
    let newText = "Refreshed: " + this.getFullMonth();
    this.element.refreshAssertionDiv().should("contain.text", newText);
  }
  verifyNotificationsPage() {
    this.element.manageIndividualBtn().should("be.visible");
  }

  verifyPageTitle() {
    this.element.pageHeader().should("be.visible");
  }

  verifyIntegrationPage() {
    this.element.integrationNotes().should("be.visible");
  }

  verifyPointOfSalePage() {
    this.element.integrationNotes().should("be.visible");
  }

  verifyCentralVendor() {
    this.element.filterCentralVendorBtn().should("be.visible");
  }

  verifyProductMerge() {
    this.element.mergeProductBtn().should("be.visible");
  }
}
module.exports = new assertionPage();
