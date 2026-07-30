"use server";

import contactSchema, { ContactFormData, ContactFormState } from "../../schema/contact";

export async function googleSheetAPI(data: ContactFormData) {
  const url = `${process.env.GOOGLE_SHEET_API}?action=addUser`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" };
  }

  const ok = await googleSheetAPI(parsed.data);
  if (!ok) {
    return { error: "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" };
  }

  return { success: true };
}