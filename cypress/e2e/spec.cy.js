describe('main functionality', () => {
  it('Searches for a city', () => {
    cy.visit('http://localhost:5173');

    // Search for Cartagena and add to favorites
    cy.get('[data-testid="search-field"]').type('Cartagena');
    cy.get('[data-testid="cities-result-0"]').click();
    cy.get('[data-testid="title"]').should('have.text', 'Cartagena (CO) ');
    cy.get('[data-testid="favorite-button"]').click();

    // Search for London and add to favorites
    cy.get('[data-testid="search-field"]').clear().type('London');
    cy.get('[data-testid="cities-result-0"]').click();
    cy.get('[data-testid="title"]').should('have.text', 'London (GB) ');
    cy.get('[data-testid="favorite-button"]').click();

    // Go to the "favorites" page
    cy.get('[data-testid="favorites-link"]').click();

    // Click on Cartagena (It must exist to be clicked)
    cy.get('[data-testid="favorite-item-Cartagena"]').click();
    cy.get('[data-testid="title"]').should('have.text', 'Cartagena (CO) ');

    // Removes London from the "favorites" list
    cy.get('[data-testid="favorite-button"]').click();

    // Asserts that London is no longer a favorite city
    cy.get('[data-testid="favorites-link"]').click();
    cy.get('[data-testid="history-item-London"]').should('not.exist');
  });

  it('Changes from the imperial to the metric system', () => {
    cy.visit('http://localhost:5173');

    // Creates an interception for the weather API URL
    cy.intercept('https://api.openweathermap.org/data/2.5/weather*').as(
      'getWeatherData',
    );

    // Search for city and asserts that the URL should include "imperial"
    cy.get('[data-testid="search-field"]').type('Cartagena');
    cy.get('[data-testid="cities-result-0"]').click();
    cy.wait('@getWeatherData').its('request.url').should('include', 'imperial');

    // Creates a new interception for the weather API URL
    cy.intercept('https://api.openweathermap.org/data/2.5/weather*').as(
      'getWeatherData2',
    );

    // Changes to metric
    cy.get('[data-testid="units-button"]').click();
    cy.wait('@getWeatherData2').its('request.url').should('include', 'metric');
  });
});
