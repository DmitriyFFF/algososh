describe('Работоспособность перехода по страницам', function() {
  it('страница String запущена', function() {
    cy.visit('http://localhost:3000/recursion');
  });
  it('страница Fibonacci запущена', function() {
    cy.visit('http://localhost:3000/fibonacci');
  });
  it('страница Sorting запущена', function() {
    cy.visit('http://localhost:3000/sorting');
  });
  it('страница Stack запущена', function() {
    cy.visit('http://localhost:3000/stack');
  });
  it('страница Queue запущена', function() {
    cy.visit('http://localhost:3000/queue');
  });
  it('страница List запущена', function() {
    cy.visit('http://localhost:3000/list');
  });
});
