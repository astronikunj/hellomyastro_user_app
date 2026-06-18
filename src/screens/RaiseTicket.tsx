import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import CustomSafeArea from '@/components/CustomSafeArea';
import Header from '@/components/Header';
import {navigationRef} from '@/navigation/NavigationService';
import {Colors, Fonts} from '@/assets';
import {normalize} from '@/utils/normalize';
import {Dropdown} from 'react-native-element-dropdown';
import {useAddTicketMutation, useGetHelpSupportMutation} from '@/redux/services/astroService';
import LoaderModal from '@/components/LoaderModal';
import ToastMessage from '@/components/ToastMessage';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Props = {};

const RaiseTicket = (props: Props) => {
  const [value, setValue] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [getSupport, getSupportRes] = useGetHelpSupportMutation();
	const [addTicket, addTicketRes] = useAddTicketMutation();
	const user = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<any[]>();

  useEffect(() => {
    fetchSupportHelp();
  }, []);

  const fetchSupportHelp = async () => {
    try {
      const res = await getSupport({}).unwrap();
      if (res.status == 200) {
        setData(res.recordList);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
	const handleSubmit = async () => {
		if(value == null || subject.trim().length == 0 || description.trim().length == 0) {
			ToastMessage({message: 'All fields are required!'});
			return;
		}
		const bodyContent = {
			helpSupportId: value,
			subject: subject,
			description: description,
			userId: user.id,
		};
		try {
			const res = await addTicket(bodyContent).unwrap();
			console.log(res);
			if(res.status == 200){
				setValue(null);
				setSubject('');
				setDescription('');
				ToastMessage({message: 'Ticket Raised successfully!'});
				navigationRef.goBack();
			}
		} catch (error) {
			console.log('Error: ', error);
		}
	};
  return (
    <CustomSafeArea>
      <Header title="Raise an issue" onPress={() => navigationRef.goBack()} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: normalize(12),
          paddingTop: normalize(12),
        }}>
        <View style={{marginBottom: normalize(10)}}>
          <Text style={styles.label}>Select a issue type</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={data || []}
            search={false}
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder="Select Your Issue"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.id);
            }}
          />
        </View>
        <View style={{marginBottom: normalize(10)}}>
          <Text style={styles.label}>Subject </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your subject here..."
            placeholderTextColor="#aaa"
            value={subject}
            onChangeText={setSubject}
          />
        </View>
        <View style={{marginBottom: normalize(16)}}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write your description here..."
            placeholderTextColor="#aaa"
            multiline={true}
            numberOfLines={5} // just for Android initial height
            textAlignVertical="top" // aligns text at the top
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <Pressable
          style={styles.callbackButton}
          onPress={handleSubmit}>
          <Text style={styles.callbackText}>Submit</Text>
        </Pressable>
      </View>
      {getSupportRes?.isLoading || addTicketRes?.isLoading && (
        <LoaderModal loading={getSupportRes?.isLoading || addTicketRes?.isLoading} />
      )}
    </CustomSafeArea>
  );
};

export default RaiseTicket;

const styles = StyleSheet.create({
  label: {
    fontSize: normalize(16),
    color: '#333',
    fontFamily: Fonts.medium,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: normalize(14),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: normalize(15),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    color: '#333',
  },
  itemTextStyle: {
    fontSize: normalize(15),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    color: '#333',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: normalize(10),
    backgroundColor: '#fff',
    fontSize: normalize(14),
    fontFamily: Fonts.regular,
    color: '#333',
    // subtle shadow for elevated feel
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    height: normalize(200),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: normalize(10),
    backgroundColor: '#fff',
    fontSize: normalize(14),
    fontFamily: Fonts.regular,
    color: '#333',
    // subtle shadow for better look
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  callbackButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  callbackText: {
    color: '#fff',
    fontSize: normalize(14),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
});
