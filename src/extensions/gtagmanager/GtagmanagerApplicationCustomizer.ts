import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GtagmanagerApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GtagmanagerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGtagmanagerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  trackingID: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GtagmanagerApplicationCustomizer
  extends BaseApplicationCustomizer<IGtagmanagerApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {


    let trackingID: string = this.properties.trackingID;
    if (!trackingID) {
      Log.info(LOG_SOURCE, "Tracking ID not provided");
    }else{
      var gtagScript = document.createElement("script");
      gtagScript.type = "text/javascript";
      gtagScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${trackingID}');`;   
      document.head.appendChild(gtagScript); 
    }
  return Promise.resolve();
  }
}
