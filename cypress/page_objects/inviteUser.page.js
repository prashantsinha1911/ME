class inviteuserPage {
  element = {
    inviteUesrBtn: () => cy.xpath(`//*[@href="#/user/invite"]`),
    addEmail: () => cy.get(`[name="email"]`),
    selectRole1: () => cy.get('[name="role"]').select("Manager"),
    selectRole: () => cy.get('[name="role"]').select("Accountant"),
    selectMEAdmin: () =>
      cy.xpath(
        `//*[@class="form-horizontal"]//*[@class="icheckbox_minimal-blue"]`
      ),
    inviteBtn: () => cy.xpath(`//span[text()='Invite']`),
    showDD: () => cy.xpath(`(//div[@ng-show="isInStaffRole()"])[1]`),
    selctAllDD: () => cy.get(`[ng-click="changeRoleFilter()"]`),
    search: () => cy.get(`[ng-model="filterValue"]`),
    selectItem: () => cy.get(`.ui-grid-row.ng-scope`),
    roles: () =>
      cy.get(`[ng-model="user.roles"]`).select("System Admin (Internal)"),
    saveBtn: () => cy.xpath(`(//span[text()='Save'])[1]`),
    setOffice: () => cy.get(`[ng-model="user.office"]`).select(`USA`),
    loginTxt: () => cy.get(`[ng-model="user.login"]`),
    lastName: () => cy.get(`[ng-model="user.lastName"]`),
    firstName: () => cy.get(`[ng-model="user.firstName"]`),
    acceptInvite: () =>
      cy.xpath(
        `//*[@class="checkbox-inline icheck-label"]//*[text()='User invite accepted']`
      ),
    resetPassword: () =>
      cy.xpath(`//*[@translate='inviosoApp.user.home.changePasswordLabel']`),
    pass: () => cy.get(`[ng-model="user.password"]`),
    confirmPass: () => cy.get(`[ng-model="user.confirmPassword"]`),
    accpetBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
    revokeAccess: () => cy.get(`button[ng-click="remove()"]`),
    revokeAccessConfirm: () => cy.xpath(`(//span[text()='Remove Access'])[2]`),
    phoneField: () => cy.get(`[name='phoneNumber']`)
  };

  changeRole() {
    this.element.showDD().click();
    this.element.selctAllDD().click();
    this.element.search().type("skrab");
    this.element.selectItem().click();
    this.element.roles();
    this.element.setOffice();
    this.element.saveBtn().click();
    cy.wait(2000);
  }

  inviteUser(email, loginID, lName, fName) {
    this.element.inviteUesrBtn().click();
    this.element.addEmail().type(email);
    this.element.selectRole();
    this.element.inviteBtn().click();
    this.element.loginTxt().should("be.visible").type(loginID);
    this.element.lastName().type(lName);
    this.element.firstName().type(fName);
    this.element.inviteBtn().click();
    this.element.inviteUesrBtn().should("be.visible");
  }

  acceptInviteAndSetPassword(email, pass, confirmPass, cellPhoneNumber) {
    this.element.showDD().click();
    this.element.selctAllDD().click();
    this.element.search().type(email);
    this.element.selectItem().click();
    this.element
      .phoneField()
      .should("be.visible")
      .clear()
      .type(cellPhoneNumber);
    this.element.acceptInvite().should("be.visible").click();
    this.element.resetPassword().should("be.visible").click();
    this.element.pass().type(pass);
    this.element.confirmPass().type(confirmPass);
    this.element.saveBtn().click();
    this.element.inviteUesrBtn().should("be.visible");
    cy.wait(2000);
  }

  addUnitAdmin() {
    this.element.inviteUesrBtn().click();
    this.element.addEmail().type(`unitadmin@example.com`);
    this.element.selectRole1();
    this.element.inviteBtn().click();
  }

  accpetTerms() {
    cy.wait(5000);
    this.element.accpetBtn().should("be.visible").click({ multiple: true });
  }

  revokeUserAccess(createdUser) {
    this.element.search().type(createdUser);
    this.element.selectItem().click();
    cy.wait(3000);
    this.element.revokeAccess().click();
    cy.wait(2000);
    this.element.revokeAccessConfirm().click();
    cy.wait(2000);
  }
}
module.exports = new inviteuserPage();
