import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

import { entriesApi } from '../../apis';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvider = ({ children }: any) => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: '[Entry] Add Entry', payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });

      dispatch({ type: '[Entry] Entry Updated', payload: data });

      // show snackbar
      if (showSnackbar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete<Entry>(`/entries/${_id}`);

      dispatch({ type: '[Entry] Entry Deleted', payload: { _id } });

      // show snackbar
      enqueueSnackbar('Entry deleted', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });

      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh Data', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
