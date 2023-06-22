import { watch, nextTick } from "vue";

export const retrieveState = async (
    defaultState: Object,
    key: string
  ): Promise<any> => {
    const store = localStorage.getItem(key);
    if (store) {
      return {
        ...defaultState,
        ...JSON.parse(store).data,
      };
    } else {
      return defaultState;
    }
  };
  
  export const watchState = (state: Object, key: string) => { 
    watch(
      () => state,
      () => {
        nextTick(() => {
          saveState(state, key);
        });
      },
      { deep: true }
    );
  };
  
  export const saveState = (state: Object, key: string) => {
    const store = {
      latestUpdate: new Date().getTime(),
      data: state,
    };
    localStorage.setItem(key, JSON.stringify(store));
  };
  
  export const clearState = (key: string) => {
    localStorage.removeItem(key);
    location.reload();
  };
  