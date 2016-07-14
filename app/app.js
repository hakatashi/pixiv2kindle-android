var application = require("application");
var http = require("http");

application.start({ moduleName: "main-page" });
if (application.android) {
    application.onLaunch = function (intent) {
        if (intent.getAction() === "android.intent.action.SEND" && intent.getType() === "text/plain") {
            var clipData = intent.getClipData();
            var text = clipData.getItemAt(0).getText();

            var matchingURL = text.match(/https?:\/\/[\-A-Za-z0-9+&@#\/%?=~_|!.]+/);

            if (matchingURL !== null) {
                var url = matchingURL[0];

                /*
                http.request({
                    url: 'https://api.hakatashi.com/pixiv2kindle/publish',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    content: 'id=' + encodeURIComponent('1098347'),
                }).then(function (response) {
                    console.log(response.content);
                }, function (e) {
                    console.log("Error occurred " + e);
                });
                */
            }
        }
    };
}
