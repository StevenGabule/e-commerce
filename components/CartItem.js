import Link from "next/link";
import { ACTIONS, decrease, increase } from "../store/Actions";

const CartItem = ({ item, dispatch, cart }) => (
  <tr>
    <td style={{ width: 100, overflow: "hidden" }}>
      <img src={item.images[0].url} alt={item.images[0].url} className="img-thumbnail w-100" style={{ minWidth: 80, height: 80 }} />
    </td>
    <td style={{ minWidth: 200 }} className="w-50 align-middle">
      <h5 className="text-capitalize text-secondary">
        <Link href={`/product/${item._id}`}>
          <a>{item.title}</a>
        </Link>
      </h5>
      <h6 className="text-danger">${item.quantity * item.price}</h6>
      {item.inStock > 0 ? <p className="mb-1 text-danger">In stock: {item.inStock}</p> : <p className="mb-1 text-danger">Out Stock</p>}
    </td>
    <td className="align-middle" style={{ minWidth: 150 }}>
      <button className="btn btn-outline-secondary" onClick={() => dispatch(decrease(cart, item._id))} disabled={item.quantity === 1}>
        {" "}
        -{" "}
      </button>
      <span className="px-3">{item.quantity}</span>
      <button className="btn btn-outline-secondary" disabled={item.quantity === item.inStock} onClick={() => dispatch(increase(cart, item._id))}>
        {" "}
        +{" "}
      </button>
    </td>
    <td className="align-middle" style={{ minWidth: 50, cursor: "pointer" }}>
      <i
        className="fa fa-trash-alt text-danger"
        aria-hidden="true"
        style={{ fontSize: 18 }}
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_MODAL,
            payload: [{ data: cart, id: item._id, title: item.title, type: ACTIONS.ADD_CART }],
          })
        }
      ></i>
    </td>
  </tr>
);

export default CartItem;
