import { Injectable, Inject } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { APP_INSIGHT_ID, APP_NAME } from './app-insight.config';

@Injectable()
export class AppInsightsService {

  constructor(
    @Inject(APP_INSIGHT_ID) public appID: string,
    @Inject(APP_NAME) public appName: string
    ) {
      this.init();
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
  // trackEvent(name: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a user action or other occurrence.
  trackEvent(eventName: string, eventProperties?: Object, metricProperty?: Object) {
    if (!this.isBrowser) {
      return;
    }

    if (eventProperties === null) {
    }

    try {
      AppInsights.trackEvent(eventName, eventProperties, metricProperty);
    } catch (ex) {
      console.warn('Angular application insights Error [trackEvent]: ', ex);
    }

  }

  // [[ TODO ]] **
  
  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
  // trackPageView(name?: string, url?: string, properties?:{[string]:string}, measurements?: {[string]:number}, duration?: number)
  // Logs that a page or similar container was displayed to the user.
  trackPageView() { return this.notImplemented('trackPageView'); }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#starttrackpage
  // startTrackPage(name?: string)
  // Starts the timer for tracking a page view. Use this instead of trackPageView if you want to control when the 
  // page view timer starts and stops, but don't want to calculate the duration yourself. This method doesn't send any 
  // telemetry. Call stopTrackPage to log the end of the page view and send the event.
  startTrackPage(name?: string) { return this.notImplemented('startTrackPage'); }
  
  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#stoptrackpage
  // stopTrackPage(name?: string, url?: string, properties?: Object, measurements?: Object)
  // Stops the timer that was started by calling startTrackPage and sends the page view telemetry with the 
  // specified properties and measurements. The duration of the page view will be the time between calling startTrackPage and stopTrackPage.
  stopTrackPage() { return this.notImplemented('stopTrackPage'); }
  
  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackmetric
  // trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: {[string]:string})
  // Log a positive numeric value that is not associated with a specific event. 
  // Typically used to send regular reports of performance indicators.
  trackMetric() { return this.notImplemented('trackMetric'); }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
  // trackException(exception: Error, handledAt?: string, properties?: {[string]:string}, measurements?: {[string]:number}, severityLevel?: AI.SeverityLevel)
  // Log an exception you have caught. (Exceptions caught by the browser are also logged.)
  trackException() { return this.notImplemented('trackException'); }
                 
  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#tracktrace
  // trackTrace(message: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a diagnostic event such as entering or leaving a method.
  trackTrace() { return this.notImplemented('trackTrace'); }
                 
  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackdependency
  // trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean, resultCode: number)
  // Log a dependency call (for instance: ajax)
  trackDependency() { return this.notImplemented('trackDependency'); }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#flush
  // flush()
  // Immediately send all queued telemetry. Synchronous.
  // * You don't usually have to use this, as it happens automatically on window closing.
  flush() { return this.notImplemented('flush'); }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
  // setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string)
  // Set the authenticated user id and the account id in this session. Use this when you have identified a specific 
  // signed-in user. Parameters must not contain spaces or ,;=|
  setAuthenticatedUserContext() { return this.notImplemented('setAuthenticatedUserContext'); }
  
  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#clearauthenticatedusercontext
  // clearAuthenticatedUserContext ()
  // Clears the authenticated user id and the account id from the user context, and clears the associated cookie.
  clearAuthenticatedUserContext() { return this.notImplemented('clearAuthenticatedUserContext'); }
                 

  /*
   * Internal
   */
  private init(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      AppInsights.downloadAndSetup({ instrumentationKey: this.appID });
    } catch (ex) {
      console.warn('Angular application insights Error [downloadAndSetup]: ', ex);
    }
  }

  private isBrowser(): boolean {
    return (typeof (<any>window) !== undefined);
  }

  private notImplemented(methodName: string) {
    return new Error('This method is not implemented in Parse5DomAdapter: ' + methodName);
  }

}

