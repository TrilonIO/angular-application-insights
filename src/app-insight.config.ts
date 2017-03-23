import { OpaqueToken } from '@angular/core';

export const APP_INSIGHTS_CONFIG: OpaqueToken = new OpaqueToken('appInsightsConfig');

export function provideConfig(config: Microsoft.ApplicationInsights.IConfig): any {

  if (!config && !config.instrumentationKey) {
      throw new Error('[ngx-application-insights] Error: MS Application Insights - config or config.instrumentationKey - undefined');
  }

  return [
    { provide: APP_INSIGHTS_CONFIG, useValue: config }
  ];
}
