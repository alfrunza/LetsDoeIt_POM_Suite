const {By, until} = require('selenium-webdriver');
const BasePage = require('./BasePage');

const AGE_GATE_BUTTON = By.id('age-gate-confirm');

class ModelsListingPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.driver.visit('https://letsdoeit.com/pornstars/sex/girls.en.html');
        await this.driver.manage().window().maximize();

        const isAgeGateLoaded = await this.isDisplayed(AGE_GATE_BUTTON, 5*1000);
        if(!isAgeGateLoaded) {
            throw new Error('Age gate disclaimer not loaded.');
        }

        await this.click(AGE_GATE_BUTTON);
    }


}

module.exports = ModelsListingPage;