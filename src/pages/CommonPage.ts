import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CommonPage extends BasePage {

    // Top navigation
    private readonly topNavigation: Locator;
    private readonly currencyDropdown: Locator;
    private readonly myAccountLink: Locator;
    private readonly wishListLink: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly checkoutLink: Locator;

    // Main category navigation
    private readonly categoryNavigation: Locator;

    // Footer
    private readonly footer: Locator;
    private readonly footerHeadings: Locator;
    private readonly footerLinks: Locator;

    constructor(page: Page) {
        super(page);

        // Top navigation
        this.topNavigation = page.locator('#top-links');
        this.currencyDropdown = page.locator(
            '#form-currency .dropdown-toggle'
        );
        this.myAccountLink = page.locator(
            '#top-links a[title="My Account"]'
        );
        this.wishListLink = page.locator(
            '#wishlist-total'
        );
        this.shoppingCartLink = page.locator(
            '#top-links a[href*="checkout/cart"]'
        );
        this.checkoutLink = page.locator(
            '#top-links a[href*="checkout/checkout"]'
        );

        // Main category navigation
        this.categoryNavigation = page.locator('#menu');

        // Footer
        this.footer = page.locator('#footer');
        this.footerHeadings = page.locator('#footer h5');
        this.footerLinks = page.locator('#footer a');
    }
    // Verify common components
    async isTopNavigationVisible(): Promise<boolean> {
        return await this.topNavigation.isVisible();
    }

    async isCategoryNavigationVisible(): Promise<boolean> {
        return await this.categoryNavigation.isVisible();
    }

    async isFooterVisible(): Promise<boolean> {
        await this.footer.scrollIntoViewIfNeeded();
        return await this.footer.isVisible();
    }

    // Click a category by its visible name
    async clickCategory(categoryName: string): Promise<void> {
        await this.categoryNavigation
            .getByRole('link', {
                name: categoryName,
                exact: true
            })
            .click();
    }

    // Click a footer link by its visible name
    async clickFooterLink(linkName: string): Promise<void> {
        await this.footer
            .getByRole('link', {
                name: linkName,
                exact: true
            })
            .click();
    }

    // Get all category names
    async getCategoryNames(): Promise<string[]> {
        return await this.categoryNavigation
            .getByRole('link')
            .allTextContents();
    }

    // Get all footer headings
    async getFooterHeadings(): Promise<string[]> {
        return await this.footerHeadings.allTextContents();
    }

    // Count footer links
    async getFooterLinkCount(): Promise<number> {
        return await this.footerLinks.count();
    }






}