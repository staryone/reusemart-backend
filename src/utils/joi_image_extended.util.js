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
      size: Joi.number().positive().required(),
      buffer: Joi.binary().required(),
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
        method(allowedTypes) {
          return this.$_addRule({
            name: "allowedTypes",
            args: { allowedTypes },
          });
        },
        args: [
          {
            name: "allowedTypes",
            assert: Joi.array().items(Joi.string()).min(1).required(),
            message: "must be an array of strings with at least one item",
          },
        ],
        validate(value, helpers, args) {
          const mimeToExtension = {
            "image/jpeg": ["jpg", "jpeg"],
            "image/png": ["png"],
          };
          const extension = mimeToExtension[value.mimetype]?.[0];
          if (!extension || !args.allowedTypes.includes(extension)) {
            return helpers.error("image.allowedTypes", {
              allowedTypes: args.allowedTypes.join(", "),
            });
          }
          return value;
        },
      },
      maxSize: {
        method(maxSize) {
          return this.$_addRule({
            name: "maxSize",
            args: { maxSize },
          });
        },
        args: [
          {
            name: "maxSize",
            assert: Joi.number().positive().required(),
            message: "must be a positive number",
          },
        ],
        validate(value, helpers, args) {
          if (value.size > args.maxSize) {
            return helpers.error("image.maxSize", { maxSize: args.maxSize });
          }
          return value;
        },
      },
      minWidth: {
        method(minWidth) {
          return this.$_addRule({
            name: "minWidth",
            args: { minWidth },
          });
        },
        args: [
          {
            name: "minWidth",
            assert: dimensionSchema,
            message: "must be a positive number",
          },
        ],
        validate(value, helpers, args) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.width < args.minWidth) {
              return helpers.error("image.minWidth", {
                minWidth: args.minWidth,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
      maxWidth: {
        method(maxWidth) {
          return this.$_addRule({
            name: "maxWidth",
            args: { maxWidth },
          });
        },
        args: [
          {
            name: "maxWidth",
            assert: dimensionSchema,
            message: "must be a positive number",
          },
        ],
        validate(value, helpers, args) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.width > args.maxWidth) {
              return helpers.error("image.maxWidth", {
                maxWidth: args.maxWidth,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
      minHeight: {
        method(minHeight) {
          return this.$_addRule({
            name: "minHeight",
            args: { minHeight },
          });
        },
        args: [
          {
            name: "minHeight",
            assert: dimensionSchema,
            message: "must be a positive number",
          },
        ],
        validate(value, helpers, args) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.height < args.minHeight) {
              return helpers.error("image.minHeight", {
                minHeight: args.minHeight,
              });
            }
            return value;
          } catch (err) {
            return helpers.error("image.invalid");
          }
        },
      },
      maxHeight: {
        method(maxHeight) {
          return this.$_addRule({
            name: "maxHeight",
            args: { maxHeight },
          });
        },
        args: [
          {
            name: "maxHeight",
            assert: dimensionSchema,
            message: "must be a positive number",
          },
        ],
        validate(value, helpers, args) {
          try {
            const dimensions = imageSize(value.buffer);
            if (dimensions.height > args.maxHeight) {
              return helpers.error("image.maxHeight", {
                maxHeight: args.maxHeight,
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
