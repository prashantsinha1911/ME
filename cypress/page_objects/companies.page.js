const sanityTestData = require("../fixtures/testData_Sanity.json");

class companyPage {
  element = {
    createCompanyBtn: () => cy.get('[ui-sref="companyNew"]'),
    companyNameTextFd: () => cy.get('[name="name"]'),
    zenDeskIDTextFd: () => cy.get('[name="zendeskId"]'),
    selectAccSys: () => cy.xpath(`(//*[@title="Select an Accounting System"])`),
    selectOptionAccSys: () => cy.xpath(`//*[text()='Intacct']`),
    selectPOSDD: () => cy.xpath(`(//*[@title="Select a POS"])`),
    selectOptionPOS: () => cy.xpath(`//*[text()='Aldelo']`),
    selectRetailDD: () => cy.xpath(`(//*[@title="Select a Retail Option"])`),
    selectOptionRetail: () => cy.xpath(`//*[text()='Unknown Retail']`),
    selectCommisionnary: () => cy.xpath(`(//*[@title="Select an Option"])`),
    selectOptionComissionary: () => cy.xpath(`//*[text()='Full Commissary']`),
    whyME: () => cy.xpath(`//*[@ng-model="company.zendeskWhy"]`),
    saveBtn: () => cy.xpath(`//*[@type="submit"]//*[text()='Save']`)
  };

  createCompany(companyName, zenDeskID) {
    this.element.createCompanyBtn().click();
    this.element.companyNameTextFd().type(companyName);
    this.element.zenDeskIDTextFd().type(zenDeskID);
    this.element.selectAccSys().click();
    this.element.selectOptionAccSys().click();
    this.element.selectPOSDD().click();
    this.element.selectOptionPOS().click();
    this.element.selectRetailDD().click();
    this.element.selectOptionRetail().click();
    this.element.selectCommisionnary().click();
    this.element.selectOptionComissionary().click();
    this.element.whyME().type(sanityTestData.conceptName);
    this.element.saveBtn().click();
  }
}
module.exports = new companyPage();
