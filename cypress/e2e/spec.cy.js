describe('main functionality', () => {
  it('Searches for a city', () => {
    cy.visit('http://localhost:5173');

    // Search for Cartagena and add to favorites
    cy.get('[data-testid="search-field"]').type('Cartagena{enter}');
    cy.get('[data-testid="title"]').should('have.text', 'Cartagena (CO) ');
    cy.get('[data-testid="favorite-button"]').click();

    // Search for London and add to favorites
    cy.get('[data-testid="search-field"]').clear().type('London{enter}');
    cy.get('[data-testid="title"]').should('have.text', 'London (GB) ');
    cy.get('[data-testid="favorite-button"]').click();

    // Go to the "favorites" page
    cy.get('[data-testid="favorites-link"]').click();

    // Click on Cartagena (It must exist to be clicked)
    cy.get('[data-testid="favorite-link-Cartagena"]').click();
    cy.get('[data-testid="title"]').should('have.text', 'Cartagena (CO) ');

    // Clicks London from the search history list
    cy.get('[data-testid="search-field"]').click();
    cy.get('[data-testid="history-item-London"]').click();
    cy.get('[data-testid="title"]').should('have.text', 'London (GB) ');

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
    cy.get('[data-testid="search-field"]').type('Cartagena{enter}');
    cy.wait('@getWeatherData').its('request.url').should('include', 'imperial');

    // Changes to metric
    cy.get('[data-testid="units-button"]').click();

    // Creates a new interception for the weather API URL
    cy.intercept('https://api.openweathermap.org/data/2.5/weather*').as(
      'getWeatherData2',
    );

    // Search for city and asserts that the URL should include "metric"
    cy.get('[data-testid="search-field"]').type('{enter}');
    cy.wait('@getWeatherData2').its('request.url').should('include', 'metric');
  });
});
