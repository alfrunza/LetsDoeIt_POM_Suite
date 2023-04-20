const {By, until} = require('selenium-webdriver');
const BasePage = require('./BasePage');

const AGE_GATE_BUTTON = By.id('age-gate-confirm');
const DROPDOWN = By.css('.-cih-filters .input-select');
const DROPDOWN_OPTIONS = By.css('.-cih-filters .inputs-modals');
const DROPDOWN_INDIVIDUAL_OPTIONS = By.css('.-cih-filters .inputs-modals > div > a');
const SEARCHBOX = By.css('.light_youtube_searched_for');
const SEARCHBOX_RESULT = By.css('.inputs-active .inputs-modals > .inner > a');
const CATEGORY_CARD_NAME = By.css('.-g-cc-name');
const FOOTER = By.css('.-f-section-one');

class CategoriesPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('https://letsdoeit.com/categories.en.html');
        await this.driver.manage().window().maximize();

        const isAgeGateLoaded = await this.isDisplayed(AGE_GATE_BUTTON, 5*1000);
        if(!isAgeGateLoaded) {
            throw new Error('Age gate disclaimer not loaded.');
        }
        
        await this.click(AGE_GATE_BUTTON);
    }

    async dropdown() {
        await this.driver.sleep(1000);
        await this.click(DROPDOWN);
        const isVisible2 = await this.isDisplayed(DROPDOWN_OPTIONS, 5000);
        if(!isVisible2) {
            throw new Error('Dropdown not loaded');
        }
        const individualOptions = await this.findAll(DROPDOWN_INDIVIDUAL_OPTIONS);
        const random = await this.randomNumber(0, (individualOptions.length - 1));
        let text = await individualOptions[random].getText();
        text = await this.textTransform(text);
        const expectedLink = 'https://letsdoeit.com/categories/' + text + '.en.html';
        await individualOptions[random].click();
        const actualLink = await this.driver.getCurrentUrl();
        let bool;
        if(actualLink === expectedLink) {
            bool = true;
        } else {
            bool = false;
        }
        expect(bool).toBeTruthy();
    }

    async searchBox() {
        await this.driver.sleep(1000);
        await this.click(DROPDOWN);
        const isVisible1 = await this.isDisplayed(DROPDOWN_OPTIONS, 5000);
        if(!isVisible1) {
            throw new Error('Dropdown not loaded');
        }
        const individualOptions = await this.findAll(DROPDOWN_INDIVIDUAL_OPTIONS);
        const random = await this.randomNumber(0, (individualOptions.length - 1));
        let text = await individualOptions[random].getText();
        await this.click(DROPDOWN);
        await this.driver.sleep(1000);
        await this.click(SEARCHBOX);
        await this.type(SEARCHBOX, text);
        text = await this.textTransform(text);
        const expectedLink = 'https://letsdoeit.com/categories/' + text + '.en.html';
        const isVisible2 = await this.isDisplayed(SEARCHBOX_RESULT, 5000);
        if(!isVisible2) {
            throw new Error('Results not loaded');
        }
        const bool = await this.clickVerify(SEARCHBOX_RESULT, expectedLink);
        expect(bool).toBeTruthy();
    }

    async categoryCards() {
        await this.scrollToElement(FOOTER);
        const individualOptions = await this.findAll(CATEGORY_CARD_NAME);
        const random = await this.randomNumber(0, (individualOptions.length - 1));
        let text = await individualOptions[random].getText();
        text = await this.textTransform(text);
        const expectedLink = 'https://letsdoeit.com/categories/' + text + '.en.html';
        await individualOptions[random].click();
        const actualLink = await this.driver.getCurrentUrl();
        let bool;
        if(actualLink === expectedLink) {
            bool = true;
        } else {
            bool = false;
        }
        expect(bool).toBeTruthy();
    }
}

module.exports = CategoriesPage;