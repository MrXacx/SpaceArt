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
	
	
	const { fetchUsersByName, setArtFilter } = useContext(SearchContext);

	const search = () => {
		fetchUsersByName(
			props.withArtField ? AccountType.artist : AccountType.enterprise,
			name
		)
		if (art) setArtFilter(art);
	}
	return (
		<CategoryContainer with_art_field={props.withArtField}>

			<CategoryInput
				placeholder="TYPE USER NAME"
				value={name}
				onChange={(e: any) => setName(e.target.value)}
			/>
			<CategorySelect hidden={!props.withArtField}
				value={art}
				onChange={(e: any) => setArt(e.target.value)}

			>
				<option disabled selected>CHOOSE ART TYPE</option>
				{ArtTypesUtil
					.values()
					.sort((a: ArtType, b: ArtType) => a.localeCompare(b))
					.map((type: ArtType) => <option value={type}>{type}</option>)
				}
			</CategorySelect>
			<CategoryButton onClick={() => search()}>SEARCH</CategoryButton>
		</CategoryContainer>
	);
}

export default NameFilterBar;
