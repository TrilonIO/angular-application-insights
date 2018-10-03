import { Injectable, Optional, Injector } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AppInsights } from 'applicationinsights-js';
import { filter } from 'rxjs/operators';

import IAppInsights = Microsoft.ApplicationInsights.IAppInsights;

export class AppInsightsConfig implements Microsoft.ApplicationInsights.IConfig {
  instrumentationKeySetLater?: boolean;
  // Will be deprecated in next major version
  instrumentationKeySetlater?: boolean;
  instrumentationKey?: string;
  endpointUrl?: string;
  emitLineDelimitedJson?: boolean;
  accountId?: string;
  sessionRenewalMs?: number;
  sessionExpirationMs?: number;
  maxBatchSizeInBytes?: number;
  maxBatchInterval?: number;
  enableDebug?: boolean;
  disableExceptionTracking?: boolean;
  disableTelemetry?: boolean;
  verboseLogging?: boolean;
  diagnosticLogInterval?: number;
  samplingPercentage?: number;
  autoTrackPageVisitTime?: boolean;
  disableAjaxTracking?: boolean;
  overridePageViewDuration?: boolean;
  maxAjaxCallsPerView?: number;
  disableDataLossAnalysis?: boolean;
  disableCorrelationHeaders?: boolean;
  correlationHeaderExcludedDomains?: string[];
  disableFlushOnBeforeUnload?: boolean;
  enableSessionStorageBuffer?: boolean;
  isCookieUseDisabled?: boolean;
  cookieDomain?: string;
  isRetryDisabled?: boolean;
  url?: string;
  isStorageUseDisabled?: boolean;
  isBeaconApiDisabled?: boolean;
  sdkExtension?: string;
  isBrowserLinkTrackingEnabled?: boolean;
  appId?: string;
  enableCorsCorrelation?: boolean;
  overrideTrackPageMetrics?: boolean;
}

@Injectable()
export class AppInsightsService implements IAppInsights {

  get context(): Microsoft.ApplicationInsights.ITelemetryContext {
    return AppInsights.context;
  }
  get queue(): Array<() => void> {
    return AppInsights.queue
  }
  config: AppInsightsConfig;

