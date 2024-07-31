function generateDataActionGetDevelopers() {
    const usernames = ["user1@example.com", "user2@example.com", "user3@example.com", "user4@example.com", "user5@example.com"];
    const moduleNames = ["ModuleA", "ModuleB", "ModuleC", "ModuleD", "ModuleE"];

    // Define specific datetime intervals
    const now = new Date();
    const timeIntervals = [
        new Date(now - 1 * 60 * 60 * 1000), // now - 1 hour
        new Date(now - 8 * 60 * 60 * 1000), // now - 8 hours
        new Date(now - 24 * 60 * 60 * 1000), // now - 24 hours
        new Date(now - 48 * 60 * 60 * 1000), // now - 48 hours
        new Date(now - 64 * 60 * 60 * 1000) // now - 64 hours
    ];

    // Sort the intervals in descending order
    timeIntervals.sort((a, b) => b - a);

    // Generate 5 users with the specific datetime intervals
    const users = timeIntervals.map((interval, index) => ({
        "Username": usernames[index],
        "ModuleName": moduleNames[index],
        "LastLoginDateTime": interval.toISOString(),
        "UploadedDateTime": interval.toISOString(),
        "IsActive": true
    }));

    // Create the final JSON structure
    return {
        "versionInfo": {
            "hasModuleVersionChanged": false,
            "hasApiVersionChanged": false
        },
        "data": {
            "Developers": {
                "List": users
            },
            "Count": users.length + 1
        }
    };
}

function generateDataActionLatestChanges() {
    const usernames = ["user1@example.com"];
    const moduleNames = [
        "ModuleA",
        "DeveloperPortal",
        "Drawflow",
        "TreeselectJS"
    ];
    const moduleIds = [210, 204, 208, 209];
    const userId = 9;

    // Generate specific datetime intervals within the last 24 hours
    const now = new Date();
    const timeIntervals = Array.from({ length: 4 }, () => {
        return new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
    });

    // Sort the intervals in descending order
    timeIntervals.sort((a, b) => b - a);

    // Generate changes with the specific datetime intervals
    const changes = timeIntervals.map((interval, index) => ({
        "ModuleName": moduleNames[index],
        "ModuleId": moduleIds[index],
        "UploadedDate": interval.toISOString(),
        "UserId": userId,
        "Username": usernames[0]
    }));

    // Create the final JSON structure
    return {
        "versionInfo": {
            "hasModuleVersionChanged": false,
            "hasApiVersionChanged": false
        },
        "data": {
            "Changes": {
                "List": changes
            }
        }
    };
}

describe('Dashboard', { testIsolation: false }, () => {
    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearCurrentSessionData)

        cy.intercept(`${Cypress.env('APP_DIR')}/screenservices/DeveloperPortal/MainFlow/Dashboard/DataActionGetDevelopers`,
            {
                statusCode: 200,
                body: generateDataActionGetDevelopers()
            }).as('DataActionGetDevelopers')

        cy.intercept(`${Cypress.env('APP_DIR')}/screenservices/DeveloperPortal/MainFlow/Dashboard/DataActionLatestChanges`,
            {
                statusCode: 200,
                body: generateDataActionLatestChanges()
            }).as('DataActionLatestChanges')
    })

    it('should login', () => {
        cy.visit('/Dashboard')
        cy.get('input[type="text"].input.Mandatory', { timeout: 60000 }).type(Cypress.env('USERNAME'))
        cy.get('input[type="password"].input').type(Cypress.env('PASSWORD'))
        cy.get('input[type="submit"].btn').click()
        cy.get('.font-size-h1', { timeout: 60000 }).should('contain', 'Home')
        cy.wait(5000)
        cy.screenshot('dashboard', { capture: 'fullPage', overwrite: false })
    })
})