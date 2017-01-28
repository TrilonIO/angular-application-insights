# [WIP] ngx-application-insights

## Installation 

> **Note:** Not on npm yet

~~To install this library, run:~~



## Consuming Angular MS Application Insights:

Install & save the library to your package.json:

~~```bash~~
~~$ npm install ngx-application-insights --save~~
~~```~~

and then add the library to your Angular Root `AppModule`:

```typescript
// Import the Application Insights library
import { ApplicationInsightsModule } from 'ngx-application-insights';

@NgModule({
  imports: [
    // ... your imports

    ApplicationInsightsModule // <-- add it to your imports
  ],
  // ... providers / etc
})
export class YourRootModule { }
```

---

# Want to Contribute?

## ngx-Application-Insights Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Mark Pieszak](mailto:mpieszak84@gmail.com)
