import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { CsvHelper } from "../utils/CsvHelper";
import { ProductInfoPage } from "../pages/ProductInfo";
//define type for test fixtures
type MypageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultPage: SearchResultPage,
    productInfoPage: ProductInfoPage,
    testData: Record<string, string>[]
};

export  let  test=baseTest.extend<MypageFixtures>({

    loginPage: async ({ page }, use) => {

        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {

        let homePage = new HomePage(page);
        await use(homePage);


    },
    searchResultPage: async ({ page }, use) => {

        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },

    productInfoPage: async ({ page }, use) => {

        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
    testData : async({}, use)=>{
      let testData = CsvHelper.readCsv('src/TestData/LoginData.csv');
      await use(testData);
    }
});


export { expect } from "@playwright/test";