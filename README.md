# react-test-render-fns
A collection of utility functions made from react-test-renderer with high level support for react hooks.


## Motivation
Enzyme is usually very slow with version releases and react is way to quick. So we need something that can stay with the latest react version without breaking on lack of support for new node types. This project doesn't make any assumtions about the node type so its free from cases that break enzyme. In case that something does break due to a new react api, we can easily fix it due to the composible nature of the api and adding new features in the library is super easy as well.

Also, WE HAVE SUPPORT FOR HOOKS!! While enzyme is busy lagging three versions behind on support, we are ready with hooks.


## Usage

### Mount your Component
You can use `mount` function to mount your components.
```js
import { mount } from 'react-test-render-fns';

describe('Stuff', () => {
  it('should mount', () => {
    mount(<YourComponent />);
  });
});
```


### Render your Component for snapshot testing
You have `render` (similar to `mount`) to render your components. The rest of the api follows snapshot testing as you would with react-test-renderer.


### Find your component inside a mounted node

```js
import { mount } from 'react-test-render-fns';

describe('Stuff', () => {
  it('should have #myElem', () => {
    const $node = mount(<YourComponent />);
    expect($node.findAll(n => n.props.id === 'myElem')).toHaveLength(1);
  });
  // Looks shit so we have a shorthand for that
  it('should have #myElem', () => {
    const $node = mount(<YourComponent />);
    expect($node.findAll(byId('myElem'))).toHaveLength(1);
    const $div = $node.find(byId('myElem'));
  });
});
```


### Find filter helpers
Passing a function and working with the nodes manually is very low level and not something we should be concerned about while writing test cases. So there are a few filter helpers included in the collection. The reason why we are avoiding findByType, etc methods provided by react-test-renderer, is because of the following reasons -
- Consistency (allowing us to create many custom filters like this one)
- Extensibility. In case we get a node type that has to be worked around while filtering.
- Composition. We can compose multiple filters together (Eg - `compose(byType(Link), byId('paymentButton'))`)

* **byType** - Select by component
```js
const linkNode = node.find(byType(Link));
```

* **byTestSelector** - Select by a node's test selector
```js
const linkNode = node.find(byTestSelector('some-button')); // Selects stuff like <div data-test-selector="some-button" />
```

* **byDisplayName** - Select by component display name
```js
const linkNode1 = node.find(byDisplayName('Link'));
const linkNode2 = node.find(byDisplayName('Link', false)); // To exclude matching function names
```

* **byId** - Select by id attribute
```js
const nameNode = node.find(byId('userName'));
```

* **byProp** - Select by id attribute
```js
const nameNode = node.find(byProp('name')); // Prop name exists
const rameshNode = node.find(byProp('name', 'ramesh')); // Prop name exists and name === 'ramesh'
const rameshNode = node.find(byProp('data-user-name', 'ramesh')); // Data attributes

const nameNode = node.find(byProp('id', 'userName')); // Equivalent to byId('userName')
```


### Get data from node

* text - Get the text being rendered
```js
const myCompNode = node.find(byType(MyComp));
expect(text(myCompNode)).toBe('Hello world');
```

* getProp - Get a prop from the node
```js
const myImage = node.find(byId('myImage'));
expect(getProp('src', myImage)).toBe('http://example.com/image.png');
```

* firstChild - Get the first child node in the tree
```js
const img = firstChild(node.find(byType(MyImage)));
```

* getState, setState - Getter and setter for state
DEPRECATED: Try to avoid these. This is only for class components and can be avoided in most cases by simulating/triggering the real event instead of messing with the state directly.
```js
const counter = node.find(byType(Counter));
setState(s => ({ count: s.count++ }), counter);
setState(s => ({ count: s.count++ }), counter);
setState(s => ({ count: s.count++ }), counter);
expect(getState('count', counter)).toBe(3);
```


### Simulate events
You can simulate an event using `simulate` function.
NOTE: This does not emulate browser event but instead just calls the on* handler function.

```js
import { simulate, createEvent } from 'react-test-render-fns';

const clickHandler = jest.fn();

const node = mount(<div><Button onClick={clickHandler}>Click me</Button></div>);
const myBtn = node.find(byType(Button));
simulate(new MouseEvent('click'), myBtn);

expect(clickHandler).toHaveBeenCalled();
```
You can also use `createEvent` instead of `new MouseEvent` in case you dont care about the event type much


### Testing a component with react hooks
By default, the library support hooks i.e. `mount`, `render`, `simulate`, etc are all wrapped in `withAct` but there are cases where you may want to call an update in the state manually. For those cases, this library exposes 2 functions - `withAct` and `act`.

* **act** - This is a low level, synchronous re-export of the act function which allows you to run something immediately with update awareness.

* **withAct** - This is a higher order function that wraps around a function and returns a function that can be called without worrying about the state updates the function causes.

If you see a warning saying `An update to null inside a test was not wrappedin act(...)`, you can solve it by wrapping the synchronous code causing an update with `act` or `withAct` function to get rid of the error.

```js
// withAct
const callMyUpdater = withAct(() => fnThatUpdatesState());
callMyUpdater();

// act
act(() => {
  fnThatUpdatesState(); // function wrapped with act should not have a return value
});
```

* **runAllTimers** - This functions allows you to resolve any pending timers immediately and synchronously. Its basically a hooks friendly wrapper around `jest.runAllTimers` so you need to call `jest.useFakeTimers()` in any file using this function.


## TODO
This is a list of stuff that is in the pipeline for the library. (Question mark at the end means it's a maybe)

- [ ] `byQuerySelector` filter to allow using query selectors. (Preffered way to do this right now is by composing multiple filters together. `compose(byType('div'), byId('helloworld'))`)?

