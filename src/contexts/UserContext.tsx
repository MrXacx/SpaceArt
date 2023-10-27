import { Artist, Enterprise, User } from "../api/User";
import { AccountType, AccountTypesUtil } from "../enums/AccountType";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoLoggedAcessError } from "../errors/NoLoggedAcessError";

interface UserStoreProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as any);

export const UserStorage = ({ children }: UserStoreProps) => {
  const navigate = useNavigate();

  const [isLogged, setLoginStatus] = useState(false);
  const [user, setUser] = useState<any>({});
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [type, setType] = useState<AccountType | null>(null);
  const [id, setID] = useState("");
  const [token, setToken] = useState(
    sessionStorage.getItem("user_token") as string
  );
  const [isLoaded, setLoadStatus] = useState(false);

  const fetchLoggedUser = useCallback(async () => {
    const user = // Obtém objeto de uma classe compatível com o tipo de conta do usuário
      // eslint-disable-next-line eqeqeq
      type == AccountType.artist ? new Artist(id) : new Enterprise(id)

    setUser(
      (await user.build({ id, token, type }) // Informa dados de identificação
        .fetch(true)) // Busca dados do usuário
        .toObject());
  }, [id, token, type]);

  useEffect(() => {
    if (isLogged && !isLoaded) {
      fetchLoggedUser();
      setLoadStatus(true);

    }
  }, [isLogged, isLoaded, fetchLoggedUser])

  const fetchUserCardList = async (filter: string) => {
    let client: Artist;
    client = new Artist();

    const list = await client.fetchListNoFilter(0, 25);

    setCardsData(
      list.map((item: Artist | Enterprise | User) => {
        let wage: any, art: any;

        const data = item.toObject();
        const { id, image, index, type, name, location } = data;

        if (item instanceof Artist) {
          [wage, art] = [item.toObject().wage, item.toObject().art];
        } else {
          [wage, art] = [undefined, undefined];
        }

        return {
          id: id as string,
          index: index as number,
          image: image as string,
          name: name as string,
          type: type as string,
          city: location?.city as string,
          state: location?.state as string,
          art: art,
          wage: wage,
        };
      })
    );
  };

  const signIn = (email: string, password: string) => {
    return new User()
      .signIn(email, password)
      .then((dataUser) => dataUser.toObject())
      .then((dataUser) => {
        if ([dataUser.id, dataUser.index, dataUser.type, dataUser.token]
          .every((item) => item !== undefined)
        ) { // Executa somenta casob os itens possuam valores válidos
          setUser(dataUser);
          setID(dataUser.id as string);
          setType(AccountTypesUtil.parse(dataUser.type));
          setToken(dataUser.token as string);
          sessionStorage.setItem("user_token", dataUser.token as string);
          setLoginStatus(true);
        } else {
          NoLoggedAcessError.throw("Tentativa de login falhou");
        }
      })
      .then(() => navigate("/feed"))
      .catch(console.error);
  };

  const signUpArtist = async (artistData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: {
      cep: string;
      state: string;
      city: string;
    };
    website: string;
    wage: number;
    art: string;
  }) => {
    const artist = new Artist().build(artistData);

    try {
      await artist.signUp() // Cadastra artista
      await signIn(artistData.email, artistData.password) // Realiza login
    } catch (e: any) {
      console.error(e);
    }

  };

  const logOut = () => {
    sessionStorage.removeItem("user_token");
    setLoginStatus(false);
    setType(null);
    setID("");
  };

  return (
    <UserContext.Provider
      value={{
        isLogged,
        user,
        id,
        token,
        type,
        signIn,
        fetchUserCardList,
        cardsData,
        signUpArtist,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
