
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
     * @param {string} productName name of the product
     * @returns {ElementFinder} element
     */
    this.getProductInTable = function(productName){
        
        return element.all(by.cssContainingText('td.mat-cell', productName));
    }


};
module.exports = new ProductsPage();