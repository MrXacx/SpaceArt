
import { Artist, Enterprise, User } from "../api/User";
import { AccountType } from "../enums/AccountType";
import { BrazilianState } from "../enums/BrazilianState";
import { createContext, useState } from "react";

interface SearchStoreProps {
	children: React.ReactNode;
}

export const SearchContext = createContext({} as any);

export const SearchProvider = ({ children }: SearchStoreProps) => {

	const [cardsData, setCardsData] = useState<any[]>([]);

	const turnListOnCardData = (users: User[]) => {

		return users.map(user => {
			const data = user.toObject();

			// Obtém art e wage apenas caso a busca envolva artistas
			const { art, wage } = user instanceof Artist ? user.toObject() : { art: undefined, wage: undefined };

			return {
				id: data.id,
				index: data.index,
				image: data.image,
				name: data.name,
				type: data.type,
				cep: data.location?.cep,
				city: data.location?.city,
				state: data.location?.state,
				art, wage,
			}
		});
	}

	const fetchRandomUsers = (typeSearched: AccountType, page = 0, limit = 5) => {

		// eslint-disable-next-line eqeqeq
		const userClient = typeSearched == AccountType.artist ? new Artist() : new Enterprise();
		userClient
			.fetchListWithoutFilter(page, limit)
			.then(turnListOnCardData)
			.then(setCardsData)
			.catch(e => console.error(e));
	}

	const fetchUsersByName = (typeSearched: AccountType, name: string, page = 0, limit = 5) => {
		// eslint-disable-next-line eqeqeq
		const userClient = typeSearched == AccountType.artist ? new Artist() : new Enterprise();
		userClient
			.fetchListFilteringName(name, page, limit)
			.then(turnListOnCardData)
			.then(setCardsData)
			.catch(e => console.error(e.message));
	}

	const fetchUsersByLocation = (typeSearched: AccountType, state: BrazilianState, city: string, page = 0, limit = 5) => {
		// eslint-disable-next-line eqeqeq
		const userClient = typeSearched == AccountType.artist ? new Artist() : new Enterprise();
		userClient
			.fetchListFilteringLocation(state, city, page, limit)
			.then(turnListOnCardData)
			.then(setCardsData)
			.catch(e => console.error(e.message));
	}

	return (
		<SearchContext.Provider
			value={{
				cardsData,
				fetchRandomUsers,
				fetchUsersByName,
				fetchUsersByLocation,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
