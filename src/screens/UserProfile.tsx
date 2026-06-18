import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images} from '@/assets';
import Header from '@/components/Header';
import {Controller, useForm} from 'react-hook-form';
import {normalize} from '@/utils/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import FastImage from 'react-native-fast-image';
import Spacing from '@/components/Spacing';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {imgBaseurl} from '@/constants/constant';
import moment from 'moment';
import {useGetUserDetailMutation, useUpdateUserProfileMutation} from '@/redux/services/astroService';
import ToastMessage from '@/components/ToastMessage';
import LoaderModal from '@/components/LoaderModal';
import { updateUser } from '@/redux/slices/authSlice';

const UserProfile = () => {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const [getUserDetails] = useGetUserDetailMutation();
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: userDetails?.name,
      contactNo: userDetails?.contactNo,
      birthDate: moment(userDetails?.birthDate).format('DD MMMM, YYYY'),
      birthTime: userDetails?.birthTime,
      birthPlace: userDetails?.birthPlace,
      location: userDetails?.location,
      pincode: userDetails?.pincode,
      gender: userDetails?.gender,
      addressLine1: userDetails?.addressLine1,
      addressLine2: userDetails?.addressLine2,
    },
  });
  const [profileImage, setImageProfile] = useState<any>(null);
  const [updateUserProfile, updateUserProfileRes] =
    useUpdateUserProfileMutation();

    console.log(userDetails);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setImageProfile(userDetails?.profile);
    });
    return () => {
      unsubscribe();
      setImageProfile(null);
    };
  }, [navigation]);

  const radioButtons = [
    {id: '1', label: 'Male', value: 'male'},
    {id: '2', label: 'Female', value: 'female'},
    {id: '3', label: 'Other', value: 'other'},
  ];

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const handleDateChange = (_: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = moment(selectedDate).format('DD MMMM, YYYY');
      setValue('birthDate', formatted, {shouldValidate: true});
    }
  };

  const handleTimeChange = (_: any, selectedTime: any) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formatted = moment(selectedTime).format('HH:mm:ss');
      setValue('birthTime', formatted, {shouldValidate: true});
    }
  };

  const handleProfileImagSelection = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        presentationStyle: 'pageSheet',
      });
      console.log(res);
    } catch (error) {
      console.log('Image selection', error);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      const basicDetail = {
        name: formData.name,
        contactNo: formData.contactNo,
        gender: formData.gender,
        birthTime: formData.birthTime
          ? moment(formData.birthTime, ['hh:mm A', 'HH:mm:ss', 'HH:mm']).format(
              'HH:mm:ss',
            )
          : null,
        birthDate: formData.birthDate
          ? moment(formData?.birthDate, 'DD MMMM, YYYY').format('YYYY-MM-DD')
          : null,
        birthPlace: formData?.birthPlace ? formData?.birthPlace : null,
        addressLine1: formData?.addressLine1 ? formData?.addressLine1 : null,
        addressLine2: formData?.addressLine2 ? formData?.addressLine2 : null,
        location: formData?.location ? formData?.location : null,
        pincode: formData?.pincode ? formData?.pincode : null,
        profile: profileImage ? profileImage : null,
        email: null,
      };
      const res = await updateUserProfile({
        id: userDetails?.id,
        bodyContent: basicDetail,
      }).unwrap();
      console.log(res);
      if (res?.status == 200) {
        const user_res = await getUserDetails('').unwrap();
        dispatch(updateUser({user: user_res.userDetails}));
        ToastMessage({message: 'User updated successfully.'});
      }
    } catch (error) {
      console.log('handleSubmit error', error);
    }
  };

  return (
    <View
      style={[
        styles.main,
        {paddingTop: inset.top, paddingBottom: inset.bottom},
      ]}>
      <Header title="Edit Profile" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.formCard}>
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={handleProfileImagSelection}>
              <FastImage
                source={
                  profileImage
                    ? {uri: `${imgBaseurl}${profileImage}`}
                    : Images.imagePlaceholder
                }
                style={styles.avatar}
              />
              <Text style={styles.avatarEdit}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          <Spacing height={10} />
          {/* Full Name */}
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Full name is required',
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.colorGrey}
                  style={styles.input}
                />
                {error && (
                  <Text style={{color: 'red', marginTop: 0}}>
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Phone */}
          <Controller
            control={control}
            name="contactNo"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Your mobile number"
                placeholderTextColor={Colors.colorGrey}
                style={styles.input}
                keyboardType="phone-pad"
                editable={false}
              />
            )}
          />

          {/* Date of Birth */}
          <Controller
            control={control}
            name="birthDate"
            render={({field: {value}}) => (
              <Pressable onPressIn={() => setShowDatePicker(true)}>
                <TextInput
                  value={value?.toString()}
                  placeholder="Date of Birth"
                  placeholderTextColor={Colors.colorGrey}
                  style={styles.input}
                  editable={false}
                />
              </Pressable>
            )}
          />
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              value={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* Time of Birth */}
          <Controller
            control={control}
            name="birthTime"
            render={({field: {value}}) => (
              <Pressable onPressIn={() => setShowTimePicker(true)}>
                <TextInput
                  value={value}
                  placeholder="Time of Birth"
                  placeholderTextColor={Colors.colorGrey}
                  style={styles.input}
                  editable={false}
                />
              </Pressable>
            )}
          />
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              value={new Date()}
              onChange={handleTimeChange}
            />
          )}

          {/* Birthplace */}
          <Controller
            control={control}
            name="birthPlace"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Place of Birth"
                placeholderTextColor={Colors.colorGrey}
                style={styles.input}
              />
            )}
          />

          {/* Address */}
          <Controller
            control={control}
            name="addressLine1"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Address Line 1"
                placeholderTextColor={Colors.colorGrey}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="addressLine2"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Address Line 2"
                placeholderTextColor={Colors.colorGrey}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="City / District"
                placeholderTextColor={Colors.colorGrey}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="pincode"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value?.toString() || ''}
                onChangeText={onChange}
                placeholder="Pin Code"
                keyboardType="number-pad"
                placeholderTextColor={Colors.colorGrey}
                style={styles.input}
              />
            )}
          />
          <Spacing height={normalize(12)} />
          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <Controller
            control={control}
            name="gender"
            render={({field: {onChange, value}}) => (
              <>
                <RadioButtonsGroup
                  radioButtons={radioButtons.map(btn => ({
                    ...btn,
                    selectedId: value == btn.value,
                  }))}
                  onPress={selectedId => {
                    const selected = radioButtons.find(
                      btn => btn.id == selectedId,
                    );
                    onChange(selectedId);
                  }}
                  selectedId={value?.toString()}
                  layout="row"
                  labelStyle={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.medium,
                    color: Colors.blackColor,
                  }}
                />
              </>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(data => {
            handleFormSubmit(data);
          })}>
          <Text style={styles.submitText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      <LoaderModal loading={updateUserProfileRes?.isLoading} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.colorGrey,
    padding: 12,
    borderRadius: 10,
    fontFamily: Fonts.medium,
    fontSize: normalize(14),
    color: Colors.blackColor,
    // marginBottom: 15,'
    marginTop: normalize(12),
    backgroundColor: '#F9F9F9',
    includeFontPadding: false,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: normalize(14),
    marginBottom: 8,
    color: Colors.blackColor,
  },
  submitButton: {
    backgroundColor: Colors.blackColor,
    paddingVertical: normalize(12),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },
  submitText: {
    color: '#fff',
    fontSize: normalize(15),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ddd',
  },
  avatarEdit: {
    fontSize: 12,
    color: Colors.colorGrey,
    marginTop: 6,
    fontFamily: Fonts.regular,
  },
});
