import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {normalize, verticalScale} from '@/utils/normalize';
import {Colors, Fonts} from '@/assets';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import CommonButton from '@/components/CommonButton';
import Spacing from '@/components/Spacing';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {ThemedText} from '@/components/ThemedText';
import {
  useAddIntakeDetailMutation,
  useBookUserSlotMutation,
  useCheckFreeSessionMutation,
  useGetIntakeFormMutation,
  useLazyGetAvailableTimeSlotsQuery,
  useSendAstrologerCallRequestMutation,
  useSendAstrologerChatRequestMutation,
  useSendMessageMutation,
} from '@/redux/services/astroService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {sendMessage, sendMessageToRNF, ToastMessage} from '@/utils/helper';
import LoaderModal from '@/components/LoaderModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Timestamp} from '@react-native-firebase/firestore';
import moment from 'moment';
import {MessageData} from './unlimited_chats/unlimitedTypes';

const data = [
  {label: 'Single', value: 'single'},
  {label: 'Married', value: 'married'},
  {label: 'Divorced', value: 'divorced'},
];

const concernTopicData = [
  {label: 'Study', value: 'study'},
  {label: 'Carrer and Business', value: 'Carrer and Business'},
  {label: 'Marriage', value: 'Marriage'},
  {label: 'Love and Relationship', value: 'Love and Relationship'},
  {label: 'Wealth an Property', value: 'Wealth an Property'},
  {label: 'Education', value: 'Education'},
  {label: 'Legal Matters', value: 'Legal Matters'},
  {label: 'Child Name Consultation', value: 'Child Name Consultation'},
  {label: 'Business Name Consultation', value: 'Business Name Consultation'},
  {label: 'Gem Stone Consultation', value: 'Gem Stone Consultation'},
  {
    label: 'Commodity trading Consultation',
    value: 'Commodity trading Consultation',
  },
  {label: 'Match Making', value: 'Match Making'},
  {label: 'Birth Time Rectification', value: 'Birth Time Rectification'},
  {
    label: 'Name Correction Consultation',
    value: 'Name Correction Consultation',
  },
  {label: 'Travel Abroad Consultation', value: 'Travel Abroad Consultation'},
  {label: 'Remedy Consultation', value: 'Remedy Consultation'},
];

const radioButtons = [
  {id: '1', label: 'Male', value: 'male'},
  {id: '2', label: 'Female', value: 'female'},
  {id: '3', label: 'Other', value: 'other'},
];

const schema = yup.object().shape({
  name: yup.string().required('Full Name is required'),
  topicOfConcern: yup.string().required('Topic of concern is required.'),
  dateOfBirth: yup.string().required('Birth Date is required'),
  timeOfBirth: yup
    .string()
    .default('')
    .when('isBirthTimeAvailable', {
      is: false,
      then: schema => schema.required('Time of your birth is required.'),
      otherwise: schema => schema.notRequired(),
    }),
  birthPlace: yup.string().required('Birth Place is required'),
  gender: yup.string().required('Please select a gender'),
  maritalStatus: yup.string().required('Please select marital status'),
  isBirthTimeAvailable: yup.bool().default(false),
  isPartnerDetail: yup.bool().default(false),
  partnerName: yup
    .string()
    .default('')
    .when('isPartnerDetail', {
      is: true,
      then: scheme => scheme.required('Partner name is required'),
      otherwise: schema => schema.notRequired(),
    }),
  partnerDOB: yup.string().when('isPartnerDetail', {
    is: true,
    then: schema => schema.required('Partner DOB is required'),
    otherwise: schema => schema.notRequired(),
  }),
  isPartnerTOB: yup.bool().default(false),
  partnerTOB: yup.string().when(['isPartnerDetail', 'isPartnerTOB'], {
    is: (isPartnerDetail: boolean, isPartnerTOB: boolean) =>
      isPartnerDetail && isPartnerTOB,
    then: schema => schema.required('Enter your partner Time of birth.'),
    otherwise: schema => schema.notRequired(),
  }),
  partnerBirthPlace: yup.string().when('isPartnerDetail', {
    is: true,
    then: schema => schema.required('Partner birth place is required'),
    otherwise: schema => schema.notRequired(),
  }),
});

