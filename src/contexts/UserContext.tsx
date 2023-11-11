
import { Artist, Enterprise, User } from "../api/User";
import { Post } from "../api/Post";
import { Agreement } from "../api/Agreement";
import { AccountType, AccountTypesUtil } from "../enums/AccountType";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoLoggedAcessError } from "../errors/NoLoggedAcessError";
import DefaultImage from "../assets/marco_image.png"
import { ImageCompressor } from "../services/ImageCompressor";
import { Chat } from "../api/Chat";

interface UserStoreProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as any);

export const UserStorage = ({ children }: UserStoreProps) => {

  const navigate = useNavigate();

  const [id, setID] = useState(sessionStorage.getItem("user_id") ?? undefined);
  const [token, setToken] = useState(sessionStorage.getItem("user_token") ?? undefined);
  const [type, setType] = useState<AccountType | string>(sessionStorage.getItem("user_type") as string);
  const [user, setUser] = useState<any>({});
  const [isLogged, setLoginStatus] = useState(JSON.parse(sessionStorage.getItem("is_user_logged") ?? 'false'));
  const [isLoaded, setLoadStatus] = useState(false);

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

  const handlePost = useCallback((postItem: Post) => {

    const post = postItem.toObject();

    return post
      .author
      ?.fetch(false)
      .then((author: User) => {
        post.author = author;
        return post;
      })
      .then((post: any) => ({
        id: post.id as string,
        author: post.author?.toObject(),
        message: post.message as string,
        media: post.media as string,
        postTime: post.postTime as string,
      }));


  }, [])
  const fetchPostsByUser = (id: string, offset = 0, limit = 500) => new Post()
    .build({ author: new User(id) })
    .fetchListByAuthor(offset, limit)
    .then((posts: Post[]) => Promise.all(posts.map(handlePost)));

  const fetchRandomPosts = (offset = 0, limit = 25) => new Post()
    .fetchList(offset, limit)
    .then((posts: Post[]) => Promise.all(posts.map(handlePost)));

  const fetchAgreementsByUser = (id: string, offset = 0, limit = 500) => new Agreement()
    .fetchList(
      new User(id),
      offset,
      limit
    )
    .then(list => Promise.all(
      list.map(
        item => {
          const agreement = item.toObject();
          return Promise.all([
            agreement.hirer?.fetch(false),
            agreement.hired?.fetch(false),
          ])
            .then(([hirer, hired]) => {
              agreement.hirer = hirer;
              agreement.hired = hired;
              return agreement;
            });
        })
    ));

  const fetchChats = (offset = 0, limit = 10) => new Chat()
    .fetchList(
      new User(id),
      offset,
      limit
    )
    .then(chats => chats.map(
      chat => {
        const item = chat.toObject()
        return {
          ...item,
          artist: item.artist?.getID(),
          enterprise: item.enterprise?.getID(),
        }
      }
    ))
    .catch((e: any) => console.error(e.message));

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
        fetchRandomPosts,
        fetchPostsByUser,
        fetchAgreementsByUser,
        fetchChats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
