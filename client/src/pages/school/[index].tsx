import { Text, Grid, GridItem, Button, HStack } from '@chakra-ui/react';
import { Logo } from '../../logo';
import { FunctionComponent, useContext, useEffect } from 'react';
import { OrganizationMenu } from '../../components/OrganizationMenu';
import { TokenLabel } from '../../components/TokenLabel';
import { TransactionLabel } from '../../components/TransactionLabel';
import { getKeys, goBack, handleClick, handleCustomUrl } from '../../utils/common';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { schoolType } from '../../store/reducers/school_reducer';
import { getUserBalanceInSchool } from '../../store/actions/user_actions';
import { DepositEnums } from '../../utils/depositEnums';
import { Context } from '../../utils/context';
import { SelectAsset } from '../../components/SelectAsset';
import { getInterestRates } from '../../store/actions/user_actions';

const OrgSchoolHome = ({ school }) => {
	const router = useRouter();
	const context = useContext(Context);
	const dispatch = useDispatch();
	const schoolState = useSelector((state: RootState) => state.school);
	const userState = useSelector((state: RootState) => state.school);

	useEffect(() => {
		getUserBalanceInSchool('0x3a3a6677553bad5ae99ccdb64e714e54744a4bb3', dispatch);
		getInterestRates(dispatch);
	}, []);

	return (
		<Grid p={3} gap={3}>
			<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
				<HStack>
					<Logo h="20vmin" pointerEvents="none" />
					{/* <OrganizationMenu setPage={setPage}/> */}
				</HStack>
			</GridItem>
			<GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
				<Button
					size="sm"
					minW="40vw"
					colorScheme="satchel_blue"
					variant="outline"
					onClick={handleCustomUrl('/org/', school.orgAddress, router)}
				>
					RETURN TO ORGANIZATION
				</Button>
			</GridItem>
			<GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
				<Text fontSize="24px">{school.name}</Text>
			</GridItem>
			<GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
				<Text fontSize="12px">CURRENT BALANCE</Text>
			</GridItem>
			<GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
				<Text fontSize="48px">{schoolState.balance.toFixed(2)}</Text>
			</GridItem>
			<GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
				<Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline">
					WITHDRAW MONEY
				</Button>
			</GridItem>
			<GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
				<Button
					size="sm"
					minW="40vw"
					colorScheme="satchel_blue"
					variant="outline"
					onClick={handleClick(`/deposit/${school.address}`, router)}
				>
					DEPOSIT MONEY
				</Button>
			</GridItem>
			<GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
				<Text fontSize="12px">TOKENS HELD</Text>
			</GridItem>
			<SelectAsset nextPage={() => {}} offset={9} />
			<GridItem rowStart={12} rowEnd={12} colStart={1} colEnd={2}>
				<Text fontSize="12px">TRANSACTION HISTORY</Text>
			</GridItem>
			<GridItem rowStart={13} rowEnd={13} colStart={1} colEnd={2}>
				<TransactionLabel
					heading="Transfer from <Donor>"
					delta="+20.00 BTC"
					date="January 1, 2022"
				></TransactionLabel>
			</GridItem>
			<GridItem rowStart={14} rowEnd={14} colStart={1} colEnd={2}>
				<TransactionLabel
					heading="Initial Deposit"
					delta="+60.00 BTC"
					date="December 1, 2021"
				></TransactionLabel>
			</GridItem>
		</Grid>
	);
};

export async function getServerSideProps(context) {
	const schoolAddress = context.query.index.toLowerCase();
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/school/?address=${schoolAddress}`,
	);
	const data = await res.json();
	const school = data.school;

	return { props: { school } };
}

export default OrgSchoolHome;
