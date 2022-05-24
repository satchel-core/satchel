import { Text, Grid, GridItem, Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, wrapper } from '../../store';
import { Logo } from '../../logo';
import { SchoolLabel } from '../../components/SchoolLabel';
import { useRouter } from 'next/router';
import { handleClick } from '../../utils/common';
import { schoolType } from '../../store/reducers/school_reducer';
import { deploySchool, getSchoolByOrg } from '../../store/actions/org_actions';

const OrgHome = ({ data }) => {
	const router = useRouter();
	const orgState = useSelector((state: RootState) => state.org);

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
				<Text fontSize="24px">Organization Name</Text>
			</GridItem>
			<GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
				<Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline">
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

// export async function getServerSideProps(context) {
// 	const orgAddress = context.query.index;
// 	const res = await fetch(
// 		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/org/getSchools?orgAddress=${orgAddress}`,
// 	);
// 	const data = await res.json();

// 	return { props: { data } };
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	store.dispatch(getSchoolByOrg(context.query.index as string));
	return { props: {} };
});

export default OrgHome;
