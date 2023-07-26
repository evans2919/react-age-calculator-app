import AgeForm from "./components/AgeForm";
import { useState } from "react";
const App = () => {
    const [age, setAge] = useState({
        day: "- -",
        month: "- -",
        year: "- -",
    });

    const changeAge = (newAge) => {
        setAge(newAge);
    };

    const { day, month, year } = age;

    const customClass = {
        h1: "text-[#854dff] text-5xl italic md:text-[85px] font-extrabold",
        bold: "text-gray-800 italic font-extrabold",
    };
    return (
        <>
            <div className="bg-gray-200 h-screen px-5 pt-[100px] md:pt-0 md:flex md:items-center md:justify-center">
          <div className="bg-gray-50 rounded-2xl py-12 px-6 md:px-12 rounded-br-[12rem] md:w-[650px]">
            
            <AgeForm changeAge={changeAge} />
            
                    <div>
                        <h1 className={customClass.h1}>
                            {year} <b className={customClass.bold}>years</b>
                        </h1>
                        <h1 className={customClass.h1}>
                            {month}
                            <b className={customClass.bold}>months</b>
                        </h1>
                        <h1 className={customClass.h1}>
                            {day} <b className={customClass.bold}>days</b>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
