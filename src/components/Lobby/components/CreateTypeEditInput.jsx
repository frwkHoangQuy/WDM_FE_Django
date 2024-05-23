import { EditLobbyInput } from "../Styled";

const EditLobTypeInput = (p) => {
  const { handleInput, inputValue } = p
  return (
    <EditLobbyInput>
      <div className="typeNameAndPrice">
        <div className="inputElement typeName">
          <h5>Lobby type name</h5>
          <input
            onChange={(e) => handleInput(e.target.value, "type_name")}
            value={inputValue.type_name}
            type="text"
          />
        </div>
        <div className="inputElement minPrice">
          <h5>Min price</h5>
          <input
            onChange={(e) => handleInput(e.target.value, "min_table_price")}
            value={inputValue.min_table_price}
            type="text"
          />
        </div>
      </div>
      <div className="maxTableandDeposit">
        <div className="inputElement maxTable">
          <h5>Max table</h5>
          <input
            onChange={(e) => handleInput(e.target.value, "max_table_count")}
            value={inputValue.max_table_count}
            type="text"
          />
        </div>
        <div className="inputElement requiredDeposit">
          <h5>Required deposit</h5>
          <input
            onChange={(e) => handleInput(e.target.value, "deposit_percent")}
            value={inputValue.deposit_percent}
            type="text"
          />
        </div>
      </div>
    </EditLobbyInput>
  );
};

export default EditLobTypeInput;
