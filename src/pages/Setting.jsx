import ContactSetting from "../components/ContactSetting";
import HeroSetting from "../components/HeroSetting";

const Setting = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <HeroSetting />
        <ContactSetting />
      </div>
    </div>
  );
};

export default Setting;
