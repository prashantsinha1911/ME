const countSheetPage = require("./countSheet.page");

class inventoryPage {
  element = {
    clickEnterACount: () =>
      cy.xpath(`(//*[@ng-hide="viewingSpecificInventoryDate"])[1]`),
    clickFullInventory: () =>
      cy.xpath(`//a[@ng-click='takeInventory(s)'][.='Full Inventory']`),
    clickCreatedCountSheetRole: (countSheet) =>
      cy.xpath(`//a[@ng-click='takeInventory(s)'][.='${countSheet}']`),
    clickDateBar: () => cy.xpath(`//*[@name="inventoryDate"]`),
    clickTodayDate: () => cy.xpath(`//*[@ng-click="select('today', $event)"]`),
    saveAndExit: () => cy.get(`a[ng-click="saveAndExit($event)"]`),
    addQuantity: () => cy.xpath(`(//*[@ng-model="i.quantity"])[1]`),
    searchFilter: () => cy.get(`[ng-model="filterValue"]`),
    selectItem: () => cy.xpath(`(//*[@class="ui-grid-row ng-scope"])[2]`),
    selectItemRole: () => cy.xpath(`(//*[@class="ui-grid-row ng-scope"])[3]`),
    closeInventory: () => cy.get(`[ng-click="saveAndCloseInventory($event)"]`),
    okBtn: () => cy.xpath(`//*[@class="btn btn-primary bootbox-accept"]`),
    delete: () => cy.get(`[ng-click="delete()"]`),
    printCS: () =>
      cy.xpath(`(//*[@ng-hide="viewingSpecificInventoryDate"])[2]`),
    selectSavedItem: () =>
      cy.xpath(
        `(//*[@col-container-name="'body'"]//*[@class='ui-grid-row ng-scope'])[1]`
      ),
    reOpenBtn: () => cy.xpath(`//*[@ng-click='reopen()']`),
    confirmationBtn: () =>
      cy.xpath(
        `//*[contains(@style,'display: block')]//*[@class="btn btn-primary bootbox-accept"]`
      ),
    printCountSheetDD: () => cy.get(`#printCountSheetDD`),
    confirmDeleteBtn: () =>
      cy.xpath(
        `//*[@ng-submit='confirmDelete(inventory.id)']//*[@type='submit']`
      ),
    importCountSheetBtn: () => cy.xpath(`//*[@ng-show='canImportSetups']`),
    editInventoryDate: () => cy.xpath(`//*[@ng-click='fixInventoryDate()']`),
    saveFixDateBtn: () => cy.xpath(`//*[@ng-click='saveFixedDate($event)']`),
    editBtn: () => cy.get(`button[ng-click="edit($event)"]`),
    toggleBtn: () => cy.get(`[data-testid='invToggleBtn']`),
    deleteBtn: () => cy.xpath(`(//button[@title="Delete"])[2]`),
    addProduct: () => cy.get(`button[ng-click="addProducts($event)"]`),
    addRecipe: () => cy.get(`button[ng-click="addRecipe($event)"]`),
    typeProd: () => cy.get(`div[ng-model="newProduct.product"]`),
    typeRecipe: () => cy.get(`div[ng-model="newRecipe.recipe"]`),
    enterProd: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
    enterRecipe: () => cy.xpath(`//input[@aria-label="Select a recipe"]`),
    selectItemDD: () => cy.get(`.ui-select-choices-row-inner`),
    selectSection: () => cy.get(`[ng-model='sectionToMoveTo.position']`),
    selectSectionR: () => cy.get(`div[ng-model="newRecipe.section"]`),
    enterSection: () => cy.xpath(`(//*[@aria-label="Select a section"])[1]`),
    enterSection3: () => cy.xpath(`(//*[@aria-label="Select a section"])[3]`),
    saveProd: () => cy.get(`button[ng-click="addNewProduct($event)"]`),
    saveRecipe: () => cy.get(`[ng-click="addNewRecipe($event)"]`),
    deleteConfirm: () => cy.xpath(`(//*[@class="btn btn-danger"])[1]`),
    invSummaryStarting: () =>
      cy.xpath(
        `//*[@translate='inviosoApp.foodUsageReport.theoretical.starting']`
      ),
    exportAsDD: () => cy.xpath(`//button[.='Export as']`),
    productSearchFilter: () => cy.get(`[data-testid='productSearch']`),
    markedCount: () =>
      cy.xpath(`//tr[@class='ng-scope warning']//input[@name='i.quantity']`),
    productSearchIcon: () => cy.get(`#productSearchIcon`),
    saveOptionsDD: () => cy.get(`#saveOptionsDD`),
    addCount: () => cy.xpath(`(//button[@ng-click='showWork(i)'])[1]`),
    firstCount: () => cy.get(`#showWorkQuantity1`),
    secondCount: () => cy.get(`#showWorkQuantity2`),
    multipleCountSaveBtn: () => cy.get(`[ng-click='saveWork($event)']`),
    switchSectionBtns: (item) =>
      cy.get(`[data-testid='switchSectionIcon-${item}']`).first(),
    switchSaveBtn: () => cy.get(`[ng-click='completeSwitchSection($event)']`),
    moveUpBtn: (nth) =>
      cy.xpath(`(//*[@ng-click='moveItemUp($event, section, i)'])[${nth}]`),
    moveDownBtn: (nth) =>
      cy.xpath(`(//*[@ng-click='moveItemDown($event, section, i)'])[${nth}]`),
    deleteItemIcon: (item) => cy.get(`[data-testid='deleteItemIcon-${item}']`),
    saveOptionsBtn: () => cy.get(`[data-testid='saveOptions']`),
    multipleInvTitle: () => cy.get(`h5[class='modal-title']`),
    selectItemByCSName: (countSheet) =>
      cy.xpath(`//div[@title='${countSheet}']`).first(),
    invItemCount: (item) => cy.get(`[data-testid='invCount-${item}']`),
    doneBtnDateBar: () => cy.get(`[ng-click='close($event)']`),
    continueBtn: () => cy.xpath(`//button[text()='Continue']`),
    getProductRow: (productName) =>
      cy.xpath(`//tr[contains(.,'${productName}')]`),
    verifyReopenConfirmationText: () =>
      cy
        .get(`.modal-body>.bootbox-body`)
        .should(
          "include.text",
          "This inventory has been marked as closed.  Are you sure you want to reopen it?"
        ),
    history: () => cy.get(`[ng-click='history()']`)
  };

