import React, { useEffect, useState } from "react";
import Img from "../../public/Img";

const Gst = () => {
  const [Price, setPrice] = useState("");
  const [FinalPrice, setFinalPrice] = useState(0);
  const [GstRate, setGstRate] = useState(5);
  const [CSGstRate, setCSGstRate] = useState(0);
  const [className, setClassName] = useState("");
  const backspace = <Img/>
  const handleGst = (rate) => {
    setGstRate(rate);
  };
  useEffect(() => {
    if (Price) {
      const result =
        parseFloat(Price) + (parseFloat(Price) * parseFloat(GstRate)) / 100;
      setFinalPrice(result);
      const CS = (parseFloat(Price) * parseFloat(GstRate)) / 100 / 2;
      setCSGstRate(CS);
    } else {
      setCSGstRate(0);
      setFinalPrice(0);
    }
    console.log(GstRate);
  }, [Price, GstRate]);

  const buttons = [
    ["C", "7", "4", "1", "00"],
    [backspace, "8", "5", "2", "0"],
    ["%", "9", "6", "3", "."],
    ["/", "*", "-", "+", "="],
  ];

  const handleButtonClick = (button) => {
    if (button === "c") {
      setPrice("");
    } else if (button === "e") {
      setPrice(Price.slice(0, -1));
    } else if (button === "=") {
      setPrice(parseInt(Price) + parseInt(Price));

      // Additional logic will be needed to handle multiple additions
    } else if (!["%", "/", "*", "-", "+"].includes(button)) {
      setPrice(Price + button);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-start sm:justify-center gap-3 sm:gap-5 items-center ">
      <div className=" hidden sm:block bg-[#2c2c2c] text-orange-500 px-10 py-2 font-bold text-xl rounded-lg animate-pulse">
        Not Avaiable For Desktop
      </div>
      <h1 className=" sm:hidden text-xl text-[#ebebeb] my-2 sm:text-6xl ">
        GST CALCULATOR
      </h1>
      <div className=" sm:hidden flex mx-1 w-full sm:w-1/2  justify-around px-7">
        <h2 className="font-bold text-xl sm:text-4xl w-1/2">Original Price</h2>
        <input
          type="number"
          name="number"
          id="number"
          value={Price}
          placeholder="0"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          //   readOnly
          className={`outline-none text-orange-600 bg-black w-2/4 text-end sm:text-3xl px-2 py-1 placeholder:text-orange-600 `}
        />
      </div>
      <div className=" sm:hidden flex flex-wrap justify-center w-full my-4">
        <div className="size-14 sm:size-28 bg-black flex items-center justify-center text-xl sm:text-4xl ">
          GST
        </div>
        {[3, 5, 12, 18, 28].map((rate) => (
          <div
            onClick={() => {
              handleGst(rate);
            }}
            key={rate}
            className={`sm:size-28 size-14  ${
              GstRate === rate
                ? "bg-[#ff6333] text-black sm:text-4xl"
                : "bg-black"
            }  border-[0.2px] border-white flex items-center justify-center text-xl ${
              rate === 28 ? "rounded-r-lg" : ""
            } ${rate === 3 ? "rounded-l-lg" : ""} `}
          >
            {rate}%
          </div>
        ))}
      </div>
      <div className=" sm:hidden flex mx-1 my-4 w-full sm:w-1/2 justify-around px-7">
        <h2 className="font-bold text-xl sm:text-4xl w-1/2">Final Price</h2>
        <input
          type="number"
          name="number"
          id="number"
          value={FinalPrice}
          readOnly
          className={`outline-none text-orange-600 bg-black w-2/4 text-end sm:text-3xl px-2 py-1 placeholder:text-orange-600 `}
        />
      </div>
      <div>
        <span className=" sm:hidden text-[#646464] text-sm sm:text-xl">
          CGST/SGST: {CSGstRate}
        </span>
      </div>
      <div className=" sm:hidden md:hidden flex flex-wrap">
        {buttons.map((column, index) => (
          <div key={index}>
            {column.map((button, idx) => (
              <div
                key={idx}
                selected={false}
                aria-disabled={true}
                onClick={() => handleButtonClick(button)}
                disabled={["%", "/", "*", "-", "+"].includes(button)}
                className={`bg-[#2c2c2c] ${
                  button === "%"
                    ? "disabled:text-gray-600"
                    : "active:bg-[#292929] active:scale-90 transition-all"
                } text-white p-4 w-20 text-center rounded-lg h-16 my-2 mx-1 text-2xl ${
                  button === "%" ||
                  button === backspace ||
                  button === "C" ||
                  button === "/" ||
                  button === "*" ||
                  button === "=" ||
                  button === "-" ||
                  button === "+"
                    ? "text-orange-500 text-3xl text-center justify-center items-center flex "
                    : ""
                }`}
              >
                {button}
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer className='bg-black text-white flex justify-center flex-col items-center mt-2 '>
        <div>All Rights Reserved {new Date().getFullYear()}</div>
        <div>Saichandan Gorli</div>
      </footer>
    </div>
  );
};

export default Gst;
