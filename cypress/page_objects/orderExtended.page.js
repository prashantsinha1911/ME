const utilObj = require("../utils/util_generic");
const testData = require("../fixtures/rolePermission.json");
const vendorsPage = require("./vendors.page");
const loginPageObjects = require("./login.pageObjects");
const performancePage = require("./performance.page");
const assertionPage = require("./assertion.page");

class orderPage {
  element = {
    attachInvoiceBtn: () =>
      cy.get('.mb10 > .btn-group > button[ng-model="dropOrders"]'),
    uploadInv: () => cy.get(`input[type="file"]`),
    clickOKBtn: () => cy.get(`button[ng-click="photoDirectiveOkCallback()"]`),
    clickItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
    endPreProcessingBTN: () => cy.get(`[ng-click="endPreprocessing()"]`),
    okBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
    clickVendor: () => cy.get(`span[aria-label="Select a vendor activate"]`),
    clickVendorRecon: () => cy.get(`div[ng-change="selectVendor()"]`),
    enterVendorName: () => cy.xpath(`//*[@aria-label="Select a vendor"]`),
    selectDDItem: () => cy.get(`.ui-select-choices-row.active`),
    input: () => cy.get(`input[name="quantity"]`),
    unitPrice: () => cy.get(`input[name="unitPrice"]`),
    okBtnLI: () =>
      cy.get(
        `button[ng-click="updateTranslatedName(); unitQuantityChanged();"]`
      ),
    selectRadio: () =>
      cy.get(`input[ng-click="setNewItemPackaging(pack)"]`).first(),
    invoiceNumber: () => cy.get(`[name='invoiceNum']`),
    customerName: () => cy.get(`[ng-model="order.initialReviewCustomerNum"]`),
    invoiceDate: () => cy.get(`[ng-model="order.initialReviewInvoiceDate"]`),
    closedInvoiceDate: () =>
      cy.xpath(
        `//*[@ng-required='reconciliationComplete || reconciliationCompleted']`
      ),
    confirmDate: () => cy.xpath(`//*[@ng-click='close($event)']`),
    closeDateCal: () => cy.get(`button[ng-click="close($event)"]`),
    todayDate: () => cy.get(`[ng-click="select('today', $event)"]`),
    lastDate: () => cy.xpath(`(//span[text()='01'])[1]`),
    verifiedTotal: () => cy.get(`[ng-model="order.initialReviewTotal"]`),
    openDD: () =>
      cy.get(`[ng-change="irHandwrittenMarkupChanged()"]`).select("No"),
    initialReviewCompleteCheck: () =>
      cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[1]`),
    initialReviewCompleteLabel: () =>
      cy.xpath(
        `//span[normalize-space()='The initial review for this order is complete.']`
      ),
    recCompleteLabel: () =>
      cy.xpath(
        `//span[normalize-space()='The reconciliation for this order is complete.']`
      ),
    amReviewCheck: () =>
      cy.xpath(`(//*[@class="checkbox-inline icheck-label"])[3]`),
    FinalReviewCompleteCheck: () =>
      cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[2]`),
    IRSaveBtn: () => cy.get(`[ng-click="save($event)"]`),
    invoiceNumberRecon: () => cy.get(`[ng-model="order.invoiceNum"]`),
    customerNameRecon: () => cy.get(`[ng-model="order.customerNum"]`),
    invoiceDateRecon: () => cy.xpath(`(//*[@name="invoiceDate"])[2]`),
    openDDRecon: () =>
      cy.get(`[ng-change="handwrittenMarkupChanged()"]`).select("No"),
    saveBtnRecon: () => cy.get(`[ng-click="reconcile($event)"]`),
    verifyBtn: () => cy.get(`[ng-click="verifyOrderAndClose()"]`),
    filterOption: () => cy.get(`[ng-model="filterValue"]`),
    clickLineItemBtn: () => cy.get(`[ng-click="addRow()"]`),
    addExistingLineItem: () => cy.get(`#searchFocus`),
    saveLineItem: () => cy.xpath(`(//*[@ng-click="addNewItem($event)"])[2]`),
    saveExistingLineItem: () =>
      cy.xpath(`(//*[@ng-click="addNewItem($event)"])[1]`),
    newVendorItemRadio: () =>
      cy.xpath(`(//*[@class='iradio_minimal-blue'])[1]`),
    itemCode: () => cy.get(`#provisionalProductCode`),
    vendorItem: () =>
      cy.xpath(
        `(//*[@placeholder="Please enter a name for the Vendor Item"])[2]`
      ),
    clickProductLI: () => cy.xpath(`(//*[@title="Select a product"])[2]`),
    typeProductName: () => cy.xpath(`(//*[@aria-label="Select a product"])[2]`),
    packagingTxt: () =>
      cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.packaging"])[2]`),
    quanity: () =>
      cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.quantity"])[2]`),
    unit: () =>
      cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.unit"])[2]`),
    selectUnit: () => cy.contains("Bag"),
    price: () =>
      cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.price"])[2]`),
    concernExpander: () =>
      cy.xpath(
        `(//*[@ng-click="toggleConcerns($event, editForm.$invalid)"])[1]`
      ),
    vendorItemVerified: () =>
      cy.xpath(
        `//*[@id="vendorItemVerified"]//*[@class="icheckbox_minimal-blue"]`
      ),
    vendorItemRadio: () =>
      cy.xpath(`(//*[@class='radio']//*[@class='icheck-label'])[2]`),
    vendorInfoRadio: () =>
      cy.xpath(
        `//*[@id="vendorItemVerified"]//*[@class="icheckbox_minimal-blue"]`
      ),
    viewAllOrder: () => cy.get(".ui-grid-viewport.ng-isolate-scope"),
    openDDForOrderStatus: () => cy.get(`#appendToEl`),
    selectFinalReviewDD: () =>
      cy.xpath(`//*[@ng-click="changeViewBy($event, 'FINAL_REVIEW')"]`),
    selectVendor: () => cy.xpath(`//*[@ng-change="selectVendor()"]`),
    selectVendorDD: () => cy.xpath(`//*[text()='Arrow']`),
    selectVendorJFCDD: () => cy.xpath(`//*[text()='JFC']`),
    addQuantity: () => cy.xpath(`(//*[@name="li.quantity"])[1]`),
    addQuantitys: () => cy.xpath(`(//*[@name="li.quantity"])[2]`),
    saveBtnPlaceOrder: () => cy.xpath(`//*[@ng-click="saveAndSend($event)"]`),
    saveConfirm: () => cy.xpath(`//*[@ng-click="doSaveAndSend($event)"]`),
    statusSent: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'SENT')"]`),
    statusSaved: () => cy.get(`[ng-click="changeViewBy($event, 'SAVED')"]`),
    approveInvoiceItem: () =>
      cy.xpath(`//*[@href="#/invoiceApproval"]//*[@role='button']`),
    deleteOrder: () => cy.get(`[ng-click="delete()"]`),
    selectReason: () => cy.get(`label[ng-repeat="r in orderDeleteReason"]`),
    deleteBtn: () =>
      cy.get(
        `button[data-testid="orderPages-deleteOrderConfirmationModal-deleteButton"]`
      ),
    deleteConfirm: () =>
      cy.get(
        `[data-testid="orderPages-deleteOrderConfirmationModal-deleteButton"]`
      ),
    saveOrderBtn: () => cy.get(`#saveOrder`),
    statusClosed: () => cy.get(`[ng-click="changeViewBy($event, 'CLOSED')"]`),
    noAccessToSetupTransfer: () =>
      cy.xpath(`//p[text()='Invoices do not require approval.']`),
    addQuantityPlaceOrder: () => cy.xpath(`(//*[@ng-model="li.quantity"])[1]`),
    sendBtn: () => cy.get(`[ng-click="saveAndSend($event)"]`),
    confirmSend: () => cy.get(`[ng-click="doSaveAndSend($event)"]`),
    skipInv: () => cy.get(`[ng-click="skip($event)"]`),
    askQues: () => cy.get(`[ng-click="addQuestion()"]`),
    addConcern: () =>
      cy.get(".form-horizontal > :nth-child(2) > .form-control"),
    askQuestion: () =>
      cy.xpath(`//*[@aria-label='Select a question type activate']`),
    askQuesMissingInvoice: () =>
      cy.xpath(`//*[contains(text(),'Missing Invoice Page')]`),
    saveAndSkip: () => cy.get(`[ng-click="addNewQuestion($event)"]`),
    assignToLDD: () =>
      cy.xpath(`(//*[@ng-model="c.assignedTo"])[2]`).select("Restaurant Admin"),
    concernAssignedToUnitAdmin: () =>
      cy.xpath(`//*[@ng-model='c.assignedTo']`).select("Restaurant Admin"),
    deleteAndSendEmail: () =>
      cy.xpath(
        `//*[contains(@ng-hide,'reconciliationCompleted || !accountManager && !admin || !hasSendEmailActiveConcern(c)')]`
      ),
    confirmDeleteAndSendEmailTxt: () =>
      cy.xpath(
        `//*[@class='bootbox-body'][contains(text(),'Confirm that you would like to update status to Sent and send an email notification concerning this order.')]`
      ),
    confirmDeleteAndSendEmail: () =>
      cy.xpath(`//*[@class='btn btn-primary bootbox-accept']`),
    sendEmailBtn: () => cy.xpath(`//button[contains(text(),'OK')]`),
    addPhoto: () => cy.get(`a[ng-model="files"]`),
    addPhotoRec: () =>
      cy.xpath(
        `//a[@class='btn btn-success btn-xs ng-pristine ng-untouched ng-valid ng-isolate-scope ng-empty'][@accept='image/*']`
      ),
    saveInv: () => cy.xpath(`//*[text()='Save']`),
    changePrice: () =>
      cy.xpath(`(//*[@class="ui-grid-cell-contents ng-binding ng-scope"])[6]`),
    changeQuant: () =>
      cy.xpath(`(//*[@class="ui-grid-cell-contents ng-binding ng-scope"])[7]`),
    addNewPrice: () => cy.get(`input[ng-model="row.entity['unitPrice']"]`),
    addNewQuant: () => cy.get(`input[ng-model="row.entity['quantity']"]`),
    clickReassign: () => cy.xpath(`(//div[@title="Select a role"])[2]`),
    addReassign: () => cy.xpath(`(//*[@aria-label="Select a role"])[2]`),
    clickItemDD: () => cy.get(`.ui-select-choices-row-inner`),
    saveReassignBtn: () =>
      cy.get(`button[ng-click="saveQuestionModal($event)"]`),
    addCreditRecon: () => cy.get(`input[name="credit"]`),
    deleteOrderTextField: () =>
      cy.xpath(`(//*[@ng-model='order.statusNote'][@autocomplete='off'])[1]`),
    selectInitialReviewDD: () =>
      cy.xpath(`//*[@ng-click="changeViewBy($event, 'INITIAL_REVIEW')"]`),
    selectInReconciliationDD: () =>
      cy.xpath(
        `//*[@ng-click="changeViewBy($event, 'PENDING_RECONCILIATION')"]`
      ),
    selectAMReviewDD: () =>
      cy.xpath(`//*[@ng-click="changeViewBy($event, 'AM_REVIEW')"]`),
    selectNeedsAttentionDD: () =>
      cy.xpath(`//*[@ng-click="changeViewBy($event, 'NEEDS_ATTENTION')"]`),
    questionsAMReview: () =>
      cy.xpath(`//*[@translate='inviosoApp.order.concerns.title']`),
    verifyVIitemCheckbox: () =>
      cy.xpath(
        `//*[@id="vendorItemVerified"]//*[@class="icheckbox_minimal-blue"]`
      ),
    AMReviewCompleteCheckBox: () =>
      cy.xpath(`//*[@translate='inviosoApp.order.reconcile.closedLabel']`),
    reasonToDeleteCheckbox: () =>
      cy.xpath(`(//*[@ng-repeat='r in orderDeleteReason'])[1]`),
    selectRetiredOrderDD: () =>
      cy.xpath(`//*[@ng-class="{'selected': viewBy === 'RETIRED'}"]`),
    undeleteBtn: () => cy.xpath(`//*[@ng-click='undelete()']`),
    undeleteTextField: () =>
      cy.xpath(
        `//*[@class='bootbox-input bootbox-input-text form-control'][@autocomplete='off']`
      ),
    undeleteConfirmBtn: () =>
      cy.xpath(`//*[@class='btn btn-primary bootbox-accept']`),
    inboxBtn: () =>
      cy.xpath(`//*[@translate='inviosoApp.order.emailQueue.title']`),
    deleteConfirmClosedOrder: () =>
      cy.xpath(
        `//*[@id='deleteOrderConfirmation']//*[@class='btn btn-danger'][@type='submit']`
      ),
    cancelDeleteConfirmClosedOrder: () =>
      cy.xpath(
        `//*[@name='deleteForm']//*[@class='modal-footer']//*[@type='button']`
      ),
    checkDeleteConfirmText: () =>
      cy.xpath(
        `//*[@class='alert alert-info']//*[contains(text(),'Before you delete this invoice please attempt to input the invoice date, invoice number, or vendor name.')]`
      ),
    missingProdTxt: () =>
      cy.xpath(
        `//span[text()='One or more Products on this order are missing categories.']`
      ),
    moreOptionsDropupBtn: () =>
      cy.get(`[data-testid="orderMoreOptionsButton"]`),
    reOpenOrderBtn: () => cy.xpath(`//*[@ng-click='reopen()']`),
    reasonToreOpenOrder: () =>
      cy.xpath(`(//*[@name='reason'][@type='text'])[1]`),
    reOpenConfirmBtn: () =>
      cy.xpath(`//*[@type='submit']//*[@translate='entity.action.reopen']`),
    reOpenedOrderCompleteCheck: () =>
      cy.get(`span[translate='inviosoApp.order.finalReview.closedLabel']`),
    verifyBtnRecon: () => cy.get(`button[ng-click="verify($event)"]`),
    sortList: () => cy.xpath(`(//div[@ng-keydown="handleKeyDown($event)"])[8]`),
    reconCredit: () =>
      cy.xpath(
        `(//div[@class="ui-grid-cell-contents ng-binding ng-scope"])[6]`
      ),
    enterCredit: () => cy.get(`input[ng-model="row.entity['unitPrice']"]`),
    orderPageBtnsHolder: () => cy.xpath(`//*[@class='well well-sm']`),
    addInvoiceDD: () =>
      cy.xpath(
        `//*[@class='dropdown']//*[@class='btn btn-md btn-primary dropdown-toggle']`
      ),
    missingInvoiceNumberText: () =>
      cy.xpath(
        `//*[@class='btn btn-primary bootbox-accept'][contains(text(),'OK')]`
      ),
    exportAsDD: () => cy.get(`#orderExportDD`),
    concernResolved: () =>
      cy.xpath(
        `//div[@ng-switch-when='MISSING_INVOICE_PAGE']//div[@class='icheckbox_minimal-blue']`
      ),
    exportCSV: () => cy.xpath(`//*[@ng-click="exportGrid($event, 'csv')"]`),
    clickOKBtnOnVerify: () => cy.get(`button[ng-hide="verifyingForClose"]`),
    warningInvoiceDate: () =>
      cy.xpath(
        `//*[@ng-show='!order.initialReviewInvoiceDate && initialReviewComplete']`
      ),
    warningInvoiceDateRec: () =>
      cy.xpath(`//*[@ng-show='!order.invoiceDate && reconciliationComplete']`),
    warningVerifiedTotal: () =>
      cy.xpath(
        `//div[@ng-show='!_.isFinite(order.initialReviewTotal) && initialReviewComplete']`
      ),
    warningVendorRequired: () =>
      cy.xpath(`//div[@ng-show='!order.vendor && initialReviewComplete']`),
    warningHandWritten: () =>
      cy.xpath(
        `//*[@ng-show='order.initialReviewHandwrittenMarkup === undefined && initialReviewComplete']`
      ),
    warningHandWrittenRec: () =>
      cy.xpath(
        `//*[@ng-show='order.handwrittenMarkup === undefined && reconciliationComplete']`
      ),
    orderStatusNew: () => cy.xpath(`(//*[@name='status'])[3]`),
    orderStatusSaved: () => cy.xpath(`(//*[@name='status'])[1]`),
    orderStatusSent: () => cy.xpath(`(//*[@name='status'])[2]`),
    uploadDate: () => cy.get(`[name='actionableDate']`),
    previewBtn: () => cy.get(`[ng-click='preview($event)']`),
    vendorList: () => cy.get(`[role='listbox']`),
    vendorNote: () => cy.get(`[name='vendorNotes']`),
    previewConfirmationBtn: () => cy.get(`button[ng-show='isPreview']`),
    orderPrice: () => cy.get(`.form-control-static.ng-binding`),
    previwPrice: () =>
      cy.xpath(`//*[@class='alert alert-info']//*[@class='ng-binding']`),
    resendWarnTextField: () => cy.get(`[class='alert alert-warning']`),
    selectPreprocessingDD: () =>
      cy.get(`[ng-click="changeViewBy($event, 'PREPROCESSING')"]`),
    uploadedStatusText: () => cy.get(`label[class='ng-scope ng-binding']`),
    vendorItemsText: () => cy.get(`.ng-scope.section-2`),
    selectPackaging: () => cy.xpath(`(//select[@name='packaging'])[1]`),
    priceText: () => cy.xpath(`(//td[@class='ng-binding'])[1]`),
    recipientField: () => cy.get(`#recipient`),
    addressLine1Field: () => cy.get(`#address1`),
    cityField: () => cy.get(`#city`),
    stateField: () => cy.get(`#state`),
    zipCodeField: () => cy.get(`#zip`),
    mobileField: () => cy.get(`#phone`),
    warningHandWrittenRec: () =>
      cy.xpath(
        `//*[@ng-show='order.handwrittenMarkup === undefined && reconciliationComplete']`
      ),
    differentVendorWarning: () =>
      cy.xpath(
        `//div[contains(text(),'The vendor you selected is different than the vend')]`
      ),
    differentVendorWarningOkBtn: () =>
      cy.xpath(
        `//div[@role='dialog']//div[@class='modal-dialog']//button[@type='button'][normalize-space()='OK']`
      ),
    skipInvoiceWarning: () =>
      cy.xpath(
        `//div[@class='bootbox-body'][contains(text(),'Please do not skip invoices without asking a question first. If there is a reason you need to skip this invoice please ask a question so there is a log of why this invoice could not be processed.')]`
      ),
    activeConcernWarning: () => cy.xpath(`//*[@ng-show='hasActiveConcern()']`),
    resolveConcern: () =>
      cy.xpath(`//label[normalize-space()='Concern Resolved']`),
    finalReviewStatusTitle: () =>
      cy.get(`span[translate='inviosoApp.order.finalReview.label']`),
    deletePhotoOrderBtn: () => cy.xpath(`//button[contains(.,'Delete Photo')]`),
    deletePhotoOrderFile: () => cy.xpath(`//*[@ng-click='deletePhoto(i)']`),
    okButton: () =>
      cy.xpath(`//button[@class='btn btn-primary bootbox-accept']`),
    deleteForm: () => cy.get(`[name='deleteForm']`),
    addressForm: () => cy.get(`[name='editForm']`),
    unitReporterDatePicker: () => cy.get(`#unitReportDatePicker`),
    warningHandWrittenRec: () =>
      cy.xpath(
        `//*[@ng-show='order.handwrittenMarkup === undefined && reconciliationComplete']`
      ),
    differentVendorWarning: () =>
      cy.xpath(
        `//div[contains(text(),'The vendor you selected is different than the vend')]`
      ),
    differentVendorWarningOkBtn: () =>
      cy.xpath(
        `//div[@role='dialog']//div[@class='modal-dialog']//button[@type='button'][normalize-space()='OK']`
      ),
    skipInvoiceWarning: () =>
      cy.xpath(
        `//div[@class='bootbox-body'][contains(text(),'Please do not skip invoices without asking a question first. If there is a reason you need to skip this invoice please ask a question so there is a log of why this invoice could not be processed.')]`
      ),
    okBtnPhotoDel: () => cy.xpath(`//button[contains(text(),'OK')]`),
    closeBtn: () => cy.xpath(`//button[@class='bootbox-close-button close']`),
    selectPreprocessingStatus: () =>
      cy.get(`[ng-click="changeViewBy($event, 'PREPROCESSING')"]`),
    noPhoneCheckbox: () => cy.get(`#noPhonePresent`),
    noInfoCheckBox: () => cy.get(`#noInfoPresent`),
    onHandInpurFields: () => cy.xpath(`(//*[@name='onHand'])[1]`),
    orderGrid: () => cy.get(`.grid`),
    moveOrderOp: () => cy.get(`[ng-click='moveOrder()']`),
    historyOp: () => cy.get(`[ng-click='history()']`),
    moveOrderTenantDD: () => cy.get(`[ng-model='order.moveOrderTo']`),
    moveInvBtn: () => cy.get(`#moveInvBtn`),
    statusNoteText: () => cy.get(`#statusNote`),
    closeAuditTrail: () => cy.get(`#closeAuditTrail`),
    selectPendingApproval: () =>
      cy.get(`[ng-click="changeViewBy($event, 'PENDING_APPROVAL')"]`),
    approveInvoiceBtn: () => cy.get(`#approveInvoiceBtn`),
    invoiceAppovalOff: () => cy.get(`#invApprovalOff`),
    invoiceAppovalAll: () => cy.get(`#invApprovalAll`),
    invoiceApprovalSaveBtn: () => cy.get(`#invoiceApprovalSaveBtn`),
    invoiceApprovalSetupBtn: () => cy.get(`#invoiceApprovalSetupBtn`),
    moveToPendingApproval: () =>
      cy.get(`[ng-click='handleReopenForApproval()']`),
    printOrderGuideBtn: () => cy.get(`[ng-click='printOrderGuide($event)']`),
    lastCountData: () => cy.get(`#lastCount`).first(),
    lastCountDateData: () => cy.get(`#lastCountDate`).first(),
    accountManagerReviewStatusTitle: () =>
      cy.get(`span[translate='inviosoApp.order.accountManagerReview.label']`),
    suggestForDeletion: () =>
      cy.xpath(
        `//*[@ng-show="order.id && (isInStaffRole() && (isInAnyRole(['ROLE_ANALYST','ROLE_CLIENT_SERVICES']) && !hasNotInvoiceQuestion))"]`
      ),
    orderStatus: (statusName) =>
      cy.get(`input[name='status'][value$='${statusName}']`),
    warningBulkIR: () =>
      cy.xpath(
        `//*[@translate='inviosoApp.order.initialReview.doBulkInitialReview']`
      ),
    warningBulkRec: () =>
      cy.xpath(`//*[@translate='inviosoApp.order.reconcile.doBulkRecReview']`),
    analystWarningRec: () =>
      cy.get(
        `div[ng-show="isInAnyRole(['ROLE_ANALYST', 'ROLE_CLIENT_SERVICES']) && account.login === order.initialReviewBy"]`
      ),
    selectRow: () => cy.get(`.ui-grid-row.ng-scope`).first(),
    assignToDD: () =>
      cy.get(`div[ng-model="taskDetails.concern.assignedTo"]`).last(),
    writeReassign: () => cy.get(`input[aria-label="Select a role"]`).last(),
    greatJobOrderVerificationRec: () =>
      cy.xpath(
        `//*[@translate='inviosoApp.order.verification.noOrderConcerns']`
      ),
    recociliationSourceLabel: () => cy.get(`#sourceLabel`),
    addResponseText: () => cy.get(`[name="response"]`),
    addNote: () => cy.get(`[ng-model="order.statusNote"]`)
  };

  assignToLeadAnalyst(role) {
    this.element.selectRow().click();
    cy.wait(1500);
    this.element.assignToDD().click();
    this.element.writeReassign().type(role);
    this.element.clickItemDD().click();
    this.element.saveReassignBtn().click();
    cy.wait(3000);
  }

  irProcessWithoutinitialReviewCompleteCheck(
    unitName,
    invoiceNumberStr,
    customerNameStr
  ) {
    loginPageObjects.element
      .storeToggle()
      .should("be.visible")
      .then(($el) => {
        // $el is a jQuery object
        if ($el.text() == unitName) {
          console.log("Restaurant Matched! Go Ahead");
          cy.wait(3000);
          this.element.clickVendor().should("be.visible").click();
          this.element.selectDDItem().should("be.visible").click({
            multiple: true
          });
          this.element.invoiceNumber().type(invoiceNumberStr);
          this.element.invoiceDate().click();
          this.element.todayDate().click();
          cy.wait(1000);
          //condition to check no address
          this.element.addressForm().then(($body) => {
            if ($body.text().includes("No address is provided")) {
              cy.get(`#noInfoPresent`).click();
              cy.get(`#noPhonePresent`).click();
            }
          });
          this.element.verifiedTotal().type("19");
          this.element.openDD();
          this.element.IRSaveBtn().should("not.be.disabled").click();
          cy.wait(3000);
        } else {
          cy.wait(1500);
          this.element.askQues().click();
          cy.wait(2000);
          this.element.addConcern().click();
          this.element.addConcern().type("Skipping due to tennat mismatch");
          this.element.saveAndSkip().click();
          cy.wait(5000);
          this.irProcessWithTenantCheck(
            unitName,
            invoiceNumberStr,
            customerNameStr
          );
        }
      });
  }

  verifySkipInvoice() {
    this.element.moreOptionsDropupBtn().click();
    this.element.skipInv().click();
    this.element.skipInvoiceWarning().should("be.visible");
    this.element.okBtn().click();
  }

  checkIRAnalyst(unitName, invoiceNumberStr, customerNameStr) {
    loginPageObjects.element
      .storeToggle()
      .should("be.visible")
      .then(($el) => {
        // $el is a jQuery object
        if ($el.text() == unitName) {
          console.log("Restaurant Matched! Go Ahead");
          cy.wait(3000);
          this.element.clickVendor().should("be.visible").click();
          this.element.selectDDItem().should("be.visible").click({
            multiple: true
          });
          this.element.invoiceNumber().type(invoiceNumberStr);
          this.element.invoiceDate().click();
          this.element.todayDate().click();
          cy.wait(1000);
          //condition to check no address
          this.element.addressForm().then(($body) => {
            if ($body.text().includes("No address is provided")) {
              cy.get(`#noInfoPresent`).click();
              cy.get(`#noPhonePresent`).click();
            }
          });
          this.element.verifiedTotal().type("19");
          this.element.openDD();
          this.element.initialReviewCompleteCheck().click();
          this.element.IRSaveBtn().should("be.disabled");
          cy.wait(3000);
        }
      });
  }

  suggestForInvoiceDeletion() {
    this.element.moreOptionsDropupBtn().click();
    this.element.suggestForDeletion().click();
    this.element.addConcern().type("HELLO TEST");
    this.element.saveAndSkip().click();
  }

  deleteOrderWithReasonStaff() {
    this.element.deleteOrder().click();
    cy.wait(1000);
    this.element.selectReason().first().click();
  }

  deleteOrderWithoutReason() {
    this.element.deleteOrder().click();
    cy.wait(1000);
    this.element.deleteBtn().click();
    cy.wait(3000);
  }

  checkOrderStatus(statusName) {
    this.element.orderStatus(statusName).last().should("exist");
  }

  addResponseAndSaveInvoice(text) {
    this.element.selectRow().click();
    cy.wait(1500);
    this.element.addResponseText().type(text);
    this.element.saveReassignBtn().click();
  }

  checkIRbtnOn() {
    cy.wait(3000);
    this.element
      .recociliationSourceLabel()
      .should("include.text", "Source: Uploaded");
    this.element.initialReviewCompleteCheck().should("be.visible").click();
    this.element.warningInvoiceDate().should("be.visible");
    this.element.warningVerifiedTotal().should("be.visible");
    this.element.warningVendorRequired().should("be.visible");
    this.element.warningHandWritten().should("be.visible");
    this.element
      .warningBulkIR()
      .should("be.visible")
      .and(
        "have.text",
        "All Initial Reviews must be done via the Bulk IR process.  If there is a problem preventing you from using Bulk IR for this order please discuss with a Lead Analyst."
      );
    this.element.IRSaveBtn().should("be.disabled");
    cy.wait(3000);
  }

  checkRecbtnOn() {
    cy.wait(3000);
    this.element
      .recociliationSourceLabel()
      .should("include.text", "Source: Uploaded");
    this.element.initialReviewCompleteCheck().should("be.visible").click();
    this.element.warningInvoiceDateRec().should("be.visible");
    this.element.warningHandWrittenRec().should("be.visible");
    this.element
      .warningBulkRec()
      .should("be.visible")
      .and(
        "have.text",
        "All reconciliations must be done via the Bulk Rec process.  If there is a problem preventing you from using Bulk Rec for this order please discuss with a Lead Analyst."
      );
    this.element.saveBtnRecon().should("be.disabled");
    cy.wait(3000);
  }

  deleteOrderWithReason(reasonIndex, text) {
    this.element.deleteOrder().click();
    cy.wait(1000);
    this.element.selectReason().eq(reasonIndex).click();
    cy.wait(1000);
    this.element.addNote().type(text);
    this.element.deleteBtn().click();
    cy.wait(3000);
  }
}
module.exports = new orderPage();
