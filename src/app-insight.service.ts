import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AppInsightsService {

  constructor(
    @Inject('APP_INSIGHT_ID') public appID: string,
    @Inject('APP_NAME') public appName: string
    ) {
      this.init();
  }

  // On logEvent AppInsight usage:
  // https://msdn.microsoft.com/en-us/library/dn614099.aspx

  logEvent(eventName: string, eventProperties?: Object, metricProperty?: Object) {
    if (!this.isBrowser) {
      return;
    }

    if (eventProperties === null) {
    }

    try {
      (<any>window).appInsights.logEvent(eventName, eventProperties, metricProperty);
    } catch (ex) {
      console.warn('Angular application insights Error [logEvent]: ', ex);
    }

  }

  /*
   * Internal
   */
  private init(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      (<any>window).appInsights.start(this.appID);
    } catch (ex) {
      console.warn('Angular application insights Error [start]: ', ex);
    }
  }

  private isBrowser(): boolean {
    return (typeof (<any>window) !== undefined);
  }

}

