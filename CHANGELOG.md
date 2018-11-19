# CHANGELOG

## 6.0.2
- Fix Router injector to handle UIRouter and not throw errors (or set up page tracking metrics) 

## 6.0.0
- Deprecation warning added for `instrumentationKeySetlater` (will be removed in next major version(?))
- Use `instrumentationKeySetLater` (capital "L") to match correct AppInsights Interface
- AppInsights context & queue now proxied to prevent undefined when not loaded immediately

## 5.x
- for Angular 6.x with Rxjs 6.1+

## 4.x
- Angular 5.x with Rxjs 5.5+ (pipeable operators)

## 3.x
- Angular 5.x (with older rxjs < 5.5)

## 2.x - NG4
- Updated to Angular 4.0 (use version 1.0.0 for Angular 2.x)

## 1.0.0 - Live!
- Added @types/applicationinsights-js types

## rc.1

- ** BREAKING ** Refactor to implement Microsoft.ApplicationInsights.IConfig and Microsoft.ApplicationInsights.IAppInsights
- Refactor config into service and expose full config
- Add call to init to module

## rc.0

- Implemented remaining methods


## 0.3

- ** BREAKING ** Re-released to NPM package via `@markpieszak/ng-application-insights`, remove the `x` from `ngx`. (According to latest Angular naming guidelines)
  - Old npm unpublshed/removed. 
- Updated to use applicationinsights-js SDK.

## 0.2

- Released to npm with `@markpieszak/ng-application-insights` 