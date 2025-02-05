# 📌 Report Summary

## **Assumptions Made:**
- The credentials provided in the UI are valid and should work for login/logout unless the user is explicitly locked.
- The shopping cart allows a maximum of six items at a time.
- Error messages returned by the system should match expected strings exactly as specified in the test cases.
- The cart functionality should maintain state between actions like adding, removing, and checking out items.
- Filtering inventory by price/alphabetic should correctly reorder the items as per the selected filter.
- Checkout processes should validate all required fields and prevent proceeding with incomplete information.
- Logout should successfully return the user to the login page and clear session data.
- The checkout form does not have any type of data validation.

## **Challenges Faced:**
### **1. User-Specific Issues:**
- Users with known issues (`problem_user`, `error_user`, `visual_user`) were not used in checkout tests due to their limitations, such as performance problems, rendering issues, or other inconsistencies.
- Despite their checkout-related challenges, these users successfully completed login and logout tests without errors.

### **2. Performance Issues with UI Interactions:**
- Some tests, especially those related to adding and removing items, took longer than expected even with the standard user.

### **3. Ensuring Sorting Consistency:**
- Checking if the sort order remained intact after applying filters required additional assertions.

### **4. Security Testing:**
- Testing XSS and regex required additional sanitization checks beyond standard input validation.

## **Potential Improvements:**
### **1. Enhance Performance Validation:**
- Measure time taken for UI actions and identify potential bottlenecks.

### **2. Improve Logging and Error Capturing:**
- Capture screenshots and logs for failed cases to diagnose issues efficiently.

### **3. Validate Cart Persistence Across Sessions:**
- Ensure the cart content remains consistent after logging out and logging back in.

### **4. Perform Checkout with Limited Users:**
- Due to known issues with specific user accounts (`problem_user`, `error_user`, `visual_user`), these users were not utilized in checkout-related tests to avoid performance problems, page rendering issues, or unexpected limitations. Checkout tests using these users could be a potential improvement.

---

## 🚀 **Test Strategies**

### **Test Strategy for Login**
The test strategy for the login functionality focused on validating different authentication scenarios to ensure system security and reliability. The approach included:

- **Standard Login Tests** – Verified that predefined users with default credentials could successfully log in.
- **Negative Login Scenarios** – Tested login with a locked-out user to ensure proper access restrictions.
- **Security and Edge Case Testing** – Assessed login robustness by attempting:
  - Invalid username and password combinations.
  - Cross-site scripting (XSS) attempts in the username field.
  - Regex patterns in the username field.
  - Special characters in both username and password fields.
  - Blank username and/or password to validate required field handling.

### **Test Strategy for Shopping Cart**
The test strategy for the shopping cart functionality focused on validating item addition, removal, and sorting mechanisms. The approach included:

- **Adding Items to the Cart** – Verified that all six available products could be successfully added to the cart, displayed correctly, and proceeded to checkout.
- **Adding and Removing Items** – Ensured that users could add multiple products, remove selected items, and verify the correct count in the cart.
- **Sorting Functionality** – Assessed inventory sorting by:
  - **Low-to-High Price (lohi)** – Checked if items were ordered correctly based on increasing price.
  - **High-to-Low Price (hilo)** – Verified if the inventory was sorted in descending price order.

### **Test Strategy for Checkout**
The test strategy for the checkout functionality focused on validating the end-to-end purchase process, ensuring seamless item management, data persistence, and error handling. The approach included:

- **Complete Checkout Flow** – Verified the ability to add and remove items, sort inventory, proceed through checkout, and successfully finalize the purchase, followed by logout.
- **Checkout Process with Form Modification** – Validate the checkout process by filling the checkout form, canceling before submission, modifying the form data, and successfully completing the purchase.
- **Form Data Validation** – Tested different scenarios, including modifying checkout form details before final submission and verifying data persistence across navigation.
- **Field Validation and Error Handling** – Ensured proper error messages were displayed when attempting to submit checkout forms with missing required fields (e.g., name, last name, postal code).

### **Test Strategy for Logout**
Validate the logout functionality using different user profiles to ensure proper session termination and redirection to the login page.

- **Default Users to Logout Tests** – Verified that predefined users with default credentials could successfully logout.
- **Session Clearance** – Ensured that logging out successfully returned the user to the login page and cleared session data.
- **Navigation and Redirection** – Checked if the logout process worked consistently across different user scenarios.

---

## 📊 Test Metrics by Specification
| Specification | Passed ✅ | Failed ❌ | Skipped ⚠️| Total|
|--------------|------------|------------|------------|------|
| Login        | 12         | 0          | 0          | 12   |
| Catalog      | 4          | 0          | 0          | 4    |
| Checkout     | 5          | 0          | 0          | 5    |
| Logout       | 4          | 0          | 0          | 4    |


## 📌 **Conclusion**
The testing strategies applied ensured a robust validation of the login, shopping cart, checkout, and logout functionalities. By addressing challenges and implementing potential improvements, the test plan aims to enhance reliability, performance, and security across all core functionalities of the application.
