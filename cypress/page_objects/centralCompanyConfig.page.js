class companyCOnfigPage {
  element = {
    addNewConfig: () => cy.get(`a[href="../#/companyConfig/new"]`),
    clickCompanyDD: () =>
      cy.get(`div[ng-model="companyConceptConfig.company"]`),
    enterCompanyName: () => cy.get(`input[placeholder="Select a company"]`),
    selectInnerItem: () => cy.get(`.ui-select-choices-row-inner`),
    clickKey: () => cy.get(`div[ng-model="companyConceptConfig.key"]`),
    enterKey: () => cy.get(`input[placeholder="Select a key"]`),
    DeletedInvFlowDD: () =>
      cy.get('select[ng-model="companyConceptConfig.value"]').select("NONE"),
    DeletedInvFlowDDOptions: () =>
      cy.get('select[ng-model="companyConceptConfig.value"]'),
    saveBtn: () => cy.contains("Save"),
  };

  addConfigDeleteInvFlow() {
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
    element.DeletedInvFlowDD();
    element.saveBtn().click();
  }
}

module.exports = new companyCOnfigPage();
