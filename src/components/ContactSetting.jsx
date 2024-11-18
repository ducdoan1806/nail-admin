import { useEffect, useState } from "react";
import { socials } from "../utils/const";
import ContactItem from "./ContactItem";
import IconSelect from "./SelectIcon";
import { useDispatch, useSelector } from "react-redux";
import { getContactApi, postContactApi } from "../features/contacts/api";
import Loading from "./Loading";
import NotifyTag from "./NotifyTag";
import contactSlice from "../features/contacts/contactSlice";

const ContactSetting = () => {
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [social, setSocial] = useState(socials[0]?.name);
  const [contact, setContact] = useState({
    name: "",
    url: "",
  });
  const handleContact = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const { contacts, loading, error, message } = useSelector(
    (state) => state.contact
  );
  const createContact = () => {
    dispatch(
      postContactApi({
        social,
        name: contact.name,
        url: contact.url,
      })
    );
    setContact({
      name: "",
      url: "",
    });
    setIsCreate(false);
  };
  useEffect(() => {
    dispatch(getContactApi());
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      {message && (
        <NotifyTag
          isError={error}
          content={message}
          onClose={() => {
            dispatch(contactSlice.actions.resetMessage());
          }}
        />
      )}
      <div className="flex justify-between pb-2 border-b border-gray-300 mb-3 w-full">
        <h3 className="text-xl font-semibold">Contact</h3>
        {isCreate ? (
          <button
            className="text-red-600 font-semibold text-sm"
            onClick={() => setIsCreate(!isCreate)}
          >
            Cancel
          </button>
        ) : (
          <button
            className="bg-pink-500 rounded-md px-4 py-2 text-white text-sm hover:bg-pink-600"
            onClick={() => setIsCreate(!isCreate)}
          >
            <i className="fas fa-plus mr-2 text-xs"></i>
            Create
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 ">
        {loading && (
          <div className="flex justify-center">
            <Loading size={6} />
          </div>
        )}
        {isCreate && (
          <div className="flex gap-2 w-full">
            <IconSelect
              selectedOption={social}
              setSelectedOption={setSocial}
              options={socials}
            />
            <input
              placeholder="Name ..."
              type="text"
              name="name"
              value={contact?.name}
              onChange={handleContact}
              autoFocus={isCreate}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
            <input
              placeholder="Url ..."
              type="text"
              name="url"
              value={contact?.url}
              onChange={handleContact}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
            />

            <button
              className="bg-pink-500 rounded-md px-4 py-2 text-white text-sm hover:bg-pink-600"
              onClick={createContact}
            >
              Save
            </button>
          </div>
        )}
        {contacts.map((contact) => (
          <ContactItem key={contact?.id} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactSetting;
