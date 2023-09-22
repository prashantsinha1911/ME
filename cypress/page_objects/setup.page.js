const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");
class setupPage {
  element = {
    features: () =>
      cy.xpath(`//*[@role='table']//*[@role='cell'][.='FEATURES']`),
    nightlySalesCheckBox: () => cy.contains("label", "NIGHTLY_SALES_DATA"), // cy.xpath(`//div[contains(@class,'icheckbox_minimal-blue')]/parent::label[contains(.,'NIGHTLY_SALES_DATA')]//input`),
    customReportsCheckBox: () => cy.contains("label", "CUSTOM_REPORTS"), // cy.xpath(`//div[contains(@class,'icheckbox_minimal-blue')]/parent::label[contains(.,'CUSTOM_REPORTS')]//input`), // cy.contains('CUSTOM_REPORTS')
    saveButton: () => cy.get(`button.btn.btn-primary`),
    addRestUnitSettingsBtn: () =>
      cy.xpath(`//*[local-name()='svg'][@data-testid='AddIcon']`),
    selectKey: () => cy.get(`[ng-click='$select.activate()']`),
    unitSettingstable: () => cy.get(`[role='table']`),
    clickItem: () => cy.get(`.ui-select-choices-row-inner`),
    selectAccountingPeriod: () => cy.get(`select[name='accountingPeriod']`),
    pageTable: () => cy.get(`[role='table']`),
    accPeriodTableData: () =>
      cy.xpath(`//a[@role='cell'][text()='ACCOUNTING_PERIOD']`),
    dateField: () => cy.get(`[name='date']`),
    deleteConfirmBtn: () =>
      cy.xpath(`//*[@class='btn btn-danger'][@type='submit']`),
    deleteBtn: () => cy.get(`button[ng-click='delete()']`)
  };

  enableFlag() {
    // go to setup > unitSettings >features >check nightlySalesData,custom reports
    hamburgerMenuPageObj.goToUnitSettings();
    this.element.features().should("be.visible").click();
    this.element.saveButton().should("not.be.disabled");
    // checkbox has class with hidden property display:none
    this.element
      .nightlySalesCheckBox()
      .children(".icheckbox_minimal-blue")
      .children("input")
      .then(($el) => {
        if (!$el.prop("checked")) {
          this.element.nightlySalesCheckBox().click({ force: true });
        }
      });

    this.element
      .customReportsCheckBox()
      .children(".icheckbox_minimal-blue")
      .children("input")
      .then(($el) => {
        if (!$el.prop("checked")) {
          this.element.customReportsCheckBox().click({ force: true });
        }
      });
    this.element.saveButton().click();
    this.element.features().should("be.visible");
    cy.wait(1000);
  }

  selectUnitSettingsKey(keyValue) {
    this.element
      .unitSettingstable()
      .should("be.visible")
      .then(($el) => {
        // if keyValue already present do nothing
        if (!$el.text().includes(keyValue)) {
          this.element.addRestUnitSettingsBtn().should("be.visible").click();
          this.element.selectKey().should("be.visible").type(keyValue);
          this.element.clickItem().should("be.visible").click();
          this.element
            .selectAccountingPeriod()
            .should("be.visible")
            .select("CALENDAR");
          // verify this period
          this.element.saveButton().should("not.be.disabled").click();
          this.element.features().should("be.visible");
          cy.wait(1000);
        }
      });
  }
  // For calendar second parameter is not required
  addAccPeriod(configurationType, assignedDate) {
    this.element
      .pageTable()
      .should("be.visible")
      .then(($el) => {
        if ($el.text().includes("ACCOUNTING_PERIOD")) {
          this.element.accPeriodTableData().should("be.visible").click();
        } else {
          this.element.addRestUnitSettingsBtn().should("be.visible").click();
          this.element
            .selectKey()
            .should("be.visible")
            .type(`ACCOUNTING_PERIOD`);
          this.element.clickItem().should("be.visible").click();
        }
      });
    this.element.selectAccountingPeriod().select(configurationType);
    if (configurationType != "CALENDAR") {
      this.element.dateField().should("be.visible").click();
      this.element.dateField().clear().type(assignedDate);
      cy.wait(500);
      cy.get(`[ng-click='close($event)']`).should("be.visible").click();
    }
    this.element.saveButton().should("not.be.disabled").click();
    this.element.accPeriodTableData().should("be.visible");
  }

  deleteAccountingPeriod() {
    this.element
      .unitSettingstable()
      .should("be.visible")
      .then(($el) => {
        // if keyValue already present do nothing
        if ($el.text().includes("ACCOUNTING_PERIOD")) {
          this.element.accPeriodTableData().should("be.visible").click();
          cy.wait(2000);
          this.element.deleteBtn().should("be.visible").click();
          cy.wait(500);
          this.element.deleteConfirmBtn().should("be.visible").click();
          this.element.features().should("be.visible");
          cy.wait(2000);
        }
      });
  }
}
module.exports = new setupPage();
