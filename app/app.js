var application = require("application");
var http = require("http");

application.start({ moduleName: "main-page" });
if (application.android) {
    application.onLaunch = function (intent) {
        if (intent.getAction() === "android.intent.action.SEND" && intent.getType() === "text/plain") {
            var clipData = intent.getClipData();
            var text = clipData.getItemAt(0).getText();
        }
    };
}
