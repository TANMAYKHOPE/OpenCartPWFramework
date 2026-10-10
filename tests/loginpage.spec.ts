import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
//AAA--arrage act assert
//Assertions only in  test

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    homePage = new HomePage(page);
});

test('Login Page Title Test', async ({ page }) => {
    //let loginPage = new LoginPage(page);
    // await loginPage.gotoLoginPage();
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log(`Login Page Title is: ${pageTitle}`);
    expect(pageTitle).toBe('Account Login');
    //playwright assertion library has 2 types of assertion hard and soft
});

test('Forgot Password Link Exist Test', async ({ page }) => {
    let loginPage = new LoginPage(page);
    // await loginPage.gotoLoginPage();
    expect(await loginPage.isForotPasswordLinkExist()).toBeTruthy();
})

test('User is able to login with valida  cred', async () => {

   await loginPage.dologin('test.playwright@example.com', 'test@123');
   expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
   expect.soft(await homePage.getHomePagetitle()).toBe('My Account');




});