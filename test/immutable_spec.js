// import chai, {expect} from 'chai';
// import chaiImmutable from 'chai-immutable';
import {expect} from 'chai';
import {List, Map} from 'immutable';

// chai.use(chaiImmutable);

describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState){
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a List', () => {
    function addMovie(currentState, movie){
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Chamber of Secrets', 'Goblet of Fire');
      let nextState = addMovie(state, 'Fantastic Beasts');

      expect(nextState).to.equal(List.of(
        'Chamber of Secrets',
        'Goblet of Fire',
        'Fantastic Beasts'
      ));

      expect(state).to.equal(List.of(
        'Chamber of Secrets',
        'Goblet of Fire'
      ));
    });
  });

  describe('a tree', () => {
    function addMovie(currentState, movie) {
      // return currentState.get('movies').push(movie);
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Grease')
      });
      let nextState = addMovie(state, 'La La Land');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Grease',
          'La La Land'
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of('Grease')
      }));
    });
  });
});
