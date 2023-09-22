class companyCOnfigPage {
  element = {
    addNewConfig: () => cy.get(`a[href="../#/companyConfig/new"]`),
    clickCompanyDD: () =>
      cy.get(`div[ng-model="companyConceptConfig.company"]`),
    enterCompanyName: () => cy.get(`input[placeholder="Select a company"]`),
    selectInnerItem: () => cy.get(`.ui-select-choices-row-inner`),
    clickKey: () => cy.get(`div[ng-model="companyConceptConfig.key"]`),
    enterKey: () => cy.get(`input[placeholder="Select a key"]`),
    DeletedInvFlowDD: (option) =>
      cy.get('select[ng-model="companyConceptConfig.value"]').select(option),
    DeletedInvFlowDDOptions: () => cy.get('[name="deletedInvoiceFlow"]'),
    saveBtn: () => cy.contains("Save"),
    filter: () => cy.get(`#companyConfigFilter`),
    clickItem: () => cy.contains("DELETED_INVOICE_FLOW"),
    delete: () => cy.get(`[ng-click="delete()"]`),
    deleteConfirm: () => cy.get(`.btn.btn-danger`),
    checkConfig: () => cy.contains("Mid-States Management Group")
  };

  addConfigDeleteInvFlow(option) {
    const element = this.element; // Assuming this is an alias for page elements
    element.addNewConfig().click();
    element.clickCompanyDD().click();
    // Configure company details
    element.enterCompanyName().type("Wasabi");
    element.selectInnerItem().click();
    // Configure key details
    element.clickKey().click();
    element.enterKey().type("DELETED_INVOICE_FLOW");
    element.selectInnerItem().click();

    // Use the provided option parameter to select the appropriate value
    element.DeletedInvFlowDD(option);

    element.saveBtn().click();
    cy.wait(5000);
  }

  deleteConfig() {
    const element = this.element; // Assuming this is an alias for page elements
    element.filter().type("DELETED_INVOICE_FLOW");
    element.clickItem().click();
    cy.wait(3000);
    element.delete().click();
    element.deleteConfirm().eq(1).click();
    cy.wait(3000);
  }

  searchConfig() {
    const element = this.element; // Assuming this is an alias for page elements
    element.filter().type("DELETED_INVOICE_FLOW");
    element.checkConfig().should("be.visible");
  }
}

module.exports = new companyCOnfigPage();
