(function(global) {

    var settings = {
        baseURL: "http://127.0.0.1:8888",
        cellSide: 20

    }

    settings.apiURL = settings.baseURL + "/";

    function addUrl(key, url, method){
        settings[key] = {
            url: settings.apiURL + url,
            method: method||"POST"
        }
    }

    // Users
    addUrl("join", "user/join");
    
    // Game
    addUrl("gameStatus", "game/{gameId}/status", "GET");
    addUrl("isMyStep", "game/{gameId}/is-my-step/{userId}", "GET"); // should return opponent actions

    addUrl("loadUserShips", "game/{gameId}/load-user-ships/{userId}", "GET");
    addUrl("saveUserShips", "game/{gameId}/save-user-ships/{userId}");

    addUrl("saveUserActions", "game/{gameId}/save-user-actions/{userId}");
    addUrl("gameResults", "game/{gameId}/results", "GET");

    function API(){}

    API.prototype = {
        getURL: function(name, data){
            var url = settings[name].url;
            return url.replace(/\{([^{}]*)\}/g, function($0, $1){
                var replacement = data[$1].toString();
                delete data[$1];
                return replacement;
            });
        },
        callURL: function(name, data, callback, failCallback){
            var url = settings[name].url,
                method = settings[name].method,
                that=this;

            failCallback = failCallback || function(){ console.log(arguments) }

            url = url.replace(/\{([^{}]*)\}/g, function($0, $1){
                var replacement = data[$1].toString();
                delete data[$1];
                return replacement;
            });

            $.ajax({
                type: method,
                url: url,
                data: data//JSON.stringify(data)
            }).done(callback).fail(failCallback);
        }
    }

    global.settings = settings;
    global.api = new API();
})(window);