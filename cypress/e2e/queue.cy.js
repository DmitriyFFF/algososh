import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { timeDelay } from "../../src/utils/constants";
import {
  queueArray,
  dataInputValue,
  dataAddBtn,
  dataDeleteBtn,
  dataClearBtn,
  dataCircles,
  dataHead,
  dataTail,
  defaultColorBorder,
  chagingColorBorder
} from "../constants/constants";

describe('Проверка стека', function() {
  beforeEach(function() {
    cy.visit('queue');
    cy.get(dataInputValue).as('inputValue');
    cy.get(dataAddBtn).as('addButton');
    cy.get(dataDeleteBtn).as('delButton');
    cy.get(dataClearBtn).as('clearButton');
    cy.get(dataCircles).as('circles');
    cy.get(dataHead).as('head');
    cy.get(dataTail).as('tail');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@addButton').should('be.disabled');
  });

  it('Элемент добавляется в очередь корректно', function() {
    cy.get('@head').should('not.have.text');
    cy.get('@tail').should('not.have.text');
    for (let i = 0; i < queueArray.length; i++) {
      cy.get('@inputValue').type(queueArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
      cy.get('@head').should('have.text', 'head');
      cy.get('@inputValue').should('have.value', '');
      cy.get('@addButton').should('be.disabled');
      cy.get('@circles').should(async($el) => {
        expect($el[i]).to.have.text(queueArray[i]);
        expect($el[i]).to.have.css('border', chagingColorBorder);
        await timeDelay(SHORT_DELAY_IN_MS);
        expect($el[i]).to.have.css('border',defaultColorBorder);
      });
      cy.get('@tail').should('have.text', 'tail');
    }
  });

  it('Элемент удаляется из очереди корректно', function() {
    for (let i = 0; i < queueArray.length; i++) {
      cy.get('@inputValue').type(queueArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
    }
    cy.get('@head').should('have.text', 'head');
    cy.get('@delButton').should('be.not.disabled').click();
    cy.get('@circles').should(async($el) => {
      expect($el[0]).to.have.css('border', chagingColorBorder);
      await timeDelay(SHORT_DELAY_IN_MS);
      expect($el[0]).to.have.css('border', defaultColorBorder);
      expect($el[0]).to.have.text('');
    });
    cy.get('@head').eq(0).should('not.have.text');
    cy.get('@head').eq(1).should('have.text', 'head');
  });

  it('Очистка очереди выполняется корректно после нажатия кнопки "Очистить"', function() {
    for (let i = 0; i < queueArray.length; i++) {
      cy.get('@inputValue').type(queueArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
    }
    cy.get('@clearButton').should('be.not.disabled').click();
    cy.get('@addButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
    cy.get('@circles').should('not.have.text');
    cy.get('@head').should('not.have.text');
    cy.get('@tail').should('not.have.text');
  });
});
