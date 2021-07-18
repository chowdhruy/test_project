// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'http://tiktok.test/api/v1',
    firebase: {
        apiKey: "AIzaSyB4QpV8y1K6VHuPzBAWafKo-CP8bZumxYk",
        authDomain: "tiktok-test.firebaseapp.com",
        databaseURL: "https://tiktok-test.firebaseio.com",
        projectId: "tiktok-test",
        storageBucket: "tiktok-test.appspot.com",
        messagingSenderId: "416454314460"
    }
};
