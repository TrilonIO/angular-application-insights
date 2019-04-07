# Angular 7+ and Microsoft Azure Application Insights implementation

## Connect your Angular 7+ client-side to Microsofts Application Insights with this easy-to-use Module.

[![npm](https://img.shields.io/npm/v/@markpieszak/ng-application-insights.svg?label=npm%20version&color=5b1096&style=for-the-badge)](https://www.npmjs.com/@markpieszak/ng-application-insights)
[![NPM Downloads](https://img.shields.io/npm/dt/@markpieszak/ng-application-insights.svg?color=b31ae7&style=for-the-badge)](https://www.npmjs.com/@markpieszak/ng-application-insights)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=e91e63)](/LICENSE) 

---

<p align="center">
  <a href="https://trilon.io" target="_blank">
        <img width="500" height="auto" src="https://trilon.io/trilon-logo-clear.png" alt="Trilon.io - Angular Universal, NestJS, JavaScript Application Consulting Development and Training">
  </a>
</p>


<h3 align="center"> Made with :heart: by <a href="https://trilon.io">Trilon.io</a></h3>

---

## Installation

Install & save the library to your package.json:

```bash
$ npm i -S @markpieszak/ng-application-insights
```

> Latest version 7.x - for Angular 7.x

> 6.x - for Angular 6.x with Rxjs 6.1+

> 4.x - for Angular 5.x with Rxjs 5.5+ (pipeable operators)

> 3.x - for Angular 5.x (with older rxjs < 5.5)

---

Then add the library to your Angular Root `AppModule`:

```typescript
// Import the Application Insights module and the service provider
import { ApplicationInsightsModule, AppInsightsService } from '@markpieszak/ng-application-insights';

@NgModule({
  imports: [
    // ... your imports

    // Add the Module to your imports
    ApplicationInsightsModule.forRoot({
      instrumentationKey: 'Your-Application-Insights-instrumentationKey'
    })
  ],
  // ... providers / etc
  providers: [ ..., AppInsightsService ],
})
export class YourRootModule { }
```

### What if you don't know your instrumentationKey right away?

```typescript
// Use instrumentationKeySetLater
ApplicationInsightsModule.forRoot({
  instrumentationKeySetLater: true // <--
})

// Then later in your Application somewhere
constructor(
  private appInsightsService: AppInsightsService
) {
  appInsightsService.config = {
    instrumentationKey: __env.APPINSIGHTS_INSTRUMENTATIONKEY // <-- set it later sometime
  }
  // then make sure to initialize and start-up app insights
  appInsightsService.init();
}

```

## Usage

Through out your application you can now use the AppInsightsService class to fire off AppInsights functionality.

```typescript
import { AppInsightsService } from '@markpieszak/ng-application-insights';

export class ShoppingCartComponent {
  public cart: [];
  constructor(private appInsightsService: AppInsightsService) {}

  saveCart(user) {
    // MOCK Example of sending a trackEvent()
    // Saving some sample user & cart product data
    this.appInsightsService.trackEvent('ShoppingCart Saved', { 'user': user.id, 'cart': cart.id });
  }
}
```

## Usage with Aspnetcore-Angular2-Universal repo or JavaScriptServices ( apps w/ Server-side rendering )

> ie: https://github.com/TrilonIO/aspnetcore-angular-universal

First, make sure you are only importing the library & the server within the **browser-app.module** NgModule (do not share it within a common one, as the server isn't able to use this library during it's server-renders).

Secondly, make sure you are calling the `injector` to get AppInsightsService during **ngOnInit**:

```typescript
export class HomeComponent implements OnInit {

    private AIService: AppInsightsService;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId, private injector: Injector) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() { // <-- 
        if (this.isBrowser) { // <-- only run if isBrowser
            this.AIService = <AppInsightsService>this.injector.get(AppInsightsService); // <-- using the Injector, get the Service
            this.AIService.trackEvent('Testing', { 'user': 'me' });
        } 
    }
}
```

## API

You can see a list of the API here: https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#class-appinsights

```typescript
AppInsightsService.trackEvent()
AppInsightsService.startTrackEvent()
AppInsightsService.stopTrackEvent()
AppInsightsService.trackPageView()
AppInsightsService.startTrackPage()
AppInsightsService.stopTrackPage()
AppInsightsService.trackMetric()
AppInsightsService.trackException()
AppInsightsService.trackTrace()
AppInsightsService.trackDependency()
AppInsightsService.flush()
AppInsightsService.setAuthenticatedUserContext()
AppInsightsService.clearAuthenticatedUserContext()
```

---

# How to Contribute?

## ng-Application-Insights Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
npm run build
```

To lint all `*.ts` files:

```bash
npm run lint
```

----

Copyright (c) 2016-2019 [Mark Pieszak](https://github.com/MarkPieszak)

[![Twitter Follow](https://img.shields.io/twitter/follow/MarkPieszak.svg?style=social)](https://twitter.com/MarkPieszak)

----

# Trilon - JavaScript, ASP.NET, Node, NestJS - Consulting | Training | Development

Check out **[Trilon.io](https://Trilon.io)** for more info! Twitter [@Trilon_io](http://www.twitter.com/Trilon_io)

Contact us at <hello@trilon.io>, and let's talk about your projects needs.

<p align="center">
  <a href="https://trilon.io" target="_blank">
        <img src="https://trilon.io/trilon-logo-clear.png" alt="Trilon.io - Angular Universal, NestJS, JavaScript Application Consulting Development and Training">
  </a>
</p>

## Follow Trilon online:

Twitter: [@Trilon_io](http://twitter.com/Trilon_io)

