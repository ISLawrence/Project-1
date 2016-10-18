module.exports = {
    getUserInfo: function(req, res) {
        SteamInstance.resolveVanityURL({ vanityurl: req.params.name }, function(err, data) {
            console.log("data: ", data)
            if (err) return res.send(err);
            if (data.success == 42) return res.send({
                found: false,
                message: "User not found!"
            });

            SteamInstance.getOwnedGames({
                key: config.steamApiKey,
                steamid: data.steamid,
                include_appinfo: true,
                include_played_free_games: false,
                appids_filter: 0
            }, function(err, data) {
                res.send(data)
            })
        });
    },
    getSteamLevel: function(req, res) {
        SteamInstance.getSteamLevel({
            key: config.steamApiKey,
            steamid: req.params.id
        }, function(err, data) {
            res.send(data)
        })
    }
}
