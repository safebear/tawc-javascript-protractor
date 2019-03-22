// Page Objects
const productsPage = require("../page_objects/products.page");
const addProductPage = require("../page_objects/add-product.page");
const viewProductPage = require("../page_objects/view-product.page");

// Actions and Checks
const actions = require("../support/actions");
const checks = require("../support/checks");

// Test Data
const using = require("jasmine-data-provider");
const products = require("../data/product-data.module.js");
const editProducts = require("../data/edit-product-data.module.js")

// Helper functions
async function deleteProducts(product){

  // Check for a product that's been created by the test data
  while(await checks.elementsArePresent(productsPage.getProductInTable(product.name))){

    await actions.clickOnFirstElementInList(productsPage.getProductInTable(product.name));

    expect(checks.getUrl()).toContain(viewProductPage.url);

    actions.clickOnElement(viewProductPage.deleteButton);

    expect(checks.getUrl()).toContain(productsPage.url);
  }

  // Check for a product that's been edited by the test data
  while(await checks.elementsArePresent(productsPage.getProductInTable(product.editName))){

    await actions.clickOnFirstElementInList(productsPage.getProductInTable(product.editName));

    expect(checks.getUrl()).toContain(viewProductPage.url);

    actions.clickOnElement(viewProductPage.deleteButton);

    expect(checks.getUrl()).toContain(productsPage.url);
  }

}

async function createProduct(product){

  while(!await checks.elementsArePresent(productsPage.getProductInTable(product.name))){

  
    expect(checks.getUrl()).toContain(productsPage.url);


    actions.clickOnElement(productsPage.addProduct);

    expect(checks.getUrl()).toContain(addProductPage.url);


    actions.typeText(addProductPage.productName, product.name);

    actions.typeText(addProductPage.productDescription, product.description);

    actions.typeText(addProductPage.productPrice, product.price);


    actions.clickOnElement(addProductPage.submitButton);


    expect(checks.getUrl()).toContain(viewProductPage.url);


    actions.clickOnElement(viewProductPage.returnToProductsPageButton);

    // ASSERT: We're returned to the `Products Page`.
    expect(checks.getUrl()).toContain(productsPage.url);

  }

}

using(editProducts.productEditInfo, function(product, description) {
  describe("createProductTests", function() {

    beforeEach( function(){

      actions.goToWebsite();

      // CPSU01
      // SETUP: Check whether the `Product` is present in the list, if it's there, delete it.
      deleteProducts(product);

    });

    afterEach(async function(){

      // CPTD01
      // TEARDOWN: Delete the `Product` that was created.
      // ASSERT: `Product` is no longer listed.
      deleteProducts(product);

    });

    it("should create a product called " + description, async function() {


      // ASSERT: `Product` isn't in list. 
      expect(await checks.elementsArePresent(productsPage.getProductInTable(product.name))).toBe(false);

      // CP01
      // Navigate to the `Products Page`
      // Already done.

      // ASSERT: We're on the `Products Page` of the Website
      expect(checks.getUrl()).toContain(productsPage.url);

      // CP02
      // Click on the `Add Product` button
      actions.clickOnElement(productsPage.addProduct);

      // ASSERT: We're on the `Add Product` page
      expect(checks.getUrl()).toContain(addProductPage.url);

      // CP03
      // Enter a `Name`, `Description` and `Price` for a Product (see `test-data.adoc` for Test Data)
      // `Product` details entered
      actions.typeText(addProductPage.productName, product.name);
      actions.typeText(addProductPage.productDescription, product.description);
      actions.typeText(addProductPage.productPrice, product.price);

      // CP04
      // Press the `Save` button.
      actions.clickOnElement(addProductPage.submitButton);

      // ASSERT: The `View` product page opens.
      expect(checks.getUrl()).toContain(viewProductPage.url);

      // ASSERT: The product details are correct (`name`, `description`, `price`).
      expect(await checks.elementsArePresent(viewProductPage.productName(product.name))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productDescription(product.description))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productPrice(product.price))).toBe(true);

      // CP05
      // Press the `Products Page` button.
      actions.clickOnElement(viewProductPage.returnToProductsPageButton);

      // ASSERT: We're returned to the `Products Page`.
      expect(checks.getUrl()).toContain(productsPage.url);

      // ASSERT: The new `Product` is listed.
      expect(await checks.elementsArePresent(productsPage.getProductInTable(product.name))).toBe(true);
      expect(await checks.elementsArePresent(productsPage.getProductInTable(product.price))).toBe(true);

    });
  });
});

using(editProducts.productEditInfo, function(products, description) {

  describe("readUpdateDeleteProductTests", function() {

    beforeEach(function() {
 
      actions.goToWebsite();

      // DPSU01
      // SETUP: Check whether the `Product` is listed, if it's not, create it.
      createProduct(products)
 
    });

    afterEach(function(){
      deleteProducts(products);
    })

    it("should delete a product" + description, async function() {

      // ASSERT: `Product` in list. 
      expect(await checks.elementsArePresent(productsPage.getProductInTable(products.name))).toBe(true);

      // DP01
      // Navigate to the `Products Page`
      // Done in the 'before' statement

      // ASSERT: We're on the `Products Page` of the Website
      expect(checks.getUrl()).toContain(productsPage.url);

      // DP02
      // Click on the `Product` name
      await actions.clickOnFirstElementInList(productsPage.getProductInTable(products.name));

      // ASSERT: We're on the `View Product` page
      expect(checks.getUrl()).toContain(viewProductPage.url);

      // DP03
      // Click on the `Delete Product` button
      actions.clickOnElement(viewProductPage.deleteButton);

      // ASSERT: We're returned to the `Products Page`
      expect(checks.getUrl()).toContain(productsPage.url);


      // ASSERT: The `Product` is no longer listed.
      expect(await checks.elementsArePresent(productsPage.getProductInTable(products.name))).toBe(false);
      
    });
  });
});

