# test-protractor-course

Set up your GitHub repository with a `README.md` and `.gitignore` file

## Set Up Project

```
 npm init -y

 npm install protractor --save-dev
 npm install protractor-beautiful-reporter --save-dev
 npm install jasmine-data-provider --save-dev 
```

Then create your framework by creating a `test` folder and then adding:

A `page_objects` folder.
A `products` folder.

You can add the `ESLint` library and plugins to this framework if you'd like, as we did on the course. The underlying test framework protractor uses is `jasmine` (rather than the `mocha` and `chai` we used on the course) so add plugins for this.

## Set Up Configuration Files

then create your `protractor.conf.js` in `tests` and add this code:

```javascript
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:8080/',

    capabilities: {
        'browserName': 'chrome'
      },

    //   multiCapabilities: [{
    //     'browserName': 'firefox'
    //   }, {
    //     'browserName': 'chrome'
    //   }]  

    // capabilities: {
    //     browserName: 'chrome',
      
    //     chromeOptions: {
    //        args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
    //      }
    //   }

    // run a group of tests
    specs: ['products/*.spec.js'],
    suites: {
         products: 'products/*.spec.js'
    },

    framework: 'jasmine',
    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'tmp/screenshots',
           docTitle: 'Products Report'
        }).getJasmine2Reporter());
    }
};
```

Then update your `test` script in `package.json` to the following:

```json
  "scripts": {
    "test": "protractor ./test/protractor.conf.js"
  },
```

Copy the contents of your `page_objects` folder from the cucumber framework into the `page_objects` folder for this one (we won't recreate this again!)

## Create Your Test Spec File

Then create your spec file to create a product (`products_crud.spec.js`) in the `products` folder with the following code:

```javascript
const homePage = require('../page_objects/home.page');
const addProductPage = require('../page_objects/add-product.page');
const viewProductPage = require('../page_objects/view-product.page');

beforeEach(function() {
    browser.get('');
  });

it('should create a product', function(){

    // click add products

    homePage.addProduct.click();

    // fill out form
    addProductPage.productName.sendKeys("turbot")
    addProductPage.productDescription.sendKeys("fish")
    addProductPage.productPrice.sendKeys("100")

    // click submit
    addProductPage.submitButton.click()

    // check product name
    expect(viewProductPage.productName({name:"turbot"}).isDisplayed()).toBeTruthy();

})
```

Then run your code with the `npm test` command.

## Add Some Test Data

Add a `data` folder in your `test` folder.

Then create a `product-data.module.js` file in your `data` folder and add the following:

```javascript
'use strict';

module.exports = {
    productInfo: {
        'meat': {
            name: 'sausages',
            description: 'thin meat',
            price: '100'
        },
        'vegetables': {
            name: 'carrots',
            description: 'orange vegetables',
            price: '200'
        },
        'bread': {
            name: 'bloomer',
            description: 'white bread',
            price: '300'
        },
        'pasta': {
            name: 'spaghetti',
            description: 'long pasta',
            price: '400'
        }
    }
};
```

And then adapt the spec (`products_crud.spec.js`) code to the following (see the `TEST DATA` comments in the code):

```javascript
const homePage = require("../page_objects/home.page");
const addProductPage = require("../page_objects/add-product.page");
const viewProductPage = require("../page_objects/view-product.page");

// TEST DATA: Import our test data module and the 'jasmine data provider' 'using' command to handle our test data
var using = require("jasmine-data-provider");
var products = require("../data/product-data.module.js");

// TEST DATA: Add a 'describe'
describe("productTests", function() {
  beforeEach(function() {
    browser.get("");
  });

  // TEST DATA: Add your 'using' to use our test data
  using(products.productInfo, function(product, description) {
    it("should create a product" + description, function() {
      // Should be a check that a product doesn't exist here.

      // click add products
      homePage.addProduct.click();

      // fill out form
      // TEST DATA: Update with test data (product)
      addProductPage.productName.sendKeys(product.name);
      addProductPage.productDescription.sendKeys(product.description);
      addProductPage.productPrice.sendKeys(product.price);

      // click submit
      addProductPage.submitButton.click();

      // check product name
      // TEST DATA: Update with test data (product)
      expect(viewProductPage.productName(product).isDisplayed()).toBeTruthy();
    });
  });
});
```

Run the code with the `npm test` command. You can run your code headlessly and plug it into Jenkins in exactly the same way you did on the course.




