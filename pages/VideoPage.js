const BasePage = require('./BasePage');
const {By, until} = require("selenium-webdriver");

const AGE_GATE_BUTTON = By.id('age-gate-confirm');
const DROPDOWN = By.css('.inputs-boxes > .input-select');
const DROPDOWN_OPTIONS = By.css('.inputs-boxes > .inputs-modals');
const DROPDOWN_1 = By.css('.inputs-modals[data-roll="videosSorter"] .inner > a:nth-child(1)');
const DROPDOWN_2 = By.css('.inputs-modals[data-roll="videosSorter"] .inner > a:nth-child(2)');
const DROPDOWN_3 = By.css('.inputs-modals[data-roll="videosSorter"] .inner > a:nth-child(3)');
const VIDEO_CARD = By.css('.global-video-card');
const INACTIVE_PAGER = By.css('.-p-page-url:not(.-p-page-url-active');
const QUICK_LINKS_BUTTON = By.css('.main-content > .section-boxed > .module-quick-links > a');

class VideoPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('https://letsdoeit.com/videos.en.html');
        await this.driver.manage().window().maximize();

        const isAgeGateLoaded = await this.isDisplayed(AGE_GATE_BUTTON, 5*1000);
        if(!isAgeGateLoaded) {
            throw new Error('Age gate disclaimer not loaded.');
        }
        
        await this.click(AGE_GATE_BUTTON);
    }

    async verifyDropdown() {
        const dropdownOptions = [
            {option: DROPDOWN_1, link: 'https://letsdoeit.com/videos.en.html?order=rating'},
            {option: DROPDOWN_2, link: 'https://letsdoeit.com/videos.en.html?order=-views_monthly'},
            {option: DROPDOWN_3, link: 'https://letsdoeit.com/videos.en.html?order=-length'}
        ]
        for(const {option, link} of dropdownOptions) {
            const dropdownLoaded = await this.isDisplayed(DROPDOWN, 5000);
            if(!dropdownLoaded) {
                throw new Error('Dropdown button not loaded');
            }
            await this.driver.sleep(1000);
            await this.click(DROPDOWN);
            const dropdownOptionsLoaded = await this.isDisplayed(DROPDOWN_OPTIONS, 5000);
            if(!dropdownOptionsLoaded) {
                throw new Error('Dropdown options not loaded');
            }
            const bool = await this.clickVerify(option, link);
            expect(bool).toBeTruthy();
            await this.goBack();
        }
    }

    async numberOfCards() {
        const totalCards = await this.findAll(VIDEO_CARD);
        expect(totalCards.length).toBe(40);
    }

    async pager() {
        await this.scrollToElement(INACTIVE_PAGER);
        const pagerButtons = await this.findAll(INACTIVE_PAGER);
        const random = await this.randomNumber(0, (pagerButtons.length - 1));
        const text = await pagerButtons[random].getText();
        const controlLink = 'https://letsdoeit.com/videos.en.html?page=' + text;
        await pagerButtons[random].click();
        const currentUrl = await this.driver.getCurrentUrl();
        let bool;
        if(currentUrl === controlLink) {
            bool = true;
        } else {
            bool = false;
        }
        expect(bool).toBeTruthy();
    }

    async quickLinks() {
        await this.driver.wait(until.elementIsVisible(await this.find(QUICK_LINKS_BUTTON)), 10000);
        const quickLinks = await this.findAll(QUICK_LINKS_BUTTON);
        const random1 = await this.randomNumber(0, quickLinks.length - 1);
        const random2 = await this.randomNumber(0, quickLinks.length - 1);
        const random3 = await this.randomNumber(0, quickLinks.length - 1);
        const randoms = [
            random1,
            random2,
            random3
        ];
        for(const number of randoms) {
            const usableQuickLinks = await this.findAll(QUICK_LINKS_BUTTON);
            const text = await usableQuickLinks[number].getText();
            const newText = await this.textTransform(text);
            await usableQuickLinks[number].click();
            const link = await this.driver.getCurrentUrl();
            console.log(text);
            console.log(link);
            expect(link).toContain(newText);
            await this.goBack();
        };
    }
}
module.exports = VideoPage;