  createCountRole() {
    this.element.printCS().should("be.visible");
    this.element.clickEnterACount().should("be.visible").click();
    this.element.clickFullInventory().should("be.visible").click();
    cy.wait(2000);
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().should("be.visible").click();
    cy.go("back");
  }

  checkCountSheet() {
    this.element.searchFilter().type("Closed");
    this.element.selectItemRole().click();
    this.element.closeInventory().should("not.be.visible");
    this.element.delete().should("not.exist");
  }

  createAndCloseCountRole() {
    cy.wait(1000);
    this.element.clickEnterACount().should("be.visible").click();
    this.element.clickFullInventory().should("be.visible").click();
    cy.wait(2000);
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    this.element.addQuantity().should("be.visible").clear().type("8");
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.closeInventory().should("be.visible").click();
    this.element.confirmationBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.invSummaryStarting().should("not.be.disabled");
  }

  reOpenInventories() {
    // the closed item share the same locator as the saved one
    this.element.searchFilter().should("be.visible").clear().type("Closed");
    cy.wait(2000);
    this.element.selectSavedItem().should("be.visible").click();
    cy.wait(2000);
    this.element.reOpenBtn().should("be.visible").click();
    this.element.verifyReopenConfirmationText();
    this.element.confirmationBtn().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
  }

  deleteInventories() {
    this.element.delete().should("not.be.disabled").click();
    this.element.confirmDeleteBtn().should("be.visible").click();
    this.element.clickEnterACount().should("be.visible");
    cy.wait(2000);
  }

  importAndPrintCountSheet() {
    this.element.printCountSheetDD().should("be.visible");
    // importCountSheet element is visible for multiple unit
    // TO DO import CountSheet Btn
  }

  editInventoryDate() {
    cy.wait(2000);
    this.element.selectSavedItem().should("be.visible").click();
    this.element.editInventoryDate().should("be.visible").click();
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().click();
    this.element.saveFixDateBtn().click();
    this.element.editInventoryDate().should("be.visible");
  }

  reopenClosedInventories() {
    // the closed item share the same locator as the saved one
    cy.wait(2000);
    this.element.selectSavedItem().should("be.visible").click();
    cy.wait(2000);
    this.element.reOpenBtn().should("be.visible").click();
    this.element.verifyReopenConfirmationText();
    this.element.confirmationBtn().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
  }

