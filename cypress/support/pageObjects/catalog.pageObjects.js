import { CATALOG_ELEMENTS } from '../elements/catalog.elements';

class CatalogApplication {

  performActionOnItems(action, selectorGroup, items) {
    items = Array.isArray(items) ? items : [items];
    cy.log(`${action} items: ${items.join(', ')}`);

    items.forEach((item) => {
      if (selectorGroup[item]) {
        cy.get(selectorGroup[item]).should('be.visible').click();
      } else {
        cy.log(`The item ${item} was not found.`);
      }
    });
  }

  addItems(items) {
    this.performActionOnItems('Adding', CATALOG_ELEMENTS.items, items);
  }

  removeItems(items) {
    this.performActionOnItems('Removing', CATALOG_ELEMENTS.removeItems, items);
  }

  applyFilter(filterValue) {
    cy.get(CATALOG_ELEMENTS.filter).select(filterValue);
  }

  proceedToCart() {
    cy.get(CATALOG_ELEMENTS.cart).click();
    cy.url().should('include', '/cart.html');
  }

  assertInventoryLoad() {
    cy.url().should('include', '/inventory.html');
  }

  proceedToCheckout() {
    cy.get(CATALOG_ELEMENTS.checkout).click();
    cy.url().should('include', '/checkout-step-one.html');
  }

  assertItemsInCart(...items) {
    cy.get('.cart_list', { timeout: 6000 }).should('be.visible');

    items.forEach((item) => {
      if (CATALOG_ELEMENTS.items[item]) {
        cy.get('.inventory_item_name')
          .contains(new RegExp(item.replace(/_/g, ' '), 'i'))
          .should('exist');
      } else {
        cy.log(`Error: Item ${item} not found in shopping cart.`);
      }
    });
  }

  assertPriceOrder(orderType) {
    let previousPrice = orderType === 'lohi' ? 0 : Number.MAX_VALUE;
    cy.get(CATALOG_ELEMENTS.sortDropdown).select(orderType);
    cy.get(CATALOG_ELEMENTS.inventoryItems)
      .each(($item) => {
        cy.wrap($item)
          .find(CATALOG_ELEMENTS.itemPrice)
          .should('exist')
          .invoke('text')
          .then((priceText) => {
            const currentPrice = parseFloat(priceText.replace('$', ''));
            if (previousPrice !== (orderType === 'lohi' ? 0 : Number.MAX_VALUE)) {
              if (orderType === 'lohi') {
                expect(currentPrice).to.be.at.least(previousPrice,
                  `Price $${currentPrice} should be greater than or equal to $${previousPrice}`);
              } else {
                expect(currentPrice).to.be.at.most(previousPrice,
                  `Price $${currentPrice} should be less than or equal to $${previousPrice}`);
              }
            }
            previousPrice = currentPrice;
          });
      });
  }

}

export default new CatalogApplication();
