# [WIP] ngx-application-insights - Under development

> Connect your Angular 2+ client-side to Microsofts Application Insights with this easy-to-use Module. 

1/28 - npm library & usage information coming soon!

## Installation: [Experimental currently]

Install & save the library to your package.json:

```bash
$ npm i -S @markpieszak/ngx-application-insights
```

and then add the library to your Angular Root `AppModule`:

```typescript
// Import the Application Insights library
import { ApplicationInsightsModule } from '@markpieszak/ngx-application-insights';

@NgModule({
  imports: [
    // ... your imports

    // Add the Module to your imports 
    ApplicationInsightsModule.forRoot({
      appID: 'Your-Application-Insights-ID', 
      appName: '[OPTIONAL] App name for Events' 
    })
  ],
  // ... providers / etc
})
export class YourRootModule { }
```

## Usage: Coming soon !

```typescript


```

---

# Want to Contribute?

## ngx-Application-Insights Development

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
