// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const api = 'https://cc24-dev.azurewebsites.net//api/v1';
const storage =
  'https://sqlva4xc6f6d75d34c.blob.core.windows.net/uploaded-images';

export const environment = {
  production: false,
  type: 'local',
  version: '1.1.13',

  parameters: `${api}/parameters`,
  models: `${api}/parameters/models`,
  vehicle: `${api}/vehicles/search?api-version=2020-06-30&search=*`,
  vehicle_polyglot: `${api}/vehicles/translation`,
  vehicle_crud: `${api}/vehicles`,
  vatkey_get: `${api}/settings/vat`,
  img_storage_sm: `${storage}`,
  img_url_not_found: '/assets/images/img-not-found.jpg',
  //img_storage_sm: `${storage}product-small`,
  img_storage_md: `${storage}product-medium`,
  img_storage_lg: `${storage}product-lg`,

  //leads
  post_leads: `${api}/leads`,
  post_leads_contact: `${api}/leads/contact`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
