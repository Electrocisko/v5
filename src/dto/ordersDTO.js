const orderDtoPresenter = (orders) => {
  const ordersDTO = orders.map((el) => {
    return {
      orderNro: el.orderNro,
      created_at: el.created_at.toLocaleDateString(),
      buyerEmail: el.buyerEmail,
      status: el.status,
      items: el.items.length,
    };
  });
  return ordersDTO;
};

export default orderDtoPresenter;
