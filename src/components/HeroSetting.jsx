import { useState } from "react";
import Input from "./Input";

const HeroSetting = () => {
  const [image, setImage] = useState(null);
  console.log("image: ", image);
  const [error, setError] = useState("");
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
      <h3 className="text-xl font-semibold pb-2 border-b border-gray-300 mb-3 w-full">
        Hero
      </h3>
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col gap-2 w-full">
          <Input
            id={"title"}
            name={"title"}
            title={"Title"}
            type={"text"}
            onChange={handleHeroInfo}
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
              ></textarea>
            </div>
          </div>
          <Input
            id={"image"}
            name={"image"}
            title={"Image"}
            type={"file"}
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
