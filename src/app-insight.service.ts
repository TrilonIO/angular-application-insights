import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AppInsightsService {

  constructor(
    @Inject('APP_INSIGHT_ID') public appID: string,
    @Inject('APP_NAME') public appName: string
    ) {
      this.init();
  }

  private init(): void {
    if (!this.isBrowser) {
      return;
    }

    (<any>window).appInsights.start(this.appID);
  }

  public trackEvent(eventName: string, customData: any) {
    if (!this.isBrowser) {
      return;
    }

    (<any>window).appInsights.trackEvent(eventName, customData);
  }

  private isBrowser(): boolean {
    return (typeof (<any>window) !== undefined);
  }

}

