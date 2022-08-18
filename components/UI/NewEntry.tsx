import { ChangeEvent, useContext, useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/UI";

export const NewEntry = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const { addNewEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  // prettier-ignore
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.length > 0) {
      addNewEntry(inputValue);
      setInputValue("");
      setTouched(false);
      setIsAddingEntry(false);
    }
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            value={inputValue}
            onChange={handleChange}
            error={inputValue.length === 0 && touched}
            helperText={
              inputValue.length === 0 && touched && "Ingrese un valor"
            }
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
