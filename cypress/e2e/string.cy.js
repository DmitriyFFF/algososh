import { DELAY_IN_MS } from '../../src/constants/delays'
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
    cy.get('[data-testid="circles"]').as('circles');

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
    })
    // cy.get('@circles').should(($item) => {
    //   expect($item.eq[0].should('have.text', 's').and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[1].should('have.text', 't').and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[2].should('have.text', 'r').and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[3].should('have.text', 'i').and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[4].should('have.text', 'n').and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[5].should('have.text', 'g').and.css('border', '4px solid #0032ff'));
    // })
    // cy.tick(1000)
    // cy.get('@circles').should(($item) => {
    //   expect($item.eq[0].to.have.text("s").and.css('border', '4px solid #d252e1'));
    //   expect($item.eq[1].to.have.text("t").and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[2].to.have.text("r").and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[3].to.have.text("i").and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[4].to.have.text("n").and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[5].to.have.text("g").and.css('border', '4px solid #d252e1'));
    // })
    // cy.tick(1000)
    // cy.get('@circles').should(($item) => {
    //   expect($item.eq[0].to.have.text("g").and.css('border', '4px solid #7fe051'));
    //   expect($item.eq[1].to.have.text("t").and.css('border', '4px solid #d252e1'));
    //   expect($item.eq[2].to.have.text("r").and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[3].to.have.text("i").and.css('border', '4px solid #0032ff'));
    //   expect($item.eq[4].to.have.text("n").and.css('border', '4px solid #d252e1'));
    //   expect($item.eq[5].to.have.text("s").and.css('border', '4px solid #7fe051'));
    // })

    // cy.clock();
    // cy.get('div[data-testid=circles]').should('have.length', string.length)
  });
})
