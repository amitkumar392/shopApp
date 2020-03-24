import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';

/**
 * Define an element class
 * @customElement
 * @polymer
 */
class RegistrationPage extends PolymerElement {
  /**
     * Define the element's template
  */
  static get template() {
    return html`
      <style>
        :host {
          display: block;
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
        #loginForm
        {
            width:30%;
            margin:0px auto;
            border:2px solid black;
            padding:10px;
            margin-top:70px;
        }
        #registration{
          background-color:  #ff7a22;
          color: white;
          text-align:center;
          width:100%;
          margin-top:20px;
        }

        h2{
          text-align:center;
        }
       

      </style>
      <header>
        <div id="heading"><h1>Shopping</h1></div>
    </header>
      <app-location route="{{route}}">
      </app-location>
      <iron-form id="loginForm">
      <form>

      <h2>Registration Page </h2>

      <paper-input type="text" label="Enter name" id="name" required required error-message="Enter Name">
      </paper-input>

      <paper-dropdown-menu label="User Type" id="userType" required  error-message="Enter User Type">
      <paper-listbox slot="dropdown-content" selected="0">
        <paper-item>Priority</paper-item>
        <paper-item>Normal</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>




      <paper-input label="Phone No" id="phoneNo" type="text" name="phoneNo" required maxlength=10 pattern="[0-9]{10}">
      </paper-input>
    
      <paper-input type="email" label="Enter email" id="email" required required error-message="Enter Email">
      </paper-input>

      <paper-input label="Password" id="password" type="password" value={{password}} name="password" required error-message="enter correct password" >
      </paper-input>

      <paper-button type="submit" id="registration" on-click="_handleRegister">Register</paper-button></div>
      <div id="horizontal"><sub> Exiting user ?<paper-button id="login" on-click="_handleLogin"><a name="login-page" href="[[rootPath]]login-page">Login</a></paper-button></sub><div>
      </form>
      <iron-form>
      <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>
      
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'>
      </iron-ajax>
      
    `;
  }

  /**
   * Define public API properties
   */
  static get properties() {
    return {

    };
  }

  /**
   * posting user data into database
   */
  _handleRegister() {
    let userName = this.$.name.value;
    let userType = this.$.userType.value;
    let phoneNo = this.$.phoneNo.value;
    let emailId = this.$.email.value;
    let password = this.$.password.value;
    let postObj = { userName, userType, phoneNo, emailId, password };
    console.log(postObj);
    this._makeAjax(`http://localhost:3000/users`, "post", postObj);
  }


  /**
   * getting response from server and storing user data and id in session storage
   * @param {*} event 
   */
  _handleResponse(event) {
    console.log(event.detail.response);
    this.message = "Registration is successful";
    this.$.toast.open();
    confirm('Registration is successful');
    this.set('route.path', './login-page');

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


}

/**
 * Register the element with the browser
 */
window.customElements.define('registration-page', RegistrationPage);
