import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Проверка стека', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/queue');
    cy.get('input[data-testid=inputValue]').as('inputValue');
    cy.get('button[data-testid=addButton]').as('addButton');
    cy.get('button[data-testid=delButton]').as('delButton');
    cy.get('button[data-testid=clearButton]').as('clearButton');
  });

  it('Кнопка добавления не активна при пустом инпуте', function() {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@addButton').should('be.disabled');
  });

  it('Элемент добавляется в очередь корректно', function() {
    const queueArray = [0,1,2,3,4,5,6];
    cy.get('div[data-testid=circles]').as('circles');
    cy.get('div[data-testid=head]').as('head');
    cy.get('div[data-testid=tail]').as('tail');
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
        expect($el[i]).to.have.css('border','4px solid rgb(210, 82, 225)');
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        expect($el[i]).to.have.css('border','4px solid rgb(0, 50, 255)');
      });
      cy.get('@tail').should('have.text', 'tail');
    }
  });

  it('Элемент удаляется из очереди корректно', function() {
    const queueArray = [0,1,2,3,4,5,6];
    cy.get('div[data-testid=circles]').as('circles');
    cy.get('div[data-testid=head]').as('head');
    for (let i = 0; i < queueArray.length; i++) {
      cy.get('@inputValue').type(queueArray[i]);
      cy.get('@addButton').should('be.not.disabled').click();
    }
    cy.get('@head').should('have.text', 'head');
    cy.get('@delButton').should('be.not.disabled').click();
    cy.get('@circles').should(async($el) => {
      expect($el[0]).to.have.css('border','4px solid rgb(210, 82, 225)');
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      expect($el[0]).to.have.css('border','4px solid rgb(0, 50, 255)');
      expect($el[0]).to.have.text('');
    });
    cy.get('@head').eq(0).should('not.have.text');
    cy.get('@head').eq(1).should('have.text', 'head');
  });

  it('Очистка очереди выполняется корректно после нажатия кнопки "Очистить"', function() {
    const queueArray = [0,1,2,3,4,5,6];
    cy.get('div[data-testid=circles]').as('circles');
    cy.get('div[data-testid=head]').as('head');
    cy.get('div[data-testid=tail]').as('tail');
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
