const generateFilter = (year, first_name, last_name, id) => {
  const filter = {};
  if (year) {
    filter.birthyear = { $gte: year };
  }

  if (first_name) {
    filter.first_name = first_name;
  }

  if (last_name) {
    filter.last_name = last_name;
  }

  if (id) {
    filter._id = id;
  }

  return filter;
};

module.exports = {
  generateFilter,
};
