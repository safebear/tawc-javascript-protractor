/**
 * Actions we can perform on the page
 * @constructor
 */
var Checks = function(){

    // Get URL
    this.getUrl = async function () { return await browser.getCurrentUrl(); }

    // Elements are present - also works for multiple elements
    this.elementsArePresent = async function (element) {
        return await element.isPresent(); 
    }

    // Element is enabled
    this.elementIsEnabled = async function (element) { return await element.isEnabled()}

};
module.exports = new Checks();