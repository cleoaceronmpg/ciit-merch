import Airtable from "airtable";

// Configure Airtable
const ciitMerchApi = new Airtable({
  apiKey: process.env.REACT_APP_APIKEY,
}).base(process.env.REACT_APP_APPID);

export { ciitMerchApi };
