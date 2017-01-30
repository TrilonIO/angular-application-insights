import { OpaqueToken } from '@angular/core';

export interface IAppInsightConfig {
  appID: string;
  appName?: string;
}

export const APP_INSIGHT_ID: OpaqueToken = new OpaqueToken('XXXX-12345');
export const APP_NAME: OpaqueToken = new OpaqueToken('Angular Application');

export function provideConfig(config: IAppInsightConfig): any {

  if (!config.appID) {
      throw new Error('[ ngx-application-insights] Error: MS Application Insight -ID- not passed into config.');
  }

  return [
    { provide: APP_INSIGHT_ID, useValue: config.appID },
    { provide: APP_NAME, useValue: config.appName ? config.appName : APP_NAME }
  ];
}
