import { useState } from "react";
import Input from "./Input";

const HeroSetting = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [heroInfo, setHeroInfo] = useState({
    title: "",
    desc: "",
    review: "",
  });

  const handleHeroInfo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (aspectRatio === 3 / 2) {
          setImage(file);
          setHeroInfo({
            ...heroInfo,
            review: img.src,
          });
          setError("");
        } else {
          setError("Your image is not in proportion");
          setImage(null);
          setHeroInfo({
            ...heroInfo,
            review: "",
          });
        }
      };
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <div className="flex justify-between pb-2 border-b border-gray-300 mb-3 w-full">
        <h3 className="text-xl font-semibold">Hero</h3>
        {isEdit ? (
          <div className="flex gap-4">
            <button
              className="text-red-600 font-semibold text-sm"
              onClick={() => setIsEdit(!isEdit)}
            >
              Cancel
            </button>
            <button className="bg-pink-500 rounded-md px-4 py-2 text-white text-sm hover:bg-pink-600">
              <i className="fa-solid fa-floppy-disk mr-2"></i>
              Save
            </button>
          </div>
        ) : (
          <button
            className="bg-pink-500 rounded-md px-4 py-2 text-white text-sm hover:bg-pink-600"
            onClick={() => setIsEdit(!isEdit)}
          >
            <i className="fas fa-pen mr-2 text-xs"></i>
            Edit
          </button>
        )}
      </div>
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col gap-2 w-full">
          <Input
            id={"title"}
            name={"title"}
            title={"Title"}
            type={"text"}
            onChange={handleHeroInfo}
            disabled={!isEdit}
            value={heroInfo.title}
          />
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="desc"
                placeholder="Type your description ..."
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                onChange={handleHeroInfo}
                value={heroInfo.desc}
                disabled={!isEdit}
              ></textarea>
            </div>
          </div>
          <Input
            id={"image"}
            name={"image"}
            title={"Image"}
            type={"file"}
            disabled={!isEdit}
            onChange={handleHeroInfo}
          />
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
        </div>
        <div className="w-full min-h-[100px] sm:min-w-[300px] sm:min-h-[200px] border border-gray-300 rounded-md border-dashed flex flex-col justify-center items-center text-center text-gray-500 overflow-hidden">
          {heroInfo?.review ? (
            <img src={heroInfo?.review} alt="" />
          ) : (
            <>
              <p> Image review here </p>
              <span className="text-sm">( Size: 600 x 400 )</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSetting;
