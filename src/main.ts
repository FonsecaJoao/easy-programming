import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'codemirror/mode/python/python';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt+QHFqUUdrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQllhQH9Rdk1hUXhYcXY=;Mgo+DSMBPh8sVXJ1S0d+WFBPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXpRf0RhWXdceHNSQmI=;ORg4AjUWIQA/Gnt2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdExiW39WcnxSTmde;MTg3NTkzOUAzMjMxMmUzMTJlMzQzMWo0Tk5mUWlCNys5SzJSRm52R1IrQkROWWt0Y0ZnVTJCN0RSMTZIeU5pb0k9;MTg3NTk0MEAzMjMxMmUzMTJlMzQzMU96TC9CUVBuTGFNZkpsL0dhVCtvSG9leG9rL09BbE9CN2hza1cwNUpzK0U9;NRAiBiAaIQQuGjN/V0d+XU9Ad1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TckdqWH1eeHZdTmVfUw==;MTg3NTk0MkAzMjMxMmUzMTJlMzQzMUFzN1ZnZXZUQ0swL1R1M3FlcGJZcEMwWm1lWXVtbjgyTnBhMUhqRkF3MHc9;MTg3NTk0M0AzMjMxMmUzMTJlMzQzMVN6bTUyazJZem9VWVQrZm5ld3h1ai9DWTBVYU9RUTlwa2ZmdXgxMGwzZVU9;Mgo+DSMBMAY9C3t2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdExiW39WcnxcRGFe;MTg3NTk0NUAzMjMxMmUzMTJlMzQzMWg1R0F4UjBXNHRrYzk3QTFIM1drMkh1N25BWFpxQWJNcEtTRjh6blpVeHc9;MTg3NTk0NkAzMjMxMmUzMTJlMzQzMVQ2NGhreGgrMDV6Q2cxU3F4dmg3cU41TjVRbVVBVVNJMVY5L1RPNE1IMEE9;MTg3NTk0N0AzMjMxMmUzMTJlMzQzMUFzN1ZnZXZUQ0swL1R1M3FlcGJZcEMwWm1lWXVtbjgyTnBhMUhqRkF3MHc9');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