  setCount() {
    cy.wait(5000);
    this.element.addQuantity().should("be.visible").clear().type("1");
    cy.wait(2000);
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.saveAndExit().should("be.visible").click();
    cy.wait(3000);
    this.element.clickEnterACount().should("be.visible");
  }

  editGoToConfigModeAndAddProductRecipe() {
    cy.wait(2000);
    this.element.selectSavedItem().should("be.visible").click();
    this.element.editBtn().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    this.element.toggleBtn().should("be.visible").click();
    cy.wait(1000);
    this.element.deleteBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.confirmationBtn().should("be.visible").click();
    //turn off toggle
    this.element.toggleBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.saveAndExit().should("be.visible").click();
    cy.wait(3000);
    this.element.clickEnterACount().should("be.visible");
  }

  close(countSheet) {
    this.element.searchFilter().should("be.visible").clear().type("Saved");
    cy.wait(2000);
    this.element.selectItemByCSName(countSheet).should("be.visible").click();
    cy.wait(1000);
    this.element.closeInventory().should("be.visible").click();
    this.element.confirmationBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.invSummaryStarting().should("not.be.disabled");
  }

  editAndDelete() {
    cy.wait(2000);
    this.element.selectSavedItem().should("be.visible").click();
    this.element.editBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.saveOptionsDD().should("not.be.disabled");
    this.element.delete().should("be.visible").click();
    this.element.deleteConfirm().should("be.visible").click();
    this.element.clickEnterACount().should("be.visible");
  }

  // count can be set for as many product - add products is an array
  closeInventoryForProducts(productList, date) {
    cy.wait(1000);
    this.element.clickEnterACount().should("be.visible").click();
    this.element.clickFullInventory().click();
    cy.wait(2000);
    this.element.clickDateBar().should("be.visible").clear().type(date);
    this.element.doneBtnDateBar().should("be.visible").click();
    productList.map((product) => {
      this.element.invItemCount(product).should("be.visible").clear().type(1);
    });
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.closeInventory().should("be.visible").click();
    this.element.confirmationBtn().should("be.visible").click();
    this.element.invSummaryStarting().should("not.be.disabled");
    cy.wait(3000);
  }

  printCountSheet() {
    this.element.printCountSheetDD().should("be.visible").click();
    countSheetPage.element.selectFullInventory1().should("be.visible").click();
    cy.readFile("cypress/downloads/inventory.pdf").should("exist");
  }

  closeInvWithMultipleCount() {
    this.element.clickEnterACount().should("be.visible").click();
    cy.wait(1000);
    this.element.clickFullInventory().should("be.visible").click();
    cy.wait(2000);
    // set date
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    this.setMultipleCount();
    // close the inventory
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.closeInventory().should("be.visible").click();
    this.element.confirmationBtn().should("be.visible").click();
    cy.wait(2000);
    this.element.invSummaryStarting().should("not.be.disabled");
  }

  // set count using the `+` icon
  setMultipleCount() {
    this.element.addCount().should("be.visible").click();
    this.element.firstCount().should("be.visible").clear().type(1);
    this.element.secondCount().should("be.visible").clear().type(2);
    this.element.multipleCountSaveBtn().should("be.visible").click();
    // count added as `1 + 2 = 3`
    this.element.addQuantity().should("have.value", 3);
  }

  saveInvWithMultipleSection(countSheet, sectionName2, recipeName) {
    this.element.clickEnterACount().should("be.visible").click();
    this.element.clickCreatedCountSheetRole(countSheet).click();
    cy.wait(2000);
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().click();
    this.element.addQuantity().should("be.visible").clear().type(4);
    this.element.toggleBtn().should("be.visible").click();
    this.element.moveDownBtn(1).should("not.be.disabled").click();
    this.element.moveUpBtn(2).should("not.be.disabled").click();
    cy.wait(1000);
    this.element.switchSectionBtns(recipeName).should("be.visible").click();
    this.element.selectSection().should("be.visible").click();
    this.element.selectSection().type(sectionName2);
    this.element.selectItemDD().click();
    this.element.switchSaveBtn().should("not.be.disabled").click();
    cy.wait(2000);
    this.element.deleteItemIcon(recipeName).should("be.visible").click();
    cy.wait(2000);
    this.element.confirmationBtn().should("be.visible").click();
    //turn off toggle
    this.element.toggleBtn().should("be.visible").click();
    this.element.addQuantity().should("have.value", 4);
    cy.wait(2000);
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.saveAndExit().should("be.visible").click();
    this.element.clickEnterACount().should("be.visible");
  }

