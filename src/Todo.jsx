import React, { useEffect, useState } from "react";
// import logo from './logo.png';

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  /* --- Theme --- */
  const [theme, setTheme] = useState("light");
  const [icon, setIcon] = useState(true);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeEvent = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIcon(!icon);
  };

  /* --- Todo --- */
  const [inputData, setInputData] = useState("");
  const [listItems, setListItems] = useState(getLocalItems());
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);

  const inputEvent = (event) => {
    setInputData(event.target.value);
  };

  const AddItem = () => {
    if (!inputData) {
      alert("Empty filed....");
    } else if (inputData && toggleBtn) {
      setListItems(
        listItems.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setInputData("");
      setToggleBtn(false);
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setListItems([...listItems, allInputData]);
      setInputData("");
    }
  };

  const DeleteItem = (id) => {
    const updatedListItems = listItems.filter((elem) => {
      return elem.id !== id;
    });
    setListItems(updatedListItems);
  };

  const DeleteAll = () => {
    setListItems([]);
  };

  const EditItem = (id) => {
    let newEditItem = listItems.find((elem) => {
      return elem.id === id;
    });
    setInputData(newEditItem.name);
    setToggleBtn(true);
    setIsEditItem(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listItems));
  }, [listItems]);

  return (
    <>
      <div className="bg-gray-100 text-gray-900 dark:bg-slate-950 dark:text-gray-100 w-full min-h-screen flex flex-col items-center">
        <button
          className="my-7 text-2xl absolute right-10 top-2"
          onClick={handleThemeEvent}
        >
          {icon ? "☀️" : "🌙"}
        </button>
        <div className=" flex flex-col items-center p-4 mt-14">
          <figure>
            <img src="logo.png" alt="logo" className="w-16 h-16 ml-20 mb-2" />
            <figcaption className=" text-lg tracking-wide font-medium uppercase ml-2">
              Add Your List Here ✌️
            </figcaption>
          </figure>
          <div className="inline-flex my-6 bg-white leading-8 items-center justify-center h-8 outline outline-1 dark:outline-none">
            <input
              type="text"
              placeholder="✍️ Write Anything Here... "
              className=" w-72 text-black px-1 dark:outline-none"
              onChange={inputEvent}
              value={inputData}
            />
            <div
              className="w-10 h-8 flex justify-center items-center cursor-pointer bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-400 dark:bg-violet-600  transition-all delay-150 duration-300"
              onClick={AddItem}
            >
              {toggleBtn ? (
                <i className="fa fa-pen-to-square cursor-pointer text-white "></i>
              ) : (
                <i className=" fa fa-plus text-white" title="Add Item"></i>
              )}
            </div>
          </div>
          <div className="relative top-0 left-0">
            {listItems.map((elem) => {
              return (
                <div
                  className="dark:bg-purple-700 rounded-lg flex my-4 w-80 justify-between text-white hover:text-black hover:bg-white dark:hover:bg-white  bg-gray-400"
                  key={elem.id}
                >
                  <h3 className="text-xl  leading-9 ml-4 capitalize">
                    {elem.name}
                  </h3>
                  <div className=" w-10 flex justify-center items-center gap-4 mr-4">
                    <i
                      className="fa fa-pen-to-square cursor-pointer "
                      onClick={() => EditItem(elem.id)}
                      style={{ color: "#2cb53c" }}
                    ></i>
                    <i
                      className="fa fa-trash-can cursor-pointer "
                      onClick={() => DeleteItem(elem.id)}
                      style={{ color: "#dd2222" }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="transition-all delay-150 duration-300 bg-gray-600 dark:bg-violet-600 text-white w-28 h-9 leading-9 rounded hover:bg-gray-400 hover:text-black dark:hover:bg-gray-400 text-center mt-8">
            <button className="font-bold  uppercase  ..." onClick={DeleteAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
