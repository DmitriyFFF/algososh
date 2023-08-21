describe('Проверка последовательности Фибоначчи', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('input[data-testid=inputValue]').as('inputValue');
    cy.get('button[data-testid=submitButton]').as('submitButton');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@submitButton').should('be.disabled');
  });

  it('Числа генерируются корректно', function() {
    const number = 5;
    const fibonacci = [1,1,2,3,5,8];
    cy.get('@inputValue').type(number);
    cy.get('@submitButton').should('be.not.disabled').click();
    cy.get('@submitButton').should('be.disabled');
    cy.get('[data-testid="circles"]').as('circles');

    for (let i = 0; i < fibonacci.length; i++) {
      cy.get('@circles').should(($el) => {
        expect($el[i]).to.have.text(fibonacci[i]);
      });
    }
  });
});
