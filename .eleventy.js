module.exports = config => {
    config.addPassthroughCopy('src/assets');
    config.addPassthroughCopy('src/css');
    config.addPassthroughCopy('src/js');


    config.addNunjucksFilter("filter_by", (array, property, value) => {
        return array.filter((item) => {
            return item[property] === value;
        });
    });

    config.addNunjucksFilter("sort_by", (array, property, order) => {
        return array.sort((a, b) => {
            return order === "ascending" ? a[property] - b[property] : b[property] - a[property];
        });
    });

    config.addNunjucksFilter("trainer_filter", (trainers, status) => {
        return trainers.filter((trainer) => {
            return trainer.status === status;
        });
    });

    config.addNunjucksFilter("player_filter", (players, status, position) => {
        return players.filter((player) => {
            return player.status === status
                && player.position === position;
        });
    });

    config.addNunjucksFilter("match_filter", (matches, event, group) => {
        return matches.filter((match) => {
            return match.eventId === event
                && match.group === group;
        });
    });

    config.addNunjucksFilter("category_ranking_filter", (matches, category) => {
        const newMatches = matches.filter((match) => {
            return match.teamA.name === "FC Ste-Foy"
                || match.teamB.name === "FC Ste-Foy";
        })
        .map((match) => {
            const { eventId, group, teamA, teamB } = match;
            let team = teamB;
            if (teamA.name === "FC Ste-Foy") {
                team = teamA;
            }
            return { eventId, group, team };
        });

        const players = {};

        newMatches.forEach((match) => {
            if (!(category in match.team)) {
                return;
            }
            Object.keys(match.team[category])
                .forEach((playerName) => {
                    if (!(playerName in players)) {
                        players[playerName] = 0;
                    }
                    players[playerName] += match.team[category][playerName];
                });
        });

        return Object.keys(players).map((playerName) => {
            if (category === "scorers") {
                return {
                    name: playerName,
                    goals: players[playerName]
                };
            }
            else {
                return {
                    name: playerName,
                    concededGoals: players[playerName]
                };
            }
        });
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'public',
            includes: "templates",
            data: "data"
        }
    };
};