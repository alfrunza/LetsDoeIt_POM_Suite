const {until, Actions} = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async visit(url) {
        await this.driver.get(url);
    }

    async find(locator) {
        return await this.driver.findElement(locator);
    }

    async findAll(locator) {
        return await this.driver.findElements(locator);
    }

    async click(locator) {
        const element = await this.find(locator);
        await element.click();
    }

    async type(locator, inputText) {
        const input = await this.find(locator);
        await input.sendKeys(inputText);
    }

    async isDisplayed(locator, timeout) {
        if(timeout) {
            await this.driver.wait(until.elementLocated(locator), timeout);
            await this.driver.wait(until.elementIsVisible(await this.find(locator)), timeout);
            return true;
        }

        try {
            const element = await this.find(locator);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }
    
    async clickVerify(locator, url) {
        await this.click(locator);
        return await this.driver.getCurrentUrl() === url;
    }

    async goBack() {
        await this.driver.navigate().back();
    }

    async hover(locator) {
        const actions = this.driver.actions({bridge: true});
        let elem = await this.find(locator);
        await actions.move({duration: 5000, origin: elem, x:0, y:0}).perform();
    }

    async getText(locator) {
        const text = await this.driver.findElement(locator).getText();
        return text;
    }

    async scrollToElement(locator) {
        let visible = false;
        do {
            await this.driver.executeScript("window.scroll({ top: 10, left: 0});");
            visible = await this.isDisplayed(locator);
        }while(!visible);
    }

    async randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async textTransform(text) {
        text = text.toLowerCase();
        text = text.replace(' &', '');
        text = text.replace('(', '');
        text = text.replace('+)', '');
        text = text.replace(/ /g, '-');
        return text;
    }
}

module.exports = BasePage
