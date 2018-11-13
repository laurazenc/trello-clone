export const handleErrors = (path, message) => ({
  errors: [
    {
      path,
      message
    }
  ]
});

export const formatYupErrors = err => {
  const errors = [];
  if (err && err.inner) {
    err.inner.forEach(e => {
      errors.push({
        path: e.path,
        message: e.message
      });
    });
  }

  return errors;
};
