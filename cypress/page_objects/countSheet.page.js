const testData = require("../fixtures/rolePermission.json");
const utilObj = require("../utils/util_generic");
class countSheetPage {
  element = {
    addNewCountSheet: () => cy.get(`[ui-sref="inventorySetupNew"]`),
    countSheetName: () => cy.get(`[ng-model="inventorySetup.name"]`),
    selectCheckBoxFood: () =>
      cy.xpath(`(//*[@class="icheckbox_minimal-blue"])[1]`),
    addProduct: () => cy.get(`[ng-click="addProducts($event)"]`),
    clickProductDD: () => cy.get(`[ng-change="newProductSelected()"]`),
    clickProductAdd: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
    selectItem: () => cy.get(`.ui-select-choices-row-inner`),
    saveProduct: () => cy.xpath(`//*[@ng-click="addNewProduct($event)"]`),
    addRecipe: () => cy.get(`[ng-click="addRecipe($event)"]`),
    clickRecipeDD: () => cy.get(`[ng-change="newRecipeSelected()"]`),
    enterRecipe: () => cy.xpath(`//*[@data-testid='selectRecipe']`),
    saveRecipe: () => cy.get(`[ng-click="addNewRecipe($event)"]`),
    saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
    printCountSheet: () => cy.xpath(`//*[text()='Print Count Sheet']`),
    selectFullInventory: () => cy.get(`a[ng-click="print(s, true)"]`),
    selectFullInventory1: () =>
      cy.xpath(`(//a[@ng-click="print(s, true)"])[1]`),
    selectFullInventory2: () =>
      cy.xpath(`(//a[@ng-click="print(s, true)"])[2]`),
    sheetToShelf: () => cy.get(`[ng-model="inventorySetup.setting"]`),
    addSection: () => cy.get(`button[ng-click="addSection($event)"]`),
    typeSectionName: () => cy.get(`input[ng-model="newSection.name"]`),
    addNewSection: () => cy.get(`button[ng-click="addNewSection($event)"]`),
    selectNewCountSheet: (countSheetName) =>
      cy.get(`[title='${countSheetName}']`),
    selectRowItem: (itemName) =>
      cy.get(`[data-testid="itemNameCS-${itemName}"]`).first(),
    deleteRowItem: (itemName) =>
      cy.get(`[data-testid="itemDeleteCS-${itemName}"]`).first(),
    productNameField: () => cy.get(`[ng-model='product.name']`),
    // prodNumCol no varies depending on how many columns are present on the table
    prodNumCol: (nth) => cy.xpath(`(//*[@role='gridcell'])[${nth}]`),
    prodPurchaseDateCol: (nth) => cy.xpath(`(//*[@role='gridcell'])[${nth}]`),
    prodPriceCol: (nth) => cy.xpath(`(//*[@role='gridcell'])[${nth}]`),
    prodInputField: () => cy.xpath(`//*[@ng-class="'colt' + col.uid"]`),
    okConfirmBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
    prodSaveBtn: () => cy.get(`[ng-click='saveNewUnit()']`),
    productPrice: () => cy.get(`[ng-model='product.reportByUnit.price']`),
    productTableHeader: () => cy.get(`#productConversionTable`),
    assignSectionToProduct: () => cy.get(`[ng-model='newProduct.section']`),
    assignSectionToRecipe: () => cy.get(`[ng-model='newRecipe.section']`),
    modalTitle: () => cy.get(`h5[class='modal-title']`),
    cancelBtn: () =>
      cy.get(`[ng-click='closeNewSectionModal()'][class='btn btn-default']`),
    existingSectionNote: () => cy.get(`#existingSectionNote`),
    productUnitQuantity: () => cy.get(`[ng-model='newProductUnit.quantity']`),
    itemCountByData: (item) => cy.get(`[data-testid='itemCountByCS-${item}']`),
    historyBtn: () => cy.get(`[ng-click='history()']`),
    csModifiedBy: () => cy.get(`[data-testid='csModifiedBy']`).last(),
    csModifiedDate: () => cy.get(`[data-testid='csModifiedDate']`).last(),
    csName: () => cy.get(`[data-testid='csName']`).last(),
    csSettings: () => cy.get(`[data-testid='csSettings']`).last(),
    closeHistoryModal: () =>
      cy.get(`button[class='btn btn-primary'][ng-click='closeModal()']`),
    addCategoryProductRadio: () =>
      cy.get(
        `span[translate='inviosoApp.inventorySetup.home.addCategoryRadio']`,
      ),
    addCategoryInput: () => cy.get(`input[aria-label='Select a category']`),
    addCategoryProductBtn: () => cy.get(`[ng-click='addNewCategory($event)']`),
    selectCategoryDD: () => cy.get(`[ng-model='newCategory.productType']`),
    categoryProductPositionCS: (itemName) =>
      cy.xpath(`//*[@data-testid='itemPositionCS-${itemName}']`),
    countByColumnHeader: () =>
      cy
        .xpath(
          `//*[@translate='inviosoApp.inventorySetup.table.common.countBy']`,
        )
        .last(),
    firstProductName: () => cy.xpath(`(//*[@class='ng-binding'])[1]`),
    productPurchaseDateCS: (productName) =>
      cy.get(`[data-testid="productPurchaseDate-${productName}"]`),
    verifyCSProductName: (productName) =>
      cy.get(`[data-testid='productNameCS-${productName}']`),
    duplicateInventorySetupTxt: () =>
      cy.xpath(
        `//div[@class='bootbox-body'][contains(text(),'A Count Sheet already exists with this name. Please select a unique name.')]`,
      ),
    cancelBtnCS: () =>
      cy.xpath(
        `//button[@ng-click='editForm.$dirty || setupDirty ? showCancelModal() : discardChanges()']`,
      ),
    radioBtnCS: () => cy.xpath(`//div[@id='newProductsModal']//label[2]`),
    selectCategory: () =>
      cy.xpath(`//span[@aria-label='Select a category activate']`),
    searchCategory: () =>
      cy.xpath(`//input[@placeholder='Enter a category...']`),
    saveCategory: () => cy.xpath(`//*[@ng-click="addNewCategory($event)"]`),
    deleteCS: () => cy.get(`[ng-click='delete()']`),
    confirmDeleteCS: () =>
      cy.xpath(
        `//form[@ng-submit='confirmDelete(inventorySetup.id)']//button[@type='submit']`,
      ),
    cannotEditCSWarningTxt: () =>
      cy.xpath(
        `//div[@class='bootbox-body'][contains(text(),'There is an inventory in process (not in a closed status). Please close out any open inventories before editing the Count Sheet.  You can make any changes you require in the open inventory and those changes will be reflected in your Count Sheet after it is closed.')]`,
      ),
    refCSWarningTxt: () =>
      cy.xpath(
        `//div[normalize-space()='Referenced by one or more inventories.']`,
      ),
    cannotEditCSWarningTxt: () =>
      cy.xpath(
        `//div[@class='bootbox-body'][contains(text(),'There is an inventory in process (not in a closed status). Please close out any open inventories before editing the Count Sheet.  You can make any changes you require in the open inventory and those changes will be reflected in your Count Sheet after it is closed.')]`,
      ),
  };

