var api = (function () {
    var timerReset;
    $.support.cors = true;

    var reqTracker = {
        requests: [],
        timer: null,
        /**
         * Add active request to list
         * 
         * @param method -
         *            request method
         * @param value -
         *            request handler
         */
        add: function (xhr, key) {
            reqTracker.requests.push({
                'xhr': xhr,
                'key': key
            });
            if (reqTracker.requests.length == 1) {
                // reqTracker.timer = setTimeout(function() {
                if (window.showProgress) {
                    showProgress(); // show on-screen progress icon/animation
                }
                // }, 1000);
            }
            return xhr;
        },
        find: function (key) {
            for (var i = 0; i < reqTracker.requests.length; i++) {
                if (angular.equals(reqTracker.requests[i].key, key)) {
                    return reqTracker.requests[i].xhr;
                }
            }
            return null;
        },
        /**
         * Delete request from list
         * 
         * @param method -
         *            request method
         */
        del: function (xhr) {
            for (var i = 0; i < reqTracker.requests.length; i++) {
                if (reqTracker.requests[i].xhr == xhr) {
                    reqTracker.requests.splice(i, 1);
                    break;
                }
            }
            if (reqTracker.requests.length == 0 && window.hideProgress) {
                hideProgress(); // hide on-screen progress icon/animation
                if (reqTracker.timer)
                    ;
                clearTimeout(reqTracker.timer);
                reqTracker.timer = null;
            }
        },
        /**
         * Cancel all active requests
         */
        cancelAll: function () {
            for (var i = 0; i < reqTracker.requests.length; i++) {
                reqTracker.requests[i].xhr.abort();
            }
            reqTracker.requests = [];

            if (window.hideProgress) {
                hideProgress();
                if (reqTracker.timer)
                    ;
                clearTimeout(reqTracker.timer);
                reqTracker.timer = null;
            }
        }
    };

    var _session = null;
    /*
     * example: { "userId": <USERID>, "role": <USER_ROLE>, "token": <TOKEN> }
     */

    function getSession() {
        if (!_session) {
            // try to use previous session value
            // _session = JSON.parse(localStorage.getItem("session"));
            _session = {
                'userId': 1,
                'role': 'admin',
                'token': 12345,
                'am_ecpd_id': 1
            };
        }

        if (!_session) {
            reqTracker.cancelAll();
            window.location = "#/login";
        }

        return _session;
    }



    function prepareRequest(method, args) {
        var session = getSession();

        if (!session) {
            return null;
        }

        var token = session.token;

        switch (method) {

            case "getSettingsData":
                return {
                    url: "Json/" + args.apiName + ".json",
                    type: "GET"
                };

            default:
                alert("Error. Requested method is not implemented.");
                return null;
        }
    }

    function commonNetworkErrorCallback(externalCB, request) {
        return function (xhr, textStatus, errorThrown) {
            reqTracker.del(request);

            // normalize error object:
            if (xhr.response) {
                xhr.status = xhr.response;
            }
            if (xhr.errorMessage) {
                xhr.statusText = xhr.errorMessage;
            } else if (xhr.message) {
                xhr.statusText = xhr.message;
            }

            var preventDefault = false;
            if (externalCB) {
                preventDefault = externalCB(xhr);
            }
            if (typeof (preventDefault) != 'undefined'
                    && preventDefault == false) {
                // default behavior:
                if ((xhr.status == 0 && xhr.statusText == 'error')
                        || xhr.status == 504) {
                    alert("An error occurred during connection to server.\n"
                            + "Please check your Internet connection and try again.");
                } else if (xhr.status == 250 || xhr.status == 500
                        || xhr.status == 501 || xhr.status == 502
                        || xhr.status == 503 || xhr.status == 504
                        || xhr.status == 505 || xhr.status == 505
                        || xhr.status == 506 || xhr.status == 507
                        || xhr.status == 508 || xhr.status == 509
                        || xhr.status == 'failure') {
                    alert(xhr.statusText);
                    if (xhr.status == 250)
                        location.reload();
                } else {
                }
            }
        };
    }

    // public api:
    return {
        /**
         * Execute a server method with parameters
         * 
         * @param method -
         *            logical method name
         * @param args -
         *            arguments object
         * @param successCb -
         *            success callback
         * @param errorCb -
         *            error callback e.x.: api.execute("gatewayListGet",
         *            {userID: 123}, function(data){alert(data);},
         *            function(){});
         */
        execute: function (method, args, successCb, errorCb) {
            // check for available cached data:
            if (window.cache) {
                var data = cache.getItem(method, args);
                if (typeof (data) != 'undefined') {
                    if (successCb)
                        setTimeout(function () {
                            successCb(data, "OK", null);
                        }, 0);
                    return null;
                }
            }

            // translate method and arguments to jQuery request structure:
            var request = prepareRequest(method, args);
            if (!request)
                return null; // execution might be cancelled or UI redirected
            // for
            // authentication

            if (request.url) {
                if ("undefined" == typeof (request.headers)) {
                    request.headers = {};
                }
                $.extend(request.headers);
            }

            var xhr = reqTracker.find(request);
            if (!xhr) { // else reuse already running request
                if (!request.timeout)
                    request.timeout = 60000;
                if (request.url && request.type == "GET") {
                    var index = request.url.indexOf('?');
                    if (index != -1) {
                        request.url = request.url.substring(0, index + 1) + "random=" + Math.random() + "&" + request.url.substring(index + 1, request.url.length);
                    }
                    else
                        request.url = request.url + "?random=" + Math.random();
                }
                xhr = $.ajax(request);
                xhr = reqTracker.add(xhr, request);
            }
            var xhrError = commonNetworkErrorCallback(errorCb, xhr);

            xhr.done(function (data, textStatus, xhr) {

                        // this is actually an error:
                        if (((data === "undefined") || (data.status !== undefined
                                && data.status != 0
                                && data.status != 200 && data.status != "success"))
                                && (data.status != 503
                                        && data.status != 502
                                        && data.status != 500
                                        && data.status != 401
                                        && data.status != 250 && data.status != 'failed')) {
                            // this is actually an error:
                            xhrError(data);
                            return;
                        }

                        if ("undefined" !== typeof (data.totalRecords)) {
                            if (data.data)
                                data.data.totalRecords = data.totalRecords;
                        }

                        reqTracker.del(xhr);
                        if (window.cache)
                            cache.addItem(method, args, data.data);
                        if (successCb) {
                            if (data.errorMessage)
                                data.message = data.errorMessage;

                            if (data.status == 401 || data.errorCode == 401) {
                                reqTracker.cancelAll();

                                if (window.cache)
                                    cache.clearAll();

                                sessionStorage.clear();
                                localStorage.clear();
                                document.cookie = "checksession=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

                                window.location.href = 'sessionExpired.html';
                            }
                            if (data.status == 503
                                    || data.errorCode == 503) {
                                data.data = {};
                                data.data["typ"] = "info";
                                data.data["txt"] = (data.message) ? data.message
                                        : "No Data Available";
                            } else if (data.status == 502
                                    || data.errorCode == 502) {
                                data.data = {};
                                data.data["typ"] = "error";
                                data.data["txt"] = (data.message) ? data.message
                                        : "Invalid Request Payload";
                            } else if (data.status == 500
                                    || data.status == 250
                                    || data.errorCode == 500
                                    || data.errorCode == 250) {
                                data.data = {};
                                data.data["typ"] = "error";
                                data.data["txt"] = (data.message) ? data.message
                                        : "Internal Server Error. Please try again after some time.";
                            } else {
                                if (typeof data == 'string')
                                    data = JSON.parse(data);
                                else {
                                    if (!data.data)
                                        data.data = [];
                                    if (typeof data.data == 'string'
                                            && data.data == "")
                                        data.data = {};
                                    data.data["typ"] = "success";
                                    data.data["txt"] = (data.message) ? data.message
                                            : "";

                                }
                            }
                            successCb(data.data, textStatus, xhr);
                        }
                    }).fail(xhrError);

        },
        /**
         * Cancel all active requests
         */
        cancelAll: reqTracker.cancelAll,
        // get general settings(view mode, alertType, perPage) and put them into
        // _session

    };
})();



