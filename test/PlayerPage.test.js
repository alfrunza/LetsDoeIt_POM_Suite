const { Builder, By } = require('selenium-webdriver');
const path = require ('path');
const assert = require('assert');
const PlayerPage = require('../pages/PlayerPage');

describe('Player Page', function () {
    jest.setTimeout(60 * 1000);
    let driver;
    let playerpage;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        playerpage = new PlayerPage(driver);
        await playerpage.load();
    })

    afterEach(async () => {
        await driver.quit();
    })

    test('Verify play button', async () => {
        await playerpage.playButtonGuest();
    })

    test('Verify actions buttons', async () => {
        await playerpage.actionsButtonsGuest();
    })

    test.only('Verify gallery', async () => {
        await playerpage.gallerySwiper();
    })

    test('Similar videos from [channel]', async () => {
        await playerpage.channelHeader();
        await playerpage.channelSectionCards();
    })

    test('Related videos', async () => {
        await playerpage.relatedHeader();
        await playerpage.relatedSectionCards();
    })

    test('Comment Join Now button', async () => {
        await playerpage.commentJoinNow();
    })
})