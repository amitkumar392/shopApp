import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';




/**
 * Define an element class
 * @customElement
 * @polymer
 */
class NormalUser extends PolymerElement {
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

    table,
    td,
    th {
        border: 1px solid rgb(0, 0, 0);
        text-align: left;
        border-style: dashed;
    }

    table {
        border-collapse: collapse;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 90%;
    }

    th,
    td {
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

    h2 {
        text-align: center;
    }

    #buttons {
        position: absolute;
        top: 50px;
        left: 1000px;
    }

    h2 {
        text-align: center;
        color: white;
        position: absolute;
        top: 22px;
        left: 300px;

    }

    paper-button {
        text-align: center;
        background-color: black;
        color: white;
    }

    h1 {
        text-align: center;
        padding-bottom: 20px;
        padding-top: 20px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    header {
        background-color: #ff7a22;
        display: grid;
        grid-template-rows: 100px;
        grid-template-columns: 200px 1fr 200px 100px;
    }

    #heading {
        margin: 20px;
        color: white;
    }
    #buttons{
        position:absolute;
        top:50px;
        float:right;
      }

    
</style>

<app-location route={{route}}></app-location>
<header>
    <div id="heading">
        <h1>Shopping</h1>
    </div>
   </header>
   <div id='buttons'>
   <paper-button class="custom indigo" id='login' on-click="_handleLogout"><a name="login-page"
           href="[[rootPath]]login-page">Logout</a></paper-button>
           </div>
<h1> Product List for Normal User</h1>
<table>
    <tr>
        <th>Product Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>User Type</th>
    </tr>
    <template is="dom-repeat" items={{data}} as="historyData">
        <tr>
            <td>{{historyData.productName}}</td>
            <td>{{historyData.description}}</td>
            <td>{{historyData.price}}</td>
            <td>{{historyData.userType}}</td>


        </tr>
    </template>
</table>


<iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'>
</iron-ajax>




`;
    }

    /**
     * Define public API properties
     */
    static get properties() {
        return {
            respCheck: Array,
            details: {
                type: Object
            }
        };
    }
    /**
     * getting list of all the items based on user type
     */
    connectedCallback() {
        super.connectedCallback();
        this.customer = JSON.parse(sessionStorage.getItem('customer'));
        console.log(this.customer.userType);
        this._makeAjax(`http://localhost:3000/items?userType=${this.customer.userType}`, 'get', null)
    }


    /**
     * getting response from server and storing user data in session storage
     * @param {*} event 
     */
    _handleResponse(event) {
        console.log(event.detail.response);
        this.data = event.detail.response;

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
window.customElements.define('normaluser-page', NormalUser);