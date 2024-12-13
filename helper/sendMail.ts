import axios from "axios";

const submitEmail = async (email: string) => {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbz9lO_jVzb9LW8FAPEdeP5aSjVLggxxV7mS3spHa0pbP96ci3cDmgOkr6Sh1PW7IIZt-g/exec";

  try {
    const response = await axios.post(scriptUrl, { email });
    if (response.data?.result === "success") {
      return "Successfully added to the waitlist!";
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("Error submitting email:", error);
    throw new Error("Error occurred while submitting. Please try again.");
  }
};

export default submitEmail;
