import { useState } from "react";
import {
	CategoryButton,
	CategoryContainer,
	CategorySelect,
} from "./filterBarStyles";
import { ArtTypesUtil, ArtType } from "../../enums/ArtType";
import { BrazilianStatesUtil, BrazilianState } from "../../enums/BrazilianState";


interface FilterBarProps { // Parâmetros que o componente deve receber
	withArtField: string
}


function LocationFilterBar(props: FilterBarProps) {

	const [state, setState] = useState("");
	const [type, setType] = useState<ArtType>();

	const search = () => { };

	return (
		<CategoryContainer with_art_field={props.withArtField}>
			<CategorySelect onChange={(e: any) => setState(e.target.value)}>
				<option disabled selected>SELECIONE SEU ESTADO</option>
				{BrazilianStatesUtil
					.values()
					.sort((a: BrazilianState, b: BrazilianState) => a.localeCompare(b))
					.map(type => <option value={type}>{type}</option>)}
			</CategorySelect>
			<CategorySelect>
				<option disabled selected> SELECIONE SUA CIDADE</option>
			</CategorySelect>
			<CategorySelect
				is_visible={props.withArtField}
				onChange={(e: any) => setType(e.target.value)}>
				<option disabled selected>ESCOLHA TIPO DE ARTE</option>
				{ArtTypesUtil
					.values()
					.sort((a: ArtType, b: ArtType) => a.localeCompare(b))
					.map(type => <option value={type}>{type}</option>)
				}
			</CategorySelect>
			<CategoryButton onClick={(e: any) => search()}>PESQUISAR</CategoryButton>
		</CategoryContainer>
	);
}

export default LocationFilterBar;
