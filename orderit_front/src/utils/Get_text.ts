import { API_URL_FLASK } from "./apiConfig_flask";

async function Get_text(text: string) {
  try {
    const response = await fetch(
      `http://${API_URL_FLASK}/text/${text}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.status === 200) {
      return await response.json();
    }
  }
  catch (error) {
    console.error(error);
    return error;
  }
}

export default Get_text;