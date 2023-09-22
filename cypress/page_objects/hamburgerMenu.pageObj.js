const util_generic = require("../utils/util_generic");
const assertionPage = require("./assertion.page");
const centralVendorPage = require("./centralVendor.page");
const inventoriesRolePage = require("./inventoriesRole.page");
const orderPage = require("./order.page");
const setupPageObj = require("./setup.page");
const vendorsPage = require("./vendors.page");

class hamburgerMenuPage {
  element = {
    centralOption: () => cy.get(`#navbar_central`),
    companiesCentralOp: () =>
      cy.xpath(`//*[@href="#/company"]//*[@role="button"]`),
    conceptsCentralOp: () =>
      cy.xpath(`//*[@href="#/concept"]//*[@role="button"]`),
    restaurantCentralOp: () =>
      cy.xpath(`//*[@href="#/restaurantUnit"]//*[@role="button"]`),
    vendorParent: () => cy.get(`#navbar_vendors`),
    vendorChild: () => cy.xpath(`//*[@href="#/vendor"]//*[@role="button"]`),
    vendorItem: () =>
      cy.xpath(`//*[@href="#/vendorProduct"]//*[@role='button']`),
    categories: () => cy.xpath(`//*[@href="#/productType"]//*[@role="button"]`),
    accountings: () => cy.get(`#navbar_accounting`),
    productChild: () => cy.xpath(`//*[@href="#/product"]//*[@role="button"]`),
    productParent: () => cy.get(`#navbar_products`),
    recipesParent: () => cy.get(`#navbar_recipes`),
    InventoryParent: () => cy.get(`#navbar_inventory`),
    inventoryChild: () =>
      cy.xpath(`//*[@href="#/inventory"]//*[@role='button']`),
    recipeSetup: () =>
      cy.xpath(`//*[@href="#/recipeSetup"]//*[@role='button']`),
    menuItems: () => cy.xpath(`//*[@href="#/menuItem"]//*[@role='button']`),
    countSheet: () =>
      cy.xpath(`//*[@href="#/inventorySetup"]//*[@role="button"]`),
    OrdersParent: () => cy.get(`#navbar_order`),
    orderChild: () => cy.xpath(`//*[@href="#/order"]//*[@role='button']`),
    placeNewOrder: () =>
      cy.xpath(`//*[@href="#/order/new"]//*[@role='button']`),
    setup: () => cy.get(`#navbar_setup`),
    unitSettings: () =>
      cy.xpath(`//*[@href="#/unitConfig"]//*[@role='button']`),
    users: () => cy.xpath(`//*[@href="#/user"]//*[@role='button']`),
    priorityReport: () =>
      cy.xpath(`//*[@href="#/usageReport/systemPriority"]//*[@role='button']`),
    integration: () =>
      cy.xpath(`//*[@href="#/integration"]//*[@role='button']`),
    pos: () => cy.xpath(`//*[@href="#/pos"]//*[@role='button']`),
    usageReport: () =>
      cy.xpath(`//*[@href="#/usageReport"]//*[@role='button']`),
    notifications: () =>
      cy.xpath(`//*[@href="#/notifications"]//*[@role='button']`),
    vendorMapping: () =>
      cy.xpath(`//*[@href="#/accounting/vendorMapping"]//*[@role='button']`),
    paymentMapping: () =>
      cy.xpath(
        `//*[@href="#/accounting/balanceSheetAccounts"]//*[@role='button']`
      ),
    exports: () =>
      cy.xpath(`//*[@href="#/accounting/invoices"]//*[@role='button']`),
    setupInitialTransfer: () =>
      cy.xpath(`//*[@href="#/order/setup"]//*[@role='button']`),
    performance: () => cy.get(`#navbar_performance`),
    budgetPerf: () =>
      cy.xpath(`//*[@href="#/budget/overview//"]//*[@role='button']`),
    categoryReport: () =>
      cy.xpath(`//*[@href="#/categoryReport"]//*[@role='button']`),
    controllabelPL: () =>
      cy.xpath(`//*[@href="#/profitAndLoss/overview"]//*[@role='button']`),
    foodUsageReport: () =>
      cy.xpath(`//*[@href="#/foodUsageReport"]//*[@role='button']`),
    sales: () => cy.xpath(`//*[@href='#/salesReport']//*[@role='button']`),
    priceAlert: () => cy.xpath(`//*[@href="#/priceAlert"]//*[@role='button']`),
    priceMovers: () =>
      cy.xpath(`//*[@href="#/priceMovers"]//*[@role='button']`),
    foodUsage: () =>
      cy.xpath(`//*[@href="#/theoreticalFoodUsage"]//*[@role='button']`),
    kitchenDisplay: () =>
      cy.xpath(`//*[@href="#/kitchenViewer"]//*[@role='button']`),
    inventorySumm: () =>
      cy.xpath(`//*[@href="#/inventorySummary/"]//*[@role='button']`),
    inventoryProd: () =>
      cy.xpath(`//*[@href="#/inventorySetup/newItems"]//*[@role='button']`),
    laborMenu: () => cy.get(`#navbar_labor`),
    billPayMenu: () => cy.get(`#navbar_billpay`),
    billPayInvoices: () =>
      cy.xpath(`//*[@href="#/accounting/billPay"]//*[@role='button']`),
    billPayPayments: () =>
      cy.xpath(`//*[@href="#/accounting/billPayCharges"]//*[@role='button']`),
    billPaySetup: () =>
      cy.xpath(`//*[@href="#/accounting/billPaySetup"]//*[@role='button']`),
    setupVerification: () =>
      cy.xpath(`//*[@href="#/verification"]//*[@role='button']`),
    billingSetup: () =>
      cy.xpath(`//*[@href="#/unitBilling"]//*[@role='button']`),
    postToAccounting: () => cy.xpath(`//button[@ng-click='postDate()']`),
    reconciliation: () =>
      cy.xpath(
        `//*[@href='#/accounting/statement' or @href='#/accounting/todo']//*[@role='button']`
      ),
    salesEntries: () =>
      cy.xpath(`//*[@href='#/accounting/salesEntries']//*[@role='button']`),
    journalEntries: () =>
      cy.xpath(`//*[@href='#/accounting/journalEntries']//*[@role='button']`),
    billEntries: () =>
      cy.xpath(`//*[@href='#/accounting/billEntries']//*[@role='button']`),
    inventoryEntries: () =>
      cy.xpath(`//*[@href='#/accounting/inventoryEntries']//*[@role='button']`),
    salesMapping: () =>
      cy.xpath(`//*[@href='#/accounting/salesMapping']//*[@role='button']`),
    pmixMapping: () =>
      cy.xpath(`//*[@href='#/accounting/pmixMapping']//*[@role='button']`),
    closeBooks: () =>
      cy.xpath(`//*[@href='#/accounting/closeBooks']//*[@role='button']`),
    budgetSetup: () => cy.xpath(`//*[@href='#/budget']//*[@role='button']`),
    home: () => cy.get(`#navbar_home`),
    bellIcon: () => cy.get(`button[aria-label="Notifications"]`),
    bellIconNewVendorItem: () => cy.get(`a[href="#/tasks?tab=newItems"]`),
    bellIconpendingReconc: () => cy.get(`a[href="#/tasks?tab=reconciliation"]`),
    selectRow: () => cy.get(`div[ng-model="row.isSelected"]`),
    approveProduct: () => cy.get(`button[ng-click="saveSelectedItems(true)"]`),
    clickInvItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
    invoiceTasks: () => cy.get(`a[href="#/tasks?tab=questions"]`),
    resolveConcern: () => cy.xpath(`(//*[@class="icheck-label"])[2]`),
    saveBtn: () => cy.get(`[ng-click="saveQuestionModal($event)"]`),
    customReports: () =>
      cy.xpath(`//*[@href='#/customReports']//*[@role='button']`),
    preparedItem: () =>
      cy.xpath(`//*[@href="#/preparedItem"]//*[@role='button']`),
    globalPriceMoversSetupOp: () =>
      cy.xpath(`//*[@href='#/crossTenantPriceMovers']//*[@role='button']`),
    reconciliationReportSetupOp: () =>
      cy.xpath(`//*[@href='#/reconciliationReport']//*[@role='button']`),
    cssReport2: () =>
      cy.xpath(`//*[@href='#/clientServicesReport']//*[@role='button']`),
    vendorCentral: () =>
      cy.xpath(`//*[@href='#/central/vendor']//*[@role='button']`),
    vendorMergeCentral: () =>
      cy.xpath(`//*[@href='#/central/vendor/merge']//*[@role='button']`),
    vendorItemCentral: () =>
      cy.xpath(`//*[@href='#/central/vendorProduct']//*[@role='button']`),
    vendorItemMergeCentral: () =>
      cy.xpath(`//*[@href='#/central/vendorProduct/merge']//*[@role='button']`),
    productMergeCentral: () =>
      cy.xpath(`//*[@href='#/central/product/merge']//*[@role='button']`),
    productCentral: () =>
      cy.xpath(`//*[@href='#/central/product']//*[@role='button']`),
    OnboardingCentral: () =>
      cy.xpath(`//*[@href='#/onboarding']//*[@role='button']`),
    companyConfigCentral: () =>
      cy.xpath(`//*[@href='#/companyConfig']//*[@role='button']`),
    usersCentral: () =>
      cy.xpath(`//*[@href='#/user/global']//*[@role='button']`),
    invoiceApproval: () =>
      cy.xpath(`//*[@href="#/invoiceApproval"]//*[@role='button']`),
    transferOrder: () =>
      cy.xpath(`//*[@href='#/transfers']//*[@role='button']`),
    leadPriorityReport: () =>
      cy.xpath(`//*[@href="#/usageReport/leadPriority"]//*[@role='button']`),
    connectToPos: () => cy.xpath(`//*[@ng-click='connectPos()']`),
    newVendorItemTask: () => cy.get(`a[href='#/tasks?tab=newItems']`),
    vendorSetupItem: () => cy.xpath(`//div[contains(text(),'Vendor Setup')]`),
    bellIconVendorSetup: () => cy.get(`a[href="#/tasks?tab=vendorSetup"]`),
    clickInvItem2: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`)
  };

  approveItem() {
    cy.wait(5000);
    this.element.selectRow().click();
    cy.wait(5000);
    this.element.approveProduct().click();
    cy.wait(5000);
    cy.reload();
    cy.wait(5000);
  }

  goToNewVendorItemsBellIcon() {
    cy.wait(2000);
    this.element.bellIcon().click();
    cy.wait(2000);
    this.element.bellIconNewVendorItem().click();
    cy.wait(3000);
  }

  goToInvTaskItemsBellIcon() {
    cy.wait(2000);
    this.element.bellIcon().should("be.visible").click();
    cy.wait(2000);
    this.element.invoiceTasks().should("be.visible").click();
    cy.wait(5000);
  }

  goToNewPendingReconBellIcon() {
    cy.wait(2000);
    this.element.bellIcon().should("be.visible").click();
    cy.wait(2000);
    this.element.bellIconpendingReconc().should("be.visible").click();
    cy.wait(3000);
  }

  clickInv() {
    cy.wait(3000);
    this.element.clickInvItem().should("be.visible").click();
    cy.wait(5000);
  }

  resolveConcern() {
    cy.wait(5000);
    this.element.resolveConcern().should("be.visible").click();
    this.element.saveBtn().should("be.visible").click();
    cy.wait(3000);
  }

  checkSetupVerification() {
    this.element.billingSetup().should("not.exist");
    this.element.users().should("not.exist");
    this.element.integration().should("not.exist");
    this.element.pos().should("not.exist");
    this.element.usageReport().should("not.exist");
    this.element.notifications().should("not.exist");
    this.element.setup().click();
    this.element.setupVerification().should("be.visible").click();
  }
  goToPerfBudget() {
    this.element.performance().should("be.visible").click();
    this.element.budgetPerf().should("be.visible").click();
  }
  goToCategoryReport() {
    this.element.categoryReport().should("be.visible").click();
  }
  goToCetgoryReportFromPerf() {
    this.element.performance().should("be.visible").click();
    this.element.categoryReport().should("be.visible").click();
  }
  goToControllabelPL() {
    this.element.controllabelPL().should("be.visible").click();
  }
  goToPerfCustomReports() {
    this.element.customReports().should("be.visible").click();
  }
  goToFoodUsageReport() {
    this.element.foodUsageReport().should("be.visible").click();
  }
  goToPerfPriceAlert() {
    this.element.performance().should("be.visible").click();
    this.element.priceAlert().should("be.visible").click();
  }
  goToPriceAlert() {
    this.element.priceAlert().should("be.visible").click();
  }
  goToPriceMovers() {
    this.element.priceMovers().should("be.visible").click();
  }
  goToFoodUsage() {
    this.element.foodUsage().should("be.visible").click();
  }
  goToSales() {
    this.element.sales().should("be.visible").click();
  }
  goToUnitSettings() {
    cy.intercept("/api/unitConfigs*").as("unitConfigs");
    this.element.setup().scrollIntoView();
    this.element.setup().should("be.visible").click();
    this.element.unitSettings().should("be.visible").click();
    util_generic.checkTotalItems("@unitConfigs");
  }
  goToIntegration() {
    this.element.setup().should("be.visible").click();
    this.goToIntegrationSetup();
  }
  goToPriorityReport() {
    cy.wait(40000);
    this.element.setup().scrollIntoView().should("be.visible").click();
    this.element.priorityReport().scrollIntoView().should("be.visible").click();
    cy.wait(2000);
  }
  goToLeadPriorityReport() {
    this.element.leadPriorityReport().should("be.visible").click();
  }
  goToUsers() {
    this.element.setup().should("be.visible").click();
    this.goToUsersSetup();
  }
  goToOrders() {
    this.element.orderChild().should("be.visible").click();
    cy.wait(3000);
    orderPage.element.openDDForOrderStatus().should("be.visible");
    orderPage.element.orderGrid().should("be.visible");
  }
  goToPlaceOrders() {
    this.element.placeNewOrder().click({
      force: true
    });
    cy.wait(3000);
  }
  goToOrderSetup() {
    this.element.setupInitialTransfer().should("be.visible").click();
    cy.wait(2000);
  }
  goToCloseOrders() {
    this.element.OrdersParent().should("be.visible").click();
  }
  goToInventories() {
    this.element.InventoryParent().should("be.visible").click();
    this.element.inventoryChild().should("be.visible").click();
  }
  goToInventoriesSummary() {
    this.element.InventoryParent().click();
    this.element.inventorySumm().click();
    inventoriesRolePage.element.invSummaryStarting().should("not.be.disabled");
  }
  goToInventoriesChild() {
    this.element.inventoryChild().click();
    inventoriesRolePage.element.clickEnterACount().should("be.visible");
  }
  goToCountSheet() {
    this.element.InventoryParent().click();
    this.element.countSheet().click();
  }
  goToMenuItems() {
    this.element.menuItems().should("be.visible").click();
  }
  goToRecipeMenuItems() {
    this.element.recipesParent().click();
    this.element.menuItems().click();
  }
  goToKitchenDisplay() {
    this.element.kitchenDisplay().should("be.visible").click();
  }
  goToRecipeSetup() {
    this.element.recipesParent().should("be.visible").click();
    this.element.recipeSetup().should("be.visible").click();
  }
  goToRecipeSetupChild() {
    this.element.recipeSetup().click();
  }
  checkForRecipeSetup() {
    this.element.recipeSetup().should("not.exist");
  }
  goToConcept() {
    cy.intercept("/api/concepts*").as("concepts");
    this.goToCentral();
    this.element.conceptsCentralOp().click();
    util_generic.checkTotalItems("@concepts");
  }
  goToCompanies() {
    cy.intercept("/api/companies*").as("companies");
    this.element.companiesCentralOp().should("be.visible").click();
    util_generic.checkTotalItems("@companies");
  }
  goToRestaurant() {
    cy.intercept("/api/restaurantunits/all*").as("all");
    this.element.restaurantCentralOp().should("be.visible").click();
    util_generic.checkTotalItems("@all");
  }
  goToVendor() {
    this.element.vendorParent().should("be.visible").click();
    this.element.vendorChild().should("be.visible").click();
    vendorsPage.viewVendors();
    cy.wait(2000);
  }
  goToVendorOnly() {
    this.element.vendorChild().should("be.visible").click();
    vendorsPage.viewVendors();
    cy.wait(2000);
  }
  goToVendorItems() {
    this.element.vendorParent().should("be.visible").click();
    this.element.vendorItem().should("be.visible").click();
  }
  goToVendorItemsOnly() {
    this.element.vendorItem().should("be.visible").click();
  }
  goToOrdersParent() {
    this.element.OrdersParent().should("be.visible").click();
    this.element.orderChild().should("be.visible").click();
    cy.wait(3000);
    orderPage.element.openDDForOrderStatus().should("be.visible");
    orderPage.element.orderGrid().should("be.visible");
  }
  goToCategories() {
    this.element.accountings().click();
    this.element.categories().click();
    this.element.accountings().click();
  }
  goToPaymentMapping() {
    this.element.accountings().click({
      force: true
    });
    this.element.paymentMapping().click();
    this.element.accountings().click();
  }
  goToExports() {
    this.element.exports().click();
    this.element.accountings().click();
  }
  goToVendorMapping() {
    // this.element.accountings().click();
    this.element.vendorMapping().click({
      force: true
    });
    this.element.accountings().click();
  }
  goToProduct() {
    this.element.productParent().should("be.visible").click();
    this.element.productChild().should("be.visible").click();
  }
  checkProdAndCountSheet() {
    this.element.countSheet().should("not.exist");
    this.element.inventoryProd().should("not.exist");
  }
  checkLaborMenu() {
    this.element.laborMenu().should("not.exist");
    cy.wait(2000);
  }
  checkBillPayMenu() {
    this.element.billPayMenu().should("not.exist");
    cy.wait(2000);
  }
  checkAccMenu() {
    this.element.accountings().should("not.exist");
  }
  goToCountSheetChild() {
    this.element.countSheet().should("be.visible").click();
  }
  goToProductInventoryChild() {
    this.element.inventoryProd().should("be.visible").click();
    inventoriesRolePage.element.exportAsDD().should("be.visible");
  }
  checkForPostToAccounting() {
    this.element.postToAccounting().should("not.be.visible");
  }
  goToCategoriesChild() {
    this.element.accountings().click();
    this.element.exports().should("not.exist");
    this.element.reconciliation().should("not.exist");
    this.element.salesEntries().should("not.exist");
    this.element.inventoryEntries().should("not.exist");
    this.element.salesMapping().should("not.exist");
    this.element.vendorMapping().should("not.exist");
    this.element.pmixMapping().should("not.exist");
    this.element.closeBooks().should("not.exist");
    this.element.budgetSetup().should("not.exist");
    this.element.categories().click();
  }
  goToSetup() {
    this.element.setup().scrollIntoView();
    this.element.setup().should("be.visible").click();
  }
  checkSetupBilling() {
    this.element.billingSetup().should("not.exist");
  }
  goToSetupBilling() {
    this.element.billingSetup().should("be.visible").click();
  }
  checkSetupUsageReport() {
    this.element.usageReport().should("not.exist");
  }
  checkSetupNotification() {
    this.element.notifications().should("not.exist");
  }

  goToSetupPOS() {
    this.element.pos().should("be.visible").click();
    assertionPage.element.posConnect().should("be.visible");
    cy.wait(2000);
  }

  goToSetupVerification() {
    cy.intercept(`/api/performance/setupVerification*multiUnit=true*`).as(
      "setupVerification"
    );
    this.element.setupVerification().should("be.visible").click();
    util_generic.checkTotalItems("@setupVerification");
    assertionPage.verifyPageSearchFilter();
  }
  goToHome() {
    this.element.home().should("be.visible").click();
  }
  goToPerformance() {
    this.element.performance().should("be.visible").click();
  }
  goToOrderParent() {
    this.element.OrdersParent().should("be.visible").click();
  }
  viewPostToAccounting() {
    this.element.postToAccounting().should("be.visible");
  }
  goToPreparedItems() {
    this.element.recipesParent().click();
    cy.wait(1000);
    this.element.preparedItem().click();
  }
  goToSetupLeadPriorityReport() {
    cy.wait(40000);
    this.element.setup().scrollIntoView().should("be.visible").click();
    this.element
      .leadPriorityReport()
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.wait(2000);
  }
  goToUsersSetup() {
    cy.intercept("/api/users*").as("users");
    this.element.users().click();
    util_generic.checkTotalItems("@users");
  }
  goToIntegrationSetup() {
    this.element.integration().should("be.visible").click();
    this.element.connectToPos().should("be.visible");
    cy.wait(2000);
  }
  goToUsageReportSetup() {
    cy.intercept("/api/performance/usageReport*").as("usageReport");
    this.element.usageReport().should("be.visible").click();
    cy.wait("@usageReport");
    util_generic.checkTableRow("@usageReport");
  }
  goToGlobalPriceMoversSetup() {
    this.element.globalPriceMoversSetupOp().should("be.visible").click();
  }
  goToReconciliationReportSetup() {
    cy.intercept("/api/orderReconciliationSummaries/report*").as(
      "reconciliationReport"
    );
    this.element.reconciliationReportSetupOp().click();
    cy.wait("@reconciliationReport");
    util_generic.checkTableRow("@reconciliationReport");
  }
  goToPointOfSales() {
    this.element.pos().should("be.visible").click();
    assertionPage.element.posConnect().should("be.visible");
    cy.wait(2000);
  }
  goToCssReport2() {
    this.element.cssReport2().click();
    assertionPage.verifyRefreshAssertion();
  }
  goToNotification() {
    this.element.notifications().should("be.visible").click();
    assertionPage.element.notificationSetupCancelBtn().should("be.visible");
    cy.wait(2000);
  }
  goToUsersCentral() {
    cy.intercept("/api/users/global*").as("globalUsers");
    this.element.usersCentral().click();
    util_generic.checkTotalItems("@globalUsers");
  }
  goToVendorCentral() {
    this.element.vendorCentral().click();
    assertionPage.verifyPageSearchFilter();
    centralVendorPage.element.exportBtnCentralVendor().should("be.disabled");
    centralVendorPage.searchCentralVendor(`Nate's Napkins`);
  }
  goToVendorMergeCentral() {
    cy.intercept("/api/central/vendors*").as("centralVendors");
    this.element.vendorMergeCentral().click();
    util_generic.checkTotalItems("@centralVendors");
  }
  goToVendorItemCentral() {
    this.element.vendorItemCentral().should("be.visible").click();
  }
  goToVendorItemMergeCentral() {
    this.element.vendorItemMergeCentral().scrollIntoView().click();
  }
  goToProductMergeCentral() {
    this.element.productMergeCentral().should("be.visible").click();
  }
  goToProductCentral() {
    cy.intercept("/api/central/products/all*").as("centralProducts");
    this.element.productCentral().click();
    util_generic.checkTotalItems("@centralProducts");
  }
  goToOnboardingCentral() {
    this.element.OnboardingCentral().should("be.visible").click();
    cy.wait(2000);
  }
  goToCompanyConfigCentral() {
    cy.intercept("/api/central/companyConceptConfigs*").as(
      "companyConceptConfigs"
    );
    this.element.companyConfigCentral().should("be.visible").click();
    util_generic.checkTotalItems("@companyConceptConfigs");
  }
  goToInvoiceApproval() {
    this.element.invoiceApproval().should("be.visible").click();
    cy.wait(2000);
  }
  goToTransferOrder() {
    this.element.transferOrder().should("be.visible").click();
    cy.wait(2000);
  }
  goToCentral() {
    cy.wait(1500);
    this.element.centralOption().scrollIntoView();
    this.element.centralOption().should("be.visible").click();
  }
  goToAccounting() {
    this.element.accountings().scrollIntoView();
    this.element.accountings().should("be.visible").click();
  }
  goToExportChildAcc() {
    this.element.exports().should("be.visible").click();
    cy.wait(2000);
  }
  goToCentralCompConfigChild() {
    cy.wait(1500);
    this.element.centralOption().scrollIntoView();
    this.element.companyConfigCentral().click();
  }
  goToSalesEntriesChildAcc() {
    this.element.salesEntries().should("be.visible").click();
  }
  goToCategoriesChildAcc() {
    this.element.categories().should("be.visible").click();
    cy.wait(4000);
  }
  goToSalesMappingChildAcc() {
    this.element.salesMapping().should("be.visible").click();
  }
  goToVendorMappingChildAcc() {
    this.element.vendorMapping().should("be.visible").click();
  }
  goToPMIXMappingChildAcc() {
    this.element.pmixMapping().should("be.visible").click();
  }
  goToPaymentAccountsChildAcc() {
    this.element.paymentMapping().should("be.visible").click();
  }
  goToCloseBooksChildAcc() {
    this.element.closeBooks().should("be.visible").click();
  }
  goToBudgetSetupChildAcc() {
    this.element.budgetSetup().should("be.visible").click();
  }
  goToJournalEntriesChildAcc() {
    this.element.journalEntries().should("be.visible").click();
  }
  goToInventoryEntriesChildAcc() {
    this.element.inventoryEntries().should("be.visible").click();
  }
  goToReconcillationChildAcc() {
    this.element.reconciliation().should("be.visible").click();
  }
  gotoBillPay() {
    this.element.billPayMenu().should("be.visible").click();
    cy.wait(2000);
  }
  gotoBillPaySetup() {
    this.element.billPaySetup().should("be.visible").click();
  }

  goToHomeNotification() {
    this.element.bellIcon().should("be.visible").click();
  }

  goToNewVendorItemTask() {
    this.element.newVendorItemTask().should("be.visible").click();
    cy.wait(2000);
  }

  goToVendorSetupBellIcon() {
    cy.wait(2000);
    this.element.bellIcon().should("be.visible").click();
    cy.wait(2000);
    this.element.bellIconVendorSetup().should("be.visible").click();
    cy.wait(3000);
    this.element.vendorSetupItem().should("be.visible").click();
    cy.wait(5000);
  }

  clickInv2() {
    cy.wait(7000);
    this.element.clickInvItem2().click();
    cy.wait(5000);
  }

  goToCentralCompConfig() {
    cy.wait(1500);
    this.element.centralOption().scrollIntoView();
    this.element.centralOption().should("be.visible").click();
    this.element.companyConfigCentral().click();
  }
}
module.exports = new hamburgerMenuPage();
