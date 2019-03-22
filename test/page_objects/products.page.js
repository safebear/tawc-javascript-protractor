
/**
 * Page object for CRUD homepage.
 * @constructor
 */
var ProductsPage = function(){

    this.url = "products";

    /**
     * Add product button
     */
    this.addProduct = $('a.mat-flat-button.mat-primary');

    /**
     * Used to create the locator for the Product element (we don't know what our product name will be)
     * @param {object} product
     * @returns {ElementFinder} element
     */
    this.getProductInTable = function(product){
        return element.all(by.cssContainingText('td.mat-cell', product.name));
    }


};
module.exports = new ProductsPage();