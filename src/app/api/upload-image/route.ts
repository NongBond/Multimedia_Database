import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData = new FormData();
    formData.append("file", req.body.file);
    formData.append("upload_preset", "multiDatabase");

    const cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dubw9idqr/image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!cloudinaryResponse.ok) {
      // Handle non-200 response
      throw new Error(
        `Cloudinary API returned status ${cloudinaryResponse.status}`
      );
    }

    // Check the content type of the response
    const contentType = cloudinaryResponse.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // If the response is JSON, parse it
      const data = await cloudinaryResponse.json();
      res.status(cloudinaryResponse.status).json(data);
    } else {
      // If the response is not JSON, handle it accordingly
      const text = await cloudinaryResponse.text();
      res.status(cloudinaryResponse.status).send(text);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
