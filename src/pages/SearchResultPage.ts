
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage {

    //private locator
    private readonly searchResuts: Locator;

    constructor(page: Page) {
        super(page);
        this.searchResuts = page.locator('div.product-layout');
    }

    //Actions
    async getSearchResultsCount(): Promise<number> {
        return await this.searchResuts.count();
    }

    //dynamic locator concept based on product name
    async selectProduct(ProductName: string) {

        await  this.page.getByRole('link', {name: ProductName , exact: true}).first().click();


    }
   
}