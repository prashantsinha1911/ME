class conceptPage {
  element = {
    createConceptBtn: () => cy.get('[ui-sref="conceptNew"]'),
    conceptNameTextFd: () => cy.get('[name="conceptName"]'),
    fullServiceDD: () => cy.get('[aria-label="Full Service"]'),
    saveBtn: () => cy.get('[type="submit"]'),
    searchBtn: () => cy.xpath(`//*[@placeholder="Search"]`),
    assertionList: () => cy.get(".ui-grid-row.ng-scope")
  };

  createConcept(conceptName) {
    this.element.createConceptBtn().click();
    this.element.conceptNameTextFd().type(conceptName);
    this.element.fullServiceDD().click();
    this.element.saveBtn().click();
  }
}
module.exports = new conceptPage();
