import { test, expect } from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
//import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.dologin(process.env.USERNAME!, process.env.PASSWORD!);

});

test(`verify page  logo on product page`, async ({ basepage }) => {
    expect(await basepage.LogoVisible()).toBeTruthy();


});

test(`verify footer on product page`, async({basepage})=>{
 expect(await basepage.getFootercount()).toBe(16);

})




test(`verify the prodcut imag`, async ({ homePage, searchResultPage, productInfoPage }) => {
    await homePage.dosearch('MacBook');
    await searchResultPage.selectProduct('MacBook Pro');
    let imageCount = await productInfoPage.getProductImageCount();
    console.log(`Product Image Count is: ${imageCount}`);
    expect(imageCount).toBe(4);
});

test(`verify the product information`, async ({ homePage, searchResultPage, productInfoPage }) => {
    await homePage.dosearch('MacBook');
    await searchResultPage.selectProduct('MacBook Pro');
    let actualProductinformation = await productInfoPage.getProductInformation();

    console.log(`Actual Product Information is:-`, actualProductinformation);
    expect.soft(actualProductinformation.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductinformation.get('ProductImageCounts')).toBe(4);
    expect.soft(actualProductinformation.get('Brand')).toBe('Apple');
    expect.soft(actualProductinformation.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductinformation.get('ExTax')).toBe('$2,000.00');

});


//Assignment :-supply data from csv and json file to verify the product information

test(`Verify product is added to the cart successfully`, async ({ homePage, searchResultPage, productInfoPage }) => {
    await homePage.dosearch('MacBook');
    await searchResultPage.selectProduct('MacBook Pro');
    await productInfoPage.addProducttoCard();

    const message = await productInfoPage.getAddToCartSuccessMessage();

    expect(message).toContain(
        'You have added MacBook Pro to your shopping cart!'
    );
});

test(`Verify success message content`, async ({ homePage, searchResultPage, productInfoPage }) => {
    await homePage.dosearch('MacBook');
    await searchResultPage.selectProduct('MacBook Pro');
    await productInfoPage.addProducttoCard();
    let actualTitle = await productInfoPage.clickonShoppingcart();
    expect(actualTitle).toBe('Shopping Cart');




});


test('TC_CART_002 - Verify success message content', async ({
    homePage,
    searchResultPage,
    productInfoPage
}) => {
    const productName = 'MacBook Pro';

    await homePage.dosearch('MacBook');
    await searchResultPage.selectProduct(productName);
    await productInfoPage.addProducttoCard();

    // Verify alert visibility
    //expect(await productInfoPage.isSuccessAlertVisible()).toBeTruthy();

    // Verify success message
    const message = await productInfoPage.getSuccessAlertMessage();
    expect(message).toContain(productName);
    expect(message).toContain('shopping cart');

    // Verify Shopping Cart link
    const cartLink = await productInfoPage.getShoppingCartLink();
    await expect(cartLink).toBeVisible();
    await expect(cartLink).toHaveAttribute(
        'href',
        /route=checkout\/cart/
    );

    await productInfoPage.clickonShoppingcart();

});


test(`verify Shopping cart Navigation`, async ({ homePage, searchResultPage, productInfoPage }) => {
    const productName = 'MacBook Pro';
    await homePage.dosearch(productName);
    await searchResultPage.selectProduct(productName);
    await productInfoPage.addProducttoCard();
    const message = await productInfoPage.getSuccessAlertMessage();
    expect(message).toContain(productName);
    expect(message).toContain('shopping cart');
    await productInfoPage.clickonShoppingcart();
    await productInfoPage.getShppoingCardHeader();




});