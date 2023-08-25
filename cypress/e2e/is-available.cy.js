describe('Проверка работоспособности приложения', function() {
  it('Приложение запущено по адресу localhost:3000', function() {
    cy.visit('/');
  });
});
