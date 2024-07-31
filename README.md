# Developer Portal Tests

This project contains Cypress tests for the Developer Portal.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd developer-portal-tests
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To run the Cypress tests, you can use the following scripts.

## Scripts

- `cy:open`: Opens the Cypress Test Runner.
    ```sh
    npm run cy:open
    ```
- `cy:windows:open`: Opens the Cypress Test Runner with environment variables from `.env` file.
    ```sh
    npm run cy:env:open
    ```

## Environment Variables

1. Rename `.env.example` to `.env`.
2. Open the `.env` file and set the following variables:
    - `BASE_URL`: The URL of the Developer Portal you want to test.
    - `CYPRESS_APP_DIR`: The directory where the Developer Portal is located.
    - `CYPRESS_USERNAME`: The username for the test account.
    - `CYPRESS_PASSWORD`: The password for the test account.

### Security Best Practices

- **Use a dedicated automated test account**: Ensure that the username and password used for testing belong to a dedicated test account with limited permissions. This account should not have access to sensitive data or administrative functions.
- **Do not commit `.env` files to version control**: Add `.env` to your `.gitignore` file to prevent it from being committed to your repository.
- **Rotate credentials regularly**: Change the test account credentials periodically to minimize the risk of unauthorized access.
