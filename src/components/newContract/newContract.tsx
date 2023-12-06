import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  FormInputErrorMessage,
  SearchArtistButton,
  SearchArtistInput,
  SearchArtistInputContainer,
  SearchResults,
  Modal,
} from "./newContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState, useEffect, useCallback } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { SelectArtistContext } from "../../contexts/SelectArtistContext";
import { UserContext } from "../../contexts/UserContext";
import { SearchContext } from "../../contexts/SearchContext";
import ArtistBoxCheck from "../artistBoxCheck/artistBoxCheck";
import ArtistBox from "../artistBox/artistBox";
import { ArtType, ArtTypesUtil } from "../../enums/ArtType";
import { agreementSchema } from "../../schemas/services/AgreementSchemas";
import dayjs from "dayjs";
import { Artist } from "../../api/User";
import { AccountType } from "../../enums/AccountType";
import SearchWhiteIcon from "../../assets/search_white.svg";

function NewContract() {
  const {
    hideNewContract,
    toogleNewContractVisibility,
    skipSelectArtistToContract,
    setSkipSelectArtistToContract,
  } = useContext(ModalContext);
  const { id, sendAgreement, fetchChats } = useContext(UserContext);
  const { artist } = useContext(SelectArtistContext);
  const { fetchUsersByName, searchResult, setSearchResult } =
    useContext(SearchContext);

  const [art, setArt] = useState<ArtType>();
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [description, setDescription] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<any>();

  const fetchRecentChats = useCallback(
    () =>
      fetchChats(0, 10) // Obtain recent conversations
        .then((chats: any[]) =>
          Promise.all(
            // Get artist chats
            chats.map((chat) => new Artist(chat.artist).fetch(false))
          )
        )
        // Converts instances into literal objects.
        .then((artists: Artist[]) =>
          artists.map((artist) => artist.toObject())
        ),
    [fetchChats]
  );

  useEffect(() => {
    if (!artist && searchedName.length === 0) {
      fetchRecentChats()
        .then((chats: any[]) =>
          chats.map((item) => ({
            ...item,
            CEP: item.location.CEP,
            state: item.location.state,
            city: item.location.city,
          }))
        )
        .then(setSearchResult) // Defines artist standards
        .catch((e: any) => console.log(e.message));
    }
  }, [fetchChats, fetchRecentChats, artist, setSearchResult, searchedName]);

  useEffect(() => {
    if (artist && skipSelectArtistToContract) {
      setSelectedArtist(artist.toObject());
    } else if (!artist && selectedArtist) {
      setSelectedArtist(undefined);
    }
  }, [artist, selectedArtist, skipSelectArtistToContract]);

  useEffect(() => {
    try {
      const { art, wage } = artist?.toObject();
      // Substitui dados pelos valores do artista selecionado // Replace data for selected artist values
      setArt(ArtTypesUtil.parse(art));
      setPrice(wage);
    } catch (e: any) {
      setPrice(0);
      setArt(undefined);
    }
  }, [artist, setArt]);

  const createAgreement = () => {
    const formatedDate = dayjs(date).format("DD/MM/YYYY");

    const { error } = agreementSchema.validate({
      art,
      price,
      date: formatedDate,
      initialTime,
      finalTime,
      description,
    });

    if (error) {
      setInputErrorMessage(error.message);
    } else {
      setInputErrorMessage("");
      sendAgreement({
        hirer: id,
        hired: selectedArtist.id,
        art,
        price,
        date: formatedDate,
        initialTime,
        finalTime,
        description,
      })
        .then(() => toogleNewContractVisibility())
        .catch((e: any) => setInputErrorMessage(e.message));
    }
  };
  return (
    <Modal hidden={hideNewContract}>
      <ModalContainer>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => {
              toogleNewContractVisibility();
              setSkipSelectArtistToContract(false);
            }}
          />
          <h1>{!selectedArtist ? "Select an artist" : "New contract"}</h1>
        </HeaderLogo>
        {!selectedArtist ? (
          // Antigo SelectArtist
          <SignContainer
            onSubmit={(e: any) => {
              e.preventDefault();
              fetchUsersByName(AccountType.artist, searchedName);
            }}
          >
            <SearchArtistInputContainer>
              <SearchArtistInput
                type="text"
                placeholder="Artist"
                onChange={(e: any) => setSearchedName(e.target.value)}
              />
              <SearchArtistButton>
                <img src={SearchWhiteIcon} alt="Pesquisar" />
              </SearchArtistButton>
            </SearchArtistInputContainer>
            <SearchResults>
              {searchResult.map((artist: any) => (
                <ArtistBoxCheck
                  id={artist.id}
                  name={artist.name}
                  image={artist.image}
                  art={artist.art}
                  location={{
                    CEP: artist.CEP ?? "Unknown",
                    city: artist.city ?? "Unknown",
                    state: artist.state ?? "Unknown",
                  }}
                  wage={artist.wage}
                />
              ))}
            </SearchResults>
            <FormInputButton
              onClick={() => setSelectedArtist(artist?.toObject())}
            >
              NEXT
            </FormInputButton>
          </SignContainer>
        ) : (
          // Form containing selected artist
          <SignContainer
            onSubmit={(e: any) => {
              e.preventDefault();
              createAgreement();
            }}
          >
            <ArtistBox
              name={selectedArtist?.name}
              image={selectedArtist?.image}
              art={selectedArtist?.art}
              location={{
                city: selectedArtist?.location.city,
                state: selectedArtist?.location.state,
              }}
            />
            <FormInputErrorMessage hidden={inputErrorMessage.length === 0}>
              {inputErrorMessage}
            </FormInputErrorMessage>
            <FormInputFullField
              value={art}
              type="text"
              placeholder="Art"
              disabled
            />
            <FormInputFullField
              type="number"
              placeholder="Value"
              value={price?.toFixed(2)}
              onChange={(e: any) => setPrice(parseFloat(e.target.value))}
            />
            <FormInputFullField
              type="date"
              placeholder="Event date"
              value={date}
              onChange={(e: any) => setDate(e.target.value)}
            />
            <FormInputHalfField
              type="time"
              placeholder="Initial hour"
              value={initialTime}
              onChange={(e: any) => setInitialTime(e.target.value)}
            />
            <FormInputHalfField
              type="time"
              placeholder="Closing time"
              value={finalTime}
              onChange={(e: any) => setFinalTime(e.target.value)}
            />
            <FormInputTextbox
              placeholder="Description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
            />
            <FormInputButton>CREATE CONTRACT</FormInputButton>
          </SignContainer>
        )}
      </ModalContainer>
    </Modal>
  );
}

export default NewContract;
