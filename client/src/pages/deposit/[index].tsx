import {
	Text,
	Grid,
	GridItem,
	HStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Button,
	Input,
	VStack,
	Stat,
	StatGroup,
	StatLabel,
} from '@chakra-ui/react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import assetMap from '../../utils/assetMap.json';
import { handleClick, handleCustomUrl } from '../../utils/common';
import { Logo } from '../../logo';
import { OrganizationMenu } from '../../components/OrganizationMenu';
import { TokenLabel } from '../../components/TokenLabel';
import { useRouter } from 'next/router';
import { SelectAsset } from '../../components/SelectAsset';
import { DepositEnums } from '../../utils/depositEnums';
import { Context } from '../../utils/context';
import { useDispatch, useSelector } from 'react-redux';
import { depositSchool, getUserBalanceInSchool } from '../../store/actions/user_actions';
import { RootState } from '../../store';
import { getInterestRates } from '../../store/actions/user_actions';

export const Deposit = ({ schoolAddress }) => {
	const router = useRouter();
	const context = useContext(Context);
	const dispatch = useDispatch();

	const schoolState = useSelector((state: RootState) => state.school);

	useEffect(() => {
		getUserBalanceInSchool('0x3a3a6677553bad5ae99ccdb64e714e54744a4bb3', dispatch);
	}, []);

	const [amount, setAmount] = useState('0');
	const [page, setPage] = useState(DepositEnums.Asset);

	switch (page) {
		case DepositEnums.Asset:
			return (
				<Grid p={3} gap={3}>
					<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
						<HStack>
							<Logo h="20vmin" pointerEvents="none" />
							<Button
								size="sm"
								colorScheme="satchel_blue"
								variant="outline"
								// onClick={handleCustomUrl('/deposit/', DepositEnums.Amount, router)}
							>
								LOG OUT
							</Button>
						</HStack>
					</GridItem>
					<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}></GridItem>
					<GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
						<Text fontSize="24px">Deposit Money</Text>
					</GridItem>
					<GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
						<Text fontSize="12px">SELECT ASSET</Text>
					</GridItem>
					<SelectAsset
						nextPage={() => {
							setPage(DepositEnums.Amount);
						}}
						offset={4}
					/>
				</Grid>
			);
		case DepositEnums.Amount:
			return (
				<Grid p={3} gap={3}>
					<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
						<HStack>
							<Logo h="20vmin" pointerEvents="none" />
							{/* <OrganizationMenu setPage={origSetPage} /> */}
						</HStack>
					</GridItem>
					<GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
						<Button
							size="sm"
							colorScheme="satchel_blue"
							variant="outline"
							onClick={() => setPage(DepositEnums.Asset)}
						>
							GO BACK
						</Button>
					</GridItem>
					<GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
						<Text fontSize="24px">{context.asset}</Text>
					</GridItem>
					<GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
						<StatGroup>
							<Stat>
								<StatLabel fontSize="12px">WALLET</StatLabel>
								<StatLabel fontSize="36px">{amount}</StatLabel>
								<StatLabel fontSize="18px">$350.00</StatLabel>
							</Stat>
							<Stat>{/* <Logo></Logo> */}</Stat>
							<Stat>
								<StatLabel fontSize="12px">SATCHEL</StatLabel>
								<StatLabel fontSize="36px">0.00</StatLabel>
								<StatLabel fontSize="18px">${schoolState.balance.toFixed(2)}</StatLabel>
							</Stat>
						</StatGroup>
					</GridItem>
					<GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
						<Text fontSize="12px">SELECT AMOUNT TO DEPOSIT</Text>
					</GridItem>
					<GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
						<NumberInput
							onChange={(amount) => setAmount(amount)}
							value={amount + ' ' + context.asset}
							max={5}
							min={0}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</GridItem>
					<GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
						<Button
							size="sm"
							colorScheme="satchel_blue"
							variant="outline"
							onClick={() => {
								setPage(DepositEnums.Preview);
							}}
						>
							NEXT
						</Button>
					</GridItem>
				</Grid>
			);
		case DepositEnums.Preview:
			return (
				<Grid p={3} gap={3}>
					<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
						<HStack>
							{/* <Logo h="20vmin" pointerEvents="none" /> */}
							{/* <OrganizationMenu setPage={origSetPage} /> */}
						</HStack>
					</GridItem>
					<GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
						<Button
							size="sm"
							colorScheme="satchel_blue"
							variant="outline"
							onClick={() => setPage(DepositEnums.Amount)}
						>
							GO BACK
						</Button>
					</GridItem>
					<GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
						<Text fontSize="24px">Preview</Text>
					</GridItem>
					<GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
						<Text fontSize="12px">ASSET</Text>
					</GridItem>
					<GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
						<Input defaultValue={context.asset} isReadOnly></Input>
					</GridItem>
					<GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
						<Text fontSize="12px">DEPOSIT AMOUNT</Text>
					</GridItem>
					<GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
						<Input defaultValue={amount} isReadOnly></Input>
					</GridItem>
					<GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
						<Button
							size="sm"
							colorScheme="satchel_blue"
							variant="solid"
							onClick={() => {
								dispatch(
									depositSchool(schoolAddress, parseFloat(amount), assetMap[context.asset], router),
								);
							}}
						>
							CONFIRM DEPOSIT
						</Button>
					</GridItem>
				</Grid>
			);
		default:
			return <div>INVALID</div>;
	}
};

export async function getServerSideProps(context) {
	const schoolAddress = context.query.index;

	return { props: { schoolAddress } };
}

export default Deposit;
