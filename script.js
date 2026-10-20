const buttonsOBJ = {
    homeBTN: document.querySelector('#homeBTN'),
    viewBTN: document.querySelector('#viewBTN'),
    inventoryBTN: document.querySelector('#inventoryBTN'),
    aboutBTN: document.querySelector('#aboutBTN'),
    contactBTN: document.querySelector('#contactBTN'),
    browseCars: document.querySelector('#hero-BTN')
}

const buttonsOBJ2 = {
    signBTN: document.querySelector('#sign'),
    loginBTN: document.querySelector('#login-button'),
}
const pages = {
    homePage: document.querySelector('#home-page'),
    inventoryPage: document.querySelector('#inventory-page'),
    aboutPage: document.querySelector('#about'),
    contactPage: document.querySelector('#contact-page'),
    signPage: document.querySelector('#sign-page'),
    loginPage: document.querySelector('#login-page'),
    driveTestPage: document.querySelector('#order-Page')
}

const buttons = document.querySelectorAll('body>header>nav>button, #sign, #login-button, #viewBTN, #hero-BTN')

console.log(buttons)


let clickedBTN = () => {

    buttons.forEach((button) => {

        button.addEventListener('click', () => {

            Object.values(buttonsOBJ).forEach((button) => {
                button.style.backgroundColor = 'rgba(205, 205, 205, 0.667)'
                button.style.color = 'black'

            })
            Object.values(pages).forEach((page) => {
                page.style.display = 'none'

            })

            switch (button) {

                case buttonsOBJ.homeBTN:
                    pages.homePage.style.display = 'flex'
                    buttonsOBJ.homeBTN.style.backgroundColor = 'black'
                    buttonsOBJ.homeBTN.style.color = 'white'
                    break;
                case buttonsOBJ.viewBTN:
                    pages.inventoryPage.style.display = 'flex'
                    break;

                case buttonsOBJ.browseCars:
                    pages.inventoryPage.style.display = 'flex'
                    break;


                case buttonsOBJ.inventoryBTN:
                    pages.inventoryPage.style.display = 'flex'
                    buttonsOBJ.inventoryBTN.style.backgroundColor = 'black'
                    buttonsOBJ.inventoryBTN.style.color = 'white'
                    break;

                case buttonsOBJ.aboutBTN:
                    pages.aboutPage.style.display = 'flex'
                    buttonsOBJ.aboutBTN.style.backgroundColor = 'black'
                    buttonsOBJ.aboutBTN.style.color = 'white'
                    break;

                case buttonsOBJ.contactBTN:
                    pages.contactPage.style.display = 'flex'
                    buttonsOBJ.contactBTN.style.backgroundColor = 'black'
                    buttonsOBJ.contactBTN.style.color = 'white'
                    alert("The message box will be available in the next version! 🚀 For now, please use our email and contact info on the right side of the page.");
                    break;

                case buttonsOBJ2.signBTN:
                    pages.signPage.style.display = 'flex'
                    break;

                case buttonsOBJ2.loginBTN:
                    pages.loginPage.style.display = 'flex'
                    break;

                default:
                    break;

            }

        })

    })

}



clickedBTN()




