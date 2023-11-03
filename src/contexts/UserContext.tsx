
import { Artist, Enterprise, User } from "../api/User";
import { AccountType, AccountTypesUtil } from "../enums/AccountType";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoLoggedAcessError } from "../errors/NoLoggedAcessError";
import DefaultImage from "../assets/marco_image.png"
import { ImageCompressor } from "../services/ImageCompressor";

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
  const [token, setToken] = useState(sessionStorage.getItem("user_token") as string);
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

    const list = await client.fetchListWithoutFilter(0, 25);

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
    cpf: string
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
    birthday: string;
  }) => {
    ImageCompressor.fromURL(DefaultImage)
      .then(image => ImageCompressor.toBase64(image, (result: string) => // Converte imagem em string
        new Artist()
          .build({ ...artistData, image: result })
          .signUp() // realiza cadastro
          .then(() => signIn(artistData.email, artistData.password)) // realiza login
          .catch(console.error)
      ))
  };

  const signUpEnterprise = async (enterpriseData: {
    name: string;
    companyName: string;
    section: string;
    email: string;
    cnpj: string;
    password: string;
    phone: string;
    location: {
      cep: string;
      state: string;
      city: string;
      neighborhood: string;
      address: string;
    };
    website: string;
  }) => {
    ImageCompressor.fromURL(DefaultImage)
      .then(image => ImageCompressor.toBase64(image, (result: string) =>// Converte imagem em string
        new Enterprise()
          .build({ ...enterpriseData, image: result })
          .signUp() // Cadastra artista
          .then(() => signIn(enterpriseData.email, enterpriseData.password)) // Realiza login
          .catch(console.error)))
  };

  const logOut = () => {
    sessionStorage.removeItem("user_token");
    setLoginStatus(false);

    setLoadStatus(false);
    setType(null);
    setID("");
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        isLogged,
        user,
        id,
        token,
        type,
        cardsData,
        fetchUserCardList,
        signIn,
        signUpArtist,
        signUpEnterprise,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};