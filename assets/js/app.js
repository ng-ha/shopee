const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const KEY = 'shopee_clone_by_nguyenha'

const registerBtn = $('#register-btn')
const registerForm = $('#register-form')
const loginBtn = $('#login-btn')
const loginForm = $('#login-form')
const modalAuth = $('.modal')
const backBtnsAuth = $$('.auth-form__controls-back')
const modalBodyAuth = $('.modal__body')
const switchBtnsAuth = $$('.auth-form__switch-btn')
const userBtn = $('#user')

const registSuccessPopUp = $('.auth-form__regist-success')
const registFailPopUp = $('.auth-form__regist-fail')
const loginBtnOnRegistSuccessPopUp = $('#login-btn-on-regist-success-pop-up')
const btnOnRegistFailPopUp = $('#btn-on-regist-fail-pop-up')

const btnsOnLoginFailPopUp= $$('.btn-on-login-fail-pop-up')
const loginWrongPassPopUp = $('.auth-form__login-wrong-password')
const loginNotRegEmailPassPopUp = $('.auth-form__login-not-registered-email')
const btnOnLoginSuccessPopUp= $('#btn-on-login-success-pop-up')
const loginSuccessPopUp= $('.auth-form__login-success')
const signOutBtn = $('#sign-out-btn')
const signOutPopUp = $('#sign-out-pop-up')
const userName = $('.header__navbar-user-name')

const forgetPasswordPopUp = $('.auth-form__login-forget-password')
const backBtnForgetPassword = $('#back-btn-forget-password')
const continueBtnForgetPassword = $('#continue-btn-forget-password')
const forgetPassBtn = $('#forget-password')


const loginBtnOnMobileTablet = $('.header__signin-on-mobile-tablet')
const userBtnOnMobileTablet = $('.header__avtar-on-mobile-tablet')

registerBtn.onclick = function() {
    modalAuth.classList.add('open')
    registerForm.classList.add('open')
}
loginBtn.onclick = function() {
    modalAuth.classList.add('open')
    loginForm.classList.add('open')
}
backBtnsAuth.forEach(backBtn => backBtn.onclick = function() {
    if (registerForm.classList.contains('open')) {
        registerForm.classList.remove('open')
    } else {
        loginForm.classList.remove('open')
    }
    modalAuth.classList.remove('open')
})
modalAuth.onclick = function() {
    if (registerForm.classList.contains('open')) {
        registerForm.classList.remove('open')
    } else {
        loginForm.classList.remove('open')
    }
    modalAuth.classList.remove('open')
}
modalBodyAuth.onclick= function(e) {
    e.stopPropagation()
}
switchBtnsAuth.forEach(btn => btn.onclick = function() {
    if (registerForm.classList.contains('open')) {
        registerForm.classList.remove('open')
        loginForm.classList.add('open')
    } else {
        registerForm.classList.add('open')
        loginForm.classList.remove('open')
    }
})
loginBtnOnRegistSuccessPopUp.onclick = function () {
    registSuccessPopUp.classList.remove('open')
    registerForm.classList.remove('open')
    loginForm.classList.add('open')
}
btnOnRegistFailPopUp.onclick = function() {
    registFailPopUp.classList.remove('open')
}
btnsOnLoginFailPopUp.forEach( btn => btn.onclick = function () {
    if (loginWrongPassPopUp.classList.contains('open')) {
        loginWrongPassPopUp.classList.remove('open')
    }    
    if (loginNotRegEmailPassPopUp.classList.contains('open')) {
        loginNotRegEmailPassPopUp.classList.remove('open')
    }    
})
btnOnLoginSuccessPopUp.onclick = function() {
    loginSuccessPopUp.classList.remove('open')
    loginForm.classList.remove('open')
    modalAuth.classList.remove('open')
}





