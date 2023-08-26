const orderPageObj = require("./order.page");
const testData = require("../fixtures/rolePermission.json");
class billPayPage {
  element = {
    manageVendors: () => cy.get(`#billPayManageBtn`),
    filterOption: () => cy.get(`[ng-model="filterValue"]`),
    selectRow: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[2]`),
    toggleBillPayState: () => cy.get(`#billPayEnabled`),
    saveBtn: () => cy.get(`#billPaySaveBtn`),
    toggleSwitch: () => cy.get(`.toggle-switch-animate`),
    recipientField: () => cy.get(`#recipient`),
    addressLine1Field: () => cy.get(`#address1`),
    cityField: () => cy.get(`#city`),
    selectState: () => cy.get(`#state`),
    stateInputField: () => cy.get(`[ng-model='$select.search']`),
    zipCodeField: () => cy.get(`#zip`),
    phoneNo: () => cy.get(`#phoneNum`),
    selectItem: () => cy.get(`.ui-select-choices-row-inner`),
    vednorConfigureField: () => cy.xpath(`(//*[@role='gridcell'])[3]`),
  };
  // bill pay can be disabled without configuring first
  disableBillPay(vendorName) {
    this.element.manageVendors().should("be.visible").click();
    cy.wait(2000);
    this.element.filterOption().should("be.visible").clear().type(vendorName);
    this.element.selectRow().should("be.visible").click();
    cy.wait(3000);
    this.element.toggleSwitch().then(($el) => {
      if ($el.hasClass("switch-on")) {
        this.element.toggleBillPayState().click();
      }
    });
    this.element.saveBtn().should("not.be.disabled").click();
    cy.wait(2000);
  }

  enableBillPay(vendorName, address) {
    this.element.manageVendors().should("be.visible").click();
    this.element.filterOption().should("be.visible").clear().type(vendorName);
    this.element.vednorConfigureField().then(($el) => {
      if ($el.hasClass("text-danger")) {
        this.element.selectRow().should("be.visible").click();
        cy.wait(3000);
        this.insertVendorRemittanceAddress(address);
      } else {
        this.element.selectRow().should("be.visible").click();
        cy.wait(3000);
        this.element.toggleSwitch().then(($el1) => {
          if ($el1.hasClass("switch-off")) {
            this.element.toggleBillPayState().click();
            this.insertVendorRemittanceAddress(address);
          }
        });
      }
    });
    cy.wait(1000);
    this.element.saveBtn().should("not.be.disabled").click();
    cy.wait(2000);
  }

  insertVendorRemittanceAddress(address) {
    this.element
      .recipientField()
      .should("be.visible")
      .clear()
      .type(address.recipient);
    this.element.addressLine1Field().clear().type(address.addressLine1);
    this.element.cityField().clear().type(address.city);
    this.element.selectState().click();
    this.element
      .stateInputField()
      .should("be.visible")
      .clear()
      .type(address.state);
    this.element.selectItem().click();
    this.element.zipCodeField().clear().type(address.zipCode);
    this.element.phoneNo().clear().type(address.mobileNo);
  }
}
module.exports = new billPayPage();
