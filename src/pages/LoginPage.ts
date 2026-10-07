
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {

    //locators: private  locator
    private readonly emailID: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly LoginError: Locator;

    //constructor:of class for  initializing the locators

    constructor(page: Page) {
        super(page);
        this.emailID = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.LoginError = page.locator('.alert.alert-danger.alert-dismissible');
    };

    //methods: of class for performing actions on the locators
    async gotoLoginPage(): Promise<void> {

        await this.page.goto('opencart/index.php?route=account/login');


    }

    async getLoginPageTitle():Promise<string> {

       return await this.page.title();
    }

    async isForotPasswordLinkExist():Promise<boolean> {
        return await this.forgotPasswordLink.isVisible();
    }

    async dologin(username:string,password:string):Promise<void>  {
        console.log(`Login with username: ${username} and password: ${password}`);
        await this.emailID.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        


    }

    async invalidloginErrorDisplayed():Promise<boolean> {
        return await this.LoginError.isVisible();
    }







}