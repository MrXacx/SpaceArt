import { Artist, Enterprise, User } from "../api/User";
import { AccountType } from "../enums/AccountType";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoLoggedAcessError } from "../errors/NoLoggedAcessError";

interface UserStoreProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as any);

export const UserStorage = ({ children }: UserStoreProps) => {
  const navigate = useNavigate();

  const [isLogged, setLoginStatus] = useState(false);
  const [user, setUser] = useState({});
  const [userCards, setUserCards] = useState<
    {
      id: string;
      index: number;
      image: string;
      name: string;
      type: string;
      city: string;
      state: string;
      art?: string;
      wage?: number;
    }[]
  >([]);
  const [type, setType] = useState("");
  const [id, setID] = useState("");
  const [token, setToken] = useState(
    sessionStorage.getItem("user_token") as string
  );

  const fetchUser = () => {
    const user = // Obtém objeto de uma classe compatível com o tipo de conta do usuário
      type === AccountType.artist
        ? new Artist(id)
        : type === AccountType.enterprise
        ? new Enterprise(id)
        : NoLoggedAcessError.throw(
            "Não é possível consultar dados do usuário sem estar logado"
          );

    user
      .build({ id, token }) // Informa dados de identificação
      .fetch(true) // Busca dados do usuário
      .then((response) => response.toObject()) // Obtém o objeto dos dados
      .then(setUser) // Atualiza estado
      .catch(console.error);
  };

  const fetchUserList = async (filter: string) => {
    let client: Artist;
    client = new Artist();

    const list = await client.fetchListNoFilter(0, 25);

    setUserCards(
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
        if (
          ![dataUser.id, dataUser.index, dataUser.type, dataUser.token].some(
            (item) => item === undefined
          )
        ) {
          setUser(dataUser);
          setID(dataUser.id as string);
          setType(dataUser.type);
          setToken(dataUser.token as string);
          sessionStorage.setItem("user_token", dataUser.token as string);
          setLoginStatus(true);
          fetchUser();
          navigate("/home");
        }
      })
      .catch(console.error);
  };

  const signUpArtist = (artistData: {
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
    const artist = new Artist();
    artist
      .build(artistData)
      .signUp() // Cadastra artista
      .then(() => signIn(artistData.email, artistData.password)) // Realiza login
      .catch(console.error); // imprime erro
  };

  const logOut = () => {
    sessionStorage.removeItem("user_token");
    setLoginStatus(false);
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
        fetchUserList,
        userCards,
        signUpArtist,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
