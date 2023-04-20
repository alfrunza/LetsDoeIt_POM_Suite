const { Builder, By } = require('selenium-webdriver');
const path = require ('path');
const assert = require('assert');
const Homepage = require('../pages/Homepage');

describe('Homepage', function() {
    jest.setTimeout(60 * 1000);
    let driver;
    let homepage;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        homepage = new Homepage(driver);
        await homepage.load();
    })

    afterEach(async () => {
        await driver.quit();
    })

    test('HP_2 guest', async () => {
        await homepage.clickHeaderButtons();
        await homepage.clickHeaderMenus();
        await homepage.clickSignupButton();
    })

    test('HP_3 guest', async () => {
        await homepage.previewVerify();
    })

    test('Buttons under the main Banner Carousel -> guest', async () => {
        await homepage.verifyHomepageButtons();
    })

    test('Headers with respective buttons -> guest', async () => {
        await homepage.verifyHeaderButtons();
        await homepage.headerCardLength();
    })

    test('Recently Active Pornstars Carousel -> guest', async () => {
        await homepage.recentlyActiveButtons();
        await homepage.recentlyActiveCardsLength();
        await homepage.recentlyActiveMoreCard();
    })

    test('Verify 4 buttons at the bottom -> guest', async () => {
        await homepage.bottomButtons();
    })
})