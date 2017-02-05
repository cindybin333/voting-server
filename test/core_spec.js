import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Great Gatsby');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Great Gatsby')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Pinnochio'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Pinnochio')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Old School', 'Home Alone', 'Bambi')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Old School', 'Home Alone')
        }),
        entries: List.of('Bambi')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Monsters Inc.', 'Spiderman'),
          tally: Map({
            'Monsters Inc.': 5,
            'Spiderman': 4
          })
        }),
        entries: List.of('Gattaca', 'Love and Basketball')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Gattaca', 'Love and Basketball')
        }),
        entries: List.of('Monsters Inc.')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Monsters Inc.', 'Spiderman'),
          tally: Map({
            'Monsters Inc.': 5,
            'Spiderman': 5
          })
        }),
        entries: List.of('Gattaca', 'Love and Basketball')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Gattaca', 'Love and Basketball')
        }),
        entries: List.of('Monsters Inc.', 'Spiderman')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
          pair: List.of('Snow White')
      });
      const nextState = vote(state, 'Snow White');

      expect(nextState).to.equal(Map({
          pair: List.of('Snow White'),
          tally: Map({
            'Snow White': 1
          })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
          pair: List.of('Cinderella'),
          tally: Map({
            'Cinderella': 3
          })
        });
      const nextState = vote(state, 'Cinderella');

      expect(nextState).to.equal(Map({
          pair: List.of('Cinderella'),
          tally: Map({
            'Cinderella': 4
          })
        }));
    });
  });
});