  createCountSheet(countSheetName, prodName, recipeName) {
    this.element.addNewCountSheet().should("be.visible").click();
    this.element.countSheetName().should("be.visible").type(countSheetName);
    this.element.selectCheckBoxFood().click();
    this.addProductToCountSheet(prodName);
    this.addRecipeToCountSheet(recipeName);
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.addNewCountSheet().should("be.visible");
    this.element.selectNewCountSheet(countSheetName).should("be.visible");
  }

  addProductToCountSheet(prodName) {
    this.element.addProduct().should("be.visible").click();
    this.element.clickProductDD().should("be.visible").click();
    this.element.clickProductAdd().clear().type(prodName);
    cy.wait(500);
    this.element.selectItem().should("be.visible").click();
    this.element.saveProduct().should("not.be.disabled").click();
  }

  addRecipeToCountSheet(recipeName) {
    this.element.addRecipe().should("be.visible").click();
    this.element.clickRecipeDD().should("be.visible").click();
    this.element.enterRecipe().clear().type(recipeName);
    cy.wait(500);
    this.element.selectItem().should("be.visible").click();
    this.element.saveRecipe().should("not.be.disabled").click();
  }

  createCountSheetSheetToShelf(
    sectionName,
    countSheetName,
    prodName,
    recipeName,
  ) {
    this.element.addNewCountSheet().click();
    this.element.countSheetName().type(countSheetName);
    this.element.sheetToShelf().select("Sheet to Shelf");
    this.element.addSection().click();
    this.element.typeSectionName().type(sectionName);
    this.element.addNewSection().click();
    cy.wait(1000);
    this.element.addProduct().click();
    this.element.clickProductDD().click();
    this.element.clickProductAdd().type(prodName);
    this.element.selectItem().click();
    this.element.saveProduct().click();
    this.element.addRecipe().click();
    this.element.clickRecipeDD().click();
    this.element.enterRecipe().type(recipeName);
    this.element.selectItem().click();
    this.element.saveRecipe().click();
    this.element.saveBtn().click();
  }

