import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

//AAA--arrage act assert
//Assertions only in  test



test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();

});

test('Login Page Title Test', async ({ loginPage }) => {
    //let loginPage = new LoginPage(page);
    // await loginPage.gotoLoginPage();
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log(`Login Page Title is: ${pageTitle}`);
    expect(pageTitle).toBe('Account Login');
});

test('Forgot Password Link Exist Test', async ({ loginPage }) => {
    //let loginPage = new LoginPage(page);
    // await loginPage.gotoLoginPage();
    expect(await loginPage.isForotPasswordLinkExist()).toBeTruthy();
})

test.skip('User is able to login with valida  cred', async ({ loginPage, homePage }) => {

    await loginPage.dologin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePagetitle()).toBe('Account Login');




});


//DataDriven 1-->sequential test execution run only one  test with test data from fixture
test('User is able to login with invalid credentials from csv', async ({ loginPage, testData }) => {

    for (let row of testData) {
        await loginPage.dologin(row.username, row.password);
        expect.soft(await loginPage.invalidloginErrorDisplayed()).toBeTruthy();
    }
});

//Data Driven 2-->parallel test execution 
let testData = CsvHelper.readCsv('src/TestData/LoginData.csv');

for (let row of testData) {
    test(`User is able to see login error with invalid credentials: ${row.username}`, async ({ loginPage }) => {
        await loginPage.dologin(row.username, row.password);
        expect.soft(await loginPage.invalidloginErrorDisplayed()).toBeTruthy();
    });
}




//Data Driven 3-->parallel test execution with excel data

let ExcelData = ExcelHelper.readExcel('src/TestData/OpenCart.xlsx','Login');

for (let row of ExcelData) {
    test(`User is able to see login error with invalid credentials excel data: ${row.username}`, async ({ loginPage }) => {
        await loginPage.dologin(row.username, row.password);
        expect.soft(await loginPage.invalidloginErrorDisplayed()).toBeTruthy();
    });
}

//Data  driver with json data
let jsonData = JsonHelper.readJson('src/TestData/LoginData.json');
for (let row of jsonData) {
    test(`User is able to see login error with invalid credentials json data: ${row.username}`, async ({ loginPage }) => {
        await loginPage.dologin(row.username, row.password);
        expect.soft(await loginPage.invalidloginErrorDisplayed()).toBeTruthy();
    });
}