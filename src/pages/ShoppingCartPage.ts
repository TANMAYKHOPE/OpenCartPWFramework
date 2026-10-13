
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShoppingCartPage extends BasePage {

    // Page Heading and Breadcrumb
    private readonly pageHeading: Locator;
    private readonly breadcrumb: Locator;
    private readonly shoppingCartBreadcrumb: Locator;

    // Cart Products Table
    private readonly cartTable: Locator;
    private readonly cartTableHeaders: Locator;
    private readonly cartProductRows: Locator;
    private readonly productImage: Locator;
    private readonly productName: Locator;
    private readonly productModel: Locator;
    private readonly productRewardPoints: Locator;
    private readonly productQuantityInput: Locator;
    private readonly productUnitPrice: Locator;
    private readonly productTotalPrice: Locator;

    // Cart Quantity Actions
    private readonly updateQuantityButton: Locator;
    private readonly removeProductButton: Locator;

    // Stock and Status Messages
    private readonly stockWarningAlert: Locator;
    private readonly successAlert: Locator;
    private readonly errorAlert: Locator;
    private readonly alertCloseButton: Locator;

    // Cart Weight
    private readonly cartWeight: Locator;

    // Cart Totals
    private readonly cartTotalsTable: Locator;
    private readonly subTotalLabel: Locator;
    private readonly subTotalAmount: Locator;
    private readonly ecoTaxLabel: Locator;
    private readonly ecoTaxAmount: Locator;
    private readonly vatLabel: Locator;
    private readonly vatAmount: Locator;
    private readonly totalLabel: Locator;
    private readonly totalAmount: Locator;

    // Checkout and Shopping Navigation
    private readonly continueShoppingButton: Locator;
    private readonly checkoutButton: Locator;

    // Coupon Code
    private readonly couponCodeAccordion: Locator;
    private readonly couponCodeInput: Locator;
    private readonly applyCouponButton: Locator;
    private readonly couponMessage: Locator;

    // Shipping Estimate
    private readonly shippingEstimateAccordion: Locator;
    private readonly countryDropdown: Locator;
    private readonly regionDropdown: Locator;
    private readonly postcodeInput: Locator;
    private readonly estimateShippingButton: Locator;
    private readonly shippingMessage: Locator;

    // Gift Certificate
    private readonly giftCertificateAccordion: Locator;
    private readonly giftCertificateInput: Locator;
    private readonly applyGiftCertificateButton: Locator;
    private readonly giftCertificateMessage: Locator;

    constructor(page: Page) {
        super(page);

        // Page Heading and Breadcrumb
        this.pageHeading = page.locator('#content h1');
        this.shoppingCartBreadcrumb = page.getByRole('link', {
            name: 'Shopping Cart'
        }).last();
        this.breadcrumb = page.locator('.breadcrumb');

        // Cart Products Table
        this.cartTable = page.locator('#content .table-responsive table');
        this.cartTableHeaders = this.cartTable.locator('thead th');
        this.cartProductRows = this.cartTable.locator('tbody tr');
        this.productImage = this.cartProductRows.first().locator('td').nth(0);
        this.productName = this.cartProductRows.first().locator('td').nth(1)
            .locator('a').first();
        this.productModel = this.cartProductRows.first().locator('td').nth(2);
        this.productRewardPoints = this.cartProductRows.first().locator('td').nth(1);
        this.productQuantityInput = this.cartProductRows.first()
            .locator('input[name*="quantity"]');
        this.productUnitPrice = this.cartProductRows.first().locator('td').nth(4);
        this.productTotalPrice = this.cartProductRows.first().locator('td').nth(5);

        // Cart Quantity Actions
        this.updateQuantityButton = this.cartProductRows.first()
            .locator('button').filter({ has: page.locator('i.fa-refresh') });
        this.removeProductButton = this.cartProductRows.first()
            .locator('button').filter({ has: page.locator('i.fa-times-circle') });

        // Stock and Status Messages
        this.stockWarningAlert = page.locator('.alert-danger');
        this.successAlert = page.locator('.alert-success');
        this.errorAlert = page.locator('.alert-danger');
        this.alertCloseButton = page.locator('.alert button.close, .alert .close');

        // Cart Weight
        this.cartWeight = page.locator('#content h1');

        // Cart Totals
        this.cartTotalsTable = page.locator('#content .row table').last();
        this.subTotalLabel = this.cartTotalsTable.locator('tr').filter({
            hasText: 'Sub-Total'
        });
        this.subTotalAmount = this.subTotalLabel.locator('td').last();
        this.ecoTaxLabel = this.cartTotalsTable.locator('tr').filter({
            hasText: 'Eco Tax'
        });
        this.ecoTaxAmount = this.ecoTaxLabel.locator('td').last();
        this.vatLabel = this.cartTotalsTable.locator('tr').filter({
            hasText: 'VAT'
        });
        this.vatAmount = this.vatLabel.locator('td').last();
        this.totalLabel = this.cartTotalsTable.locator('tr').filter({
            hasText: 'Total'
        });
        this.totalAmount = this.totalLabel.locator('td').last();

        // Checkout and Shopping Navigation
        this.continueShoppingButton = page.getByRole('link', {
            name: 'Continue Shopping'
        });
        this.checkoutButton = page.getByRole('link', {
            name: 'Checkout'
        });

        // Coupon Code
        this.couponCodeAccordion = page.getByText('Use Coupon Code', {
            exact: false
        });
        this.couponCodeInput = page.locator('#input-coupon');
        this.applyCouponButton = page.locator('#button-coupon');
        this.couponMessage = page.locator('#content .alert');

        // Shipping Estimate
        this.shippingEstimateAccordion = page.getByText('Estimate Shipping & Taxes', {
            exact: false
        });
        this.countryDropdown = page.locator('#input-country');
        this.regionDropdown = page.locator('#input-zone');
        this.postcodeInput = page.locator('#input-postcode');
        this.estimateShippingButton = page.locator('#button-quote');
        this.shippingMessage = page.locator('#content .alert');

        // Gift Certificate
        this.giftCertificateAccordion = page.getByText('Use Gift Certificate', {
            exact: false
        });
        this.giftCertificateInput = page.locator('#input-voucher');
        this.applyGiftCertificateButton = page.locator('#button-voucher');
        this.giftCertificateMessage = page.locator('#content .alert');
    }

    // Page Heading and Breadcrumb Methods

    async getPageHeader(): Promise<string> {
        const text = await this.pageHeading.innerText();
        console.log('Heading is --> ' + text);
        return text;
    }

    async isShoppingCartPageDisplayed(): Promise<boolean> {
        return await this.pageHeading.isVisible();
    }

    async getBreadcrumbText(): Promise<string> {
        return (await this.breadcrumb.innerText()).trim();
    }

    async clickShoppingCartBreadcrumb(): Promise<void> {
        await this.shoppingCartBreadcrumb.click();
    }

    // Cart Product Methods

    async getProductName(): Promise<string> {
        return (await this.productName.innerText()).trim();
    }

    async getProductModel(): Promise<string> {
        return (await this.productModel.innerText()).trim();
    }

    async getProductImage(): Promise<string | null> {
        return await this.productImage.locator('img').getAttribute('src');
    }

    async isProductImageDisplayed(): Promise<boolean> {
        return await this.productImage.locator('img').isVisible();
    }

    async getProductQuantity(): Promise<string> {
        return await this.productQuantityInput.inputValue();
    }

    async getProductUnitPrice(): Promise<string> {
        return (await this.productUnitPrice.innerText()).trim();
    }

    async getProductTotal(): Promise<string> {
        return (await this.productTotalPrice.innerText()).trim();
    }

    async getProductRewardPoints(): Promise<string> {
        return (await this.productRewardPoints.innerText()).trim();
    }

    async getProductCount(): Promise<number> {
        return await this.cartProductRows.count();
    }

    async isProductDisplayed(productName: string): Promise<boolean> {
        return await this.cartProductRows
            .filter({ hasText: productName })
            .count() > 0;
    }

    async getQuantityForProduct(productName: string): Promise<string> {
        const row = this.cartProductRows.filter({ hasText: productName });
        return await row.locator('input[name*="quantity"]').inputValue();
    }

    async getModelForProduct(productName: string): Promise<string> {
        const row = this.cartProductRows.filter({ hasText: productName });
        return (await row.locator('td').nth(2).innerText()).trim();
    }

    async getUnitPriceForProduct(productName: string): Promise<string> {
        const row = this.cartProductRows.filter({ hasText: productName });
        return (await row.locator('td').nth(4).innerText()).trim();
    }

    async getTotalForProduct(productName: string): Promise<string> {
        const row = this.cartProductRows.filter({ hasText: productName });
        return (await row.locator('td').nth(5).innerText()).trim();
    }

    // Cart Quantity Actions

    async updateProductQuantity(quantity: string): Promise<void> {
        await this.productQuantityInput.fill(quantity);
        await this.updateQuantityButton.click();
    }

    async updateQuantityForProduct(
        productName: string,
        quantity: string
    ): Promise<void> {
        const row = this.cartProductRows.filter({ hasText: productName });
        await row.locator('input[name*="quantity"]').fill(quantity);
        await row.locator('button').first().click();
    }

    async removeProduct(): Promise<void> {
        await this.removeProductButton.click();
    }

    async removeProductByName(productName: string): Promise<void> {
        const row = this.cartProductRows.filter({ hasText: productName });
        await row.locator('button').last().click();
    }

    // Stock and Status Messages

    async getStockWarningMessage(): Promise<string> {
        return (await this.stockWarningAlert.innerText()).trim();
    }

    async getSuccessAlertMessage(): Promise<string> {
        return (await this.successAlert.innerText()).trim();
    }

    async getErrorAlertMessage(): Promise<string> {
        return (await this.errorAlert.innerText()).trim();
    }

    async isStockWarningDisplayed(): Promise<boolean> {
        return await this.stockWarningAlert.isVisible();
    }

    async closeAlert(): Promise<void> {
        await this.alertCloseButton.first().click();
    }

    // Cart Weight

    async getCartWeight(): Promise<string> {
        const heading = await this.cartWeight.innerText();
        const match = heading.match(/\((.*?)\)/);
        return match ? match[1] : '';
    }

    // Cart Totals

    async getSubTotal(): Promise<string> {
        return (await this.subTotalAmount.innerText()).trim();
    }

    async getEcoTax(): Promise<string> {
        return (await this.ecoTaxAmount.innerText()).trim();
    }

    async getVAT(): Promise<string> {
        return (await this.vatAmount.innerText()).trim();
    }

    async getGrandTotal(): Promise<string> {
        return (await this.totalAmount.innerText()).trim();
    }

    // Checkout and Shopping Navigation

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    // Coupon Code

    async expandCouponCode(): Promise<void> {
        await this.couponCodeAccordion.click();
    }

    async applyCouponCode(code: string): Promise<void> {
        await this.couponCodeInput.fill(code);
        await this.applyCouponButton.click();
    }

    async getCouponMessage(): Promise<string> {
        return (await this.couponMessage.innerText()).trim();
    }

    // Shipping Estimate

    async expandShippingEstimate(): Promise<void> {
        await this.shippingEstimateAccordion.click();
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryDropdown.selectOption({ label: country });
    }

    async selectRegion(region: string): Promise<void> {
        await this.regionDropdown.selectOption({ label: region });
    }

    async enterPostcode(postcode: string): Promise<void> {
        await this.postcodeInput.fill(postcode);
    }

    async estimateShipping(): Promise<void> {
        await this.estimateShippingButton.click();
    }

    async getShippingMessage(): Promise<string> {
        return (await this.shippingMessage.innerText()).trim();
    }

    // Gift Certificate

    async expandGiftCertificate(): Promise<void> {
        await this.giftCertificateAccordion.click();
    }

    async applyGiftCertificate(code: string): Promise<void> {
        await this.giftCertificateInput.fill(code);
        await this.applyGiftCertificateButton.click();
    }

    async getGiftCertificateMessage(): Promise<string> {
        return (await this.giftCertificateMessage.innerText()).trim();
    }
}
