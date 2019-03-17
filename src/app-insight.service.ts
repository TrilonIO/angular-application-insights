import { Injectable, Optional, Injector } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AppInsights } from 'applicationinsights-js';
import { filter } from 'rxjs/operators';

import IAppInsights = Microsoft.ApplicationInsights.IAppInsights;

// Since AI.SeverityLevel isn't working we can just use our own
export enum SeverityLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

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
  /**
   * Log a user action or other occurrence.
   * @param   name    A string to identify this event in the portal.
   * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
   * @param   measurements    map[string, number] - metrics associated with this event, displayed in Metrics Explorer on the portal. Defaults to empty.
   */
  trackEvent(eventName: string, eventProperties?: { [name: string]: string }, metricProperty?: { [name: string]: number }) {
    try {
      AppInsights.trackEvent(eventName, eventProperties, metricProperty);
    } catch (ex) {
      console.warn('Angular application insights Error [trackEvent]: ', ex);
    }
  }

  /**
   * Start timing an extended event. Call {@link stopTrackEvent} to log the event when it ends.
   * @param   name    A string that identifies this event uniquely within the document.
   */
  startTrackEvent(name: string): any {
    try {
      AppInsights.startTrackEvent(name);
    } catch (ex) {
      console.warn('Angular application insights Error [startTrackEvent]: ', ex);
    }
  }

  /**
   * Log an extended event that you started timing with {@link startTrackEvent}.
   * @param   name    The string you used to identify this event in startTrackEvent.
   * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
   * @param   measurements    map[string, number] - metrics associated with this event, displayed in Metrics Explorer on the portal. Defaults to empty.
   */
  stopTrackEvent(name: string, properties?: { [p: string]: string }, measurements?: { [p: string]: number }): any {
    try {
      AppInsights.stopTrackEvent(name, properties, measurements);
    } catch (ex) {
      console.warn('Angular application insights Error [stopTrackEvent]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
  /**
   * Logs that a page or other item was viewed.
   * @param   name  The string you used as the name in startTrackPage. Defaults to the document title.
   * @param   url   String - a relative or absolute URL that identifies the page or other item. Defaults to the window location.
   * @param   properties  map[string, string] - additional data used to filter pages and metrics in the portal. Defaults to empty.
   * @param   measurements    map[string, number] - metrics associated with this page, displayed in Metrics Explorer on the portal. Defaults to empty.
   * @param   duration number - the number of milliseconds it took to load the page. Defaults to undefined. If set to default value, page load time is calculated internally.
   */
  trackPageView(name?: string, url?: string, properties?: { [name: string]: string }, measurements?: { [name: string]: number }, duration?: number) {
    try {
      AppInsights.trackPageView(name, url, properties, measurements, duration);
    } catch (ex) {
      console.warn('Angular application insights Error [trackPageView]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#starttrackpage
  /**
   * Starts timing how long the user views a page or other item. Call this when the page opens.
   * This method doesn't send any telemetry. Call {@link stopTrackTelemetry} to log the page when it closes.
   * @param   name  A string that idenfities this item, unique within this HTML document. Defaults to the document title.
   */
  startTrackPage(name?: string) {
    try {
      AppInsights.startTrackPage(name);
    } catch (ex) {
      console.warn('Angular application insights Error [startTrackPage]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#stoptrackpage
  /**
   * Logs how long a page or other item was visible, after {@link startTrackPage}. Call this when the page closes.
   * @param   name  The string you used as the name in startTrackPage. Defaults to the document title.
   * @param   url   String - a relative or absolute URL that identifies the page or other item. Defaults to the window location.
   * @param   properties  map[string, string] - additional data used to filter pages and metrics in the portal. Defaults to empty.
   * @param   measurements    map[string, number] - metrics associated with this page, displayed in Metrics Explorer on the portal. Defaults to empty.
   */
  stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string }, measurements?: { [name: string]: number }) {
    try {
      AppInsights.stopTrackPage(name, url, properties, measurements);
    } catch (ex) {
      console.warn('Angular application insights Error [stopTrackPage]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackmetric
  /**
   * Log a numeric value that is not associated with a specific event. Typically used to send regular reports of performance indicators.
   * To send a single measurement, use just the first two parameters. If you take measurements very frequently, you can reduce the
   * telemetry bandwidth by aggregating multiple measurements and sending the resulting average at intervals.
   * @param   name    A string that identifies the metric.
   * @param   average Number representing either a single measurement, or the average of several measurements.
   * @param   sampleCount The number of measurements represented by the average. Defaults to 1.
   * @param   min The smallest measurement in the sample. Defaults to the average.
   * @param   max The largest measurement in the sample. Defaults to the average.
   */
  trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string }) {
    try {
      AppInsights.trackMetric(name, average, sampleCount, min, max, properties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
  /**
   * Log an exception you have caught.
   * @param   exception   An Error from a catch clause, or the string error message.
   * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
   * @param   measurements    map[string, number] - metrics associated with this event, displayed in Metrics Explorer on the portal. Defaults to empty.
   * @param   severityLevel   SeverityLevel | AI.SeverityLevel - severity level
   */
  trackException(exception: Error, handledAt?: string, properties?: { [name: string]: string },
    measurements?: { [name: string]: number }, severityLevel?: SeverityLevel | AI.SeverityLevel) {
    try {
      AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
    } catch (ex) {
      console.warn('Angular application insights Error [trackException]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#tracktrace
  // trackTrace(message: string, properties?: {[string]:string}, severityLevel?: SeverityLevel | AI.SeverityLevel)
  // Log a diagnostic event such as entering or leaving a method.
  /**
   * Log a diagnostic message.
   * @param    message A message string
   * @param    properties  map[string, string] - additional data used to filter traces in the portal. Defaults to empty.
   */
  trackTrace(message: string, properties?: { [name: string]: string }, severityLevel?: SeverityLevel | AI.SeverityLevel) {
    try {
      AppInsights.trackTrace(message, properties, severityLevel);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackdependency
  /**
   * Log a dependency call (for instance: ajax)
   * @param   id    unique id, this is used by the backend o correlate server requests. Use Util.newId() to generate a unique Id.
   * @param   method    represents request verb (GET, POST, etc.)
   * @param   absoluteUrl   absolute url used to make the dependency request
   * @param   pathName  the path part of the absolute url
   * @param   totalTime total request time
   * @param   success   indicates if the request was sessessful
   * @param   resultCode    response code returned by the dependency request
   * @param   properties    map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
   * @param   measurements  map[string, number] - metrics associated with this event, displayed in Metrics Explorer on the portal. Defaults to empty.
   */
  trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean,
    resultCode: number, properties?: { [name: string]: string }, measurements?: { [name: string]: number }) {
    try {
      AppInsights.trackDependency(id, method, absoluteUrl, pathName, totalTime, success, resultCode, properties, measurements);
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
  setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie: boolean = false) {
    try {
      AppInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
    } catch (ex) {
      console.warn('Angular application insights Error [setAuthenticatedUserContext]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#clearauthenticatedusercontext
  /**
   * Clears the authenticated user id and the account id from the user context.
   */
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

  /**
   * Initialize Application Insights for Angular
   * Make sure your config{} has been set
   */
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

          // Make sure "router" exists - in case of UIRouterModule where it does not
          if (!this.config.overrideTrackPageMetrics && this.router) {
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
        if (!this.config.instrumentationKeySetLater && !this.config.instrumentationKeySetlater) {
          // there is no this.config.instrumentationKey AND no this.config.instrumentationKeySetLater => Add log.
          console.warn('An instrumentationKey value is required to initialize AppInsightsService');
        }
      }
    } else {
      console.warn('You need forRoot on ApplicationInsightsModule, with or instrumentationKeySetLater or instrumentationKey set at least');
    }
  }

  private get router() {
    try {
      return this._injector.get(Router);
    } catch (ex) {
      // @angular/router is not included - App must be utilizing UIRouter
      return null;
    }
  }
}
