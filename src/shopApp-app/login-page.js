import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';

/**
 * @customElement
 * @polymer
 */

class LoginPage extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
        }
        #btn{
          margin:10px 10px 10px 160px;
         background-color:  #ff7a22;
         color: white;
         text-align:center;
        }
        #loginForm
        {
            width:40%;
            margin:0px auto;
            border:2px solid black;
            padding:10px;
            margin-top:100px;
        }
        #horizontal
        {
            display:flex;
            flex-direction:row;
            align-items:baseline;
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
       

      </style>
      <app-location route="{{route}}">
      </app-location>
      <header>
          <div id="heading"><h1>Shopping</h1></div>
      </header>
      <iron-form id="loginForm">
        <form>
                <paper-input label="Email Id" id="emailId" type="email" value={{emailId}} name="email" required error-message="enter valid email id"></paper-input>
                <paper-input type="password" label="Password"required error-message="Enter the password" id="password"></paper-input>
                <paper-button type="submit" id="btn" class="btn btn-success" on-click="handleLogin">Login</paper-button>
               <div id="horizontal"><h3> New user ?<h3> <paper-button id="register" on-click="_handleLogout"><a name="registration-page" href="[[rootPath]]registration-page">registration</a></paper-button><div>

        </form>
      </iron-form>
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
    `;
    }

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



    connectedCallback() {
        super.connectedCallback();

    }
    /** getdata function for fetching the data from the database and showing it. Ajax request is done in pets
    
    for the data with sell property value "yes" only. This function is also called when any new pet is added 
    
    so that the list got again refreshed **/


    handleLogin() {
        if (this.$.loginForm.validate()) {

            let emailId = this.$.emailId.value;
            let password1 = this.$.password.value;


            this._makeAjax(`http://localhost:3000/users?emailId=${emailId}&&password=${password1}`, "get", null);
        }

    }

    _makeAjax(url, method, postObj) {
        const ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
    _handleResponse(event) {

        switch (this.action) {

            case 'List':
                this.users = event.detail.response[0];
                console.log(this.users);
                sessionStorage.setItem('customer', JSON.stringify(this.users));
                this.customer = JSON.parse(sessionStorage.getItem('customer'));
                console.log(this.customer.userType);
                if (this.users.userType == "Priority") {
                    // this.login = true;
                    // this.dispatchEvent(new CustomEvent('refresh-list', {detail: { isLoggedIn: true} ,bubbles: true, composed: true}));
                    this.set('route.path', './dashboard-page');
                }
                else if (this.users.userType == "Normal") {
                    this.set('route.path', './normaluser-page');

                    // this.dispatchEvent(new CustomEvent('refresh-list', {detail: {isLoggedIn: true} ,bubbles: true, composed: true}));
                }
                else {
                    alert('you dont have account, please login');

                }

        }


    }

}
window.customElements.define('login-page', LoginPage);