  createCountWithMultipleSection(
    sectionName,
    sectionName2,
    countSheetName,
    prodName,
    recipeName,
  ) {
    this.element.addNewCountSheet().should("be.visible").click();
    this.element.countSheetName().should("be.visible").type(countSheetName);
    this.element.countSheetOrganize().select("Sheet to Shelf");
    this.addSection(sectionName);
    this.addSection(sectionName2);
    this.addProduct(prodName);
    this.addRecipe(recipeName);
    this.addSection(sectionName2);
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.addNewCountSheet().should("be.visible");
  }

  createCountSheetRole(countSheetName) {
    this.element.addNewCountSheet().click();
    this.element.countSheetName().type(countSheetName);
    this.element.selectCheckBoxFood().click();
    this.element.saveBtn().click();
  }

  print() {
    this.element.printCountSheet().click();
    this.element.selectFullInventory1().click();
  }

  printCountSheet() {
    this.element.printCountSheet().click();
    cy.wait(3000);
    this.element.selectFullInventory1().click();
    this.element.printCountSheet().click();
    cy.wait(3000);
    this.element.selectFullInventory2().click();
  }

  editProdFromCS(countSheetName, productName, recipeName) {
    this.element
      .selectNewCountSheet(countSheetName)
      .should("be.visible")
      .click();
    this.setProductCount(productName);
    this.element.prodSaveBtn().scrollIntoView().should("be.visible").click();
    // delete recipe
    this.deleteRecipeFromCS(recipeName);
    this.element.saveBtn().should("be.visible").click();
    this.element.selectNewCountSheet(countSheetName).should("be.visible");
  }

  deleteRecipeFromCS(recipeName) {
    this.element.deleteRowItem(recipeName).should("be.visible").click();
    this.element.okConfirmBtn().should("be.visible").click();
  }

  addSection(sectionName) {
    this.element.addSection().should("be.visible").click();
    this.element.typeSectionName().clear().type(sectionName);
    this.element.addNewSection().click();
    cy.wait(1000);
  }

  addProductWithSection(prodName, sectionName) {
    this.element.addProduct().should("be.visible").click();
    this.element.clickProductDD().should("be.visible").click();
    this.element.clickProductAdd().clear().type(prodName);
    cy.wait(500);
    this.element.selectItem().should("be.visible").click();
    this.element.assignSectionToProduct().should("be.visible").click();
    this.element
      .assignSectionToProduct()
      .find('input[type="search"]')
      .should("be.visible")
      .clear()
      .type(sectionName);
    this.element.selectItem().should("be.visible").click();
    this.element.saveProduct().should("not.be.disabled").click();
  }

  addRecipeWithSection(recipeName, sectionName) {
    this.element.addRecipe().should("be.visible").click();
    this.element.clickRecipeDD().should("be.visible").click();
    this.element.enterRecipe().clear().type(recipeName);
    cy.wait(500);
    this.element.selectItem().should("be.visible").click();
    this.element.assignSectionToRecipe().should("be.visible").click();
    this.element
      .assignSectionToRecipe()
      .find('input[type="search"]')
      .should("be.visible")
      .clear()
      .type(sectionName);
    this.element.selectItem().should("be.visible").click();
    this.element.saveRecipe().should("not.be.disabled").click();
  }

