import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInsightsService } from './src/app-insight.service';
import { provideConfig } from './src/app-insight.config';

export * from './src/app-insight.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: []
})

export class ApplicationInsightsModule {

  static forRoot(config: Microsoft.ApplicationInsights.IConfig): ModuleWithProviders {
    return {
      ngModule: ApplicationInsightsModule,
      providers: [
        AppInsightsService,
        provideConfig(config)
      ]
    };
  }
}
