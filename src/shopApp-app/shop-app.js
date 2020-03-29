import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js'

/**
 * Define an element class
 * @customElement
 * @polymer
 */
setRootPath(MyAppGlobals.rootPath)
class ShopApp extends PolymerElement {
  /**
     * Define the element's template
     */
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        
      </style>
      <app-location route={{route}}></app-location>
      <app-route data="{{routeData}}" route="{{route}}" pattern="[[rootPath]]:page"></app-route>

      <iron-pages selected={{page}} attr-for-selected="name" role="main">
    
      <registration-page name="registration-page"></registration-page>
      <login-page name="login-page"></login-page>
      <dashboard-page name="dashboard-page"></dashboard-page>
      <admin-page name="admin-page"></admin-page>
      <order-page name="order-page"></order-page>

    </iron-pages>
    `;
  }

  /**
   * Define public API properties
   */
  static get properties() {
    return {
      page: {
        type: String,
        observer: '_changePage'
      },
      routeData: {
        type: Object
      },
    };
  }

  /**
   * complex observer
   */
  static get observers() {
    return ['_pageChanged(routeData.page)']
  }

  _pageChanged(page) {
    this.page = page || 'login-page';
  }

  /**
   * method of simple observer to change the page according the page name , calling the required page
   * @param {*} page 
   */
  _changePage(page) {
    switch (page) {
      case ('registration-page'):
        {
          import('./registration-page.js');
          break;
        }
      case ('login-page'):
        {
          import('./login-page.js');
          break;
        }

      case ('dashboard-page'):
        {
          import('./dashboard-page.js');
          break;
        }
      case ('admin-page'):
        {
          import('./admin-page.js');
          break;
        }
  
        case ('order-page'):
          {
            import('./order-page.js');
            break;
          }


    }
  }
}
/**
 * Register the element with the browser
 */
window.customElements.define('shop-app', ShopApp);
