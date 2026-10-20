
const loginobj = {
    loginEmail: document.querySelector('#login-email'),
    loginPassword: document.querySelector('#login-password'),
    checkBox: document.querySelector('#remember-checkBox')
}

const loginPage = document.querySelector('#login-page')
const loginUserList = JSON.parse(localStorage.getItem('allUsers')) || []




const loginSubmit = document.querySelector('#login-btn')
const googleBTN = document.querySelector('#google')
const facebookBTN = document.querySelector('#facebook')
const appleBTN = document.querySelector('#apple')




loginSubmit.addEventListener('click', () => {
    if (fieldValidation(loginobj) === false) return;
    if (emailValidation(loginobj.loginEmail.value, domainsList) === false) return;
    if (passwordValidation(loginobj.loginPassword.value) === false) return;

    let checkedEmail = loginobj.loginEmail.value.toLowerCase().replaceAll(' ', '')
    let loginPass = loginobj.loginPassword.value;


    let foundUser = loginUserList.find(user => user.email === checkedEmail && user.password === loginPass)

    if (foundUser == undefined) {
        alert('Please Check your Credentials')
        return;
    }

    alert('Loged In Succesfully!')
    localStorage.setItem('currentUser', JSON.stringify(foundUser))

    Object.values(loginobj).forEach((property) => {
        property.value = ''
    })

    loginPage.style.display = 'none'
    singPagebtn.style.display = 'none'
    loginbtn.style.display = 'none'
    signOutbtn.style.display = 'flex'
    inventoryPage.style.display = 'flex'
    clickedBTN()
    console.log(foundUser)
})


const showWarning = () => {
    alert('This Option will be available in the next version! Please use from your email and password for now. ')
}

googleBTN.addEventListener('click', showWarning)
appleBTN.addEventListener('click', showWarning)
facebookBTN.addEventListener('click', showWarning)