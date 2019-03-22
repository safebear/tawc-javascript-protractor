/**
 * Actions we can perform on the page
 * @constructor
 */
var Actions = function(){

    // Open Browser and Navigate to URL
    this.goToWebsite = async function(){ return await browser.get(''); }

    // Click on element
    this.clickOnElement = async function (element) {return await element.click() }

    // Click on first element in list of Elements
    this.clickOnFirstElementInList = async function (elements) { return await elements.first().click(); }

    // Type text in input field
    this.typeText = async function (element, text) { return await element.sendKeys(text) }

    // Clear a text field
    this.clearText = async function (element) { return await element.clear() }

};
module.exports = new Actions();