import { useState } from "react";
import {
	CategoryButton,
	CategoryContainer,
	CategoryInput,
} from "./filterBarStyles";


function LocationFilterBar() {
	const states = 
	['AM', 'AP', 'AC', 'RO', 'RM', 'TO', 'PA', 'BA', 'CE', 'RN', 'MA', 'SE', 'AL', 'PE', 'DF', 'SP', 'MG', 'ES', 'RJ', 'PR', 'SC', 'RS', 'MT', 'MS', 'GO']
	.sort((currentString, anotherString) => currentString.localeCompare(anotherString));
	
	const [state, setState] = useState("");


	return (
		<CategoryContainer>
			<CategoryInput value={state} onChange={(e:any) => setState(e.target.value)}>
				<option disabled selected>SELECIONE SEU ESTADO</option>
				{states.map(
					state => <option value={state}>{state}</option>
				)}
			</CategoryInput>
			<CategoryInput>
				<option disabled selected> SELECIONE SUA CIDADE</option>
			</CategoryInput>
			<CategoryInput>
				<option disabled selected>ESCOLHA TIPO DE ARTE</option>
			</CategoryInput>
			<CategoryButton>PESQUISAR</CategoryButton>
		</CategoryContainer>
	);
}

export default LocationFilterBar;
