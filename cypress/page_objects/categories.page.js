const hamburgerMenuPageObj = require("../page_objects/hamburgerMenu.pageObj");

class categoryPage {
  element = {
    addNewCategoryBtn: () => cy.get(".btn-success > .ng-scope"),
    sortTable: () => cy.xpath(`(//*[@ng-keydown="handleKeyDown($event)"])[1]`),
    addRow1: () =>
      cy.xpath(
        `(//*[contains(@class,'ui-grid-cell-contents ng-binding ng-scope')])[1]`,
      ),
    addRow1Value: () => cy.xpath(`//*[@ng-model="row.entity['name']"]`),
    addRow2: () =>
      cy.xpath(
        `(//*[contains(@class,'ui-grid-cell-contents ng-binding ng-scope')])[2]`,
      ),
    // categoryTypeDD: () => cy.get(`input[ng-model="row.entity['categoryType']"]`),
    handleRow: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[1]`),
    input1: () => cy.get(`[name="inputForm"]`),
    handleRow2: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[1]`),
    handleRow3: () =>
      cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[3]`),
    categorySelect: () => cy.xpath(`//option[text()='Food']`),
    addRow3: () =>
      cy.xpath(
        `(//*[contains(@class,'ui-grid-cell-contents ng-binding ng-scope')])[3]`,
      ),
    selectRow: () => cy.xpath(`(//*[@ng-model="row.isSelected"])[1]`),
    saveBtn: () => cy.xpath(`//*[@ng-click="saveSync()"]`),
    searchBtn: () => cy.xpath(`//*[@ng-model="filterValue"]`),
    assertList: () => cy.xpath(`//*[@class="ui-grid-row ng-scope"]`),
    importCategory: () => cy.xpath(`//*[@ng-click="importCategories()"]`),
    selectImportOpt: () =>
      cy.contains(`Select from default MarginEdge categories`),
    okBtn: () => cy.xpath(`(//*[text()='OK'])[2]`),
    handleRow: () =>
      cy.xpath(`(//*[@ng-click="headerButtonClick($event)"])[2]`),
    okBtnConfirm: () => cy.xpath(`(//*[text()='OK'])[3]`),
    searchValue: () => cy.get(`[ng-model="filterValue"]`),
    selctAcc: () => cy.get(".ui-grid-cell.ng-scope.ui-grid-coluiGrid-000H"),
    typeAccSys: () => cy.xpath(`//*[@aria-label="Select box"]`),
    selectItem: () => cy.get(`.ui-select-choices-row-inner`),
    inventoryAcc: () => cy.get(`.ui-grid-cell.ng-scope.ui-grid-coluiGrid-000I`),
    selectSunTrust: () =>
      cy
        .get(`[ng-model="row.entity['inventoryRemoteId']"]`)
        .select("1001 - Suntrust"),
    searchFilter: () => cy.get(`input[ng-model="filterValue"]`),
    selectRow2: () => cy.get(`div[ng-model="row.isSelected"]`),
    deleteBtn: () => cy.get(`button[ng-click="deleteRow()"]`),
    okBtnDel: () => cy.xpath(`//*[@class="btn btn-primary bootbox-accept"]`),
    manageCategoryTypeBtn: () =>
      cy.get(`[ng-click='openCustomCategoryTypeModal()']`),
    addNewCategoryTpeBtn: () => cy.get(`[ng-click='addCategoryTypeRow()']`),
    categoryTypeNameCol: () =>
      cy.xpath(
        `(//div[@role='gridcell'][contains(@class,'ui-grid-white')])[1]`,
      ),
    categoryTypeNameField: () => cy.get(`[ng-model="row.entity['name']"]`),
    ingredientTypeNameCol: () =>
      cy.xpath(
        `(//div[@role='gridcell'][contains(@class,'ui-grid-white')])[2]`,
      ),
    selectIngredientType: () => cy.get(`[ng-class="'colt' + col.uid"]`),
    saveCategoryTypeBtn: () => cy.get(`[ng-click='saveCategoryTypes()']`),
  };

  searchCategoryAndDelete() {
    this.element.searchFilter().type("Wine");
    this.element.selectRow2().click();
    this.element.deleteBtn().click();
    this.element.okBtnDel().click();
  }

  mapCategory() {
    this.element.searchValue().type("Can");
    cy.wait(3000);
    this.element.selctAcc().dblclick();
    this.element.selctAcc().click();
    cy.wait(1000);
    this.element.typeAccSys().type("1510");
    this.element.selectItem().click();
    this.element.inventoryAcc().dblclick();
    this.element.inventoryAcc().click();
    cy.wait(1000);
    this.element.inventoryAcc().click();
    cy.wait(1000);
    this.element.selectSunTrust();
    this.element.saveBtn().click();
    cy.reload();
  }

  importCategory() {
    hamburgerMenuPageObj.element.accountings().click();
    this.element.importCategory().click();
    this.element.selectImportOpt().click();
    this.element.okBtn().click();
    this.element.handleRow().click();
    this.element.okBtnConfirm().click();
    this.element.saveBtn().click();
    cy.reload();
  }

  createCategory(categoryName, accCode) {
    hamburgerMenuPageObj.element.accountings().click();
    this.element.addNewCategoryBtn().click();
    this.element.handleRow().click();
    cy.wait(1000);
    this.element.input1().type(categoryName);
    cy.wait(1000);
    this.element.handleRow2().click();
    cy.wait(1000);
    this.element.categorySelect().click;
    cy.wait(1000);
    this.element.handleRow3().click();
    cy.wait(1000);
    this.element.input1().type(accCode);
    cy.wait(1000);
    this.element.selectRow().click();
    this.element.saveBtn().click();
    cy.reload();
    cy.wait(1000);
  }

  addCategoryType(categoryTypeName) {
    this.element.manageCategoryTypeBtn().should("be.visible").click();
    cy.wait(3000);
    this.element.addNewCategoryTpeBtn().should("be.visible").click();
    cy.wait(1000);
    this.element.categoryTypeNameCol().should("be.visible").dblclick();
    this.element
      .categoryTypeNameField()
      .should("be.visible")
      .clear()
      .type(categoryTypeName);
    this.element.ingredientTypeNameCol().should("be.visible").dblclick();
    this.element.selectIngredientType().select("Food");
    // needs a redundant click to get the save button enabled
    this.element.categoryTypeNameCol().should("be.visible").click();
    this.element.saveCategoryTypeBtn().should("not.be.disabled").click();
    // okBtnDel Shares the same locator for saveCategoryType  confirm ok btn
    this.element.okBtnDel().should("be.visible").click();
    this.element.manageCategoryTypeBtn().should("be.visible");
  }
}
module.exports = new categoryPage();
