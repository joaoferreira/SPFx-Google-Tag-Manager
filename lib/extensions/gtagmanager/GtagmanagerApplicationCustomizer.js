var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
var LOG_SOURCE = 'GtagmanagerApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var GtagmanagerApplicationCustomizer = (function (_super) {
    __extends(GtagmanagerApplicationCustomizer, _super);
    function GtagmanagerApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GtagmanagerApplicationCustomizer.prototype.onInit = function () {
        var trackingID = this.properties.trackingID;
        if (!trackingID) {
            Log.info(LOG_SOURCE, "Tracking ID not provided");
        }
        else {
            var gtagScript = document.createElement("script");
            gtagScript.type = "text/javascript";
            gtagScript.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n      })(window,document,'script','dataLayer','" + trackingID + "');";
            document.head.appendChild(gtagScript);
        }
        return Promise.resolve();
    };
    __decorate([
        override
    ], GtagmanagerApplicationCustomizer.prototype, "onInit", null);
    return GtagmanagerApplicationCustomizer;
}(BaseApplicationCustomizer));
export default GtagmanagerApplicationCustomizer;
//# sourceMappingURL=GtagmanagerApplicationCustomizer.js.map