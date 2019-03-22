/**
 * Page Object for the 'view product' page
 * @constructor
 */
var ViewProductPage = function(){

    this.url = "product-details";

    /**
     * Used to create the locator for the Product element (we don't know what our product name will be)
     * @param {object} product
     * @returns {ElementFinder} element
     */
    this.productName = function(product){
        return element(by.cssContainingText('h2', product.name));
    }

    this.returnToProductsPageButton = $("div.button-row a.mat-flat-button.mat-primary");

    this.deleteButton = $("mat-card-actions a.mat-flat-button.mat-warn");


};
module.exports = new ViewProductPage();
