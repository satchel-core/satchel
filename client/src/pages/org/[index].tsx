import { Text, Grid, GridItem, Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, wrapper } from '../../store';
import { Logo } from '../../logo';
import { SchoolLabel } from '../../components/SchoolLabel';
import { useRouter } from 'next/router';
import { handleClick } from '../../utils/common';
import { schoolType } from '../../store/reducers/school_reducer';
import { deploySchool, getOrgInfo, getSchoolByOrg } from '../../store/actions/org_actions';

const OrgHome = ({ orgAddress }) => {
	const router = useRouter();
	const orgState = useSelector((state: RootState) => state.org);
	const dispatch = useDispatch();

	return (
		<Grid p={3} gap={3}>
			<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
				<HStack>
					<Logo h="20vmin" pointerEvents="none" />
					<Button
						size="sm"
						colorScheme="satchel_blue"
						variant="outline"
						onClick={handleClick('/', router)}
					>
						LOG OUT
					</Button>
				</HStack>
			</GridItem>
			<GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
				<Text fontSize="24px">{orgState.org.name}</Text>
			</GridItem>
			<GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
				<Button
					size="sm"
					minW="40vw"
					colorScheme="satchel_blue"
					variant="outline"
					onClick={() =>
						dispatch(
							deploySchool(
								'no name school',
								router,
								orgAddress,
								process.env.NEXT_PUBLIC_LENDINGPOOL_ADDRESS,
							),
						)
					}
				>
					ADD NEW SCHOOL
				</Button>
			</GridItem>

			{orgState.schools?.map((value, index) => {
				return (
					<GridItem key={index} rowStart={index + 4} rowEnd={index + 4} colStart={1} colEnd={2}>
						<SchoolLabel school={value} balance="123" />
					</GridItem>
				);
			})}
		</Grid>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	await store.dispatch(getSchoolByOrg(context.query.index as string));
	await store.dispatch(getOrgInfo(context.query.index as string));
	return { props: { orgAddress: context.query.index } };
});

export default OrgHome;
