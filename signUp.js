// document model 
const inputsOBJ = {

    signUpUsername: document.querySelector('#username'),
    signUpEmail: document.querySelector('#user-email'),
    signUpPhone: document.querySelector('#user-phone'),
    signUpPassword: document.querySelector('#user-password'),

}


const signPage = document.querySelector('#sign-page')
const orderPage = document.querySelector('#order-Page')
const homePage = document.querySelector('#home-page')


const loginbtn = document.querySelector('#login-button')
const singPagebtn = document.querySelector('#sign')
const signbtn = document.querySelector('#sign-up-btn')
const signOutbtn = document.querySelector('#sign-out')


// my Lists

const domainsList = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com', '@icloud.com', '@mail.com', '@proton.com',]

const userlist = JSON.parse(localStorage.getItem('allUsers')) || [
    {
        name: 'Emran',
        email: 'ansaryemran54@gmail.com',
        phone: '0798827229',
        password: '123abc.emran',
    },
]



console.log(userlist)


// My Functions 


const spaceValidation = (text) => {
    return !text.includes(' ')
}


const lengthValidation = (text, qty) => {
    return text.length >= qty
}


const uppercaseValidation = (text) => {
    return text != text.toLowerCase()
}

const lowercaseValidation = (text) => {
    return text == text.toLowerCase()
}


const symbolValidation = (text, symbols) => {
    let result = false
    symbols.forEach((symbol) => {
        if (text.includes(symbol)) {
            result = true
        }
    })
    return result
}


const domainValidation = (text, domainsList) => {
    let result = false
    domainsList.forEach((domain) => {
        if (text.endsWith(domain)) {
            result = true
        }
    })

    return result
}


const passwordValidation = (password) => {
    return spaceValidation(password) &&
        lengthValidation(password, 8) &&
        uppercaseValidation(password) &&
        symbolValidation(password, ['#', '@', '$', '.', '^', '%', ',', '-', '+', '*']);
}


const fieldValidation = (inputs) => {
    let isFieldValid = true

    Object.values(inputs).forEach((property) => {

        if (property.value.trim() == '') {
            isFieldValid = false

        }
    })

    if (isFieldValid == false) {
        alert('Please fill in all fields for sign in')
        return false;
    }
    return true;
}



const emailValidation = (email, domains) => {
    let standardEmail = email.toLowerCase().replaceAll(' ', '')

    if (domainValidation(standardEmail, domains) === false) {
        alert('Invalid Email Address! Please use standard domains like @gmail.com')
        return false;
    }
    return true;
}

const phoneValidation = (phone) => {
    let phoneLength = phone.trim().length
    let phoneNumber = Number(phone)

    if (isNaN(phoneNumber) || phoneLength != 10) {
        alert('Please check your phone number!')
        return false;
    }
    return true;
}

// my clicked buttons

signbtn.addEventListener('click', () => {

    if (fieldValidation(inputsOBJ) === false) return;
    if (emailValidation(inputsOBJ.signUpEmail.value, domainsList) === false) return
    if (phoneValidation(inputsOBJ.signUpPhone.value) === false) return
    if (passwordValidation(inputsOBJ.signUpPassword.value) == false) {
        alert('Password rules not met! It must be at least 8 characters, have an uppercase letter, a symbol (#, @, $ ...), and NO spaces.')
        return;
    }

    let checkedStandardEmail = inputsOBJ.signUpEmail.value.toLowerCase().replaceAll(' ', '')
    let newUser = {
        name: inputsOBJ.signUpUsername.value,
        email: checkedStandardEmail,
        phone: inputsOBJ.signUpPhone.value,
        password: inputsOBJ.signUpPassword.value
    }
    userlist.push(newUser)

    localStorage.setItem('allUsers', JSON.stringify(userlist))
    localStorage.setItem('currentUser', JSON.stringify(newUser))

    Object.values(inputsOBJ).forEach((property) => {
        property.value = ''
    })
    alert('Signed In Succesfully!')
    signPage.style.display = 'none'
    singPagebtn.style.display = 'none'
    signOutbtn.style.display = 'flex'
    loginbtn.style.display = 'none'
    inventoryPage.style.display = 'flex'
    clickedBTN()

    console.log(JSON.parse(localStorage.getItem('currentUser')))
    console.log(userlist)
})

// localStorage.clear()

signOutbtn.addEventListener('click', () => {
    let signout = confirm('Do you want to sign out?')

    if (signout === false) {
        alert('You canceled signing out!')
        return;
    }

    localStorage.setItem('currentUser', null)
    localStorage.removeItem('currentUser')
    alert('Sign Out Succesfuly')

    singPagebtn.style.display = 'flex'
    signOutbtn.style.display = 'none'
    loginbtn.style.display = 'flex'
    orderPage.style.display = 'none'
    inventoryPage.style.display = 'none'
    homePage.style.display = 'flex'

    console.log(userlist)
    console.log(JSON.parse(localStorage.getItem('currentUser')))
})
