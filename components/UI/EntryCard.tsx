import { DragEvent, useContext } from 'react';
import { UIContext } from '../../context/UI';

import { dateFunctions } from '../../utils';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';

import { Entry } from '../../interfaces';
import { useRouter } from 'next/router';

interface Props {
  entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {
  const router = useRouter();

  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent) => {
    // console.log(e);
    e.dataTransfer.setData('text', entry._id);

    startDragging();
  };

  const onDragEnd = () => {
    // console.log('drag end');
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
