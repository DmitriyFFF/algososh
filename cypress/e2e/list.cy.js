import { DELAY_IN_MS } from "../../src/constants/delays";
import { timeDelay } from "../../src/utils/constants";
import {
  defaultListArray,
  testListInputValue,
  testListIndex,
  dataInputValue,
  dataCircles,
  smallCircle,
  dataHead,
  dataTail,
  defaultColorBorder,
  chagingColorBorder,
  modifiedColorBorder
} from "../constants/constants";

describe('Проверка списка', function() {
  beforeEach(function() {
    cy.visit('list');
    cy.get(dataInputValue).as('inputValue');
    cy.get(dataCircles).as('circles');
    cy.get(dataHead).as('head');
    cy.get(dataTail).as('tail');
    cy.get('input[data-testid=inputIndex]').as('inputIndex');
    cy.get('button[data-testid=addHead]').as('addHead');
    cy.get('button[data-testid=addTail]').as('addTail');
    cy.get('button[data-testid=delHead]').as('delHead');
    cy.get('button[data-testid=delTail]').as('delTail');
    cy.get('button[data-testid=addByIndex]').as('addByIndex');
    cy.get('button[data-testid=delByIndex]').as('delByIndex');
  });

  it('Кнопки добавления, удаления по индексу и добавления по индексу не активны при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addByIndex').should('be.disabled');
    cy.get('@delByIndex').should('be.disabled');
  });

  it('Отрисовка дефолтного списка выполняется корректно', function() {
    for (let i = 0; i < defaultListArray.length; i++) {
      cy.get('@circles').should(($el) => {
        expect($el[i]).to.have.text(defaultListArray[i]);
        expect($el[i]).to.have.css('border', defaultColorBorder);
      });
    }
    cy.get('@head').should('have.text', 'head');
    cy.get('@tail').should('have.text', 'tail');
  });

  it('Добавление элемента в head выполняется корректно', function() {
    cy.get('@inputValue').type(testListInputValue);
    cy.get('@addHead').should('be.not.disabled').click();
    cy.get(smallCircle).as('smallCircle');
    cy.get('@smallCircle')
      .should('have.text', testListInputValue)
      .and('have.css', 'border', chagingColorBorder);
    cy.get('@circles').eq(0).should('have.text', testListInputValue);
    cy.get('@circles').should(async($el) => {
      expect($el[0]).to.have.css('border', modifiedColorBorder);
      await timeDelay(DELAY_IN_MS);
      expect($el[0]).to.have.css('border', defaultColorBorder);
    });
    cy.get('@head').eq(0).should('have.text', 'head');
    cy.get('@circles').should('have.length', defaultListArray.length + 1);
  });

  it('Добавление элемента в tail выполняется корректно', function() {
    cy.get('@inputValue').type(testListInputValue);
    cy.get('@addTail').should('be.not.disabled').click();
    cy.get(smallCircle).as('smallCircle');
    cy.get('@smallCircle')
      .should('have.text', testListInputValue)
      .and('have.css', 'border', chagingColorBorder);
    cy.get('@circles').eq(defaultListArray.length - 1).should('have.text', testListInputValue);
    cy.get('@circles').should(async($el) => {
      expect($el[defaultListArray.length]).to.have.css('border', modifiedColorBorder);
      await timeDelay(DELAY_IN_MS);
      expect($el[defaultListArray.length]).to.have.css('border', defaultColorBorder);
    });
    cy.get('@tail').eq(defaultListArray.length).should('have.text', 'tail');
    cy.get('@circles').should('have.length', defaultListArray.length + 1);
  });

  it('Добавление элемента по индексу выполняется корректно', function() {
    cy.get('@inputValue').type(testListInputValue);
    cy.get('@inputIndex').type(testListIndex);
    cy.get('@addByIndex').should('be.not.disabled').click();
    cy.get(smallCircle).as('smallCircle');
    cy.get('@smallCircle')
      .should('have.text', testListInputValue)
      .and('have.css', 'border', chagingColorBorder);
    for (let i = 0; i <= testListIndex; i++) {
      cy.get('@circles')
        .eq(testListIndex)
        .should('have.css', 'border', chagingColorBorder);
    }
    cy.get('@circles')
      .eq(testListIndex)
      .should('have.css', 'border', modifiedColorBorder)
      .and('have.text', testListInputValue);
    cy.get('@circles').should('have.length', defaultListArray.length + 1);
  });

  it('Удаление элемента из head выполняется корректно', function() {
    cy.get('@delHead').should('be.not.disabled').click();
    cy.get('@circles').eq(0).should('have.text', '');
    cy.get(smallCircle).as('smallCircle');
    cy.get('@smallCircle')
      .should('have.text', defaultListArray[0])
      .and('have.css', 'border', chagingColorBorder);
    cy.get('@head').eq(0).should('have.text', 'head');
    cy.get('@circles').should('have.length', defaultListArray.length - 1);
  });

  it('Удаление элемента из tail выполняется корректно', function() {
    cy.get('@delTail').should('be.not.disabled').click();
    cy.get('@circles').eq(defaultListArray.length - 1).should('have.text', '');
    cy.get(smallCircle).as('smallCircle');
    cy.get('@smallCircle')
      .should('have.text', defaultListArray[defaultListArray.length - 1])
      .and('have.css', 'border', chagingColorBorder);
    cy.get('@tail').eq(defaultListArray.length - 2).should('have.text', 'tail');
    cy.get('@circles').should('have.length', defaultListArray.length - 1);
  });

  it('Удаление элемента по индексу выполняется корректно', function() {
    cy.get('@inputIndex').type(testListIndex);
    cy.get('@delByIndex').should('be.not.disabled').click();
    cy.get('@circles').should('have.css', 'border', chagingColorBorder);
    cy.get('@circles').should('have.not.text');
    cy.get(smallCircle).as('smallCircle');
    cy.get('@smallCircle')
      .should('have.text', defaultListArray[testListIndex])
      .and('have.css', 'border', chagingColorBorder);
    cy.get('@circles').should('have.length', defaultListArray.length - 1);
  });
});