  createCSwithMultipleSection(
    sectionName,
    sectionName2,
    countSheetName,
    prodName,
    recipeName,
  ) {
    this.element.addNewCountSheet().should("be.visible").click();
    this.element.countSheetName().should("be.visible").type(countSheetName);
    this.element.sheetToShelf().select("Sheet to Shelf");
    this.addSection(sectionName);
    // duplicate section with same name is not allowed
    this.addSectionWithSameName(sectionName);
    this.addSection(sectionName2);
    this.addProductWithSection(prodName, sectionName);
    this.addSameProductInMultipleSection(prodName, sectionName, sectionName2);
    this.changeItemCount(prodName, 1);
    // same product in both section contain 1 unit
    this.element
      .itemCountByData(prodName)
      .should("include.text", testData.productData.productUnit);
    this.addRecipeWithSection(recipeName, sectionName);
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.addNewCountSheet().should("be.visible");
  }

  changeItemCount(itemName, countNo) {
    this.element.selectRowItem(itemName).should("be.visible").click();
    cy.wait(3000);
    this.element.verifyCSProductName(itemName).should("be.visible");
    this.element
      .productUnitQuantity()
      .should("be.visible")
      .clear()
      .type(countNo);
    this.element.productNameField().should("be.visible").click();
    this.element.prodSaveBtn().should("be.visible").click();
  }

  addSectionWithSameName(sectionName) {
    this.element.addSection().should("be.visible").click();
    this.element.typeSectionName().type(sectionName);
    this.element.addNewSection().click();
    this.element
      .modalTitle()
      .should("have.text", "Sections must have unique name");
    cy.wait(2000);
    this.element.okConfirmBtn().should("be.visible").click();
    this.element.cancelBtn().should("be.visible").click();
  }

  addSameProductInMultipleSection(prodName, sectionName, sectionName2) {
    this.element.addProduct().should("be.visible").click();
    this.element.clickProductDD().should("be.visible").click();
    this.element.clickProductAdd().clear().type(prodName);
    cy.wait(500);
    this.element.selectItem().should("be.visible").click();
    this.element.assignSectionToProduct().should("be.visible").click();
    this.element
      .assignSectionToProduct()
      .find('input[type="search"]')
      .should("be.visible")
      .clear()
      .type(sectionName2);
    this.element.selectItem().should("be.visible").click();
    this.element
      .existingSectionNote()
      .should(
        "have.text",
        `Product already exists in the following sections: ${sectionName}`,
      );
    this.element.saveProduct().should("not.be.disabled").click();
  }

  verifyCSHistory(user, date, countSheetName, settings) {
    this.element
      .selectNewCountSheet(countSheetName)
      .should("be.visible")
      .click();
    this.element.historyBtn().should("be.visible").click();
    this.element.csModifiedBy().should("include.text", user);
    this.element.csModifiedDate().should("include.text", date);
    this.element.csName().should("include.text", countSheetName);
    this.element.csSettings().should("include.text", settings);
    this.element.closeHistoryModal().should("be.visible").click();
  }

  createCSWithCategoryProduct(
    countSheetName,
    sectionName,
    categoryName,
    productName,
  ) {
    this.element.addNewCountSheet().should("be.visible").click();
    this.element.countSheetName().should("be.visible").type(countSheetName);
    this.element.sheetToShelf().should("have.value", "CATEGORY");
    this.element.sheetToShelf().select("Sheet to Shelf");
    this.addSection(sectionName);
    this.addCategoriedProduct(categoryName, productName);
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.addNewCountSheet().should("be.visible");
  }

  addCategoriedProduct(categoryName, productName) {
    this.element.addProduct().should("be.visible").click();
    this.element.addCategoryProductRadio().should("be.visible").click();
    this.element.selectCategoryDD().should("be.visible").click();
    this.element
      .addCategoryInput()
      .should("be.visible")
      .clear()
      .type(categoryName);
    this.element.selectItem().should("be.visible").click();
    this.element.addCategoryProductBtn().should("be.visible").click();
    cy.wait(500);
    this.element
      .categoryProductPositionCS(productName)
      .should("be.visible")
      .clear()
      .type("1");
    this.element.countByColumnHeader().should("be.visible").click();
    cy.wait(500);
    this.element.firstProductName().should("include.text", productName);
    cy.wait(500);
  }

