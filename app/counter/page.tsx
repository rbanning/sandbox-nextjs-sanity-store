'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from "react-redux";

import { RootState, AppDispatch } from '@/store';
import { increment, decrement, change } from '@/store/features/counter/counter-slice';

//type the useDispatch and useSelector methods
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function CounterPage() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main className="mx-auto max-w-md my-8">
      <div className="font-bold my-4">Current: {count}</div>
      <div className="flex items-center">
        <button 
          className="p-4 text-xl border-2 border-slate-200 hover:bg-slate-100 rounded mx-4"
          onClick={() => dispatch(change(-10))}>
          -10
        </button>
        <button 
          className="p-4 text-xl border-2 border-slate-200 hover:bg-slate-100 rounded mx-4"
          onClick={() => dispatch(decrement())}>
          -1
        </button>
        <button 
          className="p-4 text-xl border-2 border-slate-200 hover:bg-slate-100 rounded mx-4"
          onClick={() => dispatch(increment())}>
          +1
        </button>
        <button 
          className="p-4 text-xl border-2 border-slate-200 hover:bg-slate-100 rounded mx-4"
          onClick={() => dispatch(change(10))}>
          +10
        </button>
      </div>
    </main>
  )
}

export default CounterPage;