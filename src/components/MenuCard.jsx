function MenuCard({ item, addToCart }) {
  return (
    <div className="card menu-card h-100">
      <img src={item.image} className="card-img-top menu-img" alt={item.name} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-warning">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <p className="fw-bold">${item.price.toFixed(2)}</p>

        <button
          className="btn btn-warning mt-auto fw-bold"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuCard;