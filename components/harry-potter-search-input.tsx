"use client";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { RootState, AppDispatch } from '@/store';
import { setSearch } from '@/store/features/harry-potter/harry-potter-searchSlice';
import { harryPotterApi } from "@/store/features/harry-potter/harry-potter-api";

import HarryPotterTable from "./harry-potter-table";
import { IHarryPotterName } from "@/data/harry-potter.models";
import { useEffect } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function HarryPotterSearchInput() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.harryPotterSearch.search);
  const startupNames = useAppSelector((state) => state.harryPotterSearch.startupNames);
  const data = useAppSelector(
    (state) => 
      state.harryPotterApi.queries[`search("${search}")`]?.data as IHarryPotterName[]
  )

  useEffect(() => {
    dispatch(harryPotterApi.endpoints.search.initiate(search));
  }, [dispatch, search]);

  return (
    <div>
      <div className="flex items-center">
        <input 
          type="text" 
          className="px-4 py-2 rounded border-2 border-fuchsia-800"
          placeholder="search..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))} />
        <button 
          disabled={search.length === 0}
          onClick={() => dispatch(setSearch(''))}
          className="border-2 border-fuchsia-800 rounded mx-1 py-1 px-4 text-2xl disabled:opacity-40">x</button>
        </div>
      <div className="my-4">
        <HarryPotterTable names={search.length ? data ?? [] : startupNames} />
      </div>
    </div>
  )

}

export default HarryPotterSearchInput;