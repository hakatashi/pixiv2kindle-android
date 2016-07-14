var application = require("application");
application.start({ moduleName: "main-page" });
if (application.android) {
    application.onLaunch = function (intent) {
        if (intent.getAction() === "android.intent.action.SEND") {
            console.log("SEND Intent");
        }
    };
}
