# [WIP] MS Azure Application Insights Angular v2+ implementation

> Connect your Angular 2+ client-side to Microsofts Application Insights with this easy-to-use Module. 

## Installation:

Install & save the library to your package.json:

Latest version: **1.0.0-rc0**

```bash
$ npm i -S @markpieszak/ng-application-insights
```

and then add the library to your Angular Root `AppModule`:

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

and in you app component, import the Application Insights service and inject it in the constructor:
```typescript
import { AppInsightsService } from './app-insights.module';

  constructor(..., private appInsightsService: AppInsightsService) {...}
```


## Usage: 

Through out your application you can now use the AppInsightsService class to fire off AppInsights functionality.

```typescript
export class ShoppingCartComponent {
  public cart: [];
  constructor(private appInsights: AppInsightsService) {}

  saveCart(user) {
    // MOCK Example of sending a trackEvent()
    // Saving some sample user & cart product data
    this.appInsights.trackEvent('ShoppingCart Saved', { user, cart });
  }
}
```

## API:

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

## If using SystemJS:

Modify systemjs.config.js...

In System.Config.map, add:

```typescript
      'applicationinsights-js': 'npm:applicationinsights-js/JavaScript/JavaScriptSDK.Module/AppInsightsModule.js'
```

and in System.Config.packages, add:

```typescript
      'applicationinsights-js': {
         defaultExtension: 'js'
      }
```

---

# Want to Contribute?

## ng-Application-Insights Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Mark Pieszak](mailto:mpieszak84@gmail.com)
