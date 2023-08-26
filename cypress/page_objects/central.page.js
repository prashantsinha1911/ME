class centralPage {
  element = {
    createCompanyConceptConfigBtn: () =>
      cy.xpath(`//*[@href='../#/companyConceptConfig/new']`),
    selectCompany: () =>
      cy.xpath(
        `//*[@aria-label='Select a company activate']//*[contains(text(),'Select a company')]`,
      ),
    selectWasabiSushiCoCompany: () =>
      cy.xpath(
        `//*[@ng-bind-html='c.name | highlight: $select.search']//*[.='Wasabi Sushi Co']`,
      ),
    selectConcept: () =>
      cy.xpath(`//*[@aria-label='Select a concept activate']`),
    selectWasabiConcept: () => cy.xpath(`//*[.='Wasabi']`),
    selectKey: () => cy.xpath(`//span[@aria-label='Select a key activate']`),
    selectVendorAutoDeleteKey: () =>
      cy.xpath(
        `//*[@class='ui-select-choices-row-inner']//*[contains(text(),'VENDOR_AUTO_DELETE_SENT_ORDER')]`,
      ),
    selectVendorAutoDeleteKeyConfig: () =>
      cy.xpath(`//select[@name='vendorAutoDeleteSentOrder']`),
    searchCompanyConfigs: () =>
      cy.xpath(`(//*[contains(@placeholder,'Search')])[2]`),
    selectElement: () =>
      cy.xpath(`(//*[@role='rowgroup']//*[@role='cell'])[3]`),
    deleteCompanyConfigs: () => cy.xpath(`//*[@ng-click='delete()']`),
    deleteConfirmCompanyConfigs: () =>
      cy.xpath(`//*[@type='submit'][@ng-disabled='deleteForm.$invalid']`),
    saveBtn: () => cy.xpath(`//*[@type="submit"]//*[text()='Save']`),
    configSearchFilter: () => cy.get(`#companyConfigFilter`),
    clickConfigItem: () =>
      cy.xpath(`(//*[@role='rowgroup']//*[@role='row'])[1]`),
    selectCountsBy: () => cy.get(`select[name='multi_count_by']`),
    configSaveBtn: () => cy.get(`.btn.btn-primary`),
    search: () => cy.xpath(`//input[@placeholder='Search']`),
    selectAnalyst2: () => cy.xpath(`//div[@title='analyst2']`),
    selectAnalyst2ImpersonateUnit: () =>
      cy.xpath(
        `(//div[@class='ui-grid-cell-contents ng-binding ng-scope'][normalize-space()='Analyst'])[2]`,
      ),
  };

  createVendorAutoDeleteSentOrders() {
    this.element.createCompanyConceptConfigBtn().click();
    cy.wait(2000);
    this.element.selectCompany().type(`Wasabi Sushi Co`);
    cy.wait(2000);
    this.element.selectWasabiSushiCoCompany().click();
    cy.wait(2000);
    this.element.selectConcept().click();
    cy.wait(2000);
    this.element.selectWasabiConcept().click();
    cy.wait(2000);
    this.element.selectKey().click();
    cy.wait(2000);
    this.element.selectVendorAutoDeleteKey().should("be.visible").click();
    cy.wait(2000);
    this.element.selectVendorAutoDeleteKeyConfig().select(`YES`);
    this.element.saveBtn().click();
    this.element.createCompanyConceptConfigBtn().should("be.visible");
  }

  vendorAutoDeleteSentOrdersNo() {
    cy.wait(2000);
    this.element.searchCompanyConfigs().type(`VENDOR_AUTO_DELETE_SENT_ORDER`);
    this.element.selectElement().should("be.visible").click();
    this.element
      .selectVendorAutoDeleteKeyConfig()
      .should("be.visible")
      .select(`NO`);
    this.element.saveBtn().should("be.visible").click();
  }

  vendorAutoDeleteSentOrdersDelete() {
    cy.wait(2000);
    this.element.searchCompanyConfigs().type(`VENDOR_AUTO_DELETE_SENT_ORDER`);
    this.element.selectElement().should("be.visible").click();
    this.element.deleteCompanyConfigs().should("be.visible").click();
    this.element.deleteConfirmCompanyConfigs().should("be.visible").click();
  }

  enableMultipleCountBys() {
    this.element
      .configSearchFilter()
      .should("be.visible")
      .clear()
      .type(`MULTIPLE_COUNT_BYS`, { delay: 0 });
    this.element.clickConfigItem().should("be.visible").click();
    this.element.selectCountsBy().select("YES");
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.configSearchFilter().should("be.visible");
  }

  createVendorAutoDeleteSentOrdersEDI() {
    this.element.createCompanyConceptConfigBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.selectCompany().should("be.visible").type(`Wasabi Sushi Co`);
    cy.wait(2000);
    this.element.selectWasabiSushiCoCompany().should("be.visible").click();
    cy.wait(2000);
    this.element.selectConcept().should("be.visible").click();
    cy.wait(2000);
    this.element.selectWasabiConcept().should("be.visible").click();
    cy.wait(2000);
    this.element.selectKey().should("be.visible").click();
    cy.wait(2000);
    this.element.selectVendorAutoDeleteKey().should("be.visible").click();
    cy.wait(2000);
    this.element.selectVendorAutoDeleteKeyConfig().select(`EDI`);
    this.element.saveBtn().should("be.visible").click();
  }
  impersonateUser() {
    cy.wait(2000);
    this.element.search().should("be.visible").clear().type(`Analyst2`);
    this.element.selectAnalyst2().should("be.visible").click();
    this.element.selectAnalyst2ImpersonateUnit().should("be.visible").click();
  }
}
module.exports = new centralPage();
