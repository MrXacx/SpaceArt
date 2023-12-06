import {
  ArrowContainer,
  BoxContainer,
  ConfigContainer,
  MainContainer,
} from "./configStyles";
import ArrowIcon from "../../assets/arrow.png";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import ProfileUpdate from "../../components/profileUpdate/profileUpdate";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import PrivateDataUpdate from "../../components/privateDataUpdate/privateDataUpdate";
import { UserContext } from "../../contexts/UserContext";

function Config() {
  const { toogleProfileUpdateVisibility, tooglePrivateDataUpdateVisibility } =
    useContext(ModalContext);

  const { logOut, deleteLoggedUse } = useContext(UserContext);

  return (
    <>
      <HeaderLogged />
      <MainContainer>
        <BoxContainer>
          <ConfigContainer>
            <h2>Appearance</h2>

            <ArrowContainer onClick={() => toogleProfileUpdateVisibility()}>
              <span>Edit profile</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
          </ConfigContainer>

          <ConfigContainer>
            <h2>Manage account</h2>

            <ArrowContainer onClick={() => tooglePrivateDataUpdateVisibility()}>
              <span>Alter private data</span>
              <img alt="arrow" src={ArrowIcon} />
            </ArrowContainer>
            <ArrowContainer onClick={logOut}>
              <span>Disconnect</span>
              <img alt="arrow" src={ArrowIcon} />
            </ArrowContainer>
            <ArrowContainer
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want delete your account? This act is permanent."
                  )
                ) {
                  deleteLoggedUse();
                }
              }}
            >
              <span>Delete account</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
          </ConfigContainer>
        </BoxContainer>
      </MainContainer>
      <Footer />

      <ProfileUpdate />
      <PrivateDataUpdate />
    </>
  );
}

export default Config;
