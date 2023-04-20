const { Builder, By } = require('selenium-webdriver');
const path = require ('path');
const assert = require('assert');
const VideoPage = require('../pages/VideoPage');

describe('Videos Page', function () {
    jest.setTimeout(60 * 1000);
    let driver;
    let videopage;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        videopage = new VideoPage(driver);
        await videopage.load();
    })

    afterEach(async () => {
        await driver.quit();
    })

    test('Videos Page dropdown options', async () => {
        await videopage.verifyDropdown();
    })

    test('Verify total number of video cards on the page', async () => {
        await videopage.numberOfCards();
    })

    test('Verify a random pager number redirects to the correct page', async () => {
        await videopage.pager();
    })

    test.only('Verify quicklinks lead to correct link', async () => {
        await videopage.quickLinks();
    })
})