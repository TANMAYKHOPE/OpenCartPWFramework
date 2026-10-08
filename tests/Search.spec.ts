import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.dologin(process.env.USERNAME!, process.env.PASSWORD!);

});

test('Verify the seaacrh functionality with valid product', async ({ homePage }) => {

    const pagetitle = await homePage.getHomePagetitle();
    console.log(`Home Page Title is: ${pagetitle}`);
    expect.soft(pagetitle).toBe('My Account');
    await homePage.dosearch('MacBook');
    expect.soft(await homePage.getHomePagetitle()).toBe('Search - MacBook');
   
});

test('verify the  search result counts', async({homePage,searchResultPage})=>{
 await homePage.dosearch('MacBook');
 expect (await searchResultPage.getSearchResultsCount()).toBe(3);

});

test('verify user able to land  on product details page after clicking on product', async({homePage,searchResultPage, page})=>{
await homePage.dosearch('MacBook');
await searchResultPage.selectProduct('MacBook Pro');
expect(await page.title()).toBe('MacBook Pro');


});

const ProductData = CsvHelper.readCsv('src/TestData/Product.csv');
for(let row of ProductData){

test(`verify the  search result counts via CSV- ${row.searchkey} - ${row.Productname}`, async({homePage,searchResultPage})=>{
 await homePage.dosearch(row.searchkey);
 expect(await searchResultPage.getSearchResultsCount()).toBe(Number(row.resultcount));

})
};


for (const row of ProductData) {

test.skip(`verify user able to land  on product details page after clicking on product- ${row.searchkey}- ${row.Productname}`, async({homePage,searchResultPage, page})=>{
await homePage.dosearch(row.searchkey);
await searchResultPage.selectProduct(row.Productname);
expect(await page.title()).toBe(row.Productname);


});

}


