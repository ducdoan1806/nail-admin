import { useState } from "react";
import IconSelect from "./SelectIcon";
import PropTypes from "prop-types";
import { socials } from "../utils/const";
import { useDispatch } from "react-redux";
import { deleteContactApi, updateContactApi } from "../features/contacts/api";
const ContactItem = (props) => {
  const [social, setSocial] = useState(props?.social || socials[0]?.name);

  const [contact, setContact] = useState({
    name: props?.name || "",
    url: props?.url || "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const handleContact = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleDel = () => {
    dispatch(deleteContactApi({ id: props?.id }));
  };
  const handleUpdate = () => {
    dispatch(updateContactApi({ id: props?.id, ...contact, social }));
    setIsEdit(false);
  };
  return (
    <div className="flex gap-2 w-full">
      <IconSelect
        selectedOption={social}
        setSelectedOption={setSocial}
        options={socials}
        disabled={!isEdit}
      />
      <input
        disabled={!isEdit}
        placeholder="Name ..."
        type="text"
        name="name"
        value={contact?.name}
        onChange={handleContact}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
      />
      <input
        disabled={!isEdit}
        placeholder="Url ..."
        type="text"
        name="url"
        value={contact?.url}
        onChange={handleContact}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
      />
      {isEdit ? (
        <div className="flex items-center text-sm">
          <button
            className="text-blue-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={handleUpdate}
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            className="text-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={() => setIsEdit(false)}
          >
            <i className="fas fa-close"></i>
          </button>
        </div>
      ) : (
        <div className="flex items-center text-sm">
          <button
            className="text-blue-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={() => setIsEdit(true)}
          >
            <i className="fas fa-pen"></i>
          </button>
          <button
            className="text-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={handleDel}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};
ContactItem.propTypes = {
  social: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
};
export default ContactItem;