  constructor(
    @Optional() _config: AppInsightsConfig,
    private _injector: Injector
  ) {
    this.config = _config;
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
  // trackEvent(name: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a user action or other occurrence.
  trackEvent(eventName: string, eventProperties?: { [name: string]: string }, metricProperty?: { [name: string]: number }) {
    try {
      AppInsights.trackEvent(eventName, eventProperties, metricProperty);
    } catch (ex) {
      console.warn('Angular application insights Error [trackEvent]: ', ex);
    }
  }

  startTrackEvent(name: string): any {
    try {
      AppInsights.startTrackEvent(name);
    } catch (ex) {
      console.warn('Angular application insights Error [startTrackEvent]: ', ex);
    }
  }

  stopTrackEvent(name: string, properties?: { [p: string]: string }, measurements?: { [p: string]: number }): any {
    try {
      AppInsights.stopTrackEvent(name, properties, measurements);
    } catch (ex) {
      console.warn('Angular application insights Error [stopTrackEvent]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
  // trackPageView(name?: string, url?: string, properties?:{[string]:string}, measurements?: {[string]:number}, duration?: number)
  // Logs that a page or similar container was displayed to the user.
  trackPageView(name?: string, url?: string, properties?: { [name: string]: string }, measurements?: { [name: string]: number }, duration?: number) {
    try {
      AppInsights.trackPageView(name, url, properties, measurements, duration);
    } catch (ex) {
      console.warn('Angular application insights Error [trackPageView]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#starttrackpage
  // startTrackPage(name?: string)
  // Starts the timer for tracking a page view. Use this instead of trackPageView if you want to control when the
  // page view timer starts and stops, but don't want to calculate the duration yourself. This method doesn't send any
  // telemetry. Call stopTrackPage to log the end of the page view and send the event.
  startTrackPage(name?: string) {
    try {
      AppInsights.startTrackPage(name);
    } catch (ex) {
      console.warn('Angular application insights Error [startTrackPage]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#stoptrackpage
  // stopTrackPage(name?: string, url?: string, properties?: Object, measurements?: Object)
  // Stops the timer that was started by calling startTrackPage and sends the page view telemetry with the
  // specified properties and measurements. The duration of the page view will be the time between calling startTrackPage and stopTrackPage.
  stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string }, measurements?: { [name: string]: number }) {
    try {
      AppInsights.stopTrackPage(name, url, properties, measurements);
    } catch (ex) {
      console.warn('Angular application insights Error [stopTrackPage]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackmetric
  // trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: {[string]:string})
  // Log a positive numeric value that is not associated with a specific event.
  // Typically used to send regular reports of performance indicators.
  trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string }) {
    try {
      AppInsights.trackMetric(name, average, sampleCount, min, max, properties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
  // trackException(exception: Error, handledAt?: string, properties?: {[string]:string}, measurements?: {[string]:number}, severityLevel?: AI.SeverityLevel)
  // Log an exception you have caught. (Exceptions caught by the browser are also logged.)
  trackException(exception: Error, handledAt?: string, properties?: { [name: string]: string },
    measurements?: { [name: string]: number }, severityLevel?: AI.SeverityLevel) {
    try {
      AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
    } catch (ex) {
      console.warn('Angular application insights Error [trackException]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#tracktrace
  // trackTrace(message: string, properties?: {[string]:string}, severityLevel?: AI.SeverityLevel)
  // Log a diagnostic event such as entering or leaving a method.
  trackTrace(message: string, properties?: { [name: string]: string }, severityLevel?: AI.SeverityLevel) {
    try {
      AppInsights.trackTrace(message, properties, severityLevel);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackdependency
  // trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean, resultCode: number)
  // Log a dependency call (for instance: ajax)
  trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean, resultCode: number) {
    try {
      AppInsights.trackDependency(id, method, absoluteUrl, pathName, totalTime, success, resultCode);
    } catch (ex) {
      console.warn('Angular application insights Error [trackDependency]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#flush
  // flush()
  // Immediately send all queued telemetry. Synchronous.
  // * You don't usually have to use this, as it happens automatically on window closing.
  flush() {
    try {
      AppInsights.flush();
    } catch (ex) {
      console.warn('Angular application insights Error [flush]: ', ex);
    }

  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
  // setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string)
  // Set the authenticated user id and the account id in this session. Use this when you have identified a specific
  // signed-in user. Parameters must not contain spaces or ,;=|
     /**
     * Sets the authenticated user id and the account id.
     * User auth id and account id should be of type string. They should not contain commas, semi-colons, equal signs, spaces, or vertical-bars.
     * 
     * By default the method will only set the authUserID and accountId for all events in this page view. To add them to all events within
     * the whole session, you should either call this method on every page view or set `storeInCookie = true`. 
     *
     * @param authenticatedUserId {string} - The authenticated user id. A unique and persistent string that represents each authenticated user in the service.
     * @param accountId {string} - An optional string to represent the account associated with the authenticated user.
     * @param storeInCookie {boolean} - AuthenticateUserID will be stored in a cookie and added to all events within this session. 
     */
  setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie:boolean = false) {
    try {
      AppInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
    } catch (ex) {
      console.warn('Angular application insights Error [setAuthenticatedUserContext]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#clearauthenticatedusercontext
  // clearAuthenticatedUserContext ()
  // Clears the authenticated user id and the account id from the user context, and clears the associated cookie.
  clearAuthenticatedUserContext() {
    try {
      AppInsights.clearAuthenticatedUserContext();
    } catch (ex) {
      console.warn('Angular application insights Error [clearAuthenticatedUserContext]: ', ex);
    }
  }

  _onerror(message: string): any {
    console.warn('Angular application insights Error [_onerror]: ', message);
  }

  public init(): void {
    if (this.config) {

      // Deprecation Warning(s)
      if (this.config.instrumentationKeySetlater) {
        console.warn(
          `\n\n
          Warning: [instrumentationKeySetlater] will soon be deprecated.\n
          Use .instrumentationKeySetLater (capital "L" in "L"ater) instead
          to prevent any possible errors in the future!
          \n\n`);
      }

      if (this.config.instrumentationKey) {
        try {
          AppInsights.downloadAndSetup(this.config);

          if (!this.config.overrideTrackPageMetrics) {
            this.router.events.pipe(
              filter(event => event instanceof NavigationStart)
            )
              .subscribe((event: NavigationStart) => {
                this.startTrackPage(event.url);
              });

            this.router.events.pipe(
              filter(event => (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
              ))
            )
              .subscribe((event: NavigationEnd) => {
                this.stopTrackPage(event.url);
              });
          }
        } catch (ex) {
          console.warn('Angular application insights Error [downloadAndSetup]: ', ex);
        }
      } else {
        if (!this.config.instrumentationKeySetLater || !this.config.instrumentationKeySetlater) {
          // there is no this.config.instrumentationKey AND no this.config.instrumentationKeySetLater => Add log.
          console.warn('An instrumentationKey value is required to initialize AppInsightsService');
        }
      }
    } else {
      console.warn('You need forRoot on ApplicationInsightsModule, with or instrumentationKeySetLater or instrumentationKey set at least');
    }
  }

  private get router() {
    return this._injector.get(Router);
  }
}

