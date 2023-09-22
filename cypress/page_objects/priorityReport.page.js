const orderPage = require("./order.page");

class priorityReport {
  element = {
    search: () => cy.get(`[ng-model="filterValue"]`),
    clickIRBtn: () => cy.get(`[ng-click="startTasks('INITIAL_REVIEW')"]`),
    clickReconcialltionBtn: () =>
      cy.get(`[ng-click="startTasks('PENDING_RECONCILIATION')"]`),
    clickFRBtn: () => cy.xpath(`//*[@ng-click="startTasks('FINAL_REVIEW')"]`),
    okBtn: () => cy.get(`[ng-click="howManyBulkModalOk()"]`),
    recWarning: () =>
      cy.xpath(
        `//*[@class='modal-title'][contains(.,'No work left to do for this team')]`
      ),
    okBtnWarning: () => cy.xpath(`//button[contains(text(),'OK')]`),
    sortByWaitTime: () => cy.xpath(`//span[text()='Wait Time']`),
    clickContinueBtn: () =>
      cy.get(`[ng-click="continueTasks('INITIAL_REVIEW')"]`),
    noWorkWarning: () =>
      cy.xpath(
        `//div[@class='bootbox-body'][contains(text(),'For this lead analyst it looks like all of the work is done for the status you selected.')]`
      )
  };

  startIR(tenantName) {
    this.element.search().should("be.visible").clear().type(tenantName);
    this.element.sortByWaitTime().should("be.visible").click();
    cy.wait(1000);
    // It used to be possible to directly select rows on this page
    // The backend now handles task selection so this is no longer possible
    this.element.clickIRBtn().click();
    this.element.okBtn().should("be.visible").click();
    cy.wait(8000);
    orderPage.element.clickVendor().should("be.visible");
  }

  startReconcillations(tenantName) {
    this.element.search().should("be.visible").clear().type(tenantName);
    this.element.sortByWaitTime().should("be.visible").click();
    cy.wait(1000);
    this.element.clickReconcialltionBtn().click();
    this.element.okBtn().click();
    cy.wait(8000);
  }

  startFR(tenantName) {
    this.element.search().type(tenantName);
    this.element.clickFRBtn().click();
    this.element.okBtn().click();
    cy.wait(8000);
  }

  verifyStartReconcillationsAnalyst(tenantName) {
    this.element.search().should("be.visible").clear().type(tenantName);
    this.element.sortByWaitTime().should("be.visible").click();
    cy.wait(1000);
    this.element.clickReconcialltionBtn().click();
  }

  noWorkLeftWarningForAnalyst() {
    this.element.recWarning().should("be.visible");
    this.element.okBtnWarning().should("be.visible").click();
  }

  noWorkLeftWarning() {
    this.element.noWorkWarning().should("be.visible");
    cy.wait(4000);
    cy.reload();
  }

  startContinue(tenantName) {
    this.element.search().should("be.visible").clear().type(tenantName);
    this.element.sortByWaitTime().should("be.visible").click();
    cy.wait(1000);
    this.element.clickContinueBtn().should("be.visible").click();
    cy.wait(8000);
  }

  clickIRBtn() {
    this.element.clickIRBtn().click();
  }

  searchTenantIR(tenantName) {
    this.element.search().should("be.visible").clear().type(tenantName);
  }
}
module.exports = new priorityReport();
