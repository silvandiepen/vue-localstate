# Vue LocalState

A few functions to create a consistent state, saved in your localStorage.

### Installation

```
npm i vue-storage
```

### Usage

Example stateful component, the following component will automatically be reset on a refresh. The count will not be saved.

```ts
const state = reactive<{ count: number }>({
  count: 0,
});

const useCounter = () => {
  const plusOne = () => {
    state.count++;
  };
  const minusOne = () => {
    state.count--;
  };
  const resetCounter = () => {
    state.count = 0;
  };
  return {
    count: state.count,
    plusOne,
    addOne,
  };
};
```

But, when you use Vue Storage, you can easily fix that.

```ts
const state = reactive<{ count: number }>(
  retrieveState(
    {
      count: 0,
    },
    "MY_KEY"
  )
);

watchState(state, "MY_KEY");

const useCounter = () => {
  const plusOne = () => {
    state.count++;
  };
  const minusOne = () => {
    state.count--;
  };
  const resetCounter = () => {
    state.count = 0;
  };
  return {
    count: state.count,
    plusOne,
    addOne,
  };
};
```

Now the state will automatically be saved whenever you make a change and whenever the state is initialized, it will check if there is a local state and otherwise just set the default back. 