'use strict';

//validate the input
//check if account already exist
//if not create account
//if yes then tell that the account already
//exist and tell them to login in

const form = document.querySelector('form');

const fullName = document.querySelector("input[name='fullname']");
const email = document.querySelector("input[name='email']");
const password = document.querySelector("input[name='Password']");
const confirmPassword = document.querySelector("input[name='confirmpassword']");
const dateOfBirth = document.querySelector('input[name="BirthYear"]');
const gender = document.querySelectorAll('input[name="gender"]');
const profilePicture = document.querySelector('input[name="profileImage"]');
const termsCond = document.querySelector("input[name='termsandconditions']");

const submitBtn = document.querySelector('input[type="submit"]');

class App {
  accounts = [];
  strengthIndicator;
  passwordChecker;
  constructor() {
    form.addEventListener('submit', this._handleInput.bind(this));
    password.addEventListener('input', this._showPassWordIndicator);
    confirmPassword.addEventListener('input', this._checkPassword);
  }

  _showPassWordIndicator() {
    // console.log(password.value);

    password.value.length >= 1 && password.value.length <= 5
      ? (console.log('Weak'), (this.strengthIndicator = 'weak'))
      : password.value.length <= 8
      ? (console.log('Medium'), (this.strengthIndicator = 'medium'))
      : (console.log('Strong'), (this.strengthIndicator = 'strong'));
    let ele = document.querySelector('.password');
    ele.remove();
    let html = ` <div class="password ${
      password.value.length === 0 ? 'hidden' : ''
    } password__visual--${this.strengthIndicator}">${
      this.strengthIndicator[0].toUpperCase() + this.strengthIndicator.slice(1)
    }</div>`;
    password.insertAdjacentHTML('afterend', html);
  }

  _checkPassword() {
    this.passwordChecker =
      password.value === confirmPassword.value ? true : false;
    let ele = document.querySelector('.con');
    ele.remove();
    console.log(this.passwordChecker);
    let html = ` <div class="password con ${
      this.passwordChecker ? 'hidden' : ''
    } password__visual--true">Please Enter the same password</div>`;
    confirmPassword.insertAdjacentHTML('afterend', html);
  }
  _handleInput(e) {
    e.preventDefault();
    this._setInput();
    this._validateInput() &&
      !this._checkAccountExists() &&
      this._createAccount();
  }
  _setInput() {
    this.fullName = fullName.value;
    this.email = email.value;
    this.password = password.value;
    this.confirmPassword = confirmPassword.value;
    this.dateOfBirth = dateOfBirth.value;
    [...gender].forEach(input => {
      if (input.checked) {
        this.gender = input.value;
      }
    });
    this.profilePicture = profilePicture.value;
    this.termsCond = termsCond.value;
  }

  _validateInput() {
    if (this._checkValidInput()) {
      console.log('input are valid');
      return true;
    }
    return false;
  }

  _checkValidInput() {
    let firstCheck = [
      this.fullName,
      this.email,
      this.password,
      this.confirmPassword,
      this.dateOfBirth,
      this.gender,
      this.profilePicture,
      this.termsCond,
    ].every(input => input != '');
    console.log(firstCheck);
    if (!firstCheck) return false;
    return this.password === this.confirmPassword;
  }

  _checkAccountExists() {
    return this.accounts.some(account => account.email === this.email);
  }

  _createAccount() {
    let account = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      dateofBirth: this.dateOfBirth,
      gender: this.gender,
    };
    this.accounts.push(account);
  }
}

const app = new App();
