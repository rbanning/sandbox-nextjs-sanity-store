
export const errorToString = (error: any) => {
  return typeof(error) === 'string' ? error :
        (typeof(error?.message) === 'string' 
          ? error.message
          : `${error}`
        );
}

//--- helper for rejecting async thunk
export type Reject = (value: string) => any; // lazy ...
export const reject = (rejectWithValue: Reject, error: any) => {
  return rejectWithValue(errorToString(error));
};


export const rejectionToString = (action: {payload?: any, error?: any}) => {
  return typeof(action?.payload) === 'string' 
    ? action.payload 
    : (typeof(action?.error) === 'string' ? action.error
    : (typeof (action?.error?.message) === 'string' ? action.error.message
    : `Unknown error: ${action?.error}`));
}