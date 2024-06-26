import Image from "next/image";
import { Icons } from "../../assets/icons";
import { Images } from "../../assets/images";

const AppBarProfile = () => {
  return (
    <div className="appbar-profile profile-dropdown">
      <div className="drop-info">
        <div className="drop-info-img">
          <Image src={Images.ProfileImage} alt="" width={40} height={40} />
        </div>
        <div className="drop-info-text">
          <div className="info-text-group">
            <span>Musfiq</span>
            <span>Admin</span>
          </div>
          <Image
            src={Icons.ChevronDownDark}
            className="drop-icon"
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default AppBarProfile;
