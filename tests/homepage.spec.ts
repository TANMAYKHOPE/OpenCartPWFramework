import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.dologin('test.playwright@example.com', 'test@123');
    homePage = new HomePage(page);
});

test('Home Page  title test', async () => {

    const pagetitile = await homePage.getHomePagetitle();
    console.log(`Home Page title is: ${pagetitile}`);
    expect(pagetitile).toBe('My Account');


});

test('Logout link exist test', async () => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('Home Page Header test', async () => {
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

test('Breadcrumb exist test', async () => {
    expect(await homePage.BreadcrumbExist()).toBeTruthy();
});

 
test('logo is visible test', async () => {
    expect(await homePage.isLogoVisible()).toBeTruthy();
});

test('Search box is visible test', async () => {
    expect(await homePage.isSearchBoxVisible()).toBeTruthy();
});

test('Currency link is visible test', async () => {
    expect(await homePage.isCurrencyVisible()).toBeTruthy();
});

test('Shopping cart link is visible test', async () => {
    await homePage.clickShoppingCart();
    expect(await homePage.isPageHeadingVisible()).toBeTruthy();
});

test('Checkout link is visible test', async () => {
    await homePage.clickCheckout();
    expect(await homePage.isPageHeadingVisible()).toBeTruthy();
});