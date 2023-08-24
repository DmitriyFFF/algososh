import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { stackArray } from "../constants/constants";

describe('Проверка стека', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/stack');
    cy.get('input[data-testid=inputValue]').as('inputValue');
    cy.get('button[data-testid=addButton]').as('addButton');
    cy.get('button[data-testid=delButton]').as('delButton');
    cy.get('button[data-testid=clearButton]').as('clearButton');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@addButton').should('be.disabled');
  });

  it('Элемент добавляется в стек корректно', function() {
    for (let i = 0; i < stackArray.length; i++) {
      cy.get('@inputValue').type(stackArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
      cy.get('@inputValue').should('have.value', '');
      cy.get('@addButton').should('be.disabled');
      cy.get('div[data-testid=circles]').as('circles');
      cy.get('@circles').should(async($el) => {
        expect($el[i]).to.have.text(stackArray[i]);
        expect($el[i]).to.have.css('border','4px solid rgb(210, 82, 225)');
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        expect($el[i]).to.have.css('border','4px solid rgb(0, 50, 255)');
      });
    }
    cy.get('@delButton').should('be.not.disabled');
    cy.get('@clearButton').should('be.not.disabled');
  });

  it('Элемент удаляется из стека корректно', function() {
    for (let i = 0; i < stackArray.length; i++) {
      cy.get('@inputValue').type(stackArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
    }
    cy.get('@delButton').should('be.not.disabled').click();
    cy.get('@addButton').should('be.disabled');
    cy.get('@delButton').should('be.disabled');
    cy.get('div[data-testid=circles]').as('circles');
    cy.get('@circles').should(async($el) => {
      expect($el[stackArray.length - 1]).to.have.css('border','4px solid rgb(210, 82, 225)');
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      expect($el).to.have.length(stackArray.length - 1);
    });
  });

  it('Очистка стека выполняется корректно после нажатия кнопки "Очистить"', function() {
    for (let i = 0; i < stackArray.length; i++) {
      cy.get('@inputValue').type(stackArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
    }
    cy.get('@clearButton').should('be.not.disabled').click();
    cy.get('@addButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
    cy.get('div[data-testid=circle-container]').as('circle-container');
    cy.get('@circle-container').should('be.empty');
  });
});
