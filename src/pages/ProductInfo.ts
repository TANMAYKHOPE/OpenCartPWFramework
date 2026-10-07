
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ProductInfoPage extends BasePage {

    //private locator

    private readonly header: Locator;
    private readonly productImage: Locator;
    private readonly productMetaData: Locator;
    private readonly productPriceing: Locator;
    private map: Map<string, string | number>;

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 })
        this.productImage = page.locator('div#content img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPriceing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string | number>();
    }

    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImageCount(): Promise<number> {
        // await this.page.waitForTimeout(4000);-- no hadcode  wait
        await this.productImage.first().waitFor({ state: 'visible', timeout: 4000 });
        return await this.productImage.count();
    }

    //encapsulation concept apply here to get product information and return as map

    private async getProductMetaData(): Promise<void> {
        let MetaData = await this.productMetaData.allInnerTexts();

        for (let data of MetaData) {
            let meta = data.split(':');
            let metakey = meta[0].trim();
            let metavalue = meta[1].trim();
            this.map.set(metakey, metavalue);
        }
    }

    private async getProductPriceingData(): Promise<void> {

        let priceData = await this.productPriceing.allInnerTexts();
        let ProdPrice = priceData[0].trim();
        let ExTax = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', ProdPrice);
        this.map.set('ExTax', ExTax);

    }


    /**
     * 
     * @returns  this methode  return the  actual product  data method , header , images, pricing data
     */

    async getProductInformation(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImageCounts', await this.getProductImageCount());
        await this.getProductMetaData();
        await this.getProductPriceingData();
        return this.map;


    }


    //Assignment- product information add Quantity and add to cart button and  verify success message  , clikc on shoppig cart , land on new page and  create test.spec on shopping cart page.
    








}