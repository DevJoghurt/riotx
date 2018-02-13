[日本語 Japanese](README.ja.md)

# riotx

Centralized State Management for riot.js

A Simplistic Central Event Controller / Dispatcher For RiotJS, Inspired By [vuex](https://github.com/vuejs/vuex) Architecture Pattern.


Riotx is a state management pattern + library for riot.js applications.

![riotx](art/riotx.png)

# Install

```
$ npm install --save riotx
```

# Example

# index.html

```javascript 1.8
<hello>
  <h2>Name: { name }</h2>
  <input ref="name" type="text" value="{ name }" onKeyUp="{evName}" autofocus>
  <script>
    this.name = '';
    var store = this.riotx.get();
    var self = this;

    this.riotxChange(store, "name", function (state, store) {
      var res = store.getter('name');
      self.name = res;
      self.update();
    });

    this.evName = function () { // emit action
      store.action("name", this.refs.name.value);
    };

  </script>
</hello>
```

## index.js

```javascript 1.8
let store = new riotx.Store({
  state: {
    name: "",
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
  },
  plugins: [ /** ... */ ]
});

riotx.add(store);

```

> More example to `./test`

# Demo

| Sample | Codepen |
| :--: | :--: |
| Increment(counter) |(https://codepen.io/fkei/pen/ybmNqN)|

# Descriptions

## Riot(View) Components

Custom tag of `riot.js`.

> Inside a component, you can access `riotx` through `this.riotx`.


## Actions

Logics and asynchronous processing like calling API should be implemented in Actions.

Actions are entrypoints for riotx.


## Mutations

`Mutations` mutate data in `State`.

`mutations` are the only way to update `State`.

You may need to trigger `change event` at the end of mutation.

## State

Manages data.

It is allowed to access `State` but you should always update `State` through `Mutations`.

> Using `getter` you can get filtered data.


## Getters

You can get filtered data of `State`.

It is not allowed to mutate `State` through `Getters`.


## Plugins

Enable hook to `riotx`.

### Support

- It will be hooked after running all `mutations`. Event name : `riotx:mutations:after`


```javascript 1.8
const store = new riotx.Store({
  state: {
    hello: 'Hello',
  },
  actions: {
    testAction: (context, text) => {
      return Promise
        .resolve()
        .then(() => {
          context.commit('testMutation', text);
        });
    }
  },
  mutations: {
    testMutation: (context, text) => {
      context.state.hello = `${context.state.hello} ${text}`;
      return ['testChangeMutation'];
    }
  },
  getters: {
    testGetter: context => {
      return context.state.hello;
    }
  },
  plugins: [
    store => {
      store.change('riotx:mutations:after', (name, targets, context, ...args) => {
        if (name === 'testMutation' && targets.includes('testChangeMutation')) {
          context.state.hello = `Override ${context.state.hello}`;
        }
      });
    },
  ]
});
riotx.add(store);

store.change('testChangeMutation', (state, store) => {
  let res = store.getter('testGetter');
  assert.equal(res, 'Override Hello World');
});
const text = 'World';
store.action('testAction', text);
```

# API

## RiotX

### version: string

returns Version number.

### setChangeBindName(name): riotX

change the function name that is used to bind listeners for store change events.(default is `riotxChange`)

### add(store): Riotx

register a store.

registering multiple stores is allowed.

@see `Store.name`

### get(name='@'): Store

returns a store.

### debug(flag): Riotx

returns the state of debugging mode. active or not.

### strict(flag): Riotx

Directly changing the state property from outside will occur an exception.
You can change it through “mutations”, or you can get it via “getters”.

### reset(): Riotx

reset data.

### size(): int

returns the total number of stores.

# Store

### constructor(setting): Riotx

a store setting.

```
setting
{
  name: string key(default='@', optional)
  actions: object key=string, value=function
  mutations: object key=string, value=function
  getters: object key=string, value=function
}
```

### action(name, parameter...): Promise

executes an action.

### getter(name, parameter...): ...

executes a getter.

### riotxChange(name, parameter...): null

starts listening to change events.

# Develop

## Pre

```
$ npm install .
```

## Launch Develop/Debug Environment.

```
$ npm run karma-dev
```

# npm target

## Test (karma/mocha)

```
$ npm test
```

> `Chrome` on Machine. custom to `test/karma/karma.conf.js`

## Test (require.js)

[Read more](test/requirejs)

## Test (browserify)

[Read more](test/browserify)

## Build and minify

```
$ npm run build
```

## Watch

```
$ npm run watch
```

## ESLint

```
$ npm run lint
```
