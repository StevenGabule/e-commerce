import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { ACTIONS, deleteItem } from "../store/Actions";
import { deleteData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;

  const router = useRouter();

  const deleteUser = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));

    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: res.err } });
      return dispatch({ type: ACTIONS.NOTIFY, payload: { success: res.msg } });
    });
  };

  const deleteCategories = (item) => {
    deleteData(`categories/${item.id}`, auth.token).then((res) => {
      if (res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: res.err } });

      dispatch(deleteItem(item.data, item.id, item.type));
      return dispatch({ type: ACTIONS.NOTIFY, payload: { success: res.msg } });
    });
  };

  const deleteProduct = (item) => {
    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } });
    deleteData(`product/${item.id}`, auth.token).then((res) => {
      if (res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: res.err } });
      dispatch({ type: ACTIONS.NOTIFY, payload: { success: res.msg } });
      return router.push("/");
    });
  };

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === ACTIONS.ADD_CART) {
          dispatch(deleteItem(item.data, item.id, item.type));
        }

        if (item.type === ACTIONS.ADD_USERS) deleteUser(item);
        if (item.type === ACTIONS.ADD_CATEGORIES) deleteCategories(item);
        if (item.type === ACTIONS.DELETE_PRODUCT) deleteProduct(item);

        dispatch({ type: ACTIONS.ADD_MODAL, payload: [] });
      }
    }
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-capitalize" id="exampleModalLabel">
              {modal.length !== 0 && modal[0].title}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Do you want to delete this item?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleSubmit}>
              Yes
            </button>
            <button type="button" className="btn btn-primary" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
