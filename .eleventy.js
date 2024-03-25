module.exports = config => {
    config.addPassthroughCopy('src/assets');
    config.addPassthroughCopy('src/css');
    config.addPassthroughCopy('src/js');


    config.addNunjucksFilter("filter_by", (array, property, value) => array.filter(item => item[property] === value));
    config.addNunjucksFilter("sort_by", (array, property) => array.sort((a, b) => a[property] - b[property]));

    config.addNunjucksFilter("trainers_filter", (trainers, status) => {
        return trainers.filter((trainer) => trainer.status === status)
    });

    config.addNunjucksFilter("players_filter", (players, status, position) => {
        return players.filter(
            (player) => player.status === status
            && player.position === position
        )
    });

    config.addNunjucksFilter("matches_filter", (matches, event, group) => {
        return matches.filter(
            (match) => match.eventId === event
            && match.group === group
        )
    })

    config.addNunjucksFilter("scorer_ranking_filter", (matches) => {
        const newMatches = matches.filter(
            (match) => match.teamA.name === "FC Ste-Foy"
            || match.teamB.name === "FC Ste-Foy"
        )
        .map((match) => {
            const { eventId, group, teamA, teamB } = match
            let team = teamB
            if (teamA.name === "FC Ste-Foy") {
                team = teamA
            }
            return { eventId, group, team }
        })

        const scorers = {}

        newMatches.forEach((match) => {
            if (!('scorers' in match.team)) {
                return
            }
            Object.keys(match.team.scorers)
                .forEach((playerName) => {
                    if (!(playerName in scorers)) {
                        scorers[playerName] = 0;
                    }
                    scorers[playerName] += match.team.scorers[playerName]
                })
        })

        return Object.keys(scorers).map((playerName) => {
            return {
                scorer: playerName,
                goals: scorers[playerName]
            }
        })
    })

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