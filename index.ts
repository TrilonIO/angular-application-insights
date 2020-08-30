import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInsightsConfig, AppInsightsService } from './src/app-insight.service';

export { SeverityLevel, AppInsightsConfig, AppInsightsService } from './src/app-insight.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  exports: [],
  providers: [ AppInsightsService ]
})

export class ApplicationInsightsModule {

  constructor (
    @Optional() @SkipSelf() parentModule: ApplicationInsightsModule,
    appInsightsService: AppInsightsService
  ) {
    if (!parentModule) {
        appInsightsService.init();
    }
  }

  static forRoot(config: AppInsightsConfig): ModuleWithProviders<ApplicationInsightsModule> {
    return {
      ngModule: ApplicationInsightsModule,
      providers: [
        { provide: AppInsightsConfig, useValue: config },
        AppInsightsService
      ]
    };
  }
}
