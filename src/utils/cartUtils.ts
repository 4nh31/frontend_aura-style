export const addToCart = (cartItem: any) => {
  const storedItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = storedItems.find((item: any) => item.id === cartItem.id);
  let updatedItems;
  if (existingItem) {
    updatedItems = storedItems.map((item: any) => 
      item.id === cartItem.id ? { ...item, quantity: item.quantity + cartItem.quantity } : item
    );
  } else {
    updatedItems = [...storedItems, cartItem];
  }
  localStorage.setItem('cart', JSON.stringify(updatedItems));
};