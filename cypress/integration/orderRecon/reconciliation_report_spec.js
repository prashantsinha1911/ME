const creds = require("../../fixtures/credentials.json");
const apiData = require("../../fixtures/apiData.json");
const apiController = require("../../page_objects/apiFunctionalities");
const utilObj = require("../../utils/util_generic");
const loginPageObj = require("../../page_objects/login.pageObjects");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const reconciliationPage = require("../../page_objects/reconciliation.page");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let access_token, orderLocation; // to store the wrapped value
const randomNumber = utilObj.makeId();
const invoiceNumberIR = "inv_IR1_" + randomNumber;
const invoiceNumberRec = "inv_Rec1_" + randomNumber;
const invoiceNumberFR = "inv_FR1_" + randomNumber;
const vendorID = 12; // SmokeTest House
const unitID = 1; // Wasabi Tysons
const fileName = "image.jpg";

let updatedIRData = {
  initialReviewBillPayContact: {
    noInfoPresent: true
  },
  initialReviewBy: "analyst",
  initialReviewDate: utilObj.getEpochTime(0),
  invoiceNum: invoiceNumberIR,
  initialReviewInvoiceNum: invoiceNumberIR,
  initialReviewHandwrittenMarkup: false,
  initialReviewTotal: 121,
  initialReviewVendorId: vendorID,
  initialReviewVendorPhone: {
    noPhonePresent: true
  },
  initialReviewWasBulk: true,
  vendor: {
    id: vendorID
  },
  status: apiData.orderStatus.reconciliation,
  verifiedBalanceSheetAccount: {
    id: apiData.paymentSystem.accountsPayable.id,
    name: apiData.paymentSystem.accountsPayable.value
  }
};

let updatedReconData = {
  reconciliationBalanceSheetAccount: {
    id: apiData.paymentSystem.check.id,
    name: apiData.paymentSystem.check.value
  },
  reconciliationBillPayContact: {
    noInfoPresent: true
  },
  reconciliationChecks: [
    {
      amount: 20,
      checkNumber: "1971"
    }
  ],
  reconciliationDate: utilObj.getEpochTime(1),
  invoiceDate: utilObj.getEpochTime(1),
  reconciliationHandwrittenMarkup: false,
  invoiceNum: invoiceNumberRec,
  reconciliationInvoiceNum: invoiceNumberRec,
  status: apiData.orderStatus.finalReview,
  reconciliationVendorId: vendorID,
  reconciliationVendorPhone: {
    noPhonePresent: true
  },
  reconciliationTotal: 122,
  reconciledBy: "analyst2"
};

let updatedFRData = {
  finalReviewBy: "leadanalyst",
  invoiceNum: invoiceNumberFR,
  invoiceDate: utilObj.getEpochTime(2),
  finalReviewDate: utilObj.getEpochTime(2),
  status: apiData.orderStatus.closed,
  checks: [
    {
      amount: 30,
      checkNumber: "1971"
    }
  ],
  balanceSheetAccount: {
    id: apiData.paymentSystem.check.id,
    name: apiData.paymentSystem.check.value
  }
};

describe("Reconciliation Report verification", () => {
  it("create an order, get the order in IR for Admin through api", () => {
    // get admin token
    apiController.getAccessToken(creds.adminName, creds.password);
    cy.get(`@access_token_${creds.adminName}`).then((token) => {
      access_token = token;
      apiController.createOrder(
        access_token,
        apiData.createOrder,
        apiData.orderStatus.preprocessing,
        fileName
      );
      cy.get("@orderLocation").then((location) => {
        orderLocation = location;
      });
    });
  });

  it("complete IR as analyst through api", () => {
    // get analyst token
    apiController.getAccessToken(creds.analyst, creds.password);
    cy.get(`@access_token_${creds.analyst}`).then((token) => {
      access_token = token;
      apiController.updateOrder(access_token, orderLocation, updatedIRData);
    });
  });

  it("complete reconciliation as analyst2 through api", () => {
    // get analyst token
    apiController.getAccessToken(creds.analyst2, creds.password);
    cy.get(`@access_token_${creds.analyst2}`).then((token) => {
      access_token = token;
      apiController.updateOrder(access_token, orderLocation, updatedReconData);
    });
  });

  it("close the order as leadAnalyst through api", () => {
    apiController.getAccessToken(creds.leadAnalyst, creds.password);
    cy.get(`@access_token_${creds.leadAnalyst}`).then((token) => {
      access_token = token;
      apiController.updateOrder(access_token, orderLocation, updatedFRData);
    });
  });

  it("verify reconciliation mistake log", () => {
    loginPageObj.loginAs(creds.adminName, creds.password);
    // it takes a while to load the report data
    cy.wait(60000);
    hamburgerMenuPageObj.goToSetup();
    hamburgerMenuPageObj.goToReconciliationReportSetup();
    reconciliationPage.checkReconciliationMistake(creds.analyst);
    reconciliationPage.checkReconciliationMistake(creds.analyst2);
  });

  it("delete the order & clean reconciliation report", () => {
    apiController.getAccessToken(creds.developer, creds.password);
    cy.get(`@access_token_${creds.developer}`).then((token) => {
      access_token = token;
      // delete the created order
      apiController.deleteOrder(access_token, orderLocation);
      // clean reconciliation report
      // Reconciliation mistake Data needs to be cleaned in the following ticket
      apiController.cleanseReconciliationReport(access_token, unitID);
    });
  });
});
