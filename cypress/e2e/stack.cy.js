import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { timeDelay } from "../../src/utils/constants";
import {
  stackArray,
  dataInputValue,
  dataAddBtn,
  dataDeleteBtn,
  dataClearBtn,
  dataCircles,
  defaultColorBorder,
  chagingColorBorder
 } from "../constants/constants";

describe('Проверка стека', function() {
  beforeEach(function() {
    cy.visit('stack');
    cy.get(dataInputValue).as('inputValue');
    cy.get(dataAddBtn).as('addButton');
    cy.get(dataDeleteBtn).as('delButton');
    cy.get(dataClearBtn).as('clearButton');
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
      cy.get(dataCircles).as('circles');
      cy.get('@circles').should(async($el) => {
        expect($el[i]).to.have.text(stackArray[i]);
        expect($el[i]).to.have.css('border', chagingColorBorder);
        await timeDelay(SHORT_DELAY_IN_MS);
        expect($el[i]).to.have.css('border', defaultColorBorder);
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
    cy.get(dataCircles).as('circles');
    cy.get('@circles').should(async($el) => {
      expect($el[stackArray.length - 1]).to.have.css('border', chagingColorBorder);
      await timeDelay(SHORT_DELAY_IN_MS);
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
