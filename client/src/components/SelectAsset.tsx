import { GridItem, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { handleCustomUrl } from '../utils/common';
import { Context } from '../utils/context';
import { DepositEnums } from '../utils/depositEnums';
import { TokenLabel } from './TokenLabel';
import assets from '../utils/assets.json';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const SelectAsset = ({ nextPage, offset }) => {
	const context = useContext(Context);
	const userState = useSelector((state: RootState) => state.user);

	return (
		<>
			{assets?.map((value, index) => {
				return (
					<GridItem
						key={index}
						rowStart={index + offset}
						rowEnd={index + offset}
						colStart={1}
						colEnd={2}
					>
						<TokenLabel
							name={value.symbol}
							img={value.url}
							amount={userState.tokenBalances[value.symbol].toFixed(4)}
							rate={userState.interestRates[value.symbol].toFixed(4)}
							onClick={() => {
								context.setAsset(value.symbol);
								nextPage();
							}}
						/>
					</GridItem>
				);
			})}
		</>
	);
};

// export async function getServerSideProps(context) {
// 	return { props: { schoolAddress } };
// }