const app = {
    config: JSON.parse(localStorage.getItem(KEY)) ?? {},
    setConfig(key,value) {
        // if (key==='accounts') {
        //     if (Array.isArray(this.config['accounts'])) {
        //         let emailExisted = false
        //         for (let i = 0; i < this.config['accounts'].length; ++i) {
        //             if (this.config['accounts'][i].email === value.email) {
        //                 emailExisted = true
        //                 break
        //             }
        //         }
        //         if (emailExisted) {
        //             return false
        //         } else {
        //             this.config['accounts'].push(value)
        //         }
        //     } else {
        //         this.config['accounts'] = [value]
        //     }
        // } else {
        //     this.config[key] = value
        // }

        switch (key) {
            case 'accounts':
                if (Array.isArray(this.config['accounts'])) {
                    let emailExisted = false
                    for (let i = 0; i < this.config['accounts'].length; ++i) {
                        if (this.config['accounts'][i].email === value.email) {
                            emailExisted = true
                            break
                        }
                    }
                    if (emailExisted) {
                        return false
                    } else {
                        this.config['accounts'].push(value)
                    }
                } else {
                    this.config['accounts'] = [value]
                }
                break
            case 'like':
                if (Array.isArray(this.config.like)) {
                    let itemExists = false
                    for (let i = 0; i < this.config.like.length; ++i) {
                        if (this.config.like[i].indexItem === value.indexItem) {
                            itemExists = true
                            this.config.like[i] = value
                            break
                        }
                    }
                    if (itemExists === false) {
                        this.config.like.push(value)
                    }
                } else {
                    this.config.like = [value]
                }
                break
            case 'rate':
                if (Array.isArray(this.config.rate)) {
                    let itemExists = false
                    for (let i = 0; i < this.config.rate.length; ++i) {
                        if (this.config.rate[i].indexItem === value.indexItem) {
                            itemExists = true
                            this.config.rate[i] = value
                            break
                        }
                    }
                    if (itemExists === false) {
                        this.config.rate.push(value)
                    }
                } else {
                    this.config.rate = [value]
                }
                break
            default:
                this.config[key] = value
        }
        localStorage.setItem(KEY, JSON.stringify(this.config))
        return true
    },
    validator(formSelector) {
        const formElement = $(formSelector)
        const formRules = {}
        const validatorRules = {
            /** Nếu có lỗi thì return 'error massage'
            *  Nếu không có lỗi thì return undefined
            */
            required: function (value) {
                return value ? undefined : 'Vui lòng nhập trường này!'
            },
            email: function (value) {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return regex.test(value) ? undefined : 'Trường này phải là email hợp lệ!'
            },
            min: function (min) {
                return function (value) {
                    return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự!`
                }
            },
            max: function (max) {
                return function (value) {
                    return value.length >= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự!`
                }
            },
            confirm: function (value) {
                return value === $('#password-regist').value ? undefined : 'Giá trị nhập vào không chính xác!'
            }
        }

        if (formElement) {
            const inputs = formElement.querySelectorAll('[name][rules]')

            for (let input of inputs) {
                // 1. LẤY FORMRULES
                const rules = input.getAttribute('rules').split('|')
                // rules là 1 array chứa các rule (bằng chữ)

                for (let rule of rules) {
                    let ruleFunc = validatorRules[rule]
                    // Nếu rule là min:6 thì sẽ ra undefined do trong validatorRules không có key là min:6, chi có key là min

                    if (rule.includes(':')) {
                        // rule.indexOf(':') khác -1 (có chứa ký tự :)
                        const ruleInfo = rule.split(':')
                        ruleFunc = validatorRules[ruleInfo[0]](Number.parseInt(ruleInfo[1]))
                    }

                    if (Array.isArray(formRules[input.name])) {
                        formRules[input.name].push(ruleFunc)
                    } else {
                        formRules[input.name] = [ruleFunc]
                    }
                }
                // 2. GÁN RULE CHO TỪNG INPUT, ADD EVENT LISTENER
                input.onblur = validate
                input.oninput = clearError
            }

            formElement.onsubmit = event => {
                event.preventDefault()

                const inputs = formElement.querySelectorAll('[name][rules]')
                let isValid = true
                for (let input of inputs) {
                    if (!validate({ target: input })) {
                        /** Cách 2:
                         *  input.focus()
                         *  input.blur() 
                         */
                        isValid = false
                    }
                }

                if (isValid) {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disable])')
                    var formValue = Array.from(enableInputs).reduce(function (values, input) {
                        // return (values[input.name] = input.value) && values    
                        // tuong tu
                        // values[input.name] = input.value
                        // return values
                        switch (input.type) {
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = []
                                    }
                                    return values
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = []
                                }
                                values[input.name].push(input.value)
                                break
                            case 'radio':
                                if (input.matches(':checked')) { values[input.name] = input.value }
                                // tuong tu
                                // values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                                break
                            case 'file':
                                values[input.name] = input.files
                                break
                            default:
                                values[input.name] = input.value

                        }
                        return values
                    }, {})
                    if (formSelector==='#register-form') {
                        this.regist(formValue)
                    } else {
                        this.login(formValue)
                    }
                }
            }
        }

        function validate(event) {
            const rules = formRules[event.target.name]
            // rules là 1 array chứa các function rule
            let errorMessage

            rules.some(function (rule) {
                errorMessage = rule(event.target.value)
                return rule(event.target.value)
            })

            if (errorMessage) {
                const formGroup = event.target.closest('.form-group')
                const formMessage = formGroup?.querySelector('.form-message')
                formGroup?.classList.add('invalid')
                if (formMessage) { formMessage.innerText = errorMessage }
            }
            return !errorMessage
        }

        function clearError(event) {
            const formGroup = event.target.closest('.form-group')
            const formMessage = formGroup?.querySelector('.form-message')

            if (formGroup?.classList.contains('invalid')) {
                formGroup?.classList.remove('invalid')
                if (formMessage) { formMessage.innerText = '' }
            }
        }
    },
    regist(formValue) {
        console.log('regist: ',formValue)
        if (this.setConfig('accounts',{email: formValue['email-regist'], password: formValue['password-regist']})) {
            registSuccessPopUp.classList.add('open')
        } else {
            registFailPopUp.classList.add('open')
        }
    },
    login(formValue) {
        console.log('login: ',formValue)
        let emailExists = false
        let accountIndex 
        for (let i = 0; i < this.config['accounts'].length; ++i) {
            if (this.config['accounts'][i].email === formValue['email-login']) {
                emailExists = true
                accountIndex = i
                break
            }
        }
        if (emailExists) {
            if (this.config['accounts'][accountIndex].password === formValue['password-login']) {
                loginSuccessPopUp.classList.add('open')
                // this.signIn()
                this.setConfig('logStatus',{isLogged: true, accountIndex: accountIndex})
                this.renderAcc()
            } else {
                loginWrongPassPopUp.classList.add('open')
            }
        } else {
            loginNotRegEmailPassPopUp.classList.add('open')
        }
    },
    signIn() {
    //  remove nut dang nhap dang ky, open nut user, thay email cuar usser
        registerBtn.classList.remove('open')
        loginBtn.classList.remove('open')
        userBtn.classList.add('open')
    },
    signOut() {
        userBtn.classList.remove('open')
        registerBtn.classList.add('open')
        loginBtn.classList.add('open')
    },
    renderAcc() {
        if (this.config.logStatus.isLogged) {
            userBtn.classList.add('open')
            registerBtn.classList.remove('open')
            loginBtn.classList.remove('open')
            userName.innerText = this.config.accounts[this.config.logStatus.accountIndex].email
            
            userBtnOnMobileTablet.classList.add('open')
            loginBtnOnMobileTablet.classList.remove('open')
        } else {
            registerBtn.classList.add('open')
            loginBtn.classList.add('open')
            userBtn.classList.remove('open')

            loginBtnOnMobileTablet.classList.add('open')
            userBtnOnMobileTablet.classList.remove('open')
        }
    },
    renderProductItem() {
        const items = $$('.home-product-item')
        items.forEach((item, indexItem) => {
            item.classList.add(`item-${indexItem}`)
            const like = item.querySelector('.home-product-item__like')
            like.onclick = () => {
                if (like.classList.contains('home-product-item__like--liked')) {
                    like.classList.remove('home-product-item__like--liked')
                    this.setConfig('like',{indexItem: indexItem, liked: false})
                } else {
                    like.classList.add('home-product-item__like--liked')
                    this.setConfig('like',{indexItem: indexItem, liked: true})
                }
            }
            
            const stars = item.querySelectorAll('.home-product-item__rating i')
            stars.forEach((star, indexStar) => {
                star.classList.add(`star-${indexStar}`)
            })
            item.querySelector('.home-product-item__rating').onclick = (e) => {
                if (e.target.classList.contains('star-0')) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.remove('home-product-item__star--gold')
                    stars[2].classList.remove('home-product-item__star--gold')
                    stars[3].classList.remove('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                    this.setConfig('rate',{indexItem: indexItem, star: 0})
                }
                if (e.target.classList.contains('star-1')) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.remove('home-product-item__star--gold')
                    stars[3].classList.remove('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                    this.setConfig('rate',{indexItem: indexItem, star: 1})

                }
                if (e.target.classList.contains('star-2')) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.add('home-product-item__star--gold')
                    stars[3].classList.remove('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                    this.setConfig('rate',{indexItem: indexItem, star: 2})

                }
                if (e.target.classList.contains('star-3')) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.add('home-product-item__star--gold')
                    stars[3].classList.add('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                    this.setConfig('rate',{indexItem: indexItem, star: 3})

                }
                if (e.target.classList.contains('star-4')) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.add('home-product-item__star--gold')
                    stars[3].classList.add('home-product-item__star--gold')
                    stars[4].classList.add('home-product-item__star--gold')
                    this.setConfig('rate',{indexItem: indexItem, star: 4})

                }
            }
        })
        

        // Render like
        if (Array.isArray(this.config.like)) {
            for (let i = 0; i < this.config.like.length; ++i) {
                if (this.config.like[i].liked) {
                    document.querySelector(`.item-${this.config.like[i].indexItem}`).classList.add('home-product-item__like--liked')
                }
            }
        }
        // Render rating
        if (Array.isArray(this.config.rate)) {
            for (let i = 0; i < this.config.rate.length; ++i) {
                const item = $(`.item-${this.config.rate[i].indexItem}`)
                const stars = item.querySelectorAll('.home-product-item__rating i')
                
                if (this.config.rate[i].star === 0) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.remove('home-product-item__star--gold')
                    stars[2].classList.remove('home-product-item__star--gold')
                    stars[3].classList.remove('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                }
                if (this.config.rate[i].star === 1) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.remove('home-product-item__star--gold')
                    stars[3].classList.remove('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                }
                if (this.config.rate[i].star === 2) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.add('home-product-item__star--gold')
                    stars[3].classList.remove('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                }
                if (this.config.rate[i].star === 3) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.add('home-product-item__star--gold')
                    stars[3].classList.add('home-product-item__star--gold')
                    stars[4].classList.remove('home-product-item__star--gold')
                }
                if (this.config.rate[i].star === 4) {
                    stars[0].classList.add('home-product-item__star--gold')
                    stars[1].classList.add('home-product-item__star--gold')
                    stars[2].classList.add('home-product-item__star--gold')
                    stars[3].classList.add('home-product-item__star--gold')
                    stars[4].classList.add('home-product-item__star--gold')
                }
            }
        }
    },
    start() {
        if (!this.config['logStatus']) {
            this.setConfig('logStatus',{isLogged: false, accountIndex: null})
        }
        this.setConfig('accounts',{email: 'test@gmail.com', password: '123456'})
        this.renderProductItem()
        this.validator('#register-form')
        this.validator('#login-form')

        this.renderAcc()
    }
}
app.start()


