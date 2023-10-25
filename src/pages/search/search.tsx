import { useState, useContext } from "react";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import SearchArtist from "../../components/searchArtist/searchArtist";
import { Spacing } from "./searchStyles";
import { UserContext } from "../../contexts/UserContext";

function Search() {
  const { user, type } = useContext(UserContext);
  
  const [name, setName] = useState("");
  const searchUsers = (name: string) => {
    const client = 'AccountType';
  }

  return (
    <>
    <HeaderLogged />
    <Spacing />
    <SearchArtist />
    </>
  );
}

export default Search;