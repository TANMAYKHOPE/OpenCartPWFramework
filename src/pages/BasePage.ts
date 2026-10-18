import { Locator, Page } from "@playwright/test";


export class BasePage {

    protected readonly page: Page;
    protected readonly logo: Locator;
    protected searchInput: Locator;
    protected searchButton: Locator;
    protected readonly Currency: Locator;
    protected readonly footerlink: Locator;
    protected readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.locator('.btn.btn-default.btn-lg');
        this.Currency = page.getByRole('button', { name: '$ Currency' });
        this.cartButton = page.locator('div#cart button');
        this.footerlink = page.locator('footer a');

    }

    //comman locator  on based page inheritance concept accross all pages
    //pw  fm 05 -1:00 hour base page  test

    async LogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }

    async seachboxVisible(): Promise<boolean> {

        return await this.searchInput.isVisible();
    }

    async iscurrenyVisible(): Promise<boolean> {

        return await this.Currency.isVisible();
    }

    async getFootercount(): Promise<number> {

        return await this.footerlink.count();
    }

    async getPageFooters(): Promise<string[]> {

        return await this.footerlink.allTextContents()

    }

    //page level generic method

    async getPagetitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageCurrenttitle(): Promise<string> {

        return this.page.url();
    }

    async takescreenshot(name: string) {

        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        });
    }

    async waitforPageLode() {
        await this.page.waitForLoadState('load');
    }

} 