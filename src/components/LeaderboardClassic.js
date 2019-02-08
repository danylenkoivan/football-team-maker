import React, { Component } from "react";

class LeaderboardClassic extends Component {
    victoryPoints = 3;
    lossPoints = 1;

    calculateTeams = matches => {
        var teams = {};
        matches.forEach(match => {
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
                lost: 0
            };

            teams[teamTwoKey] = teams[teamTwoKey] || {
                goalsPlus: 0,
                goalsMinus: 0,
                won: 0,
                lost: 0
            };

            if (match.finalized === true) {
                teams[teamOneKey].goalsPlus += match.teams[0].score;
                teams[teamOneKey].goalsMinus += match.teams[1].score;

                teams[teamTwoKey].goalsPlus += match.teams[1].score;
                teams[teamTwoKey].goalsMinus += match.teams[0].score;

                if (match.teams[0].score > match.teams[1].score) {
                    teams[teamOneKey].won++;
                    teams[teamTwoKey].lost++;
                } else if (match.teams[0].score < match.teams[1].score) {
                    teams[teamOneKey].lost++;
                    teams[teamTwoKey].won++;
                }
            }
        });

        teams = Object.keys(teams).map(key => {
            return {
                key: key,
                goalsPlus: teams[key].goalsPlus,
                goalsMinus: teams[key].goalsMinus,
                won: teams[key].won,
                lost: teams[key].lost,
                score:
                    teams[key].won * this.victoryPoints +
                    teams[key].lost * this.lossPoints
            };
        });

        teams
            .sort(
                (a, b) =>
                    a.score - b.score ||
                    a.goalsPlus - a.goalsMinus - (b.goalsPlus - b.goalsMinus)
            )
            .reverse();

        teams = teams.map((team, index) => {
            if (teams[index - 1]) {
                team.goalsToAdvance = teams[index - 1].goals - team.goals;

                team.winsToAdvance = Math.floor(
                    (teams[index - 1].score - team.score) / this.victoryPoints +
                        1
                );
            }

            return team;
        });

        return teams;
    };

    render() {
        const teams = this.calculateTeams(this.props.matches);

        return (
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Teams Leaderboard</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Won</td>
                                <td>Lost</td>
                                <td>Score</td>
                                <td>To advance</td>
                                <td colSpan="2">Goals</td>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((player, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{player.key}</td>
                                    <td>{player.won}</td>
                                    <td>{player.lost}</td>
                                    <td>
                                        <b>{player.score}</b>
                                    </td>
                                    <td className="text-success">
                                        {player.winsToAdvance && (
                                            <span>
                                                <b>+{player.winsToAdvance}</b>{" "}
                                                wins
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-success">
                                        {player.goalsPlus}
                                    </td>
                                    <td className="text-danger">
                                        {player.goalsMinus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default LeaderboardClassic;
