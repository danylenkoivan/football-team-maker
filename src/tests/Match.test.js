import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { configure, mount } from 'enzyme';
import Match from '../components/Match';

configure({ adapter: new Adapter() });

const notFinalizedMatchMockData = {
    created: 0,
    finalized: false,
    teams: [
      {
        players: [
          "PLAYER 1",
          "PLAYER 2"
        ],
        score: 0
      },
      {
        players: [
          "PLAYER 3",
          "PLAYER 4"
        ],
        score: 0
      }
    ]
};

const finalizedMatchMockData = {
    created: 0,
    finalized: true,
    teams: [
      {
        players: [
          "PLAYER 1",
          "PLAYER 2"
        ],
        score: 0
      },
      {
        players: [
          "PLAYER 3",
          "PLAYER 4"
        ],
        score: 0
      }
    ]
};

describe('Match', () => {
  it('should exist', () => {
    var wrapper = mount(<Match match={notFinalizedMatchMockData} canEdit={true} />);

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
  });

  it('should not show full screen by default', () => {
    var wrapper = mount(<Match match={notFinalizedMatchMockData} canEdit={true} />);

    expect(wrapper.find('.full-screen').exists()).toBe(false);

    wrapper.unmount();
  });

  describe('Ongoing', () => {
    it('should not have rematch button', () => {
      var wrapper = mount(<Match match={notFinalizedMatchMockData} canEdit={true} />);

      expect(wrapper.find('.rematch-action').exists()).toBe(false);

      wrapper.unmount();
    });

    it('should have fullscreen button', () => {
      var wrapper = mount(<Match match={notFinalizedMatchMockData} canEdit={true} />);

      expect(wrapper.find('.expand-action').exists()).toBe(true);

      wrapper.unmount();
    });

    it('should have finalize button', () => {
      var wrapper = mount(<Match match={notFinalizedMatchMockData} canEdit={true} />);

      expect(wrapper.find('.finalize-action').exists()).toBe(true);

      wrapper.unmount();
    });

    it('should change team score ', () => {
      const generateTeamsMock = jest.spyOn(GenerateTeams.prototype, 'generateTeams');
      var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

      wrapper.setState({ signedUpPlayers: ['PLAYER 1', 'PLAYER 2'] });

      wrapper.find('#generate-teams-button').simulate('click')

      wrapper.update();

      expect(generateTeamsMock).toHaveBeenCalled();
      expect(wrapper.state().signedUpPlayers.length).toEqual(2);

      wrapper.unmount();
    });
  });

  describe('Finished', () => {
    it('should have rematch button', () => {
      var wrapper = mount(<Match match={finalizedMatchMockData} canEdit={true} />);

      expect(wrapper.find('.rematch-action').exists()).toBe(true);

      wrapper.unmount();
    });

    it('should not have fullscreen button', () => {
      var wrapper = mount(<Match match={finalizedMatchMockData} canEdit={true} />);

      expect(wrapper.find('.expand-action').exists()).toBe(false);

      wrapper.unmount();
    });

    it('should not have finalize button', () => {
      var wrapper = mount(<Match match={finalizedMatchMockData} canEdit={true} />);

      expect(wrapper.find('.finalize-action').exists()).toBe(false);

      wrapper.unmount();
    });
  });
});