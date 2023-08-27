import {
  fibonacciArray,
  fibonacciNumber,
  dataInputValue,
  dataSubmitBtn,
  dataCircles
} from "../constants/constants";

describe('Проверка последовательности Фибоначчи', function() {
  beforeEach(function() {
    cy.visit('fibonacci');
    cy.get(dataInputValue).as('inputValue');
    cy.get(dataSubmitBtn).as('submitButton');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@submitButton').should('be.disabled');
  });

  it('Числа генерируются корректно', function() {
    cy.get('@inputValue').type(fibonacciNumber);
    cy.get('@submitButton').should('be.not.disabled').click();
    cy.get('@submitButton').should('be.disabled');
    cy.get(dataCircles).as('circles');

    for (let i = 0; i < fibonacciArray.length; i++) {
      cy.get('@circles').should(($el) => {
        expect($el[i]).to.have.text(fibonacciArray[i]);
      });
    }
  });
});
