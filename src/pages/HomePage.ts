
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    //private locator
    private readonly logoutlink: Locator;
    private readonly Headers: Locator;
    private readonly Search: Locator;
    private readonly Searchicon: Locator;

    //header

    private readonly logo: Locator;
    private readonly searchInput: Locator;
    private readonly currencyLink: Locator;
    private readonly wishListLink: Locator;
    //comman seacrch boxmaintain on home page and other pages
    private readonly shoppingCartLink: Locator;
    private readonly checkoutLink: Locator;


    constructor(page: Page) {
        super(page);
        this.logoutlink = page.getByRole('link', { name: 'Logout' }).first();
        this.Headers = page.getByRole('heading', { level: 2 }).first();
        this.logo= page.getByRole('img', { name: 'naveenopencart' });
        this .searchInput=page.getByRole('textbox', { name: 'Search' });
        this.currencyLink=page.getByRole('button', { name: '$ Currency' })
        this.wishListLink=page.getByRole('link', { name: 'Wish List (0)' })
        this.shoppingCartLink=page.getByRole('link', { name: 'Shopping Cart' })
        this.checkoutLink=page.getByRole('link', { name: 'Checkout' })
        this.Search=page.getByRole('textbox', { name: 'Search' });
        this.Searchicon=page.locator('div#search button');

    }

    async getHomePagetitle(): Promise<string> {

        return await this.page.title();
    }

    async isLogoutLinkExist(): Promise<boolean> {
        return await this.logoutlink.isVisible();
    }

    async getHomePageHeader(): Promise<string[]> {
        return await this.Headers.allTextContents();
    }

    async BreadcrumbExist(): Promise<boolean> {
        return await this.page.getByRole('link', { name: 'Account' ,exact: true}).isVisible();
    }

        async isPageHeadingVisible(): Promise<boolean> {
        return this.Headers.isVisible();
    }

    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean> {
        return this.searchInput.isVisible();
    }

    async isCurrencyVisible(): Promise<boolean> {
        return this.currencyLink.isVisible();
    }

    // =========================
    // Header actions
    // =========================

    async clickShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutLink.click();
    }

    async clickWishList(): Promise<void> {
        await this.wishListLink.click();
    }


    async dosearch(searchkey:string): Promise<void> {


        console.log(`Search key is: ${searchkey}`);
        await this.Search.fill(searchkey);
        await this.Searchicon.click();


    }





}