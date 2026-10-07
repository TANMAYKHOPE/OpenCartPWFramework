import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.dologin(process.env.USERNAME!, process.env.PASSWORD!);

});


test(`verify the prodcut imag`, async ({ homePage, searchResultPage, productInfoPage }) => {
  await homePage.dosearch('MacBook');
    await searchResultPage.selectProduct('MacBook Pro');
    let imageCount = await productInfoPage.getProductImageCount();
    console.log(`Product Image Count is: ${imageCount}`);
    expect(imageCount).toBe(4);
});

test(`verify the product information`, async({homePage,searchResultPage,productInfoPage})=>{
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