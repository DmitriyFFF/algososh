describe('Проверка работоспособности приложения', function() {
  it('приложение запущено по адресу localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
});
