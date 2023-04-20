const {By, until} = require ('selenium-webdriver');
const BasePage = require ('./BasePage.js');

const AGE_GATE_BUTTON = By.id('age-gate-confirm');
const VIDEO_CARD = By.css('.global-video-card');
const INACTIVE_PAGER = By.css('.-p-page-url:not(.-p-page-url-active');
const FAKE_PLAY_BUTTON = By.css('button.fake-play');
const LIKE_BUTTON = By.xpath('//*[@id="vue-app"]/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div[2]/div/div[1]/div/div[1]');
const DISLIKE_BUTTON = By.xpath('//*[@id="vue-app"]/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]');
const FAVORITE_BUTTON = By.xpath('//*[@id="vue-app"]/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div[2]/div/div[2]');
const SAVE_BUTTON = By.xpath('//*[@id="vue-app"]/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div[2]/div/div[3]');
const DOWNLOAD_BUTTON = By.xpath('//*[@id="vue-app"]/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div[2]/div/div[4]');
const SWIPER_CARD = By.css('.swiper-main-container .swiper-wrapper > .swiper-slide:nth-child(1)');
const CHANNEL_HEADER = By.css('.module-similar-movies h3 > a');
const CHANNEL_VIEW_ALL = By.css('.module-similar-movies .-g-mh-right > a');
const CHANNEL_LOAD_MORE = By.css('.module-similar-movies-bottom > a');
const CHANNEL_CARDS = By.css('.module-similar-movies .global-video-listing > .global-video-card');
const RELATED_HEADER = By.css('.module-related-movies h4 > a');
const RELATED_VIEW_ALL = By.css('.module-related-movies .-g-mh-right > a');
const RELATED_FAKE_MORE = By.css('.module-related-movies-bottom > button.btn-load-more-gray');
const RELATED_LOAD_MORE = By.css('.module-related-movies-bottom > a.btn-load-more-gray');
const RELATED_CARDS = By.css('.module-related-movies .global-video-listing > .global-video-card');
const COMMENT_BUTTON = By.xpath('//*[@id="vue-app"]/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div[2]/div/div[5]');
const JOIN_NOW = By.css('.button-join-now');

class PlayerPage extends BasePage {
    constructor(driver){
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
        await this.scrollToElement(INACTIVE_PAGER);
        await this.driver.sleep(500);
        const videoCards = await this.findAll(VIDEO_CARD);
        const random = await this.randomNumber(0, (videoCards.length - 1));
        await videoCards[random].click();
        const link = await this.driver.getCurrentUrl();
    }

    async playButtonGuest() {
        await this.click(FAKE_PLAY_BUTTON);
        await this.driver.wait(until.urlContains('sign-up.en.html'), 10000);
        const link = await this.driver.getCurrentUrl();
        expect(link).toContain('sign-up.en.html');
    }

    async actionsButtonsGuest() {
        const buttons = [
            LIKE_BUTTON,
            DISLIKE_BUTTON,
            FAVORITE_BUTTON,
            SAVE_BUTTON,
            DOWNLOAD_BUTTON
        ]

        for(const button of buttons) {
            await this.click(button);
            await this.driver.wait(until.urlContains('sign-up.en.html'), 10000);
            expect(await this.driver.getCurrentUrl()).toContain('sign-up.en.html');
            await this.goBack();
        }
    }

    async gallerySwiper() {
        await this.click(SWIPER_CARD);
        const link = await this.driver.getCurrentUrl();
        expect(link).toContain('letsdoeit.com/albums/');
    }

    async channelHeader() {
        await this.scrollToElement(CHANNEL_HEADER);
        let text = await this.getText(CHANNEL_HEADER);
        text = text.toLowerCase();
        text = text.slice(20);
        text = text.replace(/ /g, '-');
        const expectedLink = 'https://letsdoeit.com/channels/' + text + '.en.html';
        const headers = [
            CHANNEL_HEADER,
            CHANNEL_VIEW_ALL,
            CHANNEL_LOAD_MORE,
        ]
        for(const button of headers){
            await this.scrollToElement(button);
            const bool = await this.clickVerify(button, expectedLink);
            expect(bool).toBeTruthy();
            await this.goBack();
        }
    }

    async channelSectionCards() {
        await this.scrollToElement(CHANNEL_CARDS);
        const totalCards = await this.findAll(CHANNEL_CARDS);
        expect(totalCards.length).toBe(8);
    }

    async relatedHeader() {
        const headers = [
            RELATED_HEADER,
            RELATED_VIEW_ALL,
        ]
        for(const button of headers){
            await this.scrollToElement(button);
            const bool = await this.clickVerify(button, 'https://letsdoeit.com/videos.en.html?order=rating');
            expect(bool).toBeTruthy();
            await this.goBack();
        }
        await this.scrollToElement(RELATED_FAKE_MORE);
        await this.click(RELATED_FAKE_MORE);
        await this.scrollToElement(RELATED_LOAD_MORE);
        const bool2 = await this.clickVerify(RELATED_LOAD_MORE, 'https://letsdoeit.com/videos.en.html?order=rating');
        expect(bool2).toBeTruthy();
        await this.goBack();
    }

    async relatedSectionCards() {
        await this.scrollToElement(RELATED_CARDS);
        await this.click(RELATED_FAKE_MORE);
        const totalCards = await this.findAll(RELATED_CARDS);
        expect(totalCards.length).toBe(16);
    }

    async commentJoinNow() {
        await this.click(COMMENT_BUTTON);
        const isVisible = await this.isDisplayed(JOIN_NOW, 5000);
        if(!isVisible) {
            throw new Error('Join Now button is not visible');
        }
        await this.click(JOIN_NOW);
        await this.driver.wait(until.urlContains('sign-up.en.html'), 10000);
        const link = await this.driver.getCurrentUrl();
        expect(link).toContain('sign-up.en.html');
    }
}

module.exports = PlayerPage