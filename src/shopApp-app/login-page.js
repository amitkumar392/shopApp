import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner.js';

/**
 * Define an element class
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
    /**
     * Define the element's template
     */
    static get template() {
        return html`
        <style>
        :host {
          display: block;
        }
        #btn{
         background-color:  #ff7a22;
         color: white;
         text-align:center;
         width:100%;
         margin-top:20px;
        }
        #loginForm
        {
            width:30%;
            margin:0px auto;
            border:1px solid black;
            padding:10px;
            margin-top:100px;
            border-radius:20px;
            background:light-pink;

        }
    
        header{
            background-color: #ff7a22;
            display: grid;
            grid-template-rows: 100px;
            grid-template-columns: 200px 1fr 200px 100px ;
        }
        #heading{
            margin: 20px;
            color:white;
        }
        h2{
            text-align:center;
        }
        #spin{
            position:fixed;
            margin-left:50%;
            top:50%;
        }
       

      </style>
      <app-location route="{{route}}">
      </app-location>
      <header>
          <div id="heading"><h1>Shopping </h1></div>
      </header>
      <iron-form id="loginForm">
        <form>
        <h2> User Login</h2>
<paper-input  label="Email Id" id="emailId" type="email" value={{emailId}} name="email" auto-validate required error-message="enter valid email id"><iron-icon slot="suffix" icon="mail"></iron-icon> </paper-input>
                <paper-input type="password" label="Password" auto-validate required error-message="Enter the password" id="password"><iron-icon slot="suffix" icon="lock"></iron-icon></paper-input>
                <paper-button type="submit" id="btn" class="btn btn-success" on-click="handleLogin">Login</paper-button>
               <sub> New user ?<paper-button id="register" on-click="_handleLogout"><a name="registration-page" href="[[rootPath]]registration-page">registration</a></paper-button></sub>

        </form>
      </iron-form>
      <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>
      <paper-spinner id="spin" active={{waiting}}></paper-spinner>
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
    `;
    }

    /**
     * Define public API properties
     */

    static get properties() {
        return {

            selected: {
                type: Number,
                value: 0
            },
            action: {
                type: String,
                value: 'List'
            },
            users: {
                type: Array,
                value: []
            },
            login: {
                type: Boolean,
                value: false
            }
        };
    }

    ready() {
        super.ready();
        // this.addEventListener('user-details',(e)=>this._handleResponse(e));
    }


    connectedCallback() {
        super.connectedCallback();

    }
    
    /**
     * fetching the user data from database and validating the phone number and password
     */
    handleLogin() {
        if (this.$.loginForm.validate()) {
            let email = this.$.emailId.value;
            let password = this.$.password.value;
            let obj = {email,password}
            console.log(obj);
            this._makeAjax(`http://localhost:9091/shopping/users/login`, "post", obj);
            this.waiting=true;
            console.log(obj);
        }
        else {
            this.message = "Please enter valid Details";
            this.$.toast.open();
        }

    }

    /**
     * calling main ajax call method 
     * @param {String} url 
     * @param {String} method 
     * @param {Object} postObj 
     */
    _makeAjax(url, method, postObj) {
        const ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }

    /**
     * handling error if encounter error from backend server
     */
    _handleError() {
        this.message = "Wrong Credentials";
        this.$.toast.open();
    }


    /**
     * getting response from server and storing user data and id in session storage
     * @param {*} event 
     */
    _handleResponse(event) {

        switch (this.action) {

            case 'List':
                this.$.spin.close();
                console.log(event);
                this.users = event.detail.response;
                // console.log(event.detail.response);
                console.log(this.users);
                sessionStorage.setItem('customer', JSON.stringify(this.users));
                this.customer = JSON.parse(sessionStorage.getItem('customer'));
                console.log(this.customer.userType);
                if (this.users.userType == "Admin") {
                    this.set('route.path', './admin-page');

                    // this.dispatchEvent(new CustomEvent('refresh-list', {detail: {isLoggedIn: true} ,bubbles: true, composed: true}));
                }
                else  if (this.users.userType == "Prime"||"Normal") {
                    // this.login = true;
                    // this.dispatchEvent(new CustomEvent('refresh-list', {detail: { isLoggedIn: true} ,bubbles: true, composed: true}));
                    this.set('route.path', './dashboard-page');
                }
                else {
                    this.message = 'you dont have account, please login';
                    this.$.toast.open();

                }

        }


    }

}
/**
 * Register the element with the browser
 */
window.customElements.define('login-page', LoginPage);