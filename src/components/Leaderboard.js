import React, { Component } from "react";
import LeaderboardItem from "./LeaderboardItem"

class Leaderboard extends Component {
    render() {
        return (
            <div>
                {this.props.teams.map((team, i) =>
                    <LeaderboardItem team={team} index={i + 1} key={i} />
                )}
            </div>
        );
    }
}

export default Leaderboard;
