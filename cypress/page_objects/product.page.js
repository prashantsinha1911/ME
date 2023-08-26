const testData = require("../fixtures/rolePermission.json");
const utilObj = require("../utils/util_generic");
class productPage {
  element = {
    productTitle: () => cy.xpath(`//h2[text()='Products']`),
    addNewProduct: () => cy.xpath(`//*[@href="#/product/new"]`),
    productName: () => cy.xpath(`//*[@ng-model="centralProduct"]`),
    prodName: () => cy.get(`input[ng-model="product.name"]`),
    enterProductName: () =>
      cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
    selectItem: () => cy.xpath(`(//a[@role="cell"])[1]`),
    selectProduct: () => cy.get(`.ui-select-choices-row-inner`),
    productCategoryClick: () =>
      cy.xpath(`(//*[@name="dst__0_productType"])[1]`),
    selectProductCategory: () => cy.contains(`Beer`),
    reportUnit: () => cy.xpath(`(//*[@name="reportUnit"])[2]`),
    price: () => cy.xpath(`(//*[@name="reportPrice"])[2]`),
    saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
    searchBtn: () => cy.xpath(`//*[@placeholder="Search"]`),
    assertList: () => cy.xpath(`//*[@role="row"]`),
    deleteProd: () => cy.get(`[ng-click="delete()"]`),
    editProd: () => cy.contains("Edit Product"),
    viewProd: () => cy.xpath(`//*[@role="table"]`),
    exportBtn: () => cy.contains("Export as CSV"),
    okBtn: () => cy.xpath(`//*[@class="btn btn-primary bootbox-accept"]`),
    confirmDelete: () => cy.xpath(`//*[@class="btn btn-danger"]`),
    countBy: () => cy.get("panel").contains("Count By"),
    editedProductName: () => cy.xpath(`//*[@ng-model='product.name']`),
    confirmSaveBtn: () =>
      cy.xpath(`//*[@class='btn btn-primary bootbox-accept']`),
    confirmDeleteBtn: () => cy.xpath(`//*[@ng-disabled='deleteForm.$invalid']`),
    editProductBtn: () =>
      cy.xpath(
        `//*[@translate='inviosoApp.product.home.editLabel']/parent::button`,
      ),
    manageAllergen: () => cy.get(`button[ng-click="showAllergensModal()"]`),
    addAllergen: () => cy.get(`div[ng-model="row.isSelected"]`),
    saveBtnAllergen: () => cy.xpath(`(//*[text()='Save'])[6]`),
    inventoriedProductLabel: () => cy.get(`#inventoriedProductLabel`),
    addCountSheet: () => cy.get(`#addCountSheetBtn`),
    selectInv: () => cy.get(`.bootbox-input.bootbox-input-select.form-control`),
    addInvUnitsBtn: () => cy.get(`[ng-click='addInventoryUnit()']`),
    submitUnitBtn: () => cy.get(`[ng-click='submitInventoryUnit()']`),
    selectInvUnit: () => cy.get(`[ng-model='newInventoryUnit.unit']`),
    invUnitCount: () => cy.get(`[name='inventoryUnitQuantity']`),
    lastUpdatedRatio: () => cy.get("#productRatio").first(),
    historyBtn: () => cy.get(`[ng-click='history()']`),
    closeProductAuditTrailBtn: () => cy.get(`#closeHistoryModal`),
    latestUnitPrice: () => cy.get(`#latestUnitPrice`),
    exportOptionDD: () => cy.get(`#productExportDD`),
    invStatusCol: () => cy.xpath(`(//a[@role='cell'])[5]`),
    verifyProductname: (productName) =>
      cy.xpath(`//input[@data-testid='productName-${productName}']`),
    inventoriedProdCheckBox: () => cy.get(`#inventoriedProduct`),
  };

  createProduct(productName) {
    this.element.addNewProduct().should("be.visible").click();
    this.element.productName().should("be.visible").click();
    this.element.enterProductName().clear().type(productName, { delay: 0 });
    this.element.selectProduct().click();
    this.element.productCategoryClick().click();
    this.element.selectProductCategory().click();
    this.element.reportUnit().select(testData.productData.productUnit);
    this.element.price().type(testData.productData.initialPrice);
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.addNewProduct().should("be.visible");
    cy.wait(2000);
  }

  createProductForUnitAdmin(productName) {
    this.element.addNewProduct().should("be.visible").click();
    this.element.prodName().click();
    this.element.prodName().type(productName, { delay: 0 });
    this.element.productCategoryClick().click();
    this.element.selectProductCategory().click();
    this.element.reportUnit().select("Bottle");
    this.element.price().type("35");
    this.element.saveBtn().click();
    cy.wait(2000);
  }

