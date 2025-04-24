import Joi from "joi";
import imageSize from "image-size";

export const JoiImage = Joi.extend((joi) => {
  const dimensionSchema = joi.number().positive().required();

  return {
    type: "image",
    base: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      buffer: Joi.binary().required(),
      size: Joi.number().positive().required(),
    }),
    messages: {
      "image.allowedTypes":
        "{{#label}} must be one of the following types: {{#allowedTypes}}",
      "image.maxSize": "{{#label}} must not exceed {{#maxSize}} bytes",
      "image.minWidth":
        "{{#label}} must be at least {{#minWidth}} pixels in width",
      "image.maxWidth":
        "{{#label}} must be no more than {{#maxWidth}} pixels in width",
      "image.minHeight":
        "{{#label}} must be at least {{#minHeight}} pixels in height",
      "image.maxHeight":
        "{{#label}} must be no more than {{#maxHeight}} pixels in height",
      "image.invalid": "{{#label}} is not a valid image",
    },
    rules: {
      allowedTypes: {
        params: {
          allowedTypes: Joi.array().items(Joi.string()).min(1).required(),
        },
        validate(value, helpers, params) {
          const mimeToExtension = {
            "image/jpeg": ["jpg", "jpeg"],
            "image/png": ["png"],
          };
          const extension = mimeToExtension[value.mimetype]?.[0];
          if (!extension || !params.allowedTypes.includes(extension)) {
            return helpers.error("image.allowedTypes", {
              allowedTypes: params.allowedTypes.join(", "),
            });
          }
          return value;
        },
      },
      maxSize: {
        params: {
          maxSize: Joi.number().positive().required(),
        },
        validate(value, helpers, params) {
          if (value.size > params.maxSize) {
            return helpers.error("image.maxSize", { maxSize: params.maxSize });
          }
          return value;
        },
      },
      minWidth: {
        params: { minWidth: dimensionSchema },
        validate(value, helpers, params) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.width < params.minWidth) {
              return helpers.error("image.minWidth", {
                minWidth: params.minWidth,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
      maxWidth: {
        params: { maxWidth: dimensionSchema },
        validate(value, helpers, params) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.width > params.maxWidth) {
              return helpers.error("image.maxWidth", {
                maxWidth: params.maxWidth,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
      minHeight: {
        params: { minHeight: dimensionSchema },
        validate(value, helpers, params) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.height < params.minHeight) {
              return helpers.error("image.minHeight", {
                minHeight: params.minHeight,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
      maxHeight: {
        params: { maxHeight: dimensionSchema },
        validate(value, helpers, params) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.height > params.maxHeight) {
              return helpers.error("image.maxHeight", {
                maxHeight: params.maxHeight,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
    },
  };
});
