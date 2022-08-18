import { DragEvent, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';

import { EntryCard } from './';

import { EntryStatus } from '../../interfaces';
import { UIContext } from '../../context/UI';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((item) => item.status === status),
    [entries, status]
  );

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text');
    const entry = entries.find((item) => item._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          // overflowY: "scroll",
          backgroundColor: 'transparent',
          padding: 1
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all 0.3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
