
import { Artist, Enterprise } from "../api/User";
import { AccountType } from "../enums/AccountType";
import { BrazilianState } from "../enums/BrazilianState";
import { createContext, useEffect, useState } from "react";

interface SearchStoreProps {
	children: React.ReactNode;
}

export const SearchContext = createContext({} as any);

export const SearchProvider = ({ children }: SearchStoreProps) => {
	const [typeSearched, setTypeSearched] = useState<AccountType>();
	const [cardsData, setCardsData] = useState<any[]>([]);

	const fetchRandomUsers = (page = 0, limit = 5) => {
	
		// eslint-disable-next-line eqeqeq
		const userClient = typeSearched == 'artist' ? new Artist() : new Enterprise();
		userClient
		.fetchListWithoutFilter(page, limit)
		.then(users => users.map( // trata a resposta
			user => {
				const data = user.toObject();

				// Obtém art e wage apenas caso a busca envolva artistas
				const { art, wage } = user instanceof Artist ? user.toObject() : { art: undefined, wage: undefined };
				return {
					id: data.id,
					index: data.index,
					image: data.image,
					name: data.name,
					type: data.type,
					city: data.location?.city,
					state: data.location?.state,
					art, wage,
				}
			})
		)
		.then(setCardsData);
	}

	const fetchUsersByName = (name: string, page = 0, limit = 5) => {
			// eslint-disable-next-line eqeqeq
			const userClient = typeSearched == 'artist' ? new Artist() : new Enterprise();
					userClient
					.fetchListFilteringName(name, page, limit)
					.then(users => users.map( // trata a resposta
							user => {
									const data = user.toObject();

									// Obtém art e wage apenas caso a busca envolva artistas
									const { art, wage } = user instanceof Artist ? user.toObject() : { art: undefined, wage: undefined };
									return {
											id: data.id,
											index: data.index,
											image: data.image,
											name: data.name,
											type: data.type,
											city: data.location?.city,
											state: data.location?.state,
											art, wage,
									}
							})
					)
					.then(setCardsData);
	}

	const fetchUsersByLocation = (state: BrazilianState, city:string, page = 0, limit = 5) => {
		// eslint-disable-next-line eqeqeq
		const userClient = typeSearched == 'artist' ? new Artist() : new Enterprise();
		userClient
			.fetchListFilteringLocation(state, city, page, limit)
	}


	useEffect(() => {
		if (cardsData.length === 0) fetchRandomUsers(0, 20);
	})

	return (
		<SearchContext.Provider
			value={{
				cardsData,
				fetchRandomUsers,
				fetchUsersByName,
				fetchUsersByLocation,
        setTypeSearched,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};