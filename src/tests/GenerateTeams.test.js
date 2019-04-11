import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { configure, mount } from 'enzyme';
import GenerateTeams from './../components/GenerateTeams';

configure({ adapter: new Adapter() });

const playersMockData = [
  'PLAYER 1',
  'PLAYER 2',
  'PLAYER 3',
  'PLAYER 4'
];


describe('GenerateTeams', () => {
  it('should exist', () => {
    var wrapper = mount(<GenerateTeams />);

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
  });

  describe('canEdit is false', () => {
    it('should be hidden', () => {
      var wrapper = mount(<GenerateTeams canEdit={false} />);

      expect(wrapper.html()).toBe('<div></div>');

      wrapper.unmount();
    });
  });

  describe('canEdit is true', () => {

    it('should have start match button', () => {
      var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

      expect(wrapper.find('#generate-teams-button').length).toEqual(1);

      wrapper.unmount();
    });

    it('should have new player input', () => {
      var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

      expect(wrapper.find('.new-player-control').find('input[type="text"]').length).toEqual(1);

      wrapper.unmount();
    });

    it('should have new player button', () => {
      var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

      expect(wrapper.find('#add-new-player-button').length).toEqual(1);

      wrapper.unmount();
    });

    it('should show all players in the list', () => {
      var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

      expect(wrapper.find('.player-item').length).toEqual(4);

      wrapper.unmount();
    });

    it('should show players\' names in the list', () => {
      var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

      expect(wrapper.find('.player-item').first().text()).toEqual('PLAYER 1');

      wrapper.unmount();
    });


    it('should show new players in the list', () => {
      var wrapper = mount(<GenerateTeams players={[]} canEdit={true} />);

      wrapper.setState({ newPlayers: ['NEW PLAYER 1', 'NEW PLAYER 2'] });

      expect(wrapper.find('.player-item').length).toEqual(2);

      wrapper.unmount();
    });

    it('should show new players\' names in the list', () => {
      var wrapper = mount(<GenerateTeams players={[]} canEdit={true} />);

      wrapper.setState({ newPlayers: ['NEW PLAYER 1'] });

      expect(wrapper.find('.player-item').first().text()).toEqual('NEW PLAYER 1');

      wrapper.unmount();
    });

    describe('Player functions', () => {
      it('should add clicked player to signed up players on click', () => {
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        wrapper.find('.player-item').first().simulate('click')

        expect(wrapper.state().signedUpPlayers[0]).toEqual(playersMockData[0]);
        expect(wrapper.state().signedUpPlayers.length).toEqual(1);

        wrapper.unmount();
      });

      it('should remove clicked player from signed up players on click', () => {
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        wrapper.setState({ signedUpPlayers: ['PLAYER 1', 'PLAYER 2'] });

        wrapper.find('.player-item').first().simulate('click')

        expect(wrapper.state().signedUpPlayers[0]).toEqual('PLAYER 2');
        expect(wrapper.state().signedUpPlayers.length).toEqual(1);

        wrapper.unmount();
      });
    });

    describe('New player functions', () => {
      it('should update new player\'s name', () => {
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        wrapper.find('.new-player-control').find('input[type="text"]').simulate('change', {target: {value: 'NEW PLAYER 1'}});

        expect(wrapper.state().newPlayerName).toEqual('NEW PLAYER 1');

        wrapper.unmount();
      });

      it('should add new player to new players list on button click and the name is uppercased', () => {
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        wrapper.setState({ newPlayerName: 'new player 1' });
        wrapper.find('#add-new-player-button').first().simulate('click')

        expect(wrapper.state().newPlayers[0]).toEqual('NEW PLAYER 1');
        expect(wrapper.state().newPlayers.length).toEqual(1);

        wrapper.unmount();
      });
    });

    describe('Generate teams function', () => {
      it('should not generate teams if less than 4 players selected', () => {
        const generateTeamsMock = jest.spyOn(GenerateTeams.prototype, 'generateTeams');
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        wrapper.setState({ signedUpPlayers: ['PLAYER 1', 'PLAYER 2'] });

        wrapper.find('#generate-teams-button').simulate('click')

        wrapper.update();

        expect(generateTeamsMock).toHaveBeenCalled();
        expect(wrapper.state().signedUpPlayers.length).toEqual(2);

        wrapper.unmount();
      });

      it('should generate teams if at least 4 players selected', () => {
        const generateTeamsMock = jest.spyOn(GenerateTeams.prototype, 'generateTeams');
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        wrapper.setState({ signedUpPlayers: playersMockData });

        wrapper.find('#generate-teams-button').simulate('click')

        wrapper.update();

        expect(generateTeamsMock).toHaveBeenCalled();
        expect(wrapper.state().signedUpPlayers.length).toEqual(0);
        expect(wrapper.state().newPlayers.length).toEqual(0);

        wrapper.unmount();
      });

      it('should generate 2 teams of 2 people', () => {
        var wrapper = mount(<GenerateTeams players={playersMockData} canEdit={true} />);

        var result = wrapper.instance().getTeams(playersMockData)

        expect(result.length).toEqual(2);
        expect(result[0].score).toEqual(0);
        expect(result[0].players.length).toEqual(2);

        expect(result[1].score).toEqual(0);
        expect(result[1].players.length).toEqual(2);

        wrapper.unmount();
      });
    });

  });

});