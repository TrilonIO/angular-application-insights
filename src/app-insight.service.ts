import { Injectable, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AppInsights } from 'applicationinsights-js';
import { APP_INSIGHT_ID, APP_NAME } from './app-insight.config';
import 'rxjs/add/operator/filter';

@Injectable()
export class AppInsightsService {

  constructor(
    @Inject(APP_INSIGHT_ID) public appID: string,
    @Inject(APP_NAME) public appName: string,
    public router: Router
    ) {
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
  // trackEvent(name: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a user action or other occurrence.
  static trackEvent(eventName: string, eventProperties?: {[name: string]: string}, metricProperty?: {[name: string]: number}) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.trackEvent(eventName, eventProperties, metricProperty);
    } catch (ex) {
      console.warn('Angular application insights Error [trackEvent]: ', ex);
    }

  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
  // trackPageView(name?: string, url?: string, properties?:{[string]:string}, measurements?: {[string]:number}, duration?: number)
  // Logs that a page or similar container was displayed to the user.
  static trackPageView(name?: string, url?: string, properties?: {[name: string]: string}, measurements?: {[name: string]: number}, duration?: number) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

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
  static startTrackPage(name?: string) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

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
  static stopTrackPage(name?: string, url?: string, properties?: {[name: string]: string}, measurements?: {[name: string]: number}) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

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
  static trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: {[name: string]: string}) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.trackMetric(name, average, sampleCount, min, max, properties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
  // trackException(exception: Error, handledAt?: string, properties?: {[string]:string}, measurements?: {[string]:number}, severityLevel?: AI.SeverityLevel)
  // Log an exception you have caught. (Exceptions caught by the browser are also logged.)
  static trackException(exception: Error, handledAt?: string, properties?: {[name: string]: string},
                        measurements?: {[name: string]: number}, severityLevel?: AI.SeverityLevel) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
    } catch (ex) {
      console.warn('Angular application insights Error [trackException]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#tracktrace
  // trackTrace(message: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a diagnostic event such as entering or leaving a method.
  static trackTrace(message: string, properties?: {[name: string]: string}) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.trackTrace(message, properties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackdependency
  // trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean, resultCode: number)
  // Log a dependency call (for instance: ajax)
  static trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean, resultCode: number) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

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
  static flush() {
    if (!AppInsightsService.isBrowser) {
      return;
    }
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
  static setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string) {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.setAuthenticatedUserContext(authenticatedUserId, accountId);
    } catch (ex) {
      console.warn('Angular application insights Error [setAuthenticatedUserContext]: ', ex);
    }
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#clearauthenticatedusercontext
  // clearAuthenticatedUserContext ()
  // Clears the authenticated user id and the account id from the user context, and clears the associated cookie.
  static clearAuthenticatedUserContext() {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.clearAuthenticatedUserContext();
    } catch (ex) {
      console.warn('Angular application insights Error [clearAuthenticatedUserContext]: ', ex);
    }
  }

  public init(): void {
    if (!AppInsightsService.isBrowser) {
      return;
    }

    try {
      AppInsights.downloadAndSetup({ instrumentationKey: this.appID });

      this.router.events.filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        AppInsightsService.startTrackPage(event.url);
      });

      this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        AppInsightsService.stopTrackPage(event.url);
      });
    } catch (ex) {
      console.warn('Angular application insights Error [downloadAndSetup]: ', ex);
    }
  }

  private static isBrowser(): boolean {
    return (typeof (<any>window) !== undefined);
  }
}

