import { Box, HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import * as cookies from 'lib/cookies';
import useIsMobile from 'lib/hooks/useIsMobile';
import Header from 'ui/blocks/header/Header';
import NavigationDesktop from 'ui/blocks/navigation/NavigationDesktop';

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const networkType = router.query.network_type;
  const networkSubType = router.query.network_sub_type;

  React.useEffect(() => {
    if (typeof networkType === 'string') {
      cookies.set(cookies.NAMES.NETWORK_TYPE, networkType);
    }
    if (typeof networkSubType === 'string') {
      cookies.set(cookies.NAMES.NETWORK_SUB_TYPE, networkSubType);
    }
  }, [ networkType, networkSubType ]);

  return (
    <HStack
      w="100%"
      minH="100vh"
      alignItems="stretch"
    >
      { !isMobile && <NavigationDesktop/> }
      <VStack width="100%" paddingX={ isMobile ? 4 : 8 } paddingTop={ isMobile ? 0 : 9 } paddingBottom={ 10 } spacing={ 0 }>
        <Header/>
        <Box
          as="main"
          borderRadius="base"
          w="100%"
          overflow="hidden"
          paddingTop={ isMobile ? '138px' : '52px' }
        >
          { children }
        </Box>
      </VStack>
    </HStack>
  );
};

export default Page;
