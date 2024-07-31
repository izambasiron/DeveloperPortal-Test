function generateContributionDays(startDate, endDate, count) {
    const contributionDays = [];
    while (contributionDays.length < count) {
        const day = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        contributionDays.push(day);
    }
    return contributionDays.sort((a, b) => a - b);
}

function generateDataActionGetContributions() {
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const endDate = new Date();
    const bracketValues = [2, 3, 4, 5];
    const contributionDays = generateContributionDays(startDate, endDate, 300);

    const contributions = contributionDays.map(day => {
        const count = bracketValues[Math.floor(Math.random() * bracketValues.length)];
        return {
            "PublishedDate": day.toISOString().split('T')[0],
            "Count": count,
            "Bracket": count
        };
    });

    return {
        "versionInfo": {
            "hasModuleVersionChanged": false,
            "hasApiVersionChanged": false
        },
        "data": {
            "Contributions": {
                "List": contributions
            },
            "StartDayOfWeek": 0,
            "Count": contributions.reduce((acc, curr) => acc + curr.Count, 0).toString()
        }
    };
}

function replaceDataActionGetActivities(data) {
    const today = new Date();
    const dates = [0, 1].map(daysAgo => {
        const date = new Date(today);
        date.setDate(today.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
    });

    data.data.PublishActivitiesDays.List.forEach((activityDay, index) => {
        const newDate = dates[index];
        activityDay.Date = newDate;
        activityDay.PublishActivities.List.forEach(publishActivity => {
            publishActivity.PublishDate = newDate;
        });
    });

    return data;
}

const dataDataActionGetActivities = {
    "versionInfo": {
        "hasModuleVersionChanged": false,
        "hasApiVersionChanged": false
    },
    "data": {
        "PublishActivitiesDays": {
            "List": [
                {
                    "Date": "2024-07-29",
                    "PublishActivities": {
                        "List": [
                            {
                                "PublishDate": "2024-07-29",
                                "EspaceId": 210,
                                "EspaceName": "DeveloperPortal",
                                "Count": "1"
                            },
                            {
                                "PublishDate": "2024-07-29",
                                "EspaceId": 208,
                                "EspaceName": "Drawflow",
                                "Count": "2"
                            },
                            {
                                "PublishDate": "2024-07-29",
                                "EspaceId": 209,
                                "EspaceName": "TreeselectJS",
                                "Count": "1"
                            },
                            {
                                "PublishDate": "2024-07-29",
                                "EspaceId": 204,
                                "EspaceName": "HealthIconsDemo",
                                "Count": "17"
                            },
                            {
                                "PublishDate": "2024-07-29",
                                "EspaceId": 210,
                                "EspaceName": "Datatable(deleted0)",
                                "Count": "9"
                            },
                            {
                                "PublishDate": "2024-07-29",
                                "EspaceId": 204,
                                "EspaceName": "BackgroundLocationPlugin",
                                "Count": "6"
                            }
                        ]
                    }
                },
                {
                    "Date": "2024-07-28",
                    "PublishActivities": {
                        "List": [
                            {
                                "PublishDate": "2024-07-28",
                                "EspaceId": 210,
                                "EspaceName": "DeveloperPortal",
                                "Count": "97"
                            }
                        ]
                    }
                }
            ]
        }
    }
};



describe('Profile', { testIsolation: false }, () => {
    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearCurrentSessionData)

        cy.intercept(`${Cypress.env('APP_DIR')}/screenservices/DeveloperPortal/MainFlow/Profile/DataActionGetContributions`,
            {
                statusCode: 200,
                body: generateDataActionGetContributions()
            }).as('DataActionGetContributions')

        cy.intercept(`${Cypress.env('APP_DIR')}/screenservices/DeveloperPortal/MainFlow/Profile/DataActionGetUser`,
            {
                fixture: 'DataActionGetUser.json'
            }).as('DataActionGetUser')

        cy.intercept(`${Cypress.env('APP_DIR')}/screenservices/DeveloperPortal/MainFlow/ActivityWeek/DataActionGetActivities`,
            {
                statusCode: 200,
                body: replaceDataActionGetActivities(dataDataActionGetActivities)
            }).as('DataActionGetActivities')
    })

    it('should login', () => {
        cy.visit('/Dashboard')
        cy.get('input[type="text"].input.Mandatory', { timeout: 60000 }).type(Cypress.env('USERNAME'))
        cy.get('input[type="password"].input').type(Cypress.env('PASSWORD'))
        cy.get('input[type="submit"].btn').click()
        cy.get('.font-size-h1', { timeout: 60000 }).should('contain', 'Home')
        cy.visit('/Profile')
        cy.get('.font-size-h1 > span', { timeout: 60000 }).should('contain', 'John Doe')
        cy.wait(5000)
        cy.screenshot('profile', { capture: 'fullPage', overwrite: false })
    })
})