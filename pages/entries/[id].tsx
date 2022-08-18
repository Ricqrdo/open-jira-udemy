import { GetServerSideProps } from 'next';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';

import { dateFunctions } from '../../utils';

import { dbEntries } from '../../database';

import { Entry, EntryStatus } from '../../interfaces';

import { Layout } from '../../components/layouts/Layout';
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export default function EntryPage({ entry }: Props) {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = async () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    };

    updateEntry(updatedEntry, true);
  };

  const onDelete = async () => {
    deleteEntry(entry._id);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada:"
              subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={handleChange}
                helperText={isNotValid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={capitalize(item)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length === 0}
                >
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red'
        }}
        onClick={onDelete}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      entry
    }
  };
};
