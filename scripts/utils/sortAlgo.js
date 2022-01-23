export const sortMediaItems = (option) => {
  console.log(option);
  let data = JSON.parse(localStorage.getItem("data"));
  let newDataMediaArr;
  switch (option) {
    case "date":
      newDataMediaArr = data.media.sort((a, b) =>
        a[option] < b[option] ? 1 : -1
      );
      break;
    case "title":
      newDataMediaArr = data.media.sort((a, b) =>
        a[option] > b[option] ? 1 : -1
      );
      break;
    default:
      newDataMediaArr = data.media.sort((a, b) => b[option] - a[option]);
  }
  data = { ...data, media: newDataMediaArr, sort: option };
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  // return data.media;
};
