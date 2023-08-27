describe('Работоспособность перехода по страницам', function() {
  it('Страница String запущена', function() {
    cy.visit('recursion');
  });

  it('Страница Fibonacci запущена', function() {
    cy.visit('fibonacci');
  });

  it('Страница Sorting запущена', function() {
    cy.visit('sorting');
  });

  it('Страница Stack запущена', function() {
    cy.visit('stack');
  });

  it('Страница Queue запущена', function() {
    cy.visit('queue');
  });

  it('Страница List запущена', function() {
    cy.visit('list');
  });
});
