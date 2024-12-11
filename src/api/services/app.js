import { ciitMerchApi } from "../../api";
class App {
  // this is temporary
  fnGetProducts = async (payload) => {
    return await ciitMerchApi("Products").select().firstPage();
  };

  fnGetCampaign = async (payload) => {
    return await ciitMerchApi("Campaign").select().firstPage();
  };
}

App.api = new App();

export default App;
