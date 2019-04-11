import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { configure, mount } from 'enzyme';
import Leaderboard from '../components/Leaderboard';

configure({ adapter: new Adapter() });

const teamsMockData = [
  {
      key: 'PLAYER 1 - PLAYER 2',
      goalsPlus: 0,
      goalsMinus: 0,
      won: 0,
      lost: 0,
      elo: 0
  },
  {
      key: 'PLAYER 3 - PLAYER 4',
      goalsPlus: 0,
      goalsMinus: 0,
      won: 0,
      lost: 0,
      elo: 0
  },
];

describe('Leaderboard', () => {
  it('should exist', () => {
    var wrapper = mount(<Leaderboard teams={[]} />);

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
  });

  it('should build leaderboard item for every team', () => {
    var wrapper = mount(<Leaderboard teams={teamsMockData} />);

    expect(wrapper.find('LeaderboardItem').length).toEqual(2);

    wrapper.unmount();
  });
});