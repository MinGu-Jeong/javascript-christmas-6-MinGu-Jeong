export const separateMenuAndCount = (input) => {
  const menuArray = input.split(',');
  const menuAndCount = menuArray.reduce((acc, cur) => {
    const [menu, count] = cur.split('-');
    acc[menu] = count;
    return acc;
  }, {});
  console.log(menuAndCount);
  return menuAndCount;
};