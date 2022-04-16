import { FunctionComponent } from 'react';
import { Stat, StatLabel, StatHelpText, StatGroup, StatArrow } from '@chakra-ui/react';
import { Logo } from '../logo';
import Image from 'next/image';

export const TokenLabel = ({ name, amount, rate, onClick, img }) => {
	var dir: 'increase' | 'decrease' = 'increase';
	if (rate < 0) {
		dir = 'decrease';
	}
	return (
		<StatGroup
			borderWidth="1px"
			borderRadius="md"
			borderColor="black"
			padding={1}
			onClick={onClick}
		>
			<Stat>
				<StatLabel fontSize="sm">{name}</StatLabel>
				<StatLabel fontSize="xl" fontWeight="bold">
					{amount}
				</StatLabel>
				<StatHelpText>
					<StatArrow type={dir} />
					{rate}%
				</StatHelpText>
			</Stat>
			<Stat>
				{/* <Logo maxH="80px"></Logo> */}
				<Image src={img} alt={name} width="100%" height="50%" layout="responsive" objectFit="contain"></Image>
			</Stat>
		</StatGroup>
	);
};
