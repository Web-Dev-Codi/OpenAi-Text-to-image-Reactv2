import React, { useState } from "react";
import axios from "axios";
import ParticleBackground from "react-particle-backgrounds";
import { toast, Flip} from "react-toastify";




function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("small");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.OPEN_AI_API_KEY;


  const settings = {
    particle: {
      particleCount: 55,
      color: "#fff",
      minSize: 1,
      maxSize: 4,
    },
    velocity: {
      minSpeed: 0.2,
      maxSpeed: 0.4,
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.6,
      opacityTransitionTime: 10000,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
    setSize(e.target.value);
    generateImage();
  };


  const handleChange = (e) => setPrompt(e.target.value);

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

const generateImage = async () => {
    const id = toast.loading("Creating Image...", {
      theme: "colored",
      autoClose: 6000,
      type: "success",
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: false,
      transition: Flip,
    });
    try {
      const response = await axios.post(
			`https://api.openai.com/v1/images/generations?prompt=${prompt}&size=${size}`,
			{
				prompt: prompt,
			},
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization:
						"Bearer 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",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt,
					size: imageSize,
				}),
			}
		);
        toast.update(id, {
          render: "Image Created",
          type: "info",
          isLoading: false,
          hideProgressBar: false,
          theme: "dark",
          autoClose: 1500,
          className: "rotateY animated",
        });
        setLoading(false)
        setImageUrl(response.data.data[0].url); 
    } catch(error) {
      console.error(error);
       toast.update("Problem with Api Endpoint", {
         theme: "colored",
         position: toast.POSITION.BOTTOM_CENTER,
       });
    }
  };

   const bg1 = {
     background:
       "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
     position: "absolute",
     Width: "100vw",
     zIndex: "-1",
   };

  return (
    <div className="container">
      <ParticleBackground
        className="mx-auto max-w-[1015px]"
        style={bg1}
        settings={settings}
      />
      <section className="flex flex-col justify-start pt-6">
        <form
          onSubmit={handleSubmit}
          id="image-form"
          className="flex flex-col items-center mb-5"
        >
          <h1 className="text-center px-4 font-sans text-white text-3xl underline mb-5">
            Describe An Image
          </h1>
          <div className="form-control text-lg rounded-md  mb-4">
            <input
              className="input text-sm underline decoration-green-500 text-yellow-300 input-accent font-bold italic w-60 max-w-xs font-mono"
              type="text"
              placeholder="Enter Text To Be Generated"
              onChange={handleChange}
            />
          </div>

          <div className="form-control flex text-xs font-mono rounded-md">
            <select
              name="size"
              value={size}
              className="select select-bordered select-accent text-yellow-300 italic max-w-xs w-60"
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium" defaultValue>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
          </div>
          <button
            type="submit"
            className=" btn  btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black rounded-xl shadow-lg content-center py-4 px-8 mt-5 cursor-pointer hover:scale-110 font-mono hover:bg-green-800"
          >
            Generate
          </button>
        </form>
        {loading ? (
          <div></div>
        ) : (
          <div>
            <section className="mt-5 mb-2 mx-auto w-10/12">
              <div className="flex place-content-center mx-auto">
                <img
                  src={imageUrl}
                  alt=""
                  id="image"
                  class="mx-auto  max-h-[700px]"
                />
              </div>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}

export default ImageGenerator;
