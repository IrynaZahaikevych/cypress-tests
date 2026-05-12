// import { loginAsGuest } from './helpers/login.cy.js';
// describe('Header queries', () => {
//   beforeEach(() => {
//     loginAsGuest();
//   });

//   it('should find all header buttons', () => {
//     // Checking logo visibility and attributes
//     cy.get('header .header_left svg')
//       .should('be.visible')
//       .and('have.attr', 'width', '135')
//       .and('have.attr', 'height', '30');

//     // Checking links and buttons in the header
//     cy.contains('a.header-link', 'Home').should('be.visible').and('have.attr', 'href', '/');

//     cy.contains('button.header-link', 'About')
//       .should('be.visible')
//       .and('have.attr', 'appscrollto', 'aboutSection');

//     cy.contains('button.header-link', 'Contacts')
//       .should('be.visible')
//       .and('have.attr', 'appscrollto', 'contactsSection');

//     cy.contains('button.header-link', 'Guest log in')
//       .should('be.visible')
//       .and('have.class', '-guest');

//     cy.get('button.header_signin')
//       .should('be.visible')
//       .and('contain', 'Sign In')
//       .and('have.class', 'btn-outline-white');
//   });
// });

import { loginAsGuest } from './helpers/login.cy.js';

describe('Header queries', () => {
  const navItems = [
    { type: 'a', text: 'Home', attr: 'href', value: '/' },
    { type: 'button', text: 'About', attr: 'appscrollto', value: 'aboutSection' },
    { type: 'button', text: 'Contacts', attr: 'appscrollto', value: 'contactsSection' },
  ];

  beforeEach(() => {
    loginAsGuest();
  });

  it('should find all header elements', () => {
    cy.get('header .header_left svg')
      .should('be.visible')
      .and('have.attr', 'width', '135')
      .and('have.attr', 'height', '30');

    navItems.forEach((item) => {
      cy.contains(`${item.type}.header-link`, item.text)
        .should('be.visible')
        .and('have.attr', item.attr, item.value);
    });

    cy.contains('button.header-link', 'Guest log in')
      .should('be.visible')
      .and('have.class', '-guest');

    cy.get('button.header_signin')
      .should('be.visible')
      .and('contain', 'Sign In')
      .and('have.class', 'btn-outline-white');
  });
});
