import http, { authHttp } from "../../app/http";
import contactSlice from "./contactSlice";

export const getContactApi = () => async (dispatch) => {
  dispatch(contactSlice.actions.getContact());
  try {
    const res = await http.get(`/nail/contacts/?page_size=999`);
    dispatch(contactSlice.actions.getContactSuccess(res.data));
  } catch (e) {
    dispatch(contactSlice.actions.getContactFail(e?.response?.data));
  }
};

export const postContactApi = (newContact) => async (dispatch) => {
  dispatch(contactSlice.actions.postContact());
  try {
    const res = await authHttp.post(
      `/nail/contacts/`,
      JSON.stringify({
        social: newContact?.social.trim(),
        name: newContact?.name.trim(),
        url: newContact?.url.trim(),
      })
    );
    dispatch(contactSlice.actions.postContactSuccess(res.data));
  } catch (e) {
    dispatch(contactSlice.actions.postContactFail(e?.response?.data));
  }
};
export const updateContactApi = (updateContact) => async (dispatch) => {
  dispatch(contactSlice.actions.updateContact());
  try {
    const res = await authHttp.patch(
      `/nail/contacts/${updateContact?.id}/`,
      JSON.stringify({
        social: updateContact?.social.trim(),
        name: updateContact?.name.trim(),
        url: updateContact?.url.trim(),
      })
    );
    dispatch(contactSlice.actions.updateContactSuccess(res.data));
  } catch (e) {
    dispatch(contactSlice.actions.updateContactFail(e?.response?.data));
  }
};
export const deleteContactApi =
  ({ id }) =>
  async (dispatch) => {
    dispatch(contactSlice.actions.deleteContact());
    try {
      await authHttp.delete(`/nail/contacts/${id}/`);
      dispatch(contactSlice.actions.deleteContactSuccess(id));
    } catch (e) {
      dispatch(contactSlice.actions.deleteContactFail(e?.response?.data));
    }
  };
