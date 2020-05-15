export default selectImg = (imageType) => {
  switch (imageType) {
    case "education":
      return require("./education.png");
  }
};
