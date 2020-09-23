import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Metric, AnalyticsImplementation } from "./analytics-demo.interface";
import { AnalyticsService } from "../services/analytics.service";

// added this ->
import { HttpClientModule, HttpClient } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule // <-- added
  ],
  providers: [
    // Another way we can use DI is to provide a value, much like we might use a global constant.
    // export class AnalyticsDemoComponent {
    //   constructor(@Inject("API_URL") apiUrl: string) {
    //     // works! do something w/ apiUrl
    //   }
    // }
    // add our API_URL provider
    { provide: "API_URL", useValue: "http://devserver.com" },
    {
      provide: AnalyticsService,

      // add our `deps` to specify the factory depencies
      // deps is an array of injection tokens and these tokens will
      // be resolved and passed as arguments to the factory function.
      deps: [HttpClient, "API_URL"],

      // notice we've added arguments here
      // the order matches the deps order
      useFactory(http: HttpClient, apiUrl: string) {
        // create an implementation that will log the event
        const loggingImplementation: AnalyticsImplementation = {
          recordEvent: (metric: Metric): void => {
            console.log("The metric is:", metric);
            console.log("Sending to: ", apiUrl);
            // you'd send the metric using http here ...
          }
        };

        // create our new `AnalyticsService` with the implementation
        return new AnalyticsService(loggingImplementation);
      }
    }
  ],
  declarations: []
})
export class AnalyticsDemoModule {}
