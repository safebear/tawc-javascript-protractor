/**
 * Page Object for the 'view product' page
 * @constructor
 */
var ViewProductPage = function(){

    this.url = "product-details";

    /**
     * Used to create the locator for the Product element (we don't know what our product name will be)
     * @param {string} product name
     * @returns {ElementFinder} element
     */
    this.productName = function(productName){

        return element(by.cssContainingText('h2', productName));
    }

    /**
     * Used to create the locator for the Product element (we don't know what our product description will be)
     * @param {string} product description
     * @returns {ElementFinder} element
     */
    this.productDescription = function(productDescription){
        return element(by.cssContainingText('mat-card-subtitle', productDescription));
    }

    /**
     * Used to create the locator for the Product element (we don't know what our product price will be)
     * @param {string} product price
     * @returns {ElementFinder} element
     */
    this.productPrice = function(productPrice){
        return element(by.cssContainingText('dd', productPrice));
    }

    this.returnToProductsPageButton = $("div.button-row a.mat-flat-button.mat-primary");

    this.deleteButton = $("mat-card-actions a.mat-flat-button.mat-warn");


};
module.exports = new ViewProductPage();
