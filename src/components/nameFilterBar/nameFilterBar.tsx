import { useState, useContext } from "react";
import {
	CategoryButton,
	CategoryContainer,
	CategoryInput,
	CategorySelect,
} from "./filterBarStyles";
import { ArtTypesUtil, ArtType } from "../../enums/ArtType";
import { AccountType } from "../../enums/AccountType";
import { SearchContext, } from "../../contexts/SearchContext";

interface FilterBarProps {
	withArtField: boolean
}

function NameFilterBar(props: FilterBarProps) {
    
	const [name, setName] = useState("");
	const [art, setArt] = useState<ArtType>();
	
	
	const { fetchUsersByName } = useContext(SearchContext);
    
	return (
		<CategoryContainer with_art_field={props.withArtField}>

			<CategoryInput
				placeholder="DIGITE O NOME DO USUÁRIO"
				value={name}
				onChange={(e: any) => setName(e.target.value)}
			/>
			<CategorySelect hidden={!props.withArtField}
				value={art}
				onChange={(e: any) => setArt(e.target.value)}

			>
				<option disabled selected>ESCOLHA TIPO DE ARTE</option>
				{ArtTypesUtil
					.values()
					.sort((a: ArtType, b: ArtType) => a.localeCompare(b))
					.map((type: ArtType) => <option value={type}>{type}</option>)
				}
			</CategorySelect>
			<CategoryButton onClick={() =>
			    fetchUsersByName(
			        props.withArtField ? AccountType.artist : AccountType.enterprise,
			        name
			    )
			}>PESQUISAR</CategoryButton>
		</CategoryContainer>
	);
}

export default NameFilterBar;