signOutBtn.onclick = function() {
    app.setConfig('logStatus',{isLogged: false, accountIndex: null})
    app.renderAcc()
    // const animation1 = signOutPopUp.animate([{opacity: 1, right: 0}], {duration: 2000, iteration: 1})          
    // const animation2 = signOutPopUp.animate([{opacity: 0, right: '-200%'}], {duration: 2000, delay: 3000, iteration: 1})          
    // animation1.play()
    // animation2.play()

    signOutPopUp.classList.add('open')
    setTimeout(()=>{
        signOutPopUp.classList.remove('open')
    },2000)
}
$('#sign-out-btn-on-mobile-tablet').onclick = () => {
    app.setConfig('logStatus',{isLogged: false, accountIndex: null})
    app.renderAcc()
    console.log(1)
    console.log($('#sign-out-pop-up-on-mobile-tablet').classList.add('open'))
    setTimeout(()=>{
        console.log(2)
        $('#sign-out-pop-up-on-mobile-tablet').classList.remove('open')
    },2000)
}
backBtnForgetPassword.onclick = () => {
    forgetPasswordPopUp.classList.remove('open')
}
forgetPassBtn.onclick = () => {
    forgetPasswordPopUp.classList.add('open')
}
const emailForget = $('#email-forget')
continueBtnForgetPassword.onclick = () => {
    if (emailForget.value === 'reset') {
        localStorage.clear()
        emailForget.value = 'Done!'
        return undefined
    }
    let emailExists = false
    let accountIndex
    for (let i = 0; i < app.config.accounts.length; ++i) {
        if(app.config.accounts[i].email === emailForget.value) {
            emailExists = true
            accountIndex = i
            break
        }
    }
    if (emailExists) {
        emailForget.value = `Password: ${app.config.accounts[accountIndex].password}`
    } else {
        emailForget.value = 'Nhập sai giá trị! Vui lòng nhập lại.' 
    }
}
emailForget.onkeyup = function(e) {
    if (e.keyCode === 13) {
       e.stopPropagation()
    }
}

let cartItemQnt = 4
for (let i = 1; i < 5; ++i) {
    $(`.remove-cart-item-${i}`).onclick = () => {
        $(`.cart-item-${i}`).innerHTML = ''
        --cartItemQnt
        $('.header__cart-notice').innerText = cartItemQnt
        if (cartItemQnt === 0) {
            $('.header__cart-list').classList.add('header__cart-list--no-cart')
        }
    }
}
const headerCart = $('.header__cart')
const headerCartList = $('.header__cart-list')
headerCart.onclick = function() {
    headerCartList.classList.toggle('open')
}
const NotiBtnOnMobileTablet = $('.header__noti-on-mobile-tablet')
const headerNotify = $('.header__notify-on-mobile-tablet')
NotiBtnOnMobileTablet.onclick = () => {
    headerNotify.classList.toggle('open')
}

$('.header__signin-on-mobile-tablet').onclick = () => {
    modalAuth.classList.add('open')
    loginForm.classList.add('open')
}

userBtnOnMobileTablet.onclick = () => {
    $('#user-menu-on-mobile-tablet').classList.toggle('open')
}
