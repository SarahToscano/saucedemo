# End-to-End Testing with Cypress
This project contains an End-to-End (E2E) test suite using the **Cypress** framework.

## 📌 Prerequisites
Before running the tests, make sure the machine is set up with the following requirements:

- **Node.js** (version 16 or later) installed.
- **Google Chrome browser** updated.
- **npm package manager** (included with Node.js).

## 🚀 Setup Steps

### 1️⃣ Clone the Repository
If you don’t have the project on your machine yet, clone the repository and access the project folder:
```bash
  git clone https://github.com/SarahToscano/saucedemo.git
  cd saucedemo
```
### 2️⃣ Install Dependencies
To install the project dependencies, run:
```bash
  npm install cypress --save-dev
```
> This will install all necessary libraries and tools to run the tests.

### 3️⃣ Modify the browser path in Cypress Config
Edit the file cypress.config.js and custom the path variable (line 15) according to the currently browser path on your machine:

Example:
`path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'`

> The default browser used on this project it is the Google Chrome at this location:
`path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'`

### 4️⃣ Run the Tests

#### 🔹 Run Tests in Headless Mode
If you want to run the tests without opening the graphical interface:
```bash
  npx cypress run --headed --browser chrome
```
This will execute all tests in Chrome in an automated manner.

### 5️⃣ Project Structure
```
/cypress
  ├── /fixtures       # Test data
  ├── /e2e            # Automated tests
  ├── /support        # Custom commands
  ├──── /elements      # Page elements
  ├──── /pageObjects    # Page Objects for test organization
  ├── cypress.config.js  # Cypress configuration
```
## 🛠 Troubleshooting
If you encounter issues running the tests, try the solutions below:

1. **Missing dependencies error:** Run `npm install` again.
2. **Cypress does not open:** Ensure Chrome is installed and updated.
3. **Permission issues:** Run commands as an administrator.