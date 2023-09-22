class utilsMethod {
  element = {
    totalItemFooter: () =>
      cy.xpath(
        `//*[@class='ui-grid-footer-info ui-grid-grid-footer ng-scope']//*[@class='ng-binding'] | //*[@data-testid='itemsCountDisplay']`
      ),
    tableRow: () => cy.xpath(`//*[@role='rowgroup']//*[@role='row']`),
    storeToggle: () => cy.get("#unitMenu_dd"),
    tenantSearch: () => cy.wait(1000).get(`#searchTenant`)
  };

  makeId() {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  selectDate() {
    var aheadDate = new Date();
    aheadDate.setDate(aheadDate.getDate() + 1);
    let year = aheadDate.getFullYear();
    let aheadDay = aheadDate.getDate().toString().padStart(2, "0");
    let updatedMonth = (aheadDate.getMonth() + 1).toString().padStart(2, "0");
    let formattedDate = updatedMonth + "-" + aheadDay + "-" + year;
    return formattedDate;
  }

  checkRestUnitWO(unitName) {
    this.element
      .storeToggle()
      .should("be.visible")
      .then(($el) => {
        // $el is a jQuery object
        if ($el.text() == unitName) {
          console.log("Restaurant Matched! Go Ahead");
        } else {
          this.element.storeToggle().click();
          cy.xpath(`//*[text()="${unitName}"][@id='unitname']`).click();
          cy.wait(2000);
        }
      });
  }

  checkRestUnit(unitName, tenant) {
    this.element
      .storeToggle()
      .should("be.visible")
      .then(($el) => {
        // $el is a jQuery object
        if ($el.text() == unitName) {
          console.log("Restaurant Matched! Go Ahead");
        } else {
          this.element.storeToggle().click();
          this.element
            .tenantSearch()
            .should("be.visible")
            .clear()
            .type(tenant, { delay: 0 });
          cy.wait(3000); // wait for server-side restaurant unit search to complete
          cy.get(`#unitname`).click();
          cy.wait(2000);
        }
      });
  }

  // check Total Items: #
  checkTotalItems(alias) {
    cy.wait(alias).then((res) => {
      let apiRow = res.response.body.length.toString();
      // console.log(apiRow);
      this.element
        .totalItemFooter()
        .should("contain.text", `Total Items: ${apiRow}`);
    });
  }

  // count table row and check
  checkTableRow(alias) {
    cy.get(alias).then((res) => {
      let apiRow = res.response.body.length;
      if (apiRow !== 0) {
        this.element.tableRow().should(($el) => {
          // the last row in the UI contains the summary so its excluded
          // it can be used where table header shares the same locator
          expect(apiRow).to.equal($el.length - 1);
        });
      }
    });
  }

  getCustomDate(exactNoOfDaysToBeSubtracted) {
    var date = new Date();
    date.setDate(date.getDate() - exactNoOfDaysToBeSubtracted);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let fullYear = date.getFullYear();
    var finalDate = month + "-" + day + "-" + fullYear;
    // console.log(finalDate)
    return finalDate;
  }

  getCustomDateFuture(exactNoOfDaysToBeAdded) {
    var date = new Date();
    date.setDate(date.getDate() + 200);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let fullYear = date.getFullYear();
    var finalDate = month + "-" + day + "-" + fullYear;
    console.log(finalDate);
    return finalDate;
  }

  getDateObj(exactNoOfDaysToBeSubtracted) {
    var date = new Date();
    date.setDate(date.getDate() - exactNoOfDaysToBeSubtracted);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    var finalDate = { year, month, day };
    // console.log(finalDate)
    return finalDate;
  }

  getformattedDate(data1, data2, data3, symbol) {
    return data1 + symbol + data2 + symbol + data3;
  }

  getDaysInCurrentMonth() {
    var date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    return new Date(year, month, 0).getDate();
  }

  getFormDataObj = (obj) => {
    const formDataObj = new FormData();
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      formDataObj.append(key, value);
    });
    return formDataObj;
  };

  getEpochTime = (noOfDaysToBeExtracted) => {
    var date = new Date();
    return date.setDate(date.getDate() - noOfDaysToBeExtracted);
  };

  getCustomUrl = (urlString) => {
    const url = new URL(urlString);
    const protocol = url.protocol;
    const hostname = url.hostname;
    const customUrl = protocol + "//" + hostname;
    return customUrl;
  };
}
module.exports = new utilsMethod();
