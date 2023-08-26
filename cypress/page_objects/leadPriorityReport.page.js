class leadPriorityReportPage {
  element = {
    questionReport: () => cy.get(`button[ui-sref="questionTaskReport"]`),
  };

  clickQuestionReport() {
    this.element.questionReport().click();
  }
}
module.exports = new leadPriorityReportPage();
