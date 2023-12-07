const responseCreator = ({ data = null, message = null }) => ({
  success: Boolean(data),
  message,
  data,
});

module.exports = responseCreator;
