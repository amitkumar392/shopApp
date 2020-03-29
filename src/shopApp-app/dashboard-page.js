import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';


/**
 * Define an element class
 * @customElement
 * @polymer
 */
class DashboardPage extends PolymerElement {
  /**
     * Define the element's template
     */
  static get template() {
    return html`
<style>
  :host {
    display: block;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

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
      

  

</style>

<app-location route={{route}}></app-location>
<header>
    <div id="heading"><h1>Shopping</h1>{{message}}
    </div>
    <div id="buttons">
    <paper-button class = "custom" id='myOrder' on-click="_handleOrder"><a name="order-page" href="[[rootPath]]order-page">My Order</a></paper-button>
        <paper-button class="custom" id='login' on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>

    </div>
</header>
<paper-input type="text" label="Product Search" id="productSearch"></paper-input>
<paper-button id='search' on-click="_handleSearch">Search</paper-button>


<h1> Product List  for {{message}} Customer </h1>
<table >
  <tr>
    <th>Product Name</th>
    <th>Description</th>
    <th>Price</th>
    <th>Action</th>
    </tr>
    <template is="dom-repeat" items={{data}} as="historyData">
  <tr>
    <td>{{historyData.productName}}</td>
    <td>{{historyData.description}}</td>
    <td>{{historyData.price}}</td>
    <td><paper-button type="submit" id="addSelect" on-click="_handleSelect">ADD</paper-button></td>

  
   
  </tr>
  </template>
</table>

<paper-dialog id="dialog">
<paper-dialog-scrollable>
    
  
  <h1> Cart </h1>
 Product Name: {{selected.productName}}<br>
  Quantity:<paper-icon-button id="addBtn" on-click="_handleAdd" data-set$={{index}} icon="add"></paper-icon-button>{{userQuantity}}<paper-icon-button id="addBtn" data-set$={{index}} on-click="_handleRemove" icon="remove"></paper-icon-button><br>
  Total Price :{{b}}  </br></br>

  <paper-button type="submit" id="buyNow" on-click="_handleBuy">Buy Now</paper-button>

  </paper-dialog-scrollable>
  
</paper-dialog>

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
      data: {
        type: Array,
        value: [{ productId: "101", productName: "iphone", description: "paise bahut jyda h", price: 200, 'quantity': 5 },
        { productName: "TV", description: "paise bahut kam h", price: 3000, 'quantity': 3 }]
      },
      action: {
        type: String
      },
      cart: {
        type: Array,
        value: []
      },
      selected: {
        type: Object,
        value: {}
      }
    };
  }


  /**
   * getting list of all the items
   */
  connectedCallback() {
    super.connectedCallback();
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    console.log(this.customer.userType);
    this.message = this.customer.userType;
    console.log(this.customer.userId);
    this._makeAjax(`http://localhost:9091/shopping/products/?userId=${this.customer.userId}`, 'get', null)
    this.action = 'List';
  }

  _handleSelect(event) {
    this.userQuantity = 0;
    this.selected = event.model.historyData;
    console.log(this.selected.price);
    console.log(this.selected.id);
    this.$.dialog.open();
  }

  _handleAdd() {

    if (this.userQuantity < this.selected.quantity)
      this.userQuantity += 1;
    console.log(this.selected.price);
    this.b = this.selected.price * this.userQuantity;
    console.log(this.b);
  }

  _handleRemove() {
    if (this.userQuantity > 0)
      this.userQuantity -= 1;
    this.b = this.selected.price / this.userQuantity;

  }

  _handleSearch() {
    let productName = this.$.productSearch.value;
    let userId = this.customer.userId;
    // let postObj = { productName, userId };
    this._makeAjax(`http://localhost:9091/shopping/products/search/?productName=${productName}&&userId=${userId}`, 'get',null);
    console.log('zzz');
    this.action = 'Search';
  }

  _handleBuy(event) {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    // console.log(this.customer.userType);
    // console.log(this.customer.userId);
    console.log(this.selected.id);
    console.log(this.userQuantity);
    let userId = this.customer.userId;
    let productId = this.selected.id;
    let quantity = this.userQuantity;
    let postObj = { userId, productId, quantity };
    console.log(postObj);

    this._makeAjax(`http://localhost:9091/shopping/userproducts`, 'post',postObj);
    this.action = 'Product';

  }


  /**
   * getting response from server and storing user data and id in session storage
   * @param {*} event 
   */
  _handleResponse(event) {
    switch (this.action) {
      case 'List':
        console.log(event.detail.response);
        this.data = event.detail.response;
        break;

      case 'Search':
        console.log(event.detail.response);
        this.data = event.detail.response;
        console.log(this.data);
        break;


      case 'Product':
        console.log(event.detail.response);
        this.message = "Successfully buy,Thanks for shopping";
        this.$.toast.open();
        break;



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
   * clear session storage and route to login page
   */
  _handleLogout() {

    sessionStorage.clear();
    this.set('route.path', './login-page');
    window.location.reload();

  }


}

/**
 * Register the element with the browser
 */
window.customElements.define('dashboard-page', DashboardPage);