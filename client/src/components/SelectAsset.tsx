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
							amount="AMT"
							rate={userState.interestRates[value.symbol]}
							onClick={() => {
								context.setAsset(value.symbol);
								nextPage();
							}}
						/>
					</GridItem>
				);
			})}

			{/* <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
				<TokenLabel
					name="DAI"
					amount="761.3"
					onClick={() => {
						context.setAsset('DAI');
						nextPage();
					}}
				/>
			</GridItem> */}
			{/* <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
				<TokenLabel
					name="TETHER"
					amount="16.36"
					onClick={() => {
						context.setAsset('TETHER');
						nextPage();
					}}
				/>
			</GridItem> */}
		</>
	);
};

export async function getServerSideProps(context) {
	return { props: { schoolAddress } };
}
