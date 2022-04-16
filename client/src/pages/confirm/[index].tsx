import { Button, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { OrganizationMenu } from '../../components/OrganizationMenu';
import { Logo } from '../../logo';
import { RootState } from '../../store';
import { handleCustomUrl } from '../../utils/common';

const ConfirmPage = ({ schoolAddress }) => {
    const router = useRouter();
	return <Grid p={3} gridTemplateRows="30vh auto">
		<GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
			<HStack>
				<Logo h="20vmin" pointerEvents="none" />
				{/* <OrganizationMenu /> */}
			</HStack>
		</GridItem>
		<GridItem rowStart={2} rowEnd={3}>
			<VStack spacing={2}>
				<Text fontSize="18px" fontWeight="bold">
					Congratulations!
				</Text>
				<Text textAlign="center">
					The transaction has been processed. You should see the results reflect on your
					wallet within a few hours.
				</Text>
				<Button size="sm" colorScheme="satchel_blue" variant="solid" onClick={handleCustomUrl("/school/", schoolAddress, router)}>
					RETURN TO SCHOOL HOME
				</Button>
			</VStack>
		</GridItem>
	</Grid>;
};

export async function getServerSideProps(context) {
	const schoolAddress = context.query.index;
	return { props: { schoolAddress } };
}

export default ConfirmPage;
