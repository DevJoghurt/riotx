/* global  assert, riot, riotx */
/* eslint-env browser, node */

describe('browser-side specs', () => {

  it('mount spec.tag', () => {
    let html = document.createElement('spec');
    document.body.appendChild(html);

    var store = new riotx.Store({
      name: 'spec',
      state: {
        name: '',
      },
      actions: {
        name: (context, name) => {
          return Promise
            .resolve()
            .then(() => {
              context.commit('name', {name});
            });
        }
      },
      mutations: {
        name: (context, obj) => {
          context.state.name = obj.name;
          return ['name'];
        }
      },
      getters: {
        name: context => {
          return context.state.name;
        }
      }
    });

    riotx.add(store);


    var tag = riot.mount('spec', {
      message: 'Welcome'
    })[0];
    assert(document.querySelector('spec > h1').textContent === 'Welcome');

    assert(!!tag.riotx);
    assert(tag.riotx.get('spec').name === 'spec');

  });
});
