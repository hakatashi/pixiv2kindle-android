var application = require("application");
var http = require("http");

var showToast = function (text) {
    var Toast = android.widget.Toast;
    Toast.makeText(application.android.context, text, Toast.LENGTH_LONG).show();
}

application.start({ moduleName: "main-page" });
if (application.android) {
    application.onLaunch = function (intent) {
        if (intent.getAction() === "android.intent.action.SEND" && intent.getType() === "text/plain") {
            var clipData = intent.getClipData();
            var text = clipData.getItemAt(0).getText();
            showToast(text);

            var matchingURL = text.match(/https?:\/\/[\-A-Za-z0-9+&@#\/%?=~_|!.]+/);

            if (matchingURL !== null) {
                var url = matchingURL[0];

                console.log(url);
                showToast(url);

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
