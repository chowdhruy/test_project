// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    envName: 'beta',
    apiUrl: 'http://beta.tiktok.com.bd/api/v1',
    firebase: {
        apiKey: "AIzaSyD8Ycf3RGn33Ngs7jQhbWvgCmXH-rLUFEs",
        authDomain: "tiktok-d5ef7.firebaseapp.com",
        databaseURL: "https://tiktok-d5ef7.firebaseio.com",
        projectId: "tiktok-d5ef7",
        storageBucket: "tiktok-d5ef7.appspot.com",
        messagingSenderId: "907985344032"
    }
};
