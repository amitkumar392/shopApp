import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-slider/paper-slider.js';

import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
* @customElement
* @polymer
*/
class OrderPage extends PolymerElement {
  static get template() {
    return html`
<style>
    main {
        border-radius: 8px;
        align-self: center;
    }
    iron-form{
        padding:20px;
    }
    h1 {
        justify-self: center;
        color: white;
    }
    paper-card{
        background-color: rgb(216, 211, 211);
        margin-top:2%;
        width:100%;
    }
    iron-icon {
        color: red;
    }
    paper-icon-button{
        margin-top:20px;
    }
    #left{
        width:90%;
    }
    #submitRatings{
        height:50px;
        margin-top:30px;
        background-color:rgb(136, 136, 38);
        color: white;
    }
    #ratings{
        display:flex;
        flex-direction:row;
    }
    h2{
      text-align:center;
    }
    header{
      background-color: #ff7a22;
      display: grid;
      grid-template-rows: 100px;
      grid-template-columns: 200px 1fr 200px 100px ;
  }
    table, td, th {  
    border: 1px solid rgb(0, 0, 0);
    text-align: left;
    border-style: dashed;
  }
  
  table {
    border-collapse: collapse;
    margin-top:20px;
    margin-bottom:20px;
    width: 90%;
  }
  
  th, td {
    padding: 15px;
  }
  #form {
    border: 2px solid black;
    width: 500px;
    margin-left: 400px;
  }

  form {
    margin-left: 20px;
    margin-right: 20px;
  }
  h2{
    text-align: center;
  }

  h2{
    text-align:center;
    color:white;
    position:absolute;
    top:22px;
    left:300px;

}
  paper-button {
    text-align: center;
    background-color:black;
    color:white;
  }
  h1{
      text-align:center;
  }
  a{
    text-decoration:none;
    color:white;
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
        #buttons{
          position:absolute;
          top:30px;
          float:right;
        }
        #productSearch{
          width:20%;
        }

        #dialog{
          width:50%;
          border-radius:20px;
        }
        #buyNow{
          float:right;
        }
        .custom{
          left:1100px;
        }
        h3{
          text-align:left;
        }
      
</style>
<header>
    <div id="heading"><h1>Shopping</h1>
    </div>
    <div id="buttons">
        <paper-button class="custom" id='login' on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>

    </div>
</header>
    <main>
    <h3>My order List</h3>
    <template is="dom-repeat" items="{{purchases}}">
    <paper-card>
    <div id="left">
    <h3>Product Name: {{item.productName}}</h3>
    <h3>Product Description: {{item.quantity}}</h3>
    <h3>Product Price:{{item.price}}/unit</h3>

    <h3>Quantity:{{item.quantity}}</h3>

    <div id="ratings">

    <h3>Ratings:
    <paper-slider class="red" id="ratingInput{{index}}" value="0" max="5" editable></paper-slider>
    </h3>
    <paper-button id="submitRatings" raised on-click="getRating">Submit Ratings</paper-button>   
    </div>
    </div>
    </paper-card>
    </template>

    </main>
    <paper-toast id="toast" text={{message}}></paper-toast>

<iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" content-type="application/json"
    handle-as="json"></iron-ajax>

`;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'order-page'
      },
      purchases: {
        type: Array,
        value: []
      },
      action: {
        type: String,
        value: ''
      },
      userRating:
      {
        type:Array,
        value:[]
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    console.log(this.customer.userType);
    console.log(this.customer.userId);

    this._makeAjaxCall(`http://localhost:9091/shopping/userproducts?userId=${this.customer.userId}`, `get`, null);
    this.action = 'List';

  }



  _handleError(event) {
    console.log(event.detail)

  }

  getRating(event) {
    console.log(event.model.item);
    this.message = 'Submitted Successfully..Thanks'
    this.$.toast.open();
    // this.rating = `#ratingInput${event.model.index}`;
    // console.log(this.shadowRoot.querySelector(`${this.rating}`).value);
    // this.rate = this.shadowRoot.querySelector(`${this.rating}`).value;



    // let ratingObj = { customerRating: this.shadowRoot.querySelector(`${this.rating}`).value, productId: event.model.item.productId, customerId: this.user.customerId, transactionId: event.model.item.transactionId }
    // console.log(ratingObj);
    // /products/{productId}/{rating}
    // this._makeAjaxCall(`http://localhost:9091/shopping/products/${this.purchases.productId}/${this.rate}`, 'get',null);

  }



  /**
   * @param {*} event
   * response from the backend is handled here 
   */
  _handleResponse(event) {

    switch (this.action) {
      case 'List': {
        this.purchases = event.detail.response;
        console.log(this.purchases);
        break;
      }

   


    }
  }


  /**
 * function to make ajax calls
 * @param {String} url 
 * @param {String} method 
 * @param {Object} postObj 
 */
  _makeAjaxCall(url, method, postObj, action) {
    const ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }
}

window.customElements.define('order-page', OrderPage);