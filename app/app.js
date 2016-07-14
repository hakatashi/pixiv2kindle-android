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

            var matchingURL = text.match(/https?:\/\/[\-A-Za-z0-9+&@#\/%?=~_|!.]+/);

            if (matchingURL !== null) {
                var url = matchingURL[0];

                var id = null, match = null;
                if (match = url.match(/id=(\d+)/)) {
                    id = match[1];
                } else if (match = url.match(/novel\/(\d+)/)) {
                    id = match[1];
                }

                if (id === null) {
                    showToast("Novel ID not found in URL");
                } else {
                    showToast("Delivering novel " + id);

                    http.request({
                        url: 'https://api.hakatashi.com/pixiv2kindle/publish',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        content: 'id=' + encodeURIComponent(id),
                    }).then(function (response) {
                        showToast("Successfully delivered novel " + id);
                    }, function (e) {
                        showToast("Error occured: " + e);
                    });
                }
            } else {
                showToast("No URL found in string");
            }
        } else {
            showToast("Please launch app from pixiv share");
        }
    };
}
