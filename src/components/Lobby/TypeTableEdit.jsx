import { useEffect, useState } from "react";
import { updateLobType, deleteLobType } from "../../api/lobby.api";
import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInput from "./components/CreateTypeEditInput";
import { ToastContainer, toast } from 'react-toastify';

const TypeTableEdit = (p) => {
  const { setIsLobTypeEditDisplay, editData, fetchLobType } = p
  const [inputValue, setInputValue] = useState({
    type_name: editData[1],
    max_table_count: parseInt(editData[2]),
    min_table_price: parseInt(editData[3]),
    deposit_percent: parseInt(editData[4]),
  });

  const handleCancelButton = () => {
    setIsLobTypeEditDisplay(false);
  };

  const handleInput = (value, name) => {
    if (name === "type_name") {
      setInputValue({ ...inputValue, [name]: value.replace(/[^A-Za-z]/g, '') });
    } else if (typeof value === 'string' && /^\d+$/.test(value)) {
      if (name === "max_table_count" || name === "min_table_price" || name === "deposit_percent") {
        setInputValue({ ...inputValue, [name]: parseInt(value) });
      } else {
        setInputValue({ ...inputValue, [name]: value });
      }
    } else if (value === "") {
      setInputValue({ ...inputValue, [name]: value });
    }
  };

  const handleSaveButton = async () => {
    try {
      await updateLobType(editData[0], inputValue);
      await fetchLobType();
      setIsLobTypeEditDisplay(false);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleDeleteButton = async () => {
    try {
      await deleteLobType(editData[0])
      await fetchLobType();
      setIsLobTypeEditDisplay(false);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setInputValue({
      type_name: editData[1],
      max_table_count: parseInt(editData[2]),
      min_table_price: parseInt(editData[3]),
      deposit_percent: parseInt(editData[4]),
    });
  }, [editData]);

  return (
    <EditBlock>
      <TableInput className="Type">
        <h4>Edit Lobby Type</h4>
        <EditLobTypeInput handleInput={handleInput} inputValue={inputValue} />
        <TypeTableCancelAndSave className="Type">
          <button className="button buttonDelete" onClick={handleDeleteButton}>Delete </button>
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={handleSaveButton}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  );
};

export default TypeTableEdit;
