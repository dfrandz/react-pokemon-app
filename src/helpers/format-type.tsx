const formatType = (type: string): string => {
	let color: string;

	switch (type) {
    case 'Feu': 
    	color = 'lighten-1 badge bg-[#FF0000] p-3'; 
    	break; 
    case 'Eau': 
    	color = ' lighten-1 badge bg-[#038FFC] p-3'; 
    	break; 
    case 'Plante': 
    	color = ' lighten-1 badge bg-[#02A34B] p-3'; 
    	break; 
    case 'Insecte': 
    	color = ' lighten-1 badge bg-[#89584D] p-3'; 
    	break; 
    case 'Normal': 
    	color = ' lighten-1 badge bg-[#E5E4E5] p-3'; 
    	break; 
    case 'Vol': 
    	color = ' lighten-1 badge bg-[#33B1EB] p-3'; 
    	break; 
    case 'Poison': 
    	color = ' accent-1 badge bg-[#B278FF] p-3'; 
    	break; 
    case 'Fée': 
    	color = ' lighten-1 badge badge-neutral p-3'; 
    	break; 
    case 'Psy': 
    	color = ' darken-1 badge badge-neutral p-3'; 
    	break; 
    case 'Electrik': 
    	color = ' badge bg-[#909423] p-3'; 
    	break; 
    case 'Combat': 
    	color = ' badge badge-neutral'; 
    	break; 
    default: 
    	color = ' badge bg-[#E5E4E5] p-3'; 
    	break; 
	}

	return `chip ${color}`;
}

export default formatType;