const {Builder} = require('selenium-webdriver');
const path = require('path');
const assert = require('assert');
const CategoriesPage = require('../pages/CategoriesPage');

describe('Categories Page', function () {
    jest.setTimeout(60 * 1000);
    let driver;
    let categoriespage;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        categoriespage = new CategoriesPage(driver);
        await categoriespage.load();
    })

    afterEach(async () => {
        await driver.quit();
    })

    test('Dropdown', async () => {
        await categoriespage.dropdown();
    })

    test('Searchbox', async () => {
        await categoriespage.searchBox();
    })

    test.only('Category Cards', async () => {
        await categoriespage.categoryCards();
    })
})