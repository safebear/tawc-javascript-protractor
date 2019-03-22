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


using(products.productInfo, function(product, description) {
  describe("createProductTests", function() {

    async function deleteProducts(){

      while(await checks.elementsArePresent(productsPage.getProductInTable(product))){

        await actions.clickOnFirstElementInList(productsPage.getProductInTable(product));

        expect(checks.getUrl()).toContain(viewProductPage.url);

        actions.clickOnElement(viewProductPage.deleteButton);

        expect(checks.getUrl()).toContain(productsPage.url);
      }

    }

    beforeEach( function(){

      actions.goToWebsite();

      // CPSU01
      // SETUP: Check whether the `Product` is present in the list, if it's there, delete it.
      deleteProducts();

    });

    afterEach(async function(){

      // CPTD01
      // TEARDOWN: Delete the `Product` that was created.
      // ASSERT: `Product` is no longer listed.
      deleteProducts();

    });

    it("should create a product called " + description, async function() {


      // ASSERT: `Product` isn't in list. 

      expect(await checks.elementsArePresent(productsPage.getProductInTable(product))).toBe(false);

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
      expect(await checks.elementsArePresent(viewProductPage.productName(product))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productName(product))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productName(product))).toBe(true);

      // CP05
      // Press the `Products Page` button.
      actions.clickOnElement(viewProductPage.returnToProductsPageButton);

      // ASSERT: We're returned to the `Products Page`.
      expect(checks.getUrl()).toContain(productsPage.url);

      // ASSERT: The new `Product` is listed.
      expect(await checks.elementsArePresent(productsPage.getProductInTable(product))).toBe(true);

      

    });
  });
});

// describe("readUpdateDeleteProductTests", function() {
//   beforeEach(function() {
//     browser.get("");
//   });

//   using(products.productInfo, function(product, description) {
//     it("should delete a product" + description, function() {

      
//     });
//   });
// });

