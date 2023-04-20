const BasePage = require('./BasePage');
const {By} = require("selenium-webdriver");

const AGE_GATE_BUTTON = By.id('age-gate-confirm');
const VIDEOS_BUTTON = By.css('#nav-item-video > a');
const MODELS_BUTTON = By.css('#header-main-nav > ul > li:nth-child(3) > a');
const CHANNELS_BUTTON = By.css('#header-main-nav > ul > li:nth-child(4) > a');
const PHOTOS_BUTTON = By.css('#header-main-nav > ul > li:nth-child(6) > a')
const CATEGORIES_BUTTON = By.css('#header-main-nav > ul > li:nth-child(7) > a');
const TAGS_BUTTON = By.css('#header-main-nav > ul > li:nth-child(8) > a');
const LANGUAGE_BUTTON = By.css('.box-language');
const LANGUAGE_MENU = By.css('.module-language');
const NOTIFICATIONS_BUTTON = By.css('.box-notifications');
const NOTIFICATIONS_MENU = By.css('.module-notifications');
const ACCOUNT_BUTTON = By.css('.box-account');
const ACCOUNT_MENU = By.css('.module-account');
const SEARCH_BUTTON = By.css('.box-search');
const SEARCH_MENU = By.css('.module-search:not(.hide)');
const SIGN_UP_BUTTON = By.css('.btn-join-guest');
const VIDEO_CARD = By.css('.-g-vc-inner-top');
const VIDEO_PREVIEW = By.css('.global-preview');
const POPULAR_MODELS_BUTTON = By.css('.-home-min-grid > a:nth-child(1)');
const MOST_VIEWED_BUTTON = By.css('.-home-min-grid > a:nth-child(2)');
const RECENTLY_ACTIVE_BUTTON = By.css('.-home-min-grid > a:nth-child(3)');
const LATEST_RELEASES_HEADER = By.css('.module-latest-movies .h1 > a');
const LATEST_VIEW_ALL = By.css('.module-latest-movies .-g-mh-right > a');
const LATEST_LOAD_MORE = By.css('.module-latest-movies-bottom > a');
const LATEST_VIDEO_CARDS = By.css('.module-latest-movies .global-video-card');
const POPULAR_RELEASES_HEADER = By.css('.module-finest .h1 > a');
const POPULAR_VIEW_ALL = By.css('.module-finest .-g-mh-right > a');
const POPULAR_LOAD_MORE = By.css('.module-finest-bottom > a');
const POPULAR_VIDEO_CARDS = By.css('.module-finest .global-video-card');
const STAFF_RELEASES_HEADER = By.css('.module-staff-picks .h1 > a');
const STAFF_VIEW_ALL = By.css('.module-staff-picks .-g-mh-right > a');
const STAFF_LOAD_MORE = By.css('.module-staff-picks .module-finest-bottom > a');
const STAFF_VIDEO_CARDS = By.css('.module-staff-picks .global-video-card');
const RECENTLY_ACTIVE_HEADER = By.css('.module-actors .h1 > a');
const RECENTLY_ACTIVE_VIEW_ALL = By.css('.module-actors .-g-mh-right > a');
const RECENTLY_ACTIVE_LOAD_MORE = By.css('.module-actors-bottom > a');
const RECENTLY_ACTIVE_CAROUSEL_MORE = By.css('.global-any-carousel-placeholder');
const RECENTLY_ACTIVE_CARDS = By.css('.global-actor-card');
const CAROUSEL_NEXT = By.id('next-module-actors');
const FIRST_HERO_CATEGORY = By.css('.module-hero-categories-item:nth-child(1) .-mhc-item-text');
const SECOND_HERO_CATEGORY = By.css('.module-hero-categories-item:nth-child(2) .-mhc-item-text');
const THIRD_HERO_CATEGORY = By.css('.module-hero-categories-item:nth-child(3) .-mhc-item-text');
const FOURTH_HERO_CATEGORY = By.css('.module-hero-categories-item:nth-child(4) .-mhc-item-text');

