import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-form/iron-form.js';

/**
 * @customElement
 * @polymer
 */
class RegistrationPage extends PolymerElement {
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
            width:40%;
            margin:0px auto;
            border:2px solid black;
            padding:10px;
            margin-top:100px;
        }
        #registration{
          left:120px;
         background-color:  #ff7a22;
         color: white;
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
      </form>
      <iron-form>
      
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'>
      </iron-ajax>
      
    `;
    }
    static get properties() {
        return {
            
        };
    }


    _handleRegister(){
        let userName = this.$.name.value;
        let userType = this.$.userType.value;
        let phoneNo = this.$.phoneNo.value;
        let emailId = this.$.email.value;
        let password = this.$.password.value;
        let postObj = {userName,userType,phoneNo,emailId,password};
        this._makeAjax(`http://localhost:3000/users`, "post", postObj);
    }

    _handleResponse(event) {
        console.log(event.detail.response);
        this.set('route.path', './login-page');

    }


    _makeAjax(url, method, postObj) {
        const ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }


}

window.customElements.define('registration-page', RegistrationPage);
