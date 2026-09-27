import Contact from "../models/Contact.js";
export async function createContact(req, res, next) {
  try {
    const { name, email, message, phone } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: ["name, email, and message are required"],
      });
    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json({
      success: true,
      message: "Contact message received",
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
}
export async function adminListContacts(req, res, next) {
  try {
    res.json({
      success: true,
      data: await Contact.find().sort({ createdAt: -1 }).lean(),
    });
  } catch (error) {
    next(error);
  }
}
