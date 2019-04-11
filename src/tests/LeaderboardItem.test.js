import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { configure, mount } from 'enzyme';
import LeaderboardItem from '../components/LeaderboardItem';

configure({ adapter: new Adapter() });

const leaderboardItemMockData = {
      key: 'PLAYER 1 - PLAYER 2',
      goalsPlus: 0,
      goalsMinus: 0,
      won: 0,
      lost: 0,
      elo: 0
};

describe('Leaderboard Item', () => {
  it('should exist', () => {
    var wrapper = mount(<LeaderboardItem team={{}} index={1} />);

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
  });

  describe('leaderboard item', () => {
    it('should have trophy icon if it is first', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-position').find('svg[data-icon="trophy"]').length).toEqual(1);

      wrapper.unmount();
    });

    it('should have medal icon if it is second', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={2} />);

      expect(wrapper.find('.leaderboard-item-position').find('svg[data-icon="medal"]').length).toEqual(1);

      wrapper.unmount();
    });

    it('should have medal icon if it is third', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={3} />);

      expect(wrapper.find('.leaderboard-item-position').find('svg[data-icon="medal"]').length).toEqual(1);

      wrapper.unmount();
    });

    it('should have position number if it lower than third', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={4} />);

      expect(wrapper.find('.leaderboard-item-position').childAt(0).text()).toEqual('4');

      wrapper.unmount();
    });

    it('should have ELO', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-score').text()).toBe(leaderboardItemMockData.elo.toString());

      wrapper.unmount();
    });

    it('should have key', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-key').text()).toBe(leaderboardItemMockData.key);

      wrapper.unmount();
    });

    it('should have key', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-key').text()).toBe(leaderboardItemMockData.key);

      wrapper.unmount();
    });

    it('should have won count', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-won').text()).toBe(leaderboardItemMockData.won.toString());

      wrapper.unmount();
    });

    it('should have lost count', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-lost').text()).toBe(leaderboardItemMockData.lost.toString());

      wrapper.unmount();
    });

    it('should have goals difference', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-goal-difference').text()).toBe((leaderboardItemMockData.goalsPlus - leaderboardItemMockData.goalsMinus).toString());

      wrapper.unmount();
    });

    it('should have goals scored', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-goal-scored').text()).toBe('+ ' + leaderboardItemMockData.goalsPlus.toString());

      wrapper.unmount();
    });

    it('should have goals missed', () => {
      var wrapper = mount(<LeaderboardItem team={leaderboardItemMockData} index={1} />);

      expect(wrapper.find('.leaderboard-item-goal-missed').text()).toBe('- ' + leaderboardItemMockData.goalsMinus.toString());

      wrapper.unmount();
    });
  });
});