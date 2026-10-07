import { Page } from "@playwright/test";

export class BasePage {

    protected readonly page: Page;
   /* protected readonly logo: Locator;
    protected searchInput: Locator;
    protected searchButton: Locator;
    protected readonly cart: Locator;

    // Navigation
    protected readonly desktopsMenu: Locator;
    protected readonly laptopsMenu: Locator;
    protected readonly componentsMenu: Locator;
    protected readonly tabletsMenu: Locator;
    protected readonly softwareMenu: Locator;
    protected readonly phonesMenu: Locator;
    protected readonly camerasMenu: Locator;
    protected readonly mp3PlayersMenu: Locator;

    // Breadcrumb
    protected readonly breadcrumb: Locator;

    // Footer
    protected readonly aboutUs: Locator;
    protected readonly contactUs: Locator;
    protected readonly privacyPolicy: Locator;
    protected readonly termsConditions: Locator;*/

    constructor(page: Page) {
        this.page = page;

    }

    //comman locator  on based page inheritance concept accross all pages
    //pw  fm 05 -1:00 hour base page  test

}