  createProductWithAllergen(productName) {
    this.element.addNewProduct().should("be.visible").click();
    this.element.productName().click();
    this.element.enterProductName().type(productName);
    this.element.selectProduct().click();
    this.element.productCategoryClick().click();
    this.element.selectProductCategory().click();
    this.element.reportUnit().select("Bottle");
    this.element.price().type("35");
    // add allergen
    this.element.manageAllergen().click();
    cy.wait(2000);
    this.element.addAllergen().click();
    this.element.saveBtnAllergen().click();
    cy.wait(1000);
    this.element.saveBtn().click();
    cy.wait(1000);
  }

  viewProduct() {
    this.element.viewProd().should("be.visible");
  }

  checkCreateProdButton() {
    this.element.addNewProduct().should("not.exist");
  }

  checkEditAndDelete() {
    this.element.searchBtn().type("Baby Carrots");
    this.element.selectItem().click();
    this.element.countBy().should("be.visible");
    cy.wait(1000);
    this.element.editProductBtn().should("be.disabled");
    this.element.deleteProd().should("not.exist");
    cy.go("back");
  }

  editProduct() {
    this.element.selectItem().click();
    this.element.countBy().should("be.visible");
    this.element.editProd().click();
    this.element.prodName().type("Test");
    this.element.saveBtn().click();
    cy.wait(5000);
  }

  deleteProduct() {
    this.element.countBy().should("be.visible");
    this.element.editProd().click();
    this.element.deleteProd().should("be.visible").click();
    this.element.confirmDelete().click();
    this.element.addNewProduct().should("be.visible");
  }

  editCreatedProduct(productName) {
    this.element.searchBtn().should("be.visible").clear().type(productName);
    this.element.selectItem().should("be.visible").click();
    this.element.countBy().should("be.visible");
    cy.wait(1000);
    this.element.editProductBtn().should("be.visible").click();
    cy.wait(1000);
    this.element
      .editedProductName()
      .should("be.visible")
      .clear()
      .type("Edited" + productName, { delay: 0 });
    this.element.saveBtn().click();
    cy.xpath(`//body`).then(($el) => {
      if (
        $el
          .text()
          .includes(
            "Changing this Product will update the data for all Restaurants in this",
          )
      ) {
        this.element.confirmSaveBtn().click();
      }
    });
    cy.wait(1000);
    this.element.countBy().should("be.visible");
    this.element.editProductBtn().should("be.visible");
  }

  checkExport() {
    this.element.exportOptionDD().should("be.visible").click();
    this.element.exportBtn().should("not.be.disabled").click();
    cy.readFile("cypress/downloads/products.csv").should("exist");
  }

  addInvUnits(productName) {
    this.element.searchBtn().should("be.visible").clear().type(productName);
    this.element.selectItem().click();
    cy.wait(1000);
    this.element.countBy().should("be.visible");
    this.element.editProductBtn().should("not.be.disabled").click();
    cy.wait(1000);
    // verify product name
    this.element.verifyProductname(productName).should("be.visible");
    this.element.addInvUnitsBtn().should("be.visible").click();
    this.element.selectInvUnit().select("Gram");
    this.element.invUnitCount().should("be.visible").clear().type(1);
    this.element.submitUnitBtn().should("not.be.disabled").click();
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.countBy().should("be.visible");
  }

  searchProduct(prodName) {
    this.element.searchBtn().should("be.visible").clear().type(prodName);
    this.element.selectItem().click();
    this.element.countBy().should("be.visible");
    cy.wait(1000);
  }

  verifyUpdatedProductPrice(prodName) {
    this.searchProduct(prodName);
    this.element
      .latestUnitPrice()
      .should(
        "include.text",
        `Latest Unit Price: $${testData.productData.updatedPrice}`,
      );
    this.element.historyBtn().should("be.visible").click();
    cy.wait(1000);
    this.element
      .lastUpdatedRatio()
      .should("have.text", testData.productData.updatedRatio);
    this.element.closeProductAuditTrailBtn().should("be.visible").click();
  }

  verifyInventoryStatus(tenant, productName, inventoryStatus) {
    utilObj.checkRestUnit(tenant, tenant);
    this.element.searchBtn().should("be.visible").clear().type(productName);
    this.element.invStatusCol().should("include.text", inventoryStatus);
  }

  unInventoryProduct(productName) {
    this.searchProduct(productName);
    this.element.editProductBtn().should("be.visible").click();
    cy.wait(1000);
    // verify product name
    this.element.verifyProductname(productName).should("be.visible");
    this.element
      .inventoriedProductLabel()
      .children(".icheckbox_minimal-blue")
      .children("input")
      .then(($el) => {
        if ($el.prop("checked")) {
          this.element.inventoriedProductLabel().click();
        }
      });
    this.element.saveBtn().should("be.visible").click();
    this.element.countBy().should("be.visible");
  }
}
module.exports = new productPage();
