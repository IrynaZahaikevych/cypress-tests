// import { loginAsGuest } from './helpers/login.cy.js';

// describe('Footer social links', () => {
//   beforeEach(() => {
//     loginAsGuest();
//   });

//   it('should verify all social media links in footer', () => {
//     cy.get('.contacts_socials').scrollIntoView().should('be.visible');

//     cy.get('.icon-facebook')
//       .parent('a')
//       .should('be.visible')
//       .and('have.attr', 'href', 'https://www.facebook.com/Hillel.IT.School');

//     cy.get('.icon-telegram')
//       .parent('a')
//       .should('be.visible')
//       .and('have.attr', 'href', 'https://t.me/ithillel_kyiv');

//     cy.get('.icon-youtube')
//       .parent('a')
//       .should('be.visible')
//       .and('have.attr', 'href', 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1');

//     cy.get('.icon-instagram')
//       .parent('a')
//       .should('be.visible')
//       .and('have.attr', 'href', 'https://www.instagram.com/hillel_itschool/');

//     cy.get('.icon-linkedin')
//       .parent('a')
//       .should('be.visible')
//       .and('have.attr', 'href', 'https://www.linkedin.com/school/ithillel/');

//     // Checking logo and email links in the footer
//     cy.contains('a', 'ithillel.ua')
//       .scrollIntoView()
//       .should('be.visible')
//       .and('have.attr', 'href', 'https://ithillel.ua');

//     cy.contains('a', 'support@ithillel.ua')
//       .should('be.visible')
//       .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
//   });
// });

import { loginAsGuest } from './helpers/login.cy.js';

describe('Footer social links', () => {
  const socialLinks = [
    { icon: '.icon-facebook', url: 'https://www.facebook.com/Hillel.IT.School' },
    { icon: '.icon-telegram', url: 'https://t.me/ithillel_kyiv' },
    {
      icon: '.icon-youtube',
      url: 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
    },
    { icon: '.icon-instagram', url: 'https://www.instagram.com/hillel_itschool/' },
    { icon: '.icon-linkedin', url: 'https://www.linkedin.com/school/ithillel/' },
  ];

  beforeEach(() => {
    loginAsGuest();
  });

  it('should verify all social media links, logo and email in footer', () => {
    cy.get('.contacts_socials').scrollIntoView().should('be.visible');

    socialLinks.forEach((link) => {
      cy.get(link.icon).closest('a').should('be.visible').and('have.attr', 'href', link.url);
    });

    cy.contains('a', 'ithillel.ua')
      .should('be.visible')
      .and('have.attr', 'href', 'https://ithillel.ua');

    cy.contains('a', 'support@ithillel.ua')
      .should('be.visible')
      .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
  });
});
