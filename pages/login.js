class LoginPage {
    constructor(page){
        this.page = page
        this.username = page.getByLabel('Username')
    }
}