class Homepage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('https://letsdoeit.com/');
        await this.driver.manage().window().maximize();

        const isAgeGateLoaded = await this.isDisplayed(AGE_GATE_BUTTON, 5*1000);
        if(!isAgeGateLoaded) {
            throw new Error('Age gate disclaimer not loaded.');
        }
        
        await this.click(AGE_GATE_BUTTON);
    }

    // async login(username, password) {
    //     await 
    // }

    async clickHeaderButtons() {
        const buttonsAndLinks = [
            {button: VIDEOS_BUTTON, link: 'https://letsdoeit.com/videos.en.html'},
            {button: MODELS_BUTTON, link: 'https://letsdoeit.com/pornstars/sex/girls.en.html'},
            {button: CHANNELS_BUTTON, link: 'https://letsdoeit.com/channels.en.html'},
            {button: PHOTOS_BUTTON, link: 'https://letsdoeit.com/albums.en.html'},
            {button: CATEGORIES_BUTTON, link: 'https://letsdoeit.com/categories.en.html'},
            {button: TAGS_BUTTON, link: 'https://letsdoeit.com/tags.en.html'}
        ]

        for (const {button, link} of buttonsAndLinks) {
            const bool = await this.clickVerify(button, link);
            expect(bool).toBeTruthy();
            await this.goBack();
        }
    }

    async clickHeaderMenus() {
        await this.driver.sleep(2000);
        const buttonsAndMenus = [
            {button: LANGUAGE_BUTTON, menu: LANGUAGE_MENU},
            {button: NOTIFICATIONS_BUTTON, menu: NOTIFICATIONS_MENU},
            {button: ACCOUNT_BUTTON, menu: ACCOUNT_MENU},
            {button: SEARCH_BUTTON, menu: SEARCH_MENU}
        ];

        for (const {button, menu} of buttonsAndMenus) {
            const isLoaded = await this.isDisplayed(button, 5000);
            expect(isLoaded).toBeTruthy();
            await this.click(button);
            const isMenuDisplayed = await this.isDisplayed(menu, 2000);
            expect(isMenuDisplayed).toBeTruthy();
        }
    }

    async clickSignupButton() {
        await this.click(SIGN_UP_BUTTON);
        const link = await this.driver.getCurrentUrl();
        expect(link).toContain('letsdoeit.com/sign-up.en.html');
    }

    async previewVerify() {
        const pageLoaded = await this.isDisplayed(VIDEO_CARD, 5000);
        expect(pageLoaded).toBeTruthy();
        const originalVideoCards = await this.driver.findElements(VIDEO_CARD);
        
        for (let i = 0; i < originalVideoCards.length; i++) {
            const currentVideoCards = await this.driver.findElements(VIDEO_CARD);
            await this.driver.actions({async: true}).move({duration: 1000, origin: currentVideoCards[i]}).perform();
            const isPlaying = await this.isDisplayed(VIDEO_PREVIEW, 3000);
            expect(isPlaying).toBeTruthy();
        }
    }

    async verifyHomepageButtons() {
        const buttonsAndLinks = [
            {button: POPULAR_MODELS_BUTTON, link: 'https://letsdoeit.com/pornstars/sex/girls.en.html'},
            {button: MOST_VIEWED_BUTTON, link: 'https://letsdoeit.com/videos.en.html?order=-views_monthly'},
            {button: RECENTLY_ACTIVE_BUTTON, link: 'https://letsdoeit.com/pornstars/sex/girls.en.html?order=activity'}
        ]

        for(const {button, link} of buttonsAndLinks) {
            const bool = await this.clickVerify(button, link);
            expect(bool).toBeTruthy();
            await this.goBack();
        }
    }

    async verifyHeaderButtons() {
        const buttonsAndLinks = [
            {button: LATEST_RELEASES_HEADER, link: 'https://letsdoeit.com/videos.en.html?order=-recent'},
            {button: LATEST_VIEW_ALL, link: 'https://letsdoeit.com/videos.en.html?order=-recent'},
            {button: LATEST_LOAD_MORE, link: 'https://letsdoeit.com/videos.en.html?order=-recent'},
            {button: POPULAR_RELEASES_HEADER, link: 'https://letsdoeit.com/videos.en.html?order=rating'},
            {button: POPULAR_VIEW_ALL, link: 'https://letsdoeit.com/videos.en.html?order=rating'},
            {button: POPULAR_LOAD_MORE, link: 'https://letsdoeit.com/videos.en.html?order=rating'},
            {button: STAFF_RELEASES_HEADER, link: 'https://letsdoeit.com/videos.en.html?order=rating'},
            {button: STAFF_VIEW_ALL, link: 'https://letsdoeit.com/videos.en.html?order=rating'},
            {button: STAFF_LOAD_MORE, link: 'https://letsdoeit.com/videos.en.html?order=rating'}
        ];

        for(const {button, link} of buttonsAndLinks) {
            const bool = await this.clickVerify(button, link);
            expect(bool).toBeTruthy();
            await this.goBack();
        }
    }

    async headerCardLength() {
        const cardsAndLength = [
            {card: LATEST_VIDEO_CARDS, length: 12},
            {card: POPULAR_VIDEO_CARDS, length: 8},
            {card: STAFF_VIDEO_CARDS, length: 8}
        ]
        for(const {card, length} of cardsAndLength) {
            const videoCards = await this.findAll(card);
            expect(videoCards.length).toBe(length);
        }
    }

    async recentlyActiveButtons() {
        const buttonsAndLinks = [
            {button: RECENTLY_ACTIVE_HEADER, link: 'https://letsdoeit.com/pornstars/sex/girls.en.html?order=activity'},
            {button: RECENTLY_ACTIVE_VIEW_ALL, link: 'https://letsdoeit.com/pornstars/sex/girls.en.html?order=activity'},
            {button: RECENTLY_ACTIVE_LOAD_MORE, link: 'https://letsdoeit.com/pornstars/sex/girls.en.html?order=activity'},
        ];

        for(const {button, link} of buttonsAndLinks) {
            await this.scrollToElement(button);
            const bool = await this.clickVerify(button, link);
            expect(bool).toBeTruthy();
            await this.goBack();
        }
    }

    async recentlyActiveCardsLength() {
        const cards = await this.findAll(RECENTLY_ACTIVE_CARDS);
        expect(cards.length).toBe(10);
    }

    async recentlyActiveMoreCard() {
        await this.scrollToElement(RECENTLY_ACTIVE_CARDS);
        let displayed = false;
        do {
            await this.click(CAROUSEL_NEXT);
            await this.driver.sleep(1000);
            displayed = await this.isDisplayed(RECENTLY_ACTIVE_CAROUSEL_MORE);
        }while(!displayed);
        displayed = await this.isDisplayed(RECENTLY_ACTIVE_CAROUSEL_MORE, 1000);
        expect(displayed).toBeTruthy();
        await this.driver.sleep(1000);
        const bool = await this.clickVerify(RECENTLY_ACTIVE_CAROUSEL_MORE, 'https://letsdoeit.com/pornstars/sex/girls.en.html?order=activity');
        expect(bool).toBeTruthy();
    }

    async bottomButtons() {
        const buttonTexts = [
            {text: 'ANAL', link: 'https://letsdoeit.com/categories/anal.en.html'},
            {text: 'TEEN (18+)', link: 'https://letsdoeit.com/categories/teen.en.html'},
            {text: 'MILF', link: 'https://letsdoeit.com/categories/milf.en.html'},
            {text: 'BIG ASS', link: 'https://letsdoeit.com/categories/big-ass.en.html'}
        ];
        
        await this.scrollToElement(FIRST_HERO_CATEGORY);
        await this.driver.sleep(1000);
        const originalButtons = [
            FIRST_HERO_CATEGORY,
            SECOND_HERO_CATEGORY,
            THIRD_HERO_CATEGORY,
            FOURTH_HERO_CATEGORY
        ];
        
        for(let i = 0; i < originalButtons.length; i++) {
            const currentButtons = [
                FIRST_HERO_CATEGORY,
                SECOND_HERO_CATEGORY,
                THIRD_HERO_CATEGORY,
                FOURTH_HERO_CATEGORY
            ];
            await this.scrollToElement(FIRST_HERO_CATEGORY);
            const innerText = await this.getText(currentButtons[i]);
            for(const {text, link} of buttonTexts){
                if(text === innerText){
                    const bool = await this.clickVerify(currentButtons[i], link);
                    expect(bool).toBeTruthy;
                    await this.goBack();
                }
            }
        }
    }
}
module.exports = Homepage;