import { useState } from "react";
import {
	CategoryButton,
	CategoryContainer,
	CategoryInput,
	CategorySelect,
} from "./filterBarStyles";
import { ArtTypesUtil, ArtType } from "../../enums/ArtType";
import { BrazilianStatesUtil, BrazilianState } from "../../enums/BrazilianState";

interface FilterBarProps {
	withArtField: string
}

function NameFilterBar(props: FilterBarProps) {

	const [name, setName] = useState("");
	const [type, setType] = useState<ArtType>();

	return (
		<CategoryContainer with_art_field={props.withArtField}>

			<CategoryInput
				placeholder="DIGITE O NOME DO USUÁRIO"
				value={name}
				onChange={(e: any) => setName(e.target.value)}
			/>
			<CategorySelect is_visible={props.withArtField}
				value={type}
				onChange={(e: any) => setType(e.target.value)}

			>
				<option disabled selected>ESCOLHA TIPO DE ARTE</option>
				{ArtTypesUtil
					.values()
					.sort((a: ArtType, b: ArtType) => a.localeCompare(b))
					.map(type => <option value={type}>{type}</option>)
				}
			</CategorySelect>
			<CategoryButton>PESQUISAR</CategoryButton>
		</CategoryContainer>
	);
}

export default NameFilterBar;
