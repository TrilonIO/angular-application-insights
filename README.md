# Angular 6+ and Microsoft Azure Application Insights implementation - by [DevHelp.Online](http://www.DevHelp.Online)

> Connect your Angular 6+ client-side to Microsofts Application Insights with this easy-to-use Module.

## Installation

Install & save the library to your package.json:

```bash
$ npm i -S @markpieszak/ng-application-insights
```

> Angular 6.x with Rxjs 6.1+ use latest (5.x)

> Angular 5.x with Rxjs 5.5+ (pipeable operators) use latest (4.x)

> Angular 5.x (with older rxjs < 5.5) use versions 3.x

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
// Use instrumentationKeySetlater
ApplicationInsightsModule.forRoot({
  instrumentationKeySetlater: true // <--
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

> ie: https://github.com/MarkPieszak/aspnetcore-angular2-universal

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

## License

MIT © [Mark Pieszak | DevHelp Online](mailto:hello@devhelp.online)

Twitter: [@MarkPieszak](https://twitter.com/MarkPieszak)

----

# DevHelp.Online - Angular & ASP.NET - Consulting | Training | Development

Check out **[www.DevHelp.Online](http://DevHelp.Online)** for more info! Twitter [@DevHelpOnline](https://twitter.com/DevHelpOnline)

Contact us at <hello@devhelp.online>, and let's talk about your projects needs.

<p align="center">
    <img src="https://s3.amazonaws.com/media-p.slid.es/uploads/768119/images/4272479/Screen_Shot_2017-10-27_at_6.58.34_PM.png" alt="DevHelp.Online - Angular ASPNET JavaScript Consulting Development and Training">
</p>
