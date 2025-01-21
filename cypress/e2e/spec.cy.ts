describe('Movie Search Application', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the base URL
  });

  it('should search for a movie and display its details', () => {
    // Mock the API response using the fixture
    cy.intercept('GET', 'https://www.omdbapi.com/*', {
      fixture: 'movies.json', // Use the fixture file
      delay: 1000, // Simulate a 1-second delay for the API response
    }).as('getMovies');

    // Check if the search bar is visible
    cy.get('input[placeholder="Search for movies..."]').should('be.visible');
    cy.get('button').contains('Search').should('be.visible');

    // Type a search term and submit the form
    cy.get('input[placeholder="Search for movies..."]').type(
      'The Shawshank Redemption'
    );
    cy.get('button').contains('Search').click();

    // Verify the loading spinner is displayed
    cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should(
      'be.visible'
    );

    // Wait for the API call to complete
    cy.wait('@getMovies');

    // Verify the loading spinner is removed
    cy.get('[data-testid="loading-spinner"]').should('not.exist');

    // Verify that the movie cards are rendered
    cy.get('.card').should('have.length.at.least', 1);

    // Check if the movie details are displayed correctly
    cy.contains('The Shawshank Redemption').should('be.visible');
    cy.contains('Year: 1994').should('be.visible');
    cy.contains('Type: movie').should('be.visible');

    // Verify the IMDB link
    cy.get('a')
      .contains('View on IMDB')
      .should('have.attr', 'href', 'https://www.imdb.com/title/tt0111161');
  });

  it('should handle empty search input', () => {
    // Ensure the search button is disabled when the input is empty
    cy.get('input[placeholder="Search for movies..."]').clear();
    cy.get('button').contains('Search').should('be.disabled');

    // Attempt to submit the form with an empty input
    cy.get('button').contains('Search').click({ force: true });

    // Verify no movies are displayed
    cy.get('.card').should('not.exist');
  });

  it('should display an error message when no movies are found', () => {
    // Mock an empty API response
    cy.intercept('GET', 'https://www.omdbapi.com/*', {
      statusCode: 200,
      body: {
        Response: 'False',
        Error: 'Movie not found!',
      },
      delay: 1000, // Simulate a 1-second delay for the API response
    }).as('getMovies');

    // Type a search term and submit the form
    cy.get('input[placeholder="Search for movies..."]').type('Invalid Movie');
    cy.get('button').contains('Search').click();

    // Verify the loading spinner is displayed
    cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should(
      'be.visible'
    );

    // Wait for the API call to complete
    cy.wait('@getMovies');

    // Verify the loading spinner is removed
    cy.get('[data-testid="loading-spinner"]').should('not.exist');

    // Check if the error message is displayed
    cy.get('.alert-error').should('be.visible');
    cy.contains('Movie not found!').should('be.visible');

    // Verify no movies are displayed
    cy.get('.card').should('not.exist');
  });
});
