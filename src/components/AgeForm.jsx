/* eslint-disable react/prop-types */
import { useState } from "react";

const AgeForm = ({ changeAge }) => {
    const [newAge, setNewAge] = useState({
        day: "",
        month: "",
        year: "",
    });

    const { day, month, year } = newAge;

    const [error, setError] = useState("");

    const customClass = {
        label: "uppercase text-gray-500 font-bold text-sm tracking-[0.2em]",
        input: "p-4 border border-gray-400 text-gray-900 rounded-md font-bold text-xl md:text-[32px] w-full outline-none focus:border-[#854dff] transition-all duration-300 mt-2 md:w-[130px] md:p-3",
        error: "italic text-xs text-red-500 mt-2",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAge({ ...newAge, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const newErrors = {};
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const birthDate = new Date(year, month - 1, day);
        const ageInMillis = currentDate - birthDate;
        const longMonths = ["01", "03", "05", "07", "08", "10", "12"];

        let completeYears = currentYear - year;
        let completeMonths = currentMonth - month;
        let completeDays = currentDay - day;

        if (completeMonths < 0) {
            completeYears -= 1;
            completeMonths += 12;
        }

        if (completeDays < 0) {
            completeMonths -= 1;
            const lastMonthDate = new Date(currentYear, currentMonth - 1, 0);
            completeDays += lastMonthDate.getDate();
        }

        const leapYear = (number) => {
            return (
                (number % 4 === 0 && number % 100 !== 0) || number % 400 === 0
            );
        };

        if (!leapYear(year) && month === "02" && day > 28) {
            newErrors.all = "Must be a valid date";
        } else if (leapYear(year) && month === "02" && day > 29) {
            newErrors.all = "Must be a valid date";
        }

        if (!longMonths.includes(month) && day === "31") {
            newErrors.all = "Must be a valid date";
        }

        if (day > 31) {
            newErrors.day = "Must be a valid day";
        } else if (!day.trim()) {
            newErrors.day = "This field is required";
        } else if (day.length < 2) {
            newErrors.day = "Invalid format (DD)";
        } else if (isNaN(day)) {
            newErrors.day = "Must be a number";
        }

        if (month > 12) {
            newErrors.month = "Must be a valid month";
        } else if (!month.trim()) {
            newErrors.month = "This field is required";
        } else if (month.length < 2) {
            newErrors.month = "Invalid format (MM)";
        } else if (isNaN(month)) {
            newErrors.month = "Must be a number";
        }

        if (ageInMillis < 0) {
            newErrors.year = "Must be in the past";
        } else if (!year.trim()) {
            newErrors.year = "This field is required";
        } else if (year.length < 4) {
            newErrors.year = "Must be a valid year";
        } else if (isNaN(year)) {
            newErrors.year = "Must be a number";
        }

        setError(newErrors);

        if (Object.keys(newErrors).length === 0) {
            changeAge({
                year: completeYears,
                month: completeMonths,
                day: completeDays,
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-3 [&>div]:md:flex [&>div]:md:flex-col ">
                    <div>
                        <label
                            htmlFor="day"
                            className={`${customClass.label} ${
                                (error.day || error.all) && "text-red-500"
                            }`}
                        >
                            Day
                        </label>
                        <input
                            className={`${customClass.input} ${
                                (error.day || error.all) && "border-red-500"
                            }`}
                            type="text"
                            id="day"
                            placeholder="DD"
                            maxLength={2}
                            name="day"
                            onChange={handleChange}
                            value={day}
                        />
                        {error.day !== "" && (
                            <p className={customClass.error}>{error.day}</p>
                        )}
                        {error.all !== "" && (
                            <p className={customClass.error}>{error.all}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="month"
                            className={`${customClass.label} ${
                                (error.month || error.all) && "text-red-500"
                            }`}
                        >
                            Month
                        </label>
                        <input
                            className={`${customClass.input} ${
                                (error.month || error.all) && "border-red-500"
                            }`}
                            type="text"
                            id="month"
                            placeholder="MM"
                            name="month"
                            onChange={handleChange}
                            maxLength={2}
                            value={month}
                        />
                        {error.month !== "" && (
                            <p className={customClass.error}>{error.month}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="year"
                            className={`${customClass.label} ${
                                (error.year || error.all) && "text-red-500"
                            }`}
                        >
                            Year
                        </label>
                        <input
                            className={`${customClass.input} ${
                                (error.year || error.all) && "border-red-500"
                            }`}
                            type="text"
                            id="year"
                            placeholder="YYYY"
                            name="year"
                            onChange={handleChange}
                            maxLength={4}
                            value={year}
                        />
                        {error.year !== "" && (
                            <p className={customClass.error}>{error.year}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mt-10 pt-8 items-center">
                    <div className="w-full flex flex-col items-center">
                        <hr className="border border-gray-200 w-full" />
                        <div className="rounded-full  bg-[#854dff] hover:bg-gray-800 relative bottom-[40px] transition-all duration-300 md:left-[240px]">
                            <button className="block w-full p-5">
                                <img
                                    src="/img/icon-arrow.svg"
                                    alt=""
                                    width={"40px"}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AgeForm;
