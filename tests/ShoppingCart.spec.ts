import { test, expect } from '../src/fixtures/pagefixtures';
//import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.dologin(process.env.USERNAME!, process.env.PASSWORD!);

});


test("Verify shopping cart heading", async ({  homePage, searchResultPage, productInfoPage,shoppingCart }) => {
    const productName = 'MacBook Pro';
    await homePage.dosearch(productName);
    await searchResultPage.selectProduct(productName);
    await productInfoPage.addProducttoCard();
    const message = await productInfoPage.getSuccessAlertMessage();
    expect(message).toContain(productName);
    expect(message).toContain('shopping cart');
    await productInfoPage.clickonShoppingcart();
    const heading = await shoppingCart.getPageHeader();
    expect(heading).toContain("Shopping Cart");
});



test("TC_CART_001 - Verify added product appears in the cart", async ({ homePage, searchResultPage, productInfoPage, shoppingCart }) => {

    const productName = 'MacBook Pro';
    const quantity = '1';

    await homePage.dosearch('MacBook');

    await searchResultPage.selectProduct(productName);

    const name = await productInfoPage.getProductInformation();
    const price = await productInfoPage.getProductPriceingData()

    expect(name).toContain(productName);
    expect(price).toBeTruthy();

//await productInfoPage.setQuantity(quantity);
    await productInfoPage.addProducttoCard();

    const message = await productInfoPage.getSuccessAlertMessage();
    expect(message).toContain(productName);

    await productInfoPage.clickonShoppingcart();

    const heading = await shoppingCart.getPageHeader();
    expect(heading).toContain('Shopping Cart');

    const cartProductName = await shoppingCart.getProductName();
    const cartModel = await shoppingCart.getProductModel();
    const cartQuantity = await shoppingCart.getProductQuantity();
    const cartUnitPrice = await shoppingCart.getProductUnitPrice();
    const cartTotal = await shoppingCart.getProductTotal();

    expect(cartProductName).toContain(productName);
    expect(cartModel).toBeTruthy();
    expect(cartQuantity).toBe('1');
    expect(cartUnitPrice).toBe(price);
    expect(cartTotal).toBe(cartUnitPrice);

});
