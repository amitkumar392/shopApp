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
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

/**
 * Define an element class
 * @customElement
 * @polymer
 */
class AdminPage extends PolymerElement {
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
            border-radius:20px;
        }
        #add{
          background-color:  #ff7a22;
          color: white;
          text-align:center;
          width:100%;
          margin-top:20px;
        }

        h2{
          text-align:center;
        }
        .custom{
            left:1100px;
          }
          paper-button {
            text-align: center;
            background-color:black;
            color:white;
          }

          #buttons{
            position:absolute;
            top:30px;
            float:right;
          }
          a{
            text-decoration:none;
            color:white;
          }
       

      </style>
      <header>
        <div id="heading"><h1>Shopping</h1></div>
        <div id="buttons">
        <paper-button class="custom" id='login' on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>

    </div>
    </header>
      <app-location route="{{route}}">
      </app-location>
      <iron-form id="loginForm">
      <form>

      <h2>Admin Page </h2>
     
<paper-input label="Product Code" id="productCode" type="text" name="product code" maxlength="10" allowed-pattern=[0-9] auto-validate required error-message="Need Product Code">
</paper-input>

      <paper-input type="text" label="Product Name" id="productName" auto-validate required error-message="Enter Product Name"></paper-input>
      <paper-input type="text" label="Product Description" id="productDes" auto-validate required error-message="Need Product Description"></paper-input>
      <paper-input label="Price" id="price" type="text" name="price" maxlength="10" allowed-pattern=[0-9] auto-validate required error-message="Need Price Details"></paper-input>


    <paper-dropdown-menu label="Priority" id="priority" required  error-message="Enter Priority Type">
      <paper-listbox slot="dropdown-content" selected="0">
        <paper-item>High</paper-item>
        <paper-item>Low</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>

      <paper-input label=" Product Quantity" id="quantity" type="text" name="quantity" maxlength="3" allowed-pattern=[0-9] auto-validate required error-message="Need Quantity Details"></paper-input>



      <paper-button type="submit" id="add" on-click="_handleAdd">Add</paper-button></div>
      </form>
      <iron-form>

      </br>


     

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
        data:{
            type:Array,
            value:[]
        }

    };
  }

  /**
   * posting user data into database
   */
  _handleAdd() {
      
    let productCode = this.$.productCode.value;
    let productName = this.$.productName.value;
    let description = this.$.productDes.value;
    let price = parseInt(this.$.price.value);
    let priority = this.$.priority.value;
    let quantity = parseInt(this.$.quantity.value);

    let postObj = { productCode,productName,description,price,priority,quantity};
    console.log(postObj);
    this._makeAjax(`http://localhost:9091/shopping/products`,"post",postObj);
    console.log('dfd');
  }


  /**
   * getting response from server and storing user data and id in session storage
   * @param {*} event 
   */
  _handleResponse(event) {
    console.log('abc');
    console.log(event.detail.response);
    this.data=event.detail.response;
    console.log('xyz');
    this.message = "data added successfully";
    this.$.toast.open();
    // this.set('route.path', './login-page');

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
window.customElements.define('admin-page', AdminPage);
