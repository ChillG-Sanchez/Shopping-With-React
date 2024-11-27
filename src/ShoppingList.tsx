import React, { useState } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
}

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddItem = () => {
    if (!name.trim() || !quantity.trim() || !unit.trim()) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }
    if (isNaN(Number(quantity))) {
      setError('A mennyiségnek számnak kell lennie!');
      return;
    }
    if (items.some(item => item.name === name)) {
      setError('Ez a termék már szerepel a listában!');
      return;
    }
    const newItem: Item = {
      id: Date.now(),
      name,
      quantity: Number(quantity),
      unit,
      purchased: false
    };
    setItems([...items, newItem]);
    setName('');
    setQuantity('');
    setUnit('');
    setError('');
  };

  const handleTogglePurchased = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="mb-4 text-center">Bevásárló lista</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Termék neve"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Mennyiség"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Mennyiségi egység"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleAddItem}>Hozzáadás</button>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className={`list-group-item d-flex justify-content-between align-items-center ${item.purchased ? 'list-group-item-secondary' : ''}`}>
            <span>
              {item.name} - {item.quantity} {item.unit}
            </span>
            <div>
              <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleTogglePurchased(item.id)}>
                {item.purchased ? 'Nem vásárolt' : 'Megvásárolt'}
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteItem(item.id)}>Törlés</button>
            </div>
          </li>
        ))}
      </ul>
      {items.length > 0 && items.every(item => item.purchased) && <p className="mt-3 text-success text-center">Minden termék meg van vásárolva!</p>}
    </div>
  );
};

export default ShoppingList;