import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.dologin('test.playwright@example.com', 'test@123');

});

test('Home Page  title test', async ({ homePage }) => {

    const pagetitile = await homePage.getHomePagetitle();
    console.log(`Home Page title is: ${pagetitile}`);
    expect(pagetitile).toBe('My Account');


});

test('Logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('Home Page Header test', async ({ homePage }) => {
    const allheaders = await homePage.getHomePageHeader();

    console.log('Home Page headers are:', allheaders);

    expect(allheaders).toHaveLength(3);

    expect(allheaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});

test('Breadcrumb exist test', async ({ homePage }) => {
    expect(await homePage.BreadcrumbExist()).toBeTruthy();
});


test('logo is visible test', async ({ homePage }) => {
    expect(await homePage.isLogoVisible()).toBeTruthy();
});

test('Search box is visible test', async ({ homePage }) => {
    expect(await homePage.isSearchBoxVisible()).toBeTruthy();
});

test('Currency link is visible test', async ({ homePage }) => {
    expect(await homePage.isCurrencyVisible()).toBeTruthy();
});

test('Shopping cart link is visible test', async ({ homePage }) => {
    await homePage.clickShoppingCart();
    expect(await homePage.isPageHeadingVisible()).toBeTruthy();
});

test('Checkout link is visible test', async ({ homePage }) => {
    await homePage.clickCheckout();
    expect(await homePage.isPageHeadingVisible()).toBeTruthy();
});