export default function ChatForm() {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const timeSelection = [5, 10, 15, 20, 30];
  const [chatSelectTime, setChatSelectTime] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [datePickerState, setDatePickerState] = useState<any>('');
  const [timePickerState, setTimePickerState] = useState<any>('');
  const [addIntakeDetail, addIntakeDetailRes] = useAddIntakeDetailMutation();
  const [getIntakeFormData, getIntakeFormDataRes] = useGetIntakeFormMutation();
  const [checkUserFreeChatSession, checkUserFreeChatSessionRes] =
    useCheckFreeSessionMutation();
  const [sendAstrologerChatRequest, sendAstrologerChatRequestRes] =
    useSendAstrologerChatRequestMutation();
  const [sendAstrologerCallRequest, sendAstrologerCallRequestRes] =
    useSendAstrologerCallRequestMutation();
  const [getTimeSlot] = useLazyGetAvailableTimeSlotsQuery();
  const [bookUserSlot] = useBookUserSlotMutation();
  const [sendMessage] = useSendMessageMutation();
  const route = useRoute();
  const {
    astrologerId,
    astrologerName,
    astrologerImage,
    isFreeAvailable,
    freeChatDuration,
    rate,
    type,
    chatType,
    astrologerUserId,
  } = route.params || ({} as any);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      dateOfBirth: '',
      timeOfBirth: '',
      birthPlace: '',
      gender: '',
      topicOfConcern: '',
      maritalStatus: '',
      isBirthTimeAvailable: false,
      isPartnerDetail: false,
      partnerName: '',
      partnerDOB: '',
      partnerTOB: '',
      isPartnerTOB: false,
      partnerBirthPlace: '',
    },
  });

  const isPartnerDetail = watch('isPartnerDetail');
  const isBirthTimeAvailable = watch('isBirthTimeAvailable');
  const isPartnerTOB = watch('isPartnerTOB');

  const getSlots = async () => {
    const todayDate = moment(Date.now()).format('YYYY-MM-DD');
    let payload = {
      id: astrologerId,
      date: todayDate,
    };
    try {
      const response = await getTimeSlot(payload).unwrap();
      if (response?.status == 200) {
        return {start_time: response?.data?.start_time, date: todayDate};
      }
    } catch (error) {
      console.log('Fetch slot error::', error);
    }
  };

  const bookUnlimitedChatSlot = async (formData: any) => {
    let body: any = {
      astrologer_id: astrologerId,
      user_id: userDetails?.id,
    };
    try {
      // Step 1: Find next available slot
      const availableSlot = await getSlots();
      if (!availableSlot?.start_time) {
        ToastMessage('No available slots found for today. Please try again later.');
        return;
      }
      body = {
        ...body,
        start_time: availableSlot?.start_time,
        date: availableSlot?.date,
      };
      console.log('calling booking slot', body);

      // Step 2: Book the slot — must succeed before sending chat request
      const response = await bookUserSlot({...body}).unwrap();
      if (response?.status !== 200) {
        ToastMessage(response?.message || 'Failed to book slot. Please try again.');
        return;
      }

      // Step 3: Send chat request to astrologer
      const chatReqRes = await sendAstrologerChatRequest({
        astrologerId: astrologerId,
        isFreeSession: false,
        chat_duration: 30 * 60,
        chatType: 'unlimited',
      }).unwrap();

      // Step 4: Send intro message via socket
      const messageData: MessageData = {
        sender_id: userDetails?.id,
        receiver_id: astrologerUserId,
        sender_type: 'user',
        message: `Hi ${astrologerName},

Below are my details:

Name: ${formData?.name},
Gender: ${
          formData?.gender == 1
            ? 'Male'
            : formData?.gender == 2
            ? 'Female'
            : 'Others'
        },
DOB: ${formData?.dateOfBirth},
TOB: ${formData?.timeOfBirth},
POB: ${formData?.birthPlace},
Marital status: ${formData?.maritalStatus ?? 'Single'},
TOPIC: ${formData?.topicOfConcern ?? 'Study'}

This is an automated message to confirm that chat has started.`,
      };
      await sendMessage(messageData).unwrap();

      // Step 5: Notify user and navigate to the unlimited chat screen
      ToastMessage(`Slot booked at ${availableSlot?.start_time}. Your chat request has been sent.`);
      navigation.navigate('unlimitedChat', {
        astrologerId: astrologerId,
        chatIdNoti: chatReqRes?.chatId ?? null,
        astroProfile: astrologerImage,
        astrologerName: astrologerName,
        chatDuration: 30 * 60,
        astrologerUserId: astrologerUserId,
      });
    } catch (error: any) {
      console.log('Error While booking slots ', error);
      ToastMessage(error?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // format as 3 Oct, 2020
      const formattedDate = moment(selectedDate).format('D MMM, YYYY');
      setValue(datePickerState, formattedDate, {shouldValidate: true});
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      // format like 03:45 PM
      const formattedTime = moment(selectedTime).format('hh:mm A');
      setValue(timePickerState, formattedTime, {shouldValidate: true});
    }
  };

  const submitChatIntakeForm = async (formData: any) => {
    const data = isPartnerDetail
      ? {
          name: formData.name,
          birthDate: moment(formData?.dateOfBirth, 'D MMM, YYYY').format(
            'YYYY-MM-DD',
          ),
          birthTime: moment(formData?.timeOfBirth, 'hh:mm A').format(
            'HH:mm:ss',
          ),
          maritalStatus: formData?.maritalStatus,
          birthPlace: formData?.birthPlace,
          topicOfConcern: formData?.topicOfConcern,
          partnerName: formData?.partnerName,
          gender: formData?.gender,
          partnerBirthDate: moment(formData?.partnerDOB, 'D MMM, YYYY').format(
            'YYYY-MM-DD',
          ),
          partnerBirthTime: moment(formData?.partnerTOB, 'hh:mm A').format(
            'HH:mm:ss',
          ),
          partnerBirthPlace: formData?.partnerBirthPlace,
          timezone: '',
          longitude: '',
          latitude: '',
        }
      : {
          name: formData.name,
          birthDate: moment(formData?.dateOfBirth, 'D MMM, YYYY').format(
            'YYYY-MM-DD',
          ),
          birthTime: moment(formData?.timeOfBirth, 'hh:mm A').format(
            'HH:mm:ss',
          ),
          maritalStatus: formData?.maritalStatus,
          birthPlace: formData?.birthPlace,
          topicOfConcern: formData?.topicOfConcern,
          gender: formData?.gender,
          timezone: '',
          longitude: '',
          latitude: '',
        };
    if (chatType == 'unlimited') {
      await bookUnlimitedChatSlot(formData);
    } else {
      if (
        rate * timeSelection[chatSelectTime] <=
          userDetails?.totalWalletAmount ||
        isFreeAvailable == true
      ) {
        console.log('Validated Form Data: ', data);
        const response = await addIntakeDetail(data).unwrap();
        if (isFreeAvailable == true) {
          const responseFreeSession = await checkUserFreeChatSession(
            '',
          ).unwrap();
          if (responseFreeSession?.isAddNewRequest == true) {
            if (type == 'Call' || type == 'VideoCall') {
              console.log('call and video call');
              let data = {
                astrologerId: astrologerId,
                isFreeSession: true,
                call_type: type == 'Videocall' ? 11 : 10,
                call_duration: timeSelection[chatSelectTime] * 60,
              };
              const res = await sendAstrologerCallRequest(data).unwrap();
              if (res.statusCode == 200) {
                ToastMessage(
                  'You have successfully sent call request to the astrologer.',
                );
                navigation.goBack();
                return;
              } else {
                Alert.alert('Error', 'Something wrong try later.');
              }
            } else {
              const chatData = {
                message: `Hi ${astrologerName},

Below are my details:

Name: ${formData?.name},
Gender: ${
                  formData?.gender == 1
                    ? 'Male'
                    : formData?.gender == 2
                    ? 'Female'
                    : 'Others'
                },
DOB: ${formData?.dateOfBirth},
TOB: ${formData?.timeOfBirth},
POB: ${formData?.birthPlace},
Marital status: ${formData?.maritalStatus ?? 'Single'},
TOPIC: ${formData?.topicOfConcern ?? 'Study'}

This is an automated message to confirm that chat has started.`,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                isDelete: false,
                isRead: true,
                userId1: `${userDetails?.id}`,
                userId2: astrologerId,
                isEndMessage: false,
              };
              const chatId = `${astrologerId}_${userDetails?.id}`;
              const partnerId = astrologerId;
              await sendMessageToRNF(
                chatId.toString(),
                partnerId.toString(),
                chatData,
                userDetails?.id.toString(),
              );
              if (formData?.isPartnerDetail) {
                const partnerChatData = {
                  message: `Hi ${astrologerName},

Below are my Partner details:

Partner Name: ${formData?.partnerName},
DOB: ${formData?.partnerDOB},
TOB: ${formData?.partnerTOB},
POB: ${formData?.partnerBirthPlace},

This is an automated message to confirm that chat has started.`,
                  createdAt: Timestamp.now(),
                  updatedAt: Timestamp.now(),
                  isDelete: false,
                  isRead: true,
                  userId1: `${userDetails?.id}`,
                  userId2: astrologerId,
                  isEndMessage: false,
                };
                await sendMessageToRNF(
                  chatId.toString(),
                  partnerId.toString(),
                  partnerChatData,
                  userDetails?.id.toString(),
                );
              }
              await sendAstrologerChatRequest({
                astrologerId: astrologerId,
                isFreeSession: true,
                chat_duration: freeChatDuration,
                chatType: 'minutes'
              });
              ToastMessage(
                'You have successfully sent chat request to the astrologer.',
              );
              navigation.goBack();
              return;
            }
          } else {
            ToastMessage('You already sent chat request to this astrologer.');
            navigation.goBack();
            return;
          }
        } else {
          if (type == 'Call' || type == 'VideoCall') {
            console.log('call and video call');
            let data = {
              astrologerId: astrologerId,
              isFreeSession: false,
              call_type: type == 'Videocall' ? 11 : 10,
              call_duration: timeSelection[chatSelectTime] * 60,
            };
            const res = await sendAstrologerCallRequest(data).unwrap();
            if (res.statusCode == 200) {
              ToastMessage(
                'You have successfully sent call request to the astrologer.',
              );
              navigation.goBack();
              return;
            } else {
              Alert.alert('Error', 'Something wrong try later.');
            }
          } else {
            const chatData = {
              message: `Hi ${astrologerName},

Below are my details:

Name: ${formData?.name},
Gender: ${
                formData?.gender == 1
                  ? 'Male'
                  : formData?.gender == 2
                  ? 'Female'
                  : 'Others'
              },
DOB: ${formData?.dateOfBirth},
TOB: ${formData?.timeOfBirth},
POB: ${formData?.birthPlace},
Marital status: ${formData?.maritalStatus ?? 'Single'},
TOPIC: ${formData?.topicOfConcern ?? 'Study'}

This is an automated message to confirm that chat has started.`,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
              isDelete: false,
              isRead: true,
              userId1: `${userDetails?.id}`,
              userId2: astrologerId,
              isEndMessage: false,
            };
            const chatId = `${astrologerId}_${userDetails?.id}`;
            const partnerId = astrologerId;
            await sendMessageToRNF(
              chatId.toString(),
              partnerId.toString(),
              chatData,
              userDetails?.id.toString(),
            );
            if (formData?.isPartnerDetail) {
              const partnerChatData = {
                message: `Hi ${astrologerName},

Below are my Partner details:

Partner Name: ${formData?.partnerName},
DOB: ${formData?.partnerDOB},
TOB: ${formData?.partnerTOB},
POB: ${formData?.partnerBirthPlace},

This is an automated message to confirm that chat has started.`,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                isDelete: false,
                isRead: true,
                userId1: `${userDetails?.id}`,
                userId2: astrologerId,
                isEndMessage: false,
              };
              console.log(partnerChatData);
              await sendMessageToRNF(
                chatId.toString(),
                partnerId.toString(),
                partnerChatData,
                userDetails?.id.toString(),
              );
            }
            await sendAstrologerChatRequest({
              astrologerId: astrologerId,
              isFreeSession: false,
              chat_duration: timeSelection[chatSelectTime] * 60,
              chatType: 'minutes'
            });
            ToastMessage(
              'You have successfully sent chat request to the astrologer.',
            );
            navigation.goBack();
          }
        }
      } else {
        ToastMessage(
          `You don't have enough balance in your wallet. Please recharge your wallet.`,
        );
        navigation.navigate('wallet', {
          isFromChatIntakeForm: true,
          astrologerId: astrologerId,
          astrologerName: astrologerName,
          astrologerImage: astrologerImage,
          rate: rate * timeSelection[chatSelectTime],
        });
      }
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getIntakeFormDetails();
    });
    return unsubscribe;
  }, [navigation]);
  const getIntakeFormDetails = async () => {
    try {
      const response = await getIntakeFormData({
        userId: userDetails?.id,
      }).unwrap();
      const intakeFormDetails = response.recordList[0];
      console.log(intakeFormDetails);
      if (intakeFormDetails?.id) {
        setValue('name', intakeFormDetails?.name);
        setValue(
          'dateOfBirth',
          moment(intakeFormDetails?.birthDate).format('D MMM, YYYY'),
        );
        setValue(
          'timeOfBirth',
          moment(intakeFormDetails?.birthTime, 'HH:mm:ss').format('hh:mm A'),
        );
        setValue('birthPlace', intakeFormDetails?.birthPlace);
        setValue('gender', intakeFormDetails?.gender);
        setValue('maritalStatus', intakeFormDetails?.maritalStatus);
        setValue('topicOfConcern', intakeFormDetails?.topicOfConcern);
        if (intakeFormDetails?.partnerName) {
          setValue('isPartnerDetail', true);
          setValue('partnerName', intakeFormDetails?.partnerName);
          setValue(
            'partnerDOB',
            moment(intakeFormDetails?.partnerBirthDate).format('D MMM, YYYY'),
          );
          setValue(
            'partnerTOB',
            moment(intakeFormDetails?.partnerBirthTime, 'HH:mm:ss').format(
              'hh:mm A',
            ),
          );
          setValue('partnerBirthPlace', intakeFormDetails?.partnerBirthPlace);
        }
      }
    } catch {}
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        paddingTop: inset.top,
        // paddingBottom: inset.bottom,
        backgroundColor: Colors.orangeColor,
      }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={0}>
      <View style={[styles.container]}>
        <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
          <Header
            onPress={() => navigation.goBack()}
            title="Chat Intake Form"
          />
          {isFreeAvailable ||
            (chatType != 'unlimited' && (
              <View
                style={{
                  backgroundColor: Colors.lightRedColor,
                  padding: normalize(8),
                  marginBottom: normalize(8),
                  // borderRadius: normalize(8)
                }}>
                <Text
                  style={{
                    color: Colors.blackColor,
                    fontFamily: Fonts.regular,
                    includeFontPadding: false,
                    textAlign: 'center',
                  }}>
                  Enjoy your first 8 minutes of chat absolutely free!
                </Text>
              </View>
            ))}
          <ScrollView contentContainerStyle={{padding: normalize(12)}}>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <InputField
                  label="Name"
                  placeholder="Enter Full Name"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({field: {value}}) => (
                <InputField
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  value={value}
                  editable={false}
                  onChangeText={() => {}}
                  onPressIn={() => {
                    setDatePickerState('dateOfBirth');
                    setShowDatePicker(true);
                  }}
                  errorMessage={errors.dateOfBirth?.message}
                  rightIconName={'calendar'}
                />
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
            <Controller
              control={control}
              name="timeOfBirth"
              render={({field: {value}}) => (
                <InputField
                  label="Time of Birth"
                  placeholder="Time of Birth"
                  value={value}
                  editable={false}
                  onChangeText={() => {}}
                  onPressIn={() => {
                    if (!isBirthTimeAvailable) {
                      setTimePickerState('timeOfBirth');
                      setShowTimePicker(true);
                    }
                  }}
                  errorMessage={errors.timeOfBirth?.message}
                  rightIconName={'alarm-outline'}
                />
              )}
            />
            <Controller
              control={control}
              name="isBirthTimeAvailable"
              render={({field: {onChange, value}}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    top: -15,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={value}
                    onValueChange={onChange}
                    tintColors={{
                      true: Colors.colorOrange, // checked color
                      false: '#8e8e93', // unchecked color
                    }}
                  />
                  <ThemedText
                    style={{
                      color: Colors.blackColor,
                      fontSize: verticalScale(11),
                    }}>
                    I Don't Know
                  </ThemedText>
                </View>
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
            <Controller
              control={control}
              name="birthPlace"
              render={({field: {onChange, value}}) => (
                <InputField
                  label="Place of Birth"
                  placeholder="Enter Birth Place"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.birthPlace?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({field: {value, onChange}}) => (
                <>
                  <RadioButtonsGroup
                    radioButtons={radioButtons.map(btn => ({
                      ...btn,
                      selectedId: value === btn.value,
                    }))}
                    onPress={selectedId => {
                      const selected = radioButtons.find(
                        btn => btn.id === selectedId,
                      );
                      onChange(selectedId);
                    }}
                    selectedId={value}
                    layout="row"
                    labelStyle={{
                      fontSize: normalize(16),
                      fontFamily: Fonts.medium,
                      color: Colors.blackColor,
                    }}
                  />
                  {errors.gender && (
                    <Text style={styles.errorMsg}>{errors.gender.message}</Text>
                  )}
                </>
              )}
            />
            <Spacing height={8} />
            <Controller
              control={control}
              name="maritalStatus"
              render={({field: {onChange, value}}) => (
                <>
                  <ThemedText type="default">Martial Status</ThemedText>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Maritial Status"
                    value={value}
                    onChange={item => onChange(item.value)}
                    itemTextStyle={{
                      color: Colors.blackColor,
                      fontFamily: Fonts.medium,
                    }}
                  />
                  {errors.maritalStatus && (
                    <Text style={styles.errorMsg}>
                      {errors.maritalStatus.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Spacing height={16} />
            <Controller
              control={control}
              name="topicOfConcern"
              render={({field: {onChange, value}}) => (
                <>
                  <ThemedText type="default">Topic of Concern</ThemedText>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={concernTopicData}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Your Concern"
                    value={value}
                    onChange={item => onChange(item.value)}
                    itemTextStyle={{
                      color: Colors.blackColor,
                      fontFamily: Fonts.medium,
                    }}
                  />
                  {errors.topicOfConcern && (
                    <Text style={styles.errorMsg}>
                      {errors.topicOfConcern.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="isPartnerDetail"
              render={({field: {onChange, value}}) => (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <CheckBox
                    disabled={false}
                    value={value}
                    onValueChange={onChange}
                    tintColors={{
                      true: Colors.colorOrange, // checked color
                      false: '#8e8e93', // unchecked color
                    }}
                  />
                  <ThemedText
                    style={{
                      color: Colors.blackColor,
                      fontSize: verticalScale(12),
                    }}>
                    Enter Partner's Details
                  </ThemedText>
                </View>
              )}
            />
            {isPartnerDetail && (
              <>
                <Spacing height={8} />
                <Controller
                  control={control}
                  name="partnerName"
                  render={({field: {onChange, value}}) => (
                    <InputField
                      label="Partner Name"
                      placeholder="Enter Partner Name"
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.partnerName?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="partnerDOB"
                  render={({field: {value}}) => (
                    <InputField
                      label="Partner DOB"
                      placeholder="Partner DOB"
                      value={value || ''}
                      editable={false}
                      onChangeText={() => {}}
                      onPressIn={() => {
                        setDatePickerState('partnerDOB');
                        setShowDatePicker(true);
                      }}
                      errorMessage={errors.partnerDOB?.message}
                      rightIconName={'calendar'}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="partnerTOB"
                  render={({field: {value}}) => (
                    <InputField
                      label="Partner Time of Birth"
                      placeholder="Partner Time of Birth"
                      value={value || ''}
                      editable={false}
                      onChangeText={() => {}}
                      onPressIn={() => {
                        setTimePickerState('partnerTOB');
                        setShowTimePicker(true);
                      }}
                      errorMessage={errors.partnerTOB?.message}
                      rightIconName={'alarm-outline'}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="isPartnerTOB"
                  render={({field: {onChange, value}}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        top: -20,
                      }}>
                      <CheckBox
                        disabled={false}
                        value={value}
                        onValueChange={onChange}
                        tintColors={{
                          true: Colors.colorOrange, // checked color
                          false: '#8e8e93', // unchecked color
                        }}
                      />
                      <ThemedText
                        style={{
                          color: Colors.blackColor,
                          fontSize: verticalScale(11),
                        }}>
                        I Don't Know
                      </ThemedText>
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="partnerBirthPlace"
                  render={({field: {onChange, value}}) => (
                    <InputField
                      label="Partner Place of Birth"
                      placeholder="Partner Enter Birth Place"
                      value={value || ''}
                      onChangeText={onChange}
                      errorMessage={errors.partnerBirthPlace?.message}
                    />
                  )}
                />
              </>
            )}
            {isFreeAvailable || chatType == 'unlimited' ? null : (
              <>
                <Spacing height={8} />
                <ThemedText type="default">
                  How Many Minutes you want to talk?
                </ThemedText>
                <View>
                  <FlatList
                    data={timeSelection}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingHorizontal: 4}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() => setChatSelectTime(index)}>
                        <View
                          style={[
                            styles.timeContainer,
                            {
                              backgroundColor:
                                chatSelectTime === index
                                  ? Colors.colorGold
                                  : '#fff',
                              borderColor: '#ccc',
                            },
                          ]}>
                          <Text style={styles.timeTextStyle}>{item} Mins</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </>
            )}
            <CommonButton
              label="Submit"
              onPress={handleSubmit(submitChatIntakeForm)}
              buttonStyle={{width: '100%'}}
            />
            <Spacing height={8} />
            <LoaderModal
              loading={
                getIntakeFormDataRes?.isLoading ||
                addIntakeDetailRes?.isLoading ||
                sendAstrologerChatRequestRes?.isLoading ||
                checkUserFreeChatSessionRes?.isLoading
              }
            />
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  dropdown: {
    height: verticalScale(35),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: normalize(8),
    paddingHorizontal: normalize(12),
    marginTop: normalize(2),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.colorGrey,
    includeFontPadding: false,
  },
  selectedTextStyle: {
    fontSize: normalize(16),
    fontFamily: Fonts.medium,
    color: Colors.blackColor,
    includeFontPadding: false,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorMsg: {
    color: Colors.lightRedColor,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  timeContainer: {
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTextStyle: {
    color: Colors.blackColor,
    fontSize: normalize(11),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
});
