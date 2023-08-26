class utilsMethod {
  makeId() {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  checkRestUnit(unitName, tenant) {
    cy.get("#unitMenu_dd").then(($el) => {
      // $el is a jQuery object
      if ($el.text() == unitName) {
        console.log("Restaurant Matched! Go Ahead");
      } else {
        cy.get("#unitMenu_dd").click();
        cy.wait(1000);
        cy.get(`#searchTenant`)
          .should("be.visible")
          .clear()
          .type(tenant, { delay: 0 });
        cy.wait(3000); // wait for server-side restaurant unit search to complete
        cy.get(`#unitname`).click();
        cy.wait(2000);
      }
    });
  }

  checkRestUnitWO(unitName) {
    cy.get("#unitMenu_dd").then(($el) => {
      // $el is a jQuery object
      if ($el.text() == unitName) {
        console.log("Restaurant Matched! Go Ahead");
      } else {
        cy.get("#unitMenu_dd").click();
        cy.xpath(`//*[text()="${unitName}"]`).click();
        cy.wait(2000);
      }
    });
  }
}
module.exports = new utilsMethod();
