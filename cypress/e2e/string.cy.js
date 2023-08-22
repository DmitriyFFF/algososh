import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Проверка строки', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/recursion');
    cy.get('input[data-testid=inputValue]').as('inputValue');
    cy.get('button[data-testid=submitButton]').as('submitButton');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@submitButton').should('be.disabled');
  });

  it('Строка разворачивается корректно', function() {
    const string = 'string';
    cy.get('@inputValue').type(string);
    cy.get('@inputValue').should('have.value', string);
    cy.get('@submitButton').should('be.not.disabled').click();
    cy.get('div[data-testid=circles]').as('circles');

    cy.get('@circles').should(async($el) => {
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      expect($el[0]).to.have.css('border','4px solid rgb(210, 82, 225)');
      expect($el[5]).to.have.css('border','4px solid rgb(210, 82, 225)');
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      expect($el[0]).to.have.text(string[5]);
      expect($el[5]).to.have.text(string[0]);
      expect($el[0]).to.have.css('border','4px solid rgb(127, 224, 81)');
      expect($el[5]).to.have.css('border','4px solid rgb(127, 224, 81)');

      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      expect($el[1]).to.have.css('border','4px solid rgb(210, 82, 225)');
      expect($el[4]).to.have.css('border','4px solid rgb(210, 82, 225)');
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      expect($el[1]).to.have.text(string[4]);
      expect($el[4]).to.have.text(string[1]);
      expect($el[1]).to.have.css('border','4px solid rgb(127, 224, 81)');
      expect($el[4]).to.have.css('border','4px solid rgb(127, 224, 81)');

      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      expect($el[2]).to.have.css('border','4px solid rgb(210, 82, 225)');
      expect($el[3]).to.have.css('border','4px solid rgb(210, 82, 225)');
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      expect($el[2]).to.have.text(string[3]);
      expect($el[3]).to.have.text(string[2]);
      expect($el[2]).to.have.css('border','4px solid rgb(127, 224, 81)');
      expect($el[3]).to.have.css('border','4px solid rgb(127, 224, 81)');
    });
  });
});
