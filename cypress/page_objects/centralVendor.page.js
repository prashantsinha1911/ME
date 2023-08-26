const utilObj = require("../utils/util_generic");
class centralVendor {
  element = {
    selectRow: () => cy.get(`.ui-grid-row.ng-scope`),
    vendorNameInputField: () => cy.get(`input[name='name']`),
    addInboundEDIBtn: () => cy.get(`button[ng-click='addRow()']`),
    inboundEDIFormatName: () =>
      cy.xpath(`//*[@ui-grid='ediGridOptions']//*[@role='gridcell']`),
    searchFilter: () => cy.get(`input[ng-model='filterValue']`),
    exportBtnCentralVendor: () => cy.get(`#centralVendorExportBtn`),
    selectPartnership: () => cy.get(`select[name='partnership']`),
    restaurantPermissionCheckBox: () => cy.get(`#restautantPermission`),
    salesRepEmailCheckBox: () => cy.get(`#salesRepEmail`),
    accountNumbeCheckBox: () => cy.get(`#accountNumber`),
    saveBtn: () => cy.get(`#centralVendorSaveBtn`),
    addCentralVendorBtn: () => cy.get(`#addCentralvendorBtn`),
    centralEDITableData: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[4]`),
    centralVendorTableData: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[2]`),
    selectEDIFormat: () => cy.get(`[ng-model='row.isSelected']`).first(),
    deleteEDIFormat: () => cy.get(`[ng-click='deleteRows()']`),
  };

  searchCentralVendor(vendorName) {
    // central vendor query won't happen until at least 2 characters are entered in search filter
    this.element
      .searchFilter()
      .should("be.visible")
      .clear()
      .type(vendorName, { delay: 0 });
    this.element.exportBtnCentralVendor().should("not.be.disabled");
    cy.wait(500);
    this.element.centralVendorTableData().should("include.text", vendorName);
    cy.wait(1000);
  }

  verifyEDIData() {
    this.element.centralEDITableData().should("include.text", "marginedge.com");
  }

  addInboundEmail(vendorName) {
    this.searchCentralVendor(vendorName);
    this.element.selectRow().should("be.visible").click();
    cy.xpath(`//*[@data-testid='${vendorName}']`).should("be.visible");
    this.element.selectPartnership().should("have.class", "ng-empty");
    this.element.addInboundEDIBtn().should("be.visible").click();
    cy.wait(500);
    this.element
      .inboundEDIFormatName()
      .should("be.visible")
      .type(`marginedge.com`);
    // restaurant permission, sale Rep Email & account number checkbox needs to be checked to make Request EDI invoices Btn visible
    this.checkEDIChekBoxes();
    this.element.saveBtn().should("not.be.disabled").click();
    // Page reloads later than usual.Might be an issue - check out with other QA
    cy.wait(4000);
    this.element.addCentralVendorBtn().should("be.visible");
  }

  checkEDIChekBoxes() {
    this.element
      .restaurantPermissionCheckBox()
      .should("be.visible")
      .find(".icheckbox_minimal-blue")
      .then(($el) => {
        if (!$el.hasClass("checked")) {
          this.element.restaurantPermissionCheckBox().click();
        }
      });
    this.element
      .salesRepEmailCheckBox()
      .should("be.visible")
      .find(".icheckbox_minimal-blue")
      .then(($el) => {
        if (!$el.hasClass("checked")) {
          this.element.salesRepEmailCheckBox().click();
        }
      });
    this.element
      .accountNumbeCheckBox()
      .should("be.visible")
      .find(".icheckbox_minimal-blue")
      .then(($el) => {
        if (!$el.hasClass("checked")) {
          this.element.accountNumbeCheckBox().click();
        }
      });
  }

  removeEDIFormat(vendorName) {
    this.searchCentralVendor(vendorName);
    this.element.selectRow().should("be.visible").click();
    this.element.selectEDIFormat().should("be.visible").click();
    this.element.deleteEDIFormat().should("be.visible").click();
    this.element.saveBtn().should("not.be.disabled").click();
  }
}
module.exports = new centralVendor();
