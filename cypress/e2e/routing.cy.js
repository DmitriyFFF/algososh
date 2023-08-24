describe('Работоспособность перехода по страницам', function() {
  it('Страница String запущена', function() {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Страница Fibonacci запущена', function() {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Страница Sorting запущена', function() {
    cy.visit('http://localhost:3000/sorting');
  });

  it('Страница Stack запущена', function() {
    cy.visit('http://localhost:3000/stack');
  });

  it('Страница Queue запущена', function() {
    cy.visit('http://localhost:3000/queue');
  });

  it('Страница List запущена', function() {
    cy.visit('http://localhost:3000/list');
  });
});
