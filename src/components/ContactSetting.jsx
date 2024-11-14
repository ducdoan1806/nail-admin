import { contacts } from "../utils/const";
import ContactItem from "./ContactItem";

const ContactSetting = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-xl font-semibold pb-2 border-b border-gray-300 mb-3 w-full">
        Contact
      </h3>
      <div className="flex flex-col gap-4 ">
        {contacts.map((contact, idx) => (
          <ContactItem key={idx} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactSetting;
