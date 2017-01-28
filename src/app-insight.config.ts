import { OpaqueToken } from '@angular/core';

export interface IAppInsightConfig {
  applicationInsightID: string;
  angularAppName?: string;
}

export const APP_INSIGHT_ID: OpaqueToken = new OpaqueToken('XXXX-12345');
export const APP_NAME: OpaqueToken = new OpaqueToken('Angular Application');

export function provideConfig(config: IAppInsightConfig): any {
  return [
    { provide: APP_INSIGHT_ID, useValue: config.applicationInsightID },
    { provide: APP_NAME, useValue: config.angularAppName ? config.angularAppName : APP_NAME }
  ];
}
