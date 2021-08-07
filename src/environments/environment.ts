// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientID: "94a46c1add6e4caf9d092f3fa7006718",
  clientSecret:"a7226708dc274c6cb33c2ef2b6ce2573",
  // userAPIBase:"http://localhost:8080/api/user"
  userAPIBase:"https://lit-fortress-70043.herokuapp.com/api/user"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
