import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FoodServiceCard = ({ img, name, price, id, handleAddBtnClick, inventory }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="card">
      <img src={img} alt={name} className="lob-img" />
      <div className="content">
        <h5>{name}</h5>
        <p className="price">{price} VND</p>
        
        <div className="action-wrapper">
          <div className="quantity-group">
            <FaMinus
              className={quantity === 0 ? 'disable icon' : 'icon'}
              onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
            />
            <div className="quantity">
              <input 
                type="number"
                value={quantity}
                onInput={(e) =>  setQuantity(Number(e.currentTarget.value))}
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "3px",
                }}
                />
            </div>
            <FaPlus className="icon" onClick={() => setQuantity(quantity + 1)} />
          </div>
          <div className="btn-group">
            <div className="btn reset" onClick={() => setQuantity(0)}>
              reset
            </div>
            <div
              className="btn"
              onClick={() => {
                if (quantity > 0) {
                  handleAddBtnClick({ id, count: quantity, name, price });
                  setQuantity(0);
                }
              }}
            >
              Apply
            </div>
          </div>
        </div>
        <p className="inventory" style={{ 
          marginTop: "10px",
          fontSize: "0.9rem"
        }}><strong>Remain:</strong> {inventory}</p>
      </div>
    </div>
  );
};
export default FoodServiceCard;
