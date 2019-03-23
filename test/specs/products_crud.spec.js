// Page Objects
const productsPage = require("../page_objects/products.page");
const addProductPage = require("../page_objects/add-product.page");
const viewProductPage = require("../page_objects/view-product.page");
const editProductPage = require("../page_objects/edit-product.page");

// Actions and Checks
const actions = require("../support/actions");
const checks = require("../support/checks");

// Test Data
const using = require("jasmine-data-provider");
const productData = require("../data/debug-data.json");

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

using(productData, function(product) {
  describe("createProductTests", function() {

    beforeEach( function(){

      actions.goToWebsite();

      // CPSU01
      // SETUP: Check whether the `Product` is present in the list, if it's there, delete it.
      deleteProducts(product);

    });

    afterEach( function(){

      // CPTD01
      // TEARDOWN: Delete the `Product` that was created.
      // ASSERT: `Product` is no longer listed.
      deleteProducts(product);

    });

    it("should create a product", async function() {


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

using(productData, function(products) {

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

    it("should delete a product", async function() {

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

    it("should view a product", async function() {

      // VPSU01
      // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
      // ASSERT: `Product` in list. 
      // All done in the 'before' method

      // VP01
      // Navigate to the `Products Page`
      // ASSERT: We're on the `Products Page` of the Website
      // All done in the 'before' method

      // VERIFY: The `name` and `description` are correct.
      expect(await checks.elementsArePresent(productsPage.getProductInTable(products.name))).toBe(true);
      expect(await checks.elementsArePresent(productsPage.getProductInTable(products.price))).toBe(true);

      // VP02
      // Click on the `Product` name
      await actions.clickOnFirstElementInList(productsPage.getProductInTable(products.name));

      // ASSERT: We're on the `View Product` page
      expect(checks.getUrl()).toContain(viewProductPage.url);

      // VERIFY: The `name`, `description` and `price` of the product are correct.
      expect(await checks.elementsArePresent(viewProductPage.productName(products.name))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productDescription(products.description))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productPrice(products.price))).toBe(true);

      // VPTD01
      // TEARDOWN: Delete the `Product` that was created.
      // ASSERT: `Product` is no longer listed.
      // Done in the 'after' method

    });

    it("should edit a product", async function() {

      // EPSU01
      // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
      // ASSERT: `Product` in list. 
      // Done in the 'before' method.

      // EP01
      // Navigate to the `Products Page`
      // ASSERT: We're on the `Products Page` of the Website
      // Done in the 'before' method

      // EP02
      // Click on the `Product` name
      await actions.clickOnFirstElementInList(productsPage.getProductInTable(products.name));


      // ASSERT: We're on the `View Product` page
      expect(checks.getUrl()).toContain(viewProductPage.url);

      // EP03
      // Click on the `Edit Product` button
      actions.clickOnElement(viewProductPage.editProductButton);

      // ASSERT: We're on the `Edit Product Page`
      expect(checks.getUrl()).toContain(editProductPage.url);

      // EP04
      // Clear the `name`, `description` and `price` fields.
      actions.clearText(editProductPage.productName);
      actions.clearText(editProductPage.productDescription);
      actions.clearText(editProductPage.productPrice);

      // VERIFY: The fields are empty.
      expect(checks.getFieldValue(editProductPage.productName)).toMatch("");
      expect(checks.getFieldValue(editProductPage.productDescription)).toMatch("");
      expect(checks.getFieldValue(editProductPage.productPrice)).toMatch("");

      // EP05
      // Enter new details from the `test-data-edit-product.json` file
      // New details are entered
      actions.typeText(editProductPage.productName, products.editName);
      actions.typeText(editProductPage.productDescription, products.editDescription);
      actions.typeText(editProductPage.productPrice, products.editPrice);

      // EP06
      // Click on the `Save` button
      expect(checks.elementIsEnabled(editProductPage.saveProductButton));
      actions.clickOnElement(editProductPage.saveProductButton);

      // ASSERT: We are taken to the `View Product` screen
      expect(checks.getUrl()).toContain(viewProductPage.url);

      // ASSERT: The `name`, `description` and `price` of the product have been updated.
      expect(await checks.elementsArePresent(viewProductPage.productName(products.editName))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productDescription(products.editDescription))).toBe(true);
      expect(await checks.elementsArePresent(viewProductPage.productPrice(products.editPrice))).toBe(true);

      // EP07
      // Click on the `Products Page` button
      actions.clickOnElement(viewProductPage.returnToProductsPageButton);

      // ASSERT: The `name` and `description` have been updated.
      expect(await checks.elementsArePresent(productsPage.getProductInTable(products.editName))).toBe(true);
      expect(await checks.elementsArePresent(productsPage.getProductInTable(products.editPrice))).toBe(true);

      // EPTD01
      // TEARDOWN: Delete the `Product` that was created.
      // ASSERT: `Product` is no longer listed.
      // This happens in the 'after' method.

    });


  });
});