  searchInventory(countSheetName) {
    this.element
      .searchFilter()
      .should("be.visible")
      .clear()
      .type(countSheetName);
    cy.wait(2000);
    this.element.selectSavedItem().should("be.visible").click();
    cy.wait(2000);
  }

  deleteSavedInventories(countSheetName) {
    this.searchInventory(countSheetName);
    this.element.editBtn().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    this.deleteInventories();
  }

  checkSavingMultipleInv(countSheet) {
    this.element.clickEnterACount().should("be.visible").click();
    this.element.clickCreatedCountSheetRole(countSheet).click();
    this.element
      .multipleInvTitle()
      .should("include.text", `Cannot Enter Inventory`);
    this.element.okBtn().should("be.visible").click();
  }

  closeCountRole(countSheetName) {
    cy.wait(1000);
    this.element.clickEnterACount().should("be.visible").click();
    this.element
      .clickCreatedCountSheetRole(countSheetName)
      .should("be.visible")
      .click();
    cy.wait(2000);
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    this.element.addQuantity().should("be.visible").clear().type("8");
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.closeInventory().should("be.visible").click();
    this.element.confirmationBtn().should("be.visible").click();
    cy.wait(3000);
    this.element.invSummaryStarting().should("not.be.disabled");
  }

  verifyRemovedSection(productName, date) {
    this.searchInventory(date);
    this.element.reOpenBtn().should("be.visible").click();
    this.element.verifyReopenConfirmationText();
    this.element.confirmationBtn().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    this.element
      .invItemCount(productName)
      .should("be.visible")
      .and("be.disabled")
      .and("have.value", 0);
    this.deleteInventories();
  }

  setCountForSpecificProduct(productName) {
    this.element
      .getProductRow(productName)
      .should("be.visible")
      .find(`[name='i.quantity']`)
      .should("be.visible")
      .clear()
      .type(100);
  }
  insertDateToInventories(dateData) {
    console.log("inside->" + dateData);
    this.element.clickEnterACount().should("be.visible").click();
    this.element
      .clickCreatedCountSheetRole("Full Inventory")
      .should("be.visible")
      .click();
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickDateBar().should("be.visible").type(dateData);
    cy.wait(500);
    cy.get(`[ng-click='close($event)']`).should("be.visible").click();
    cy.wait(500);
    this.element.saveOptionsDD().should("not.be.disabled");
  }
  verifyRemovedProduct(dateData, productName) {
    this.element.searchFilter().should("be.visible").clear().type(dateData);
    this.element.selectSavedItem().should("be.visible").click();
    cy.wait(2000);
    this.element.reOpenBtn().should("be.visible").click();
    this.element.verifyReopenConfirmationText();
    this.element.confirmationBtn().should("be.visible").click();
    cy.xpath(`//label[contains(.,'Removed Items')]`)
      .scrollIntoView()
      .should("be.visible");
    this.element
      .getProductRow(productName)
      .should("be.visible")
      .find(`[name='i.quantity']`)
      .should("be.disabled")
      .and("have.value", "0");
    this.element.saveOptionsDD().should("not.be.disabled").click();
    this.element.closeInventory().should("be.visible").click();
    this.element.confirmationBtn().should("be.visible").click();
    this.element.invSummaryStarting().should("not.be.disabled");
    cy.wait(3000);
  }

  historyInv() {
    this.element.history().should("be.visible").click();
    cy.wait(1000);
  }

  selectInvWithCSCount(countSheet) {
    this.element.clickEnterACount().should("be.visible").click();
    cy.wait(1000);
    this.element
      .clickCreatedCountSheetRole(countSheet)
      .should("be.visible")
      .click();
    cy.wait(2000);
    // set date
    this.element.clickDateBar().should("be.visible").click();
    this.element.clickTodayDate().should("be.visible").click();
    this.element.saveOptionsDD().should("not.be.disabled");
    cy.wait(2000);
    this.setCount();
    cy.wait(2000);
  }
}

module.exports = new inventoryPage();
