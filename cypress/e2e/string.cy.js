import { DELAY_IN_MS } from '../../src/constants/delays';
import { timeDelay } from "../../src/utils/constants";
import {
  testString,
  dataSubmitBtn,
  dataInputValue,
  dataCircles,
  chagingColorBorder,
  modifiedColorBorder
} from '../constants/constants';

describe('Проверка строки', function() {
  beforeEach(function() {
    cy.visit('recursion');
    cy.get(dataInputValue).as('inputValue');
    cy.get(dataSubmitBtn).as('submitButton');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@submitButton').should('be.disabled');
  });

  it('Строка разворачивается корректно', function() {
    cy.get('@inputValue').type(testString);
    cy.get('@inputValue').should('have.value', testString);
    cy.get('@submitButton').should('be.not.disabled').click();
    cy.get(dataCircles).as('circles');

    cy.get('@circles').should(async($el) => {
      await timeDelay(DELAY_IN_MS);
      expect($el[0]).to.have.css('border', chagingColorBorder);
      expect($el[5]).to.have.css('border', chagingColorBorder);
      await timeDelay(DELAY_IN_MS);
      expect($el[0]).to.have.text(testString[5]);
      expect($el[5]).to.have.text(testString[0]);
      expect($el[0]).to.have.css('border', modifiedColorBorder);
      expect($el[5]).to.have.css('border', modifiedColorBorder);

      await timeDelay(DELAY_IN_MS);
      expect($el[1]).to.have.css('border', chagingColorBorder);
      expect($el[4]).to.have.css('border', chagingColorBorder);
      await timeDelay(DELAY_IN_MS);
      expect($el[1]).to.have.text(testString[4]);
      expect($el[4]).to.have.text(testString[1]);
      expect($el[1]).to.have.css('border', modifiedColorBorder);
      expect($el[4]).to.have.css('border', modifiedColorBorder);

      await timeDelay(DELAY_IN_MS);
      expect($el[2]).to.have.css('border', chagingColorBorder);
      expect($el[3]).to.have.css('border', chagingColorBorder);
      await timeDelay(DELAY_IN_MS);
      expect($el[2]).to.have.text(testString[3]);
      expect($el[3]).to.have.text(testString[2]);
      expect($el[2]).to.have.css('border', modifiedColorBorder);
      expect($el[3]).to.have.css('border', modifiedColorBorder);
    });
  });
});
