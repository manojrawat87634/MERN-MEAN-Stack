import * as yup from "yup";

// Allowed enums from your Mongoose schema
const conditionEnum = ["Good", "Fair", "Poor", "Damaged"];
const statusEnum = ["available", "in-use", "repair", "retired"];

//
// 🔹 Create validation
//
const itInventoryCreateSchema = yup.object({
  body: yup.object({
    manufactureBy: yup.string().required("Manufacturer is required").max(100),
    tagNoCpu: yup.string()
      .required("Tag number is required")
      .max(50)
      .uppercase(),
    operatingSystem: yup.string().nullable().max(100),
    ram: yup.string().nullable().max(50), // "4GB", "8GB"
    storage: yup.string().nullable().max(50), // "128SSD"
    processor: yup.string().nullable().max(100),

    // Peripherals
    keyboard: yup.string().nullable().max(100),
    mouse: yup.string().nullable().max(100),
    displayTag: yup.string().nullable().max(50),
    keyboardTag: yup.string().nullable().max(50),
    mouseTag: yup.string().nullable().max(50),

    // Network & Location
    location: yup.string().nullable().max(200),
    department: yup.string().nullable().max(100),
    domain: yup.string().nullable().max(100),

    // Condition & Notes
    statusExplain: yup.string().nullable().max(200),
    condition: yup.string().oneOf(conditionEnum, "Invalid condition").default("Good"),
    software: yup.array().of(yup.string()),
    // Extra Fields
    purchaseDate: yup.date().nullable(),
    warrantyExpiry: yup.date().nullable(),
    status: yup.string().oneOf(statusEnum, "Invalid status").default("available"),
  }),
});

//
// 🔹 Update validation
//
const itInventoryUpdateSchema = yup.object({
  body: yup.object({
    manufactureBy: yup.string().max(100),
    tagNoCpu: yup.string().max(50).uppercase(),
    operatingSystem: yup.string().max(100),
    ram: yup.string().max(50),
    storage: yup.string().max(50),
    processor: yup.string().max(100),

    keyboard: yup.string().max(100),
    mouse: yup.string().max(100),
    displayTag: yup.string().max(50),
    keyboardTag: yup.string().max(50),
    mouseTag: yup.string().max(50),

    macAddress: yup.string().matches(
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      "Invalid MAC address"
    ),
    location: yup.string().max(200),
    department: yup.string().max(100),
    domain: yup.string().max(100),

    statusExplain: yup.string().max(200),
    condition: yup.string().oneOf(conditionEnum, "Invalid condition"),
    software: yup.array().of(yup.string()),

    assignedTo: yup.string().nullable(),
    purchaseDate: yup.date().nullable(),
    warrantyExpiry: yup.date().nullable(),
    status: yup.string().oneOf(statusEnum, "Invalid status"),
  }),
});

export { itInventoryCreateSchema, itInventoryUpdateSchema };