  setProductCount(productName) {
    this.element.selectRowItem(productName).click();
    cy.wait(3000);
    // restaurant column will be visible depending on the avilability of the vendor item on the units
    this.element.verifyCSProductName(productName).should("be.visible");
    this.element
      .productTableHeader()
      .should("be.visible")
      .then(($el) => {
        if ($el.text().includes("Restaurants")) {
          this.element.prodNumCol(7).should("be.visible").dblclick();
        } else {
          this.element.prodNumCol(6).should("be.visible").dblclick();
        }
      });
    this.element.prodInputField().clear().type(testData.productData.UnitAmount);
    // redundant click to get the save button enabled
    this.element.productNameField().click();
    // verify updated price
    this.element
      .productPrice()
      .should("include.value", testData.productData.updatedPrice);
  }

  // use when the product is used in closing a order
  // verify purchase date, price, updated price
  verifyPurchasedProduct(countSheetName, productName, prodPrice) {
    this.element
      .selectNewCountSheet(countSheetName)
      .should("be.visible")
      .click();
    let dateObj = utilObj.getDateObj(0);
    let formattedDate = utilObj.getformattedDate(
      dateObj.month,
      dateObj.day,
      dateObj.year,
      "/",
    );
    this.setProductCount(productName);
    // restaurant column will be visible depending on the avilability of the vendor item on the units
    this.element
      .productTableHeader()
      .should("be.visible")
      .then(($el) => {
        if ($el.text().includes("Restaurants")) {
          this.element
            .prodPurchaseDateCol(6)
            .should("include.text", formattedDate);
          this.element
            .prodPriceCol(5)
            .should("include.text", `$${parseFloat(prodPrice)}`);
        } else {
          this.element
            .prodPurchaseDateCol(5)
            .should("include.text", formattedDate);
          this.element
            .prodPriceCol(4)
            .should("include.text", `$${parseFloat(prodPrice)}`);
        }
      });
    this.element.prodSaveBtn().should("be.visible").click();
    this.element
      .productPurchaseDateCS(productName)
      .should("include.text", formattedDate);
    this.element.saveBtn().should("be.visible").click();
    this.element.selectNewCountSheet(countSheetName).should("be.visible");
  }

  createOnlyCountSheet(countSheetName) {
    this.element.addNewCountSheet().should("be.visible").click();
    this.element.countSheetName().should("be.visible").type(countSheetName);
    this.element.saveBtn().should("not.be.disabled").click();
  }

  verifyDuplicateCountSheet() {
    this.element.duplicateInventorySetupTxt().should("be.visible");
    this.element.okConfirmBtn().should("not.be.disabled").click();
  }

  cancelButton() {
    this.element.cancelBtnCS().should("be.visible").click();
  }

  addCategoryToCountSheet(countSheetName, prodName) {
    this.element.addNewCountSheet().should("be.visible").click();
    this.element.countSheetName().should("be.visible").type(countSheetName);
    this.addProductToCountSheet(prodName);
    this.element.addProduct().should("be.visible").click();
    this.element.radioBtnCS().should("be.visible").click();
    this.element.selectCategory().click();
    this.element.searchCategory().clear().type("Dairy Products");
    this.element.selectItem().should("be.visible").click();
    this.element.saveCategory().should("not.be.disabled").click();
    this.element.saveBtn().should("not.be.disabled").click();
    this.element.addNewCountSheet().should("be.visible");
    this.element.selectNewCountSheet(countSheetName).should("be.visible");
  }

  delecteCountSheet(countSheetName) {
    this.element
      .selectNewCountSheet(countSheetName)
      .should("be.visible")
      .click();
    this.element.deleteCS().should("be.visible").click();
    this.element.confirmDeleteCS().should("be.visible").click();
  }

  selectCS(countSheetName) {
    this.element
      .selectNewCountSheet(countSheetName)
      .should("be.visible")
      .click();
    this.element.cannotEditCSWarningTxt().should("be.visible");
    this.element.okConfirmBtn().should("be.visible").click();
  }

  refCSDelete() {
    this.element.refCSWarningTxt().should("be.visible");
    this.element.okConfirmBtn().should("be.visible").click();
  }
}
module.exports = new countSheetPage();
