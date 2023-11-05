
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

  const [isLogged, setLoginStatus] = useState(JSON.parse(sessionStorage.getItem("is_user_logged") ?? 'false'));
  const [user, setUser] = useState<any>({});
  const [id, setID] = useState(sessionStorage.getItem("user_id") ?? undefined);
  const [token, setToken] = useState(sessionStorage.getItem("user_token") ?? undefined);
  const [isLoaded, setLoadStatus] = useState(false);
  const [type, setType] = useState<AccountType | string>(sessionStorage.getItem("user_type") as string);

  const fetchLoggedUser = useCallback(async () => {
    const user = // Obtém objeto de uma classe compatível com o tipo de conta do usuário
      // eslint-disable-next-line eqeqeq
      type == AccountType.artist ? new Artist(id) : new Enterprise(id)

    setUser(
      (await user.build({ token, type }) // Informa dados de identificação
        .fetch(true)) // Busca dados do usuário
        .toObject());
  }, [id, token, type]);

  const fetchAnotherUser = (index: number, type?: AccountType) => {
    let user: User;
    switch (type) {
      case AccountType.artist:
        user = new Artist();
        break;
      case AccountType.enterprise:
        user = new Enterprise();
        break;
      default:
        user = new User();
        break;
    }

    return user
      .build({ index })
      .fetchForIndex()
      .then(response => response.toObject())
      .catch(e => console.error(e.message));
  }

  const signIn = (email: string, password: string) => {
    return new User()
      .signIn(email, password)
      .then((dataUser) => dataUser.toObject())
      .then((dataUser) => {

        if ([dataUser.id, dataUser.index, dataUser.type, dataUser.token].every((item) => item !== undefined)) {
          sessionStorage.setItem("user_id", dataUser.id as string);
          sessionStorage.setItem("user_type", dataUser.type as string);
          sessionStorage.setItem("user_token", dataUser.token as string);
          sessionStorage.setItem("is_user_logged", "1");

          setID(dataUser.id);
          setType(AccountTypesUtil.parse(dataUser.type));
          setToken(dataUser.token)
          setLoginStatus(true);
        } else {
          throw new Error("Usuário não encontrado");
        }
      })
      .then(() => navigate("/feed"))
      .catch((e: Error) => {
        if (e instanceof NoLoggedAcessError) {
          NoLoggedAcessError.throw(e.message);
        } else {
          console.error(e.message);
          NoLoggedAcessError.throw("Tentativa de login falhou");
        }
      });
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
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("user_token");
    sessionStorage.setItem("is_user_logged", "0");
    setLoginStatus(false);
    setLoadStatus(false);
    navigate('/');
  };

  useEffect(() => {
    if (isLogged && !isLoaded) {
      fetchLoggedUser();
      setLoadStatus(true);
    }
  }, [isLogged, isLoaded, fetchLoggedUser]);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        user,
        id,
        token,
        type,
        fetchAnotherUser,
        signIn,
        signUpArtist,
        signUpEnterprise,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; new Error();


