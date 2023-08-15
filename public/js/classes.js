function setClassName(selectors) {
  selectors.forEach((selectorObject) => {
    const selector = Object.keys(selectorObject)[0];
    const classes = selectorObject[selector];

    document.querySelectorAll(selector).forEach((option) => {
      option.className += " " + classes;
    });
  });
}

setClassName([
  {
    ".option":
      "flex items-center mr-4 my-2 border hover:border-2 p-3 hover:-translate-x-1 rounded-full   hover:bg-indigo-500 transition duration-75 cursor-pointer",
  },
  {
    ".header > div":
      "bg-purple-700 p-2 rounded-full flex hover:bg-purple-600 justify-center items-center transition duration-1000 ",
  },
  {
    " .option-label ":
      "ml-2 md:text-md lg:text-lg font-medium text-white text-sm  ",
  },
]);
