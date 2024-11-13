import { ciitMerchApi } from "..";
import { PROFILE_SERVICE } from "../constants";

class Profile {
  async fnGetProfile() {
    return await ciitMerchApi.get(PROFILE_SERVICE.GET_PROFILE);
  }

  async fneditProfile(values) {
    return await ciitMerchApi.patch(
      `${PROFILE_SERVICE.EDIT_PROFILE}/${values.id}`,
      values
    );
  }
}

Profile.api = new Profile();
export default Profile;
