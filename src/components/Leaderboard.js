import React, { Component } from "react";
import Elo from "elo-js";

import LeaderboardItem from "./LeaderboardItem"

const elo = new Elo();

class Leaderboard extends Component {
    calculateTeams = matches => {
        var matchesCopy = matches.slice()

        var teams = {};
        matchesCopy.forEach(match => {
            let teamOneKey = match.teams[0].players
                .sort()
                .join(" - ")
                .toUpperCase()
                .trim();

            let teamTwoKey = match.teams[1].players
                .sort()
                .join(" - ")
                .toUpperCase()
                .trim();

            teams[teamOneKey] = teams[teamOneKey] || {
                goalsPlus: 0,
                goalsMinus: 0,
                won: 0,
                lost: 0,
                elo: 1200
            };

            teams[teamTwoKey] = teams[teamTwoKey] || {
                goalsPlus: 0,
                goalsMinus: 0,
                won: 0,
                lost: 0,
                elo: 1200
            };

            if (match.finalized === true) {
                teams[teamOneKey].goalsPlus += match.teams[0].score;
                teams[teamOneKey].goalsMinus += match.teams[1].score;

                teams[teamTwoKey].goalsPlus += match.teams[1].score;
                teams[teamTwoKey].goalsMinus += match.teams[0].score;

                const winnerKey =
                    match.teams[0].score > match.teams[1].score
                        ? teamOneKey
                        : teamTwoKey;
                const loserKey =
                    match.teams[0].score > match.teams[1].score
                        ? teamTwoKey
                        : teamOneKey;

                teams[winnerKey].won++;
                teams[loserKey].lost++;

                teams[winnerKey].elo = elo.ifWins(
                    teams[winnerKey].elo,
                    teams[loserKey].elo
                );

                teams[loserKey].elo = elo.ifLoses(
                    teams[loserKey].elo,
                    teams[winnerKey].elo
                );
            }
        });

        teams = Object.keys(teams).map(key => {
            return {
                key: key,
                goalsPlus: teams[key].goalsPlus,
                goalsMinus: teams[key].goalsMinus,
                won: teams[key].won,
                lost: teams[key].lost,
                elo: teams[key].elo
            };
        });

        teams
            .sort((a, b) => {
                if (a.elo === b.elo) return 0;
                if (a.elo < b.elo) {
                    return -1;
                }

                return 1;
            })
            .reverse();

        return teams;
    };

    render() {
        const teams = this.calculateTeams(this.props.matches);

        return (
            <div>
                {teams.map((team, i) =>
                    <LeaderboardItem team={team} index={i + 1} key={i} />
                )}
            </div>
        );
    }
}

export default Leaderboard;
