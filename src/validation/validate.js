const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw result.error;
  } else {
    return result.value;
  }
};

export